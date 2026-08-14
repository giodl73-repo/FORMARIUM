//! Portable V1 evidence packet generation and validation.

use crate::bakeoff::{run_bakeoff, BakeoffError};
use crate::corpus::{generate_corpora, generate_splits, FixtureError};
use crate::{sha256_hex, SchemaDocument};
use std::collections::BTreeSet;
use std::error::Error;
use std::fmt::{self, Write as _};
use std::fs;
use std::path::{Component, Path, PathBuf};

const NAVIGATION_SCHEMA: &str = include_str!("../fixtures/schemas/navigation.factor");
const EVENT_SCHEMA: &str = include_str!("../fixtures/schemas/event.factor");
const LICENSE: &str = include_str!("../LICENSE");
const LIB_SOURCE: &str = include_str!("lib.rs");
const MAIN_SOURCE: &str = include_str!("main.rs");
const CORPUS_SOURCE: &str = include_str!("corpus.rs");
const BAKEOFF_SOURCE: &str = include_str!("bakeoff.rs");
const PACKET_SOURCE: &str = include_str!("packet.rs");
const VERIFIER_SOURCE: &str = include_str!("../tools/verify_packet.py");
const CARGO_LOCK: &str = include_str!("../Cargo.lock");

/// One file in a portable packet.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct PacketFile {
    path: String,
    bytes: Vec<u8>,
}

impl PacketFile {
    /// Returns the canonical slash-separated packet path.
    #[must_use]
    pub fn path(&self) -> &str {
        &self.path
    }

    /// Returns the exact file bytes.
    #[must_use]
    pub fn bytes(&self) -> &[u8] {
        &self.bytes
    }

    /// Returns SHA-256 over the exact file bytes.
    #[must_use]
    pub fn sha256(&self) -> String {
        sha256_hex(&self.bytes)
    }
}

/// Complete portable packet before filesystem export.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct PortablePacket {
    files: Vec<PacketFile>,
    manifest: String,
}

impl PortablePacket {
    /// Returns packet payload files in canonical path order.
    #[must_use]
    pub fn files(&self) -> &[PacketFile] {
        &self.files
    }

    /// Returns the canonical manifest text.
    #[must_use]
    pub fn manifest(&self) -> &str {
        &self.manifest
    }

    /// Returns the packet identity over the canonical manifest.
    #[must_use]
    pub fn sha256(&self) -> String {
        sha256_hex(self.manifest.as_bytes())
    }
}

/// Packet generation or validation failure.
#[derive(Debug)]
pub enum PacketError {
    /// Corpus or split construction failed.
    Fixtures(FixtureError),
    /// Bakeoff construction failed.
    Bakeoff(BakeoffError),
    /// Filesystem access failed.
    Io(std::io::Error),
    /// Export target already contained files.
    NonEmptyDirectory(PathBuf),
    /// A manifest line or path was invalid.
    InvalidManifest(String),
    /// A listed file was missing, extra, or had different bytes.
    IdentityMismatch(String),
}

impl fmt::Display for PacketError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Fixtures(error) => write!(formatter, "{error}"),
            Self::Bakeoff(error) => write!(formatter, "{error}"),
            Self::Io(error) => write!(formatter, "{error}"),
            Self::NonEmptyDirectory(path) => {
                write!(
                    formatter,
                    "packet directory is not empty: {}",
                    path.display()
                )
            }
            Self::InvalidManifest(message) => {
                write!(formatter, "invalid packet manifest: {message}")
            }
            Self::IdentityMismatch(message) => {
                write!(formatter, "packet identity mismatch: {message}")
            }
        }
    }
}

impl Error for PacketError {}

impl From<FixtureError> for PacketError {
    fn from(value: FixtureError) -> Self {
        Self::Fixtures(value)
    }
}

impl From<BakeoffError> for PacketError {
    fn from(value: BakeoffError) -> Self {
        Self::Bakeoff(value)
    }
}

impl From<std::io::Error> for PacketError {
    fn from(value: std::io::Error) -> Self {
        Self::Io(value)
    }
}

