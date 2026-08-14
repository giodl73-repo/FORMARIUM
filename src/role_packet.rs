//! Portable Wave 2 role and ambiguity evidence packet.

use crate::binding::run_binding_controls;
use crate::packet::{
    normalize_lf, validate_packet_header, write_built_packet, PacketError, PacketFile,
    PortablePacket,
};
use crate::role_bakeoff::run_role_bakeoff;
use crate::role_fixtures::{
    generate_analysis_documents, generate_role_corpora, generate_role_splits,
};
use crate::{sha256_hex, SchemaDocument};
use std::fmt::Write as _;
use std::path::Path;

const TRANSFER_SCHEMA: &str = include_str!("../fixtures/schemas/transfer.factor");
const ATTACHMENT_SCHEMA: &str = include_str!("../fixtures/schemas/attachment.factor");
const LICENSE: &str = include_str!("../LICENSE");
const VERIFIER_SOURCE: &str = include_str!("../tools/verify_role_packet.py");
const CARGO_LOCK: &str = include_str!("../Cargo.lock");
const LIB_SOURCE: &str = include_str!("lib.rs");
const MAIN_SOURCE: &str = include_str!("main.rs");
const PACKET_SOURCE: &str = include_str!("packet.rs");
const ROLE_FIXTURE_SOURCE: &str = include_str!("role_fixtures.rs");
const BINDING_SOURCE: &str = include_str!("binding.rs");
const ROLE_BAKEOFF_SOURCE: &str = include_str!("role_bakeoff.rs");
const ROLE_PACKET_SOURCE: &str = include_str!("role_packet.rs");

/// Builds the canonical Wave 2 packet in memory.
///
/// # Errors
///
/// Returns an error when a schema, analysis, or split owner fails.
pub fn build_role_packet() -> Result<PortablePacket, PacketError> {
    let schemas = [
        ("transfer", SchemaDocument::parse(TRANSFER_SCHEMA)),
        ("attachment", SchemaDocument::parse(ATTACHMENT_SCHEMA)),
    ];
    let parsed_schemas = schemas
        .into_iter()
        .map(|(id, document)| {
            document
                .map(|document| (id, document))
                .map_err(|error| PacketError::InvalidManifest(error.to_string()))
        })
        .collect::<Result<Vec<_>, _>>()?;
    let corpora = generate_role_corpora();
    let analyses = generate_analysis_documents()?;
    let splits = generate_role_splits()?;
    let binding = run_binding_controls();
    let bakeoff = run_role_bakeoff();
    let files = packet_files(
        &parsed_schemas,
        &corpora,
        &analyses,
        &splits,
        &binding.canonical_text(),
        &bakeoff.canonical_text(),
    );
    let manifest = manifest_prefix(
        &parsed_schemas,
        &corpora,
        &analyses,
        &splits,
        &binding.sha256(),
        &bakeoff.sha256(),
        bakeoff.classification.id(),
    );

    Ok(PortablePacket::new(files, manifest))
}

fn packet_files(
    schemas: &[(&str, SchemaDocument)],
    corpora: &[crate::role_fixtures::RoleCorpus],
    analyses: &[crate::role_fixtures::AnalysisDocument],
    splits: &[crate::role_fixtures::RoleSplitManifest],
    binding_text: &str,
    bakeoff_text: &str,
) -> Vec<PacketFile> {
    let mut files = Vec::new();
    for (id, document) in schemas {
        files.push(PacketFile::text(
            format!("schemas/{id}.factor"),
            &document.canonical_text(),
        ));
    }
    for corpus in corpora {
        let family = corpus.family().id();
        files.push(PacketFile::text(
            format!("frames/{family}.factor-role-frame"),
            corpus.frame_text(),
        ));
        files.push(PacketFile::text(
            format!("corpora/{family}.factor-role-corpus"),
            &corpus.canonical_text(),
        ));
    }
    for analysis in analyses {
        files.push(PacketFile::text(
            format!("analyses/{}.factor-analysis", analysis.family().id()),
            &analysis.canonical_text(),
        ));
    }
    for split in splits {
        files.push(PacketFile::text(
            format!(
                "splits/{}-{}.factor-analysis-split",
                split.family().id(),
                split.kind().id()
            ),
            &split.canonical_text(),
        ));
    }
    files.push(PacketFile::text(
        "results/binding-controls.factor-result",
        binding_text,
    ));
    files.push(PacketFile::text(
        "results/role-ambiguity.factor-result",
        bakeoff_text,
    ));
    files.push(PacketFile::text("README.txt", &role_packet_readme()));
    files.push(PacketFile::text("LICENSE.txt", LICENSE));
    files.push(PacketFile::text("verify_role_packet.py", VERIFIER_SOURCE));
    files
}

fn manifest_prefix(
    schemas: &[(&str, SchemaDocument)],
    corpora: &[crate::role_fixtures::RoleCorpus],
    analyses: &[crate::role_fixtures::AnalysisDocument],
    splits: &[crate::role_fixtures::RoleSplitManifest],
    binding_sha256: &str,
    bakeoff_sha256: &str,
    classification: &str,
) -> String {
    let mut manifest = format!(
        "factor-role-packet-v1\npacket factor-role-v1\nproducer factor {}\nproducer_source_sha256 {}\nmodel exact-and-hrr-v1-d64-128-256\nclassification {}\n",
        env!("CARGO_PKG_VERSION"),
        producer_source_sha256(),
        classification
    );
    for (id, document) in schemas {
        writeln!(manifest, "schema {id} {}", document.schema().sha256())
            .expect("writing to String cannot fail");
    }
    for corpus in corpora {
        writeln!(
            manifest,
            "frame {} {}",
            corpus.family().id(),
            corpus.frame_sha256()
        )
        .expect("writing to String cannot fail");
        writeln!(
            manifest,
            "corpus {} {}",
            corpus.family().id(),
            corpus.sha256()
        )
        .expect("writing to String cannot fail");
    }
    for analysis in analyses {
        writeln!(
            manifest,
            "analysis {} {}",
            analysis.family().id(),
            analysis.sha256()
        )
        .expect("writing to String cannot fail");
    }
    for split in splits {
        writeln!(
            manifest,
            "split {} {} {}",
            split.family().id(),
            split.kind().id(),
            split.sha256()
        )
        .expect("writing to String cannot fail");
    }
    writeln!(manifest, "result binding-controls {binding_sha256}")
        .expect("writing to String cannot fail");
    writeln!(manifest, "result role-ambiguity {bakeoff_sha256}")
        .expect("writing to String cannot fail");
    manifest
}

/// Writes the Wave 2 packet into a missing or empty directory.
///
/// # Errors
///
/// Returns an error for nonempty targets, generation failures, or I/O errors.
pub fn write_role_packet(path: &Path) -> Result<PortablePacket, PacketError> {
    write_built_packet(path, build_role_packet()?)
}

/// Validates Wave 2 packet file identities and closed-world membership.
///
/// # Errors
///
/// Returns an error for malformed, missing, extra, or changed files.
pub fn validate_role_packet(path: &Path) -> Result<String, PacketError> {
    validate_packet_header(path, "factor-role-packet-v1\n")
}

fn producer_source_sha256() -> String {
    let sources = [
        ("Cargo.lock", CARGO_LOCK),
        ("src/binding.rs", BINDING_SOURCE),
        ("src/lib.rs", LIB_SOURCE),
        ("src/main.rs", MAIN_SOURCE),
        ("src/packet.rs", PACKET_SOURCE),
        ("src/role_bakeoff.rs", ROLE_BAKEOFF_SOURCE),
        ("src/role_fixtures.rs", ROLE_FIXTURE_SOURCE),
        ("src/role_packet.rs", ROLE_PACKET_SOURCE),
    ];
    let mut canonical = String::from("factor-role-producer-source-v1\n");
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

fn role_packet_readme() -> String {
    String::from(
        "FACTOR portable role and ambiguity packet v1\n\
\n\
Contents:\n\
- canonical semantic schemas and role frames;\n\
- constrained role corpora and explicit candidate analysis sets;\n\
- frozen split manifests;\n\
- exact and bounded-HRR binding evidence;\n\
- complete role/ambiguity bakeoff evidence;\n\
- exact manifest identities and MIT license.\n\
\n\
Validation with the included independent verifier:\n\
python verify_role_packet.py .\n\
\n\
Interpretation boundary:\n\
Candidate meanings are supplied by the analysis artifacts. This packet does\n\
not infer ambiguity from text, choose a preferred reading, or establish broad\n\
NLP, runtime, hardware, or representation-specific advantage.\n",
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn role_packet_has_every_custody_layer() {
        let packet = build_role_packet().unwrap();
        assert_eq!(packet.files().len(), 19);
        assert!(packet.manifest().contains("frame transfer "));
        assert!(packet.manifest().contains("analysis attachment "));
        assert!(packet
            .manifest()
            .contains("split attachment surface-disambiguation "));
        assert!(packet.manifest().contains("result binding-controls "));
        assert!(packet.manifest().contains("result role-ambiguity "));
        assert!(packet.manifest().contains("classification semantic-only\n"));
    }
}