/// Builds the canonical V1 packet in memory.
///
/// # Errors
///
/// Returns an error when any schema, fixture, split, or bakeoff owner fails.
pub fn build_packet() -> Result<PortablePacket, PacketError> {
    let schemas = [
        ("navigation", SchemaDocument::parse(NAVIGATION_SCHEMA)),
        ("event", SchemaDocument::parse(EVENT_SCHEMA)),
    ];
    let parsed_schemas = schemas
        .into_iter()
        .map(|(id, document)| {
            document
                .map(|document| (id, document))
                .map_err(|error| PacketError::InvalidManifest(error.to_string()))
        })
        .collect::<Result<Vec<_>, _>>()?;
    let corpora = generate_corpora();
    let splits = generate_splits()?;
    let report = run_bakeoff()?;
    let mut files = Vec::new();

    for (id, document) in &parsed_schemas {
        files.push(text_file(
            format!("schemas/{id}.factor"),
            &document.canonical_text(),
        ));
    }
    for corpus in &corpora {
        files.push(text_file(
            format!("corpora/{}.factor-corpus", corpus.family().id()),
            &corpus.canonical_text(),
        ));
    }
    for split in &splits {
        files.push(text_file(
            format!(
                "splits/{}-{}.factor-split",
                split.family().id(),
                split.kind().id()
            ),
            &split.canonical_text(),
        ));
    }
    files.push(text_file(
        "results/strong-control.factor-result",
        &report.canonical_text(),
    ));
    files.push(text_file("README.txt", &packet_readme()));
    files.push(text_file("LICENSE.txt", LICENSE));
    files.push(text_file("verify_packet.py", VERIFIER_SOURCE));
    files.sort_by(|left, right| left.path.cmp(&right.path));

    let mut manifest = format!(
        "factor-packet-v1\npacket factor-v1\nproducer factor {}\nproducer_source_sha256 {}\nmodel supervised-codebook-v1-d16\nclassification {}\n",
        env!("CARGO_PKG_VERSION"),
        producer_source_sha256(),
        report.classification.id()
    );
    for (id, document) in &parsed_schemas {
        writeln!(manifest, "schema {id} {}", document.schema().sha256())
            .expect("writing to String cannot fail");
    }
    for corpus in &corpora {
        writeln!(
            manifest,
            "corpus {} {}",
            corpus.family().id(),
            corpus.sha256()
        )
        .expect("writing to String cannot fail");
    }
    for split in &splits {
        writeln!(
            manifest,
            "split {} {} {}",
            split.family().id(),
            split.kind().id(),
            split.sha256()
        )
        .expect("writing to String cannot fail");
    }
    writeln!(manifest, "result strong-control {}", report.sha256())
        .expect("writing to String cannot fail");
    for file in &files {
        writeln!(
            manifest,
            "file {} bytes {} sha256 {}",
            file.path(),
            file.bytes().len(),
            file.sha256()
        )
        .expect("writing to String cannot fail");
    }

    Ok(PortablePacket { files, manifest })
}

/// Writes a packet into a missing or empty directory.
///
/// # Errors
///
/// Returns an error for nonempty targets, generation failures, or I/O errors.
pub fn write_packet(path: &Path) -> Result<PortablePacket, PacketError> {
    if path.exists() && fs::read_dir(path)?.next().is_some() {
        return Err(PacketError::NonEmptyDirectory(path.to_owned()));
    }
    fs::create_dir_all(path)?;
    let packet = build_packet()?;
    for file in packet.files() {
        let output = packet_path(path, file.path())?;
        if let Some(parent) = output.parent() {
            fs::create_dir_all(parent)?;
        }
        fs::write(output, file.bytes())?;
    }
    fs::write(path.join("MANIFEST.factor"), packet.manifest())?;
    Ok(packet)
}

/// Validates exact files, byte counts, hashes, and closed-world membership.
///
/// # Errors
///
/// Returns an error for malformed manifests, unsafe paths, missing or extra
/// files, byte-count differences, digest differences, or I/O failures.
pub fn validate_packet(path: &Path) -> Result<String, PacketError> {
    let manifest_path = path.join("MANIFEST.factor");
    let manifest = fs::read_to_string(&manifest_path)?;
    if !manifest.starts_with("factor-packet-v1\n") || manifest.contains('\r') {
        return Err(PacketError::InvalidManifest(
            "header or line endings".to_owned(),
        ));
    }
    let mut expected = BTreeSet::from(["MANIFEST.factor".to_owned()]);
    for line in manifest.lines().filter(|line| line.starts_with("file ")) {
        let fields = line.split_whitespace().collect::<Vec<_>>();
        if fields.len() != 6 || fields[2] != "bytes" || fields[4] != "sha256" {
            return Err(PacketError::InvalidManifest(line.to_owned()));
        }
        let relative = fields[1];
        let expected_bytes = fields[3]
            .parse::<usize>()
            .map_err(|_| PacketError::InvalidManifest(line.to_owned()))?;
        let output = packet_path(path, relative)?;
        let bytes = fs::read(&output)?;
        if bytes.len() != expected_bytes {
            return Err(PacketError::IdentityMismatch(format!(
                "{relative} byte count"
            )));
        }
        if sha256_hex(&bytes) != fields[5] {
            return Err(PacketError::IdentityMismatch(format!("{relative} sha256")));
        }
        expected.insert(relative.to_owned());
    }
    let actual = collect_relative_files(path)?;
    if actual != expected {
        return Err(PacketError::IdentityMismatch(
            "closed-world file set".to_owned(),
        ));
    }
    Ok(sha256_hex(manifest.as_bytes()))
}

fn text_file(path: impl Into<String>, text: &str) -> PacketFile {
    PacketFile {
        path: path.into(),
        bytes: normalize_lf(text).into_bytes(),
    }
}

fn normalize_lf(text: &str) -> String {
    text.replace("\r\n", "\n").replace('\r', "\n")
}

fn producer_source_sha256() -> String {
    let sources = [
        ("Cargo.lock", CARGO_LOCK),
        ("src/bakeoff.rs", BAKEOFF_SOURCE),
        ("src/corpus.rs", CORPUS_SOURCE),
        ("src/lib.rs", LIB_SOURCE),
        ("src/main.rs", MAIN_SOURCE),
        ("src/packet.rs", PACKET_SOURCE),
    ];
    let mut canonical = String::from("factor-producer-source-v1\n");
    for (path, source) in sources {
        let source = normalize_lf(source);
        writeln!(canonical, "file {path} bytes {}", source.len())
            .expect("writing to String cannot fail");
        canonical.push_str(&source);
        if !source.ends_with('\n') {
            canonical.push('\n');
        }
    }
    sha256_hex(canonical.as_bytes())
}

fn packet_readme() -> String {
    String::from(
        "FACTOR portable packet v1\n\
\n\
Contents:\n\
- canonical semantic schemas;\n\
- generated corpus custody records;\n\
- frozen split manifests;\n\
- complete strong-control bakeoff evidence;\n\
- exact manifest identities and MIT license.\n\
\n\
Validation with the included independent verifier:\n\
python verify_packet.py .\n\
\n\
Interpretation boundary:\n\
This packet supports a synthetic semantic-only result. It does not establish\n\
open-vocabulary language, neural-model, compression, runtime, hardware, or\n\
representation-specific advantage.\n",
    )
}

fn packet_path(root: &Path, relative: &str) -> Result<PathBuf, PacketError> {
    let relative_path = Path::new(relative);
    if relative_path.is_absolute()
        || relative_path
            .components()
            .any(|component| !matches!(component, Component::Normal(_)))
    {
        return Err(PacketError::InvalidManifest(format!(
            "unsafe path {relative:?}"
        )));
    }
    Ok(root.join(relative_path))
}

fn collect_relative_files(root: &Path) -> Result<BTreeSet<String>, PacketError> {
    let mut files = BTreeSet::new();
    collect_files(root, root, &mut files)?;
    Ok(files)
}

fn collect_files(
    root: &Path,
    current: &Path,
    files: &mut BTreeSet<String>,
) -> Result<(), PacketError> {
    for entry in fs::read_dir(current)? {
        let entry = entry?;
        let path = entry.path();
        if path.is_dir() {
            collect_files(root, &path, files)?;
        } else {
            let relative = path
                .strip_prefix(root)
                .map_err(|_| PacketError::InvalidManifest(path.display().to_string()))?
                .to_string_lossy()
                .replace('\\', "/");
            files.insert(relative);
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn packet_has_every_custody_layer() {
        let packet = build_packet().unwrap();
        assert_eq!(packet.files().len(), 15);
        assert!(packet.manifest().contains("schema navigation "));
        assert!(packet.manifest().contains("corpus event "));
        assert!(packet.manifest().contains("split event template-transfer "));
        assert!(packet.manifest().contains("result strong-control "));
        assert!(packet.manifest().contains("classification semantic-only\n"));
    }
}
