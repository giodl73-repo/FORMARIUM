//! Deterministic prototype sidecars for Factorium relations and review coverage.

use crate::reference::ReferenceCorpus;
use sha2::{Digest, Sha256};
use std::collections::{BTreeMap, BTreeSet, HashSet};
use std::ffi::OsStr;
use std::fmt::Write as _;
use std::fs;
use std::path::{Path, PathBuf};

const RELATION_HEADER: &str = "factorium-relations-v0";
const RELATION_END: &str = "end-relations";
const ASSURANCE_HEADER_V0: &str = "factorium-assurance-v0";
const ASSURANCE_HEADER_V1: &str = "factorium-assurance-v1";
const ASSURANCE_END: &str = "end-assurance";

/// One supported directed relation kind.
///
/// Kind support defines parser grammar only. A relation becomes canonical
/// only when an exact record is admitted to the reviewed relation sidecar.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum RelationKind {
    CharacterizesConsequenceFor,
    ConstrainsFeasibilityOf,
    ContributesCriterionTo,
    DependsOn,
    DelegatesAuthorityTo,
    DerivedFrom,
    Feeds,
    ProvidesTo,
    QualifiesEvaluationOf,
    QualifiesOutcomeScopeOf,
    SatisfiesObligation,
}

impl RelationKind {
    fn parse(value: &str) -> Result<Self, String> {
        match value {
            "characterizes-consequence-for" => Ok(Self::CharacterizesConsequenceFor),
            "constrains-feasibility-of" => Ok(Self::ConstrainsFeasibilityOf),
            "contributes-criterion-to" => Ok(Self::ContributesCriterionTo),
            "depends-on" => Ok(Self::DependsOn),
            "delegates-authority-to" => Ok(Self::DelegatesAuthorityTo),
            "derived-from" => Ok(Self::DerivedFrom),
            "feeds" => Ok(Self::Feeds),
            "provides-to" => Ok(Self::ProvidesTo),
            "qualifies-evaluation-of" => Ok(Self::QualifiesEvaluationOf),
            "qualifies-outcome-scope-of" => Ok(Self::QualifiesOutcomeScopeOf),
            "satisfies-obligation" => Ok(Self::SatisfiesObligation),
            _ => Err(format!("unknown relation kind `{value}`")),
        }
    }

    /// Returns the canonical identifier.
    #[must_use]
    pub const fn id(self) -> &'static str {
        match self {
            Self::CharacterizesConsequenceFor => "characterizes-consequence-for",
            Self::ConstrainsFeasibilityOf => "constrains-feasibility-of",
            Self::ContributesCriterionTo => "contributes-criterion-to",
            Self::DependsOn => "depends-on",
            Self::DelegatesAuthorityTo => "delegates-authority-to",
            Self::DerivedFrom => "derived-from",
            Self::Feeds => "feeds",
            Self::ProvidesTo => "provides-to",
            Self::QualifiesEvaluationOf => "qualifies-evaluation-of",
            Self::QualifiesOutcomeScopeOf => "qualifies-outcome-scope-of",
            Self::SatisfiesObligation => "satisfies-obligation",
        }
    }

    fn required_qualifiers(self) -> &'static [&'static str] {
        match self {
            Self::CharacterizesConsequenceFor => &[
                "affected-entity",
                "consequence-basis",
                "control-state",
                "horizon",
                "scenario",
            ],
            Self::ConstrainsFeasibilityOf => &[
                "applicability",
                "authority",
                "effective-period",
                "hard-or-soft",
                "version",
            ],
            Self::ContributesCriterionTo => &[
                "basis",
                "desired-direction",
                "horizon",
                "owner",
                "unit-or-scale",
                "value-sense",
            ],
            Self::DependsOn | Self::Feeds => &["condition"],
            Self::DelegatesAuthorityTo => &["authority", "retained-responsibility"],
            Self::DerivedFrom => &["method"],
            Self::ProvidesTo => &["target-system"],
            Self::QualifiesEvaluationOf => &[
                "claim",
                "horizon",
                "limitation",
                "outcome",
                "population",
                "provenance",
            ],
            Self::QualifiesOutcomeScopeOf => &[
                "causal-status",
                "contrast",
                "horizon",
                "outcome",
                "population",
            ],
            Self::SatisfiesObligation => &["applicability", "obligation-version"],
        }
    }
}

/// One stable directed edge template over canonical reference artifacts.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct RelationRecord {
    id: String,
    kind: RelationKind,
    source: String,
    target: String,
    scope: String,
    qualifiers: BTreeMap<String, String>,
    source_path: String,
}

impl RelationRecord {
    #[must_use]
    pub fn id(&self) -> &str {
        &self.id
    }

    #[must_use]
    pub const fn kind(&self) -> RelationKind {
        self.kind
    }

    #[must_use]
    pub fn source(&self) -> &str {
        &self.source
    }

    #[must_use]
    pub fn target(&self) -> &str {
        &self.target
    }

    #[must_use]
    pub fn scope(&self) -> &str {
        &self.scope
    }

    #[must_use]
    pub fn qualifiers(&self) -> &BTreeMap<String, String> {
        &self.qualifiers
    }

    #[must_use]
    pub fn source_path(&self) -> &str {
        &self.source_path
    }
}

/// Canonical relation sidecar for the bounded compatibility prototype.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct RelationManifest {
    relations: Vec<RelationRecord>,
}

impl RelationManifest {
    /// Parses exact canonical relation-sidecar text.
    ///
    /// # Errors
    ///
    /// Returns an error for noncanonical transport, grammar, identifiers,
    /// ordering, relation kinds, or qualifier contracts.
    pub fn parse(input: &str) -> Result<Self, String> {
        let lines = canonical_lines(input)?;
        if lines.first() != Some(&RELATION_HEADER) || lines.last() != Some(&RELATION_END) {
            return Err("expected factorium-relations-v0 document".to_owned());
        }
        let mut relations = Vec::new();
        for (index, line) in lines[1..lines.len() - 1].iter().enumerate() {
            let fields = record_fields(line, "relation ", 7, index + 2)?;
            validate_id(fields[0], "relation ID")?;
            let kind = RelationKind::parse(fields[1])?;
            validate_artifact_ref(fields[2], false)?;
            validate_artifact_ref(fields[3], false)?;
            validate_artifact_ref(fields[4], false)?;
            let qualifiers = parse_qualifiers(fields[5])?;
            let observed = qualifiers.keys().map(String::as_str).collect::<Vec<_>>();
            if observed != kind.required_qualifiers() {
                return Err(format!(
                    "relation `{}` qualifiers {:?}; expected {:?}",
                    fields[0],
                    observed,
                    kind.required_qualifiers()
                ));
            }
            validate_path(fields[6])?;
            relations.push(RelationRecord {
                id: fields[0].to_owned(),
                kind,
                source: fields[2].to_owned(),
                target: fields[3].to_owned(),
                scope: fields[4].to_owned(),
                qualifiers,
                source_path: fields[6].to_owned(),
            });
        }
        validate_sorted_unique(relations.iter().map(RelationRecord::id), "relation IDs")?;
        Ok(Self { relations })
    }

    #[must_use]
    pub fn relations(&self) -> &[RelationRecord] {
        &self.relations
    }

    #[must_use]
    pub fn canonical_text(&self) -> String {
        let mut output = String::from(RELATION_HEADER);
        output.push('\n');
        for relation in &self.relations {
            let qualifiers = relation
                .qualifiers
                .iter()
                .map(|(key, value)| format!("{key}={value}"))
                .collect::<Vec<_>>()
                .join(",");
            writeln!(
                output,
                "relation {} | {} | {} | {} | {} | {} | {}",
                relation.id,
                relation.kind.id(),
                relation.source,
                relation.target,
                relation.scope,
                qualifiers,
                relation.source_path
            )
            .expect("writing to String cannot fail");
        }
        output.push_str(RELATION_END);
        output.push('\n');
        output
    }

    #[must_use]
    pub fn sha256(&self) -> String {
        sha256_hex(self.canonical_text().as_bytes())
    }

    /// Validates all canonical references and source paths against V0.
    ///
    /// # Errors
    ///
    /// Returns an error when an endpoint or scope does not resolve, a source
    /// path is missing, or one of the six admitted prototype kinds is absent.
    pub fn validate_workspace(&self, corpus: &ReferenceCorpus, root: &Path) -> Result<(), String> {
        for relation in &self.relations {
            resolve_artifact(corpus, &relation.source)?;
            resolve_artifact(corpus, &relation.target)?;
            resolve_artifact(corpus, &relation.scope)?;
            resolve_file(root, &relation.source_path)?;
        }
        // Parser-supported candidate kinds are intentionally absent here.
        // Workspace validation requires only kinds with admitted F1-F6 records.
        for kind in [
            RelationKind::DependsOn,
            RelationKind::DelegatesAuthorityTo,
            RelationKind::DerivedFrom,
            RelationKind::Feeds,
            RelationKind::ProvidesTo,
            RelationKind::SatisfiesObligation,
        ] {
            if !self.relations.iter().any(|relation| relation.kind == kind) {
                return Err(format!("prototype lacks `{}` relation", kind.id()));
            }
        }
        Ok(())
    }

    /// Returns directed edges of one kind whose target is the selected artifact.
    #[must_use]
    pub fn incoming(&self, kind: RelationKind, target: &str) -> Vec<&RelationRecord> {
        self.relations
            .iter()
            .filter(|relation| relation.kind == kind && relation.target == target)
            .collect()
    }

    /// Returns directed edges of one kind whose source is the selected artifact.
    #[must_use]
    pub fn outgoing(&self, kind: RelationKind, source: &str) -> Vec<&RelationRecord> {
        self.relations
            .iter()
            .filter(|relation| relation.kind == kind && relation.source == source)
            .collect()
    }
}

/// One exact review binding for a canonical artifact.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ReviewBinding {
    artifact: String,
    source_sha256: String,
    review_path: String,
    status: String,
    date: String,
}

impl ReviewBinding {
    #[must_use]
    pub fn artifact(&self) -> &str {
        &self.artifact
    }
}

/// Canonical assurance sidecar binding reviews to exact source bytes.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct AssuranceManifest {
    header: String,
    bindings: Vec<ReviewBinding>,
}

impl AssuranceManifest {
    /// Parses exact canonical assurance-sidecar text.
    ///
    /// # Errors
    ///
    /// Returns an error for noncanonical transport, grammar, ordering,
    /// artifact references, digests, statuses, or dates.
    pub fn parse(input: &str) -> Result<Self, String> {
        let lines = canonical_lines(input)?;
        let header = match lines.first().copied() {
            Some(ASSURANCE_HEADER_V0) => ASSURANCE_HEADER_V0,
            Some(ASSURANCE_HEADER_V1) => ASSURANCE_HEADER_V1,
            _ => {
                return Err(
                    "expected factorium-assurance-v0 or factorium-assurance-v1 document".to_owned(),
                )
            }
        };
        if lines.last() != Some(&ASSURANCE_END) {
            return Err("expected end-assurance record".to_owned());
        }
        let mut bindings = Vec::new();
        for (index, line) in lines[1..lines.len() - 1].iter().enumerate() {
            let fields = record_fields(line, "review ", 5, index + 2)?;
            validate_artifact_ref(fields[0], true)?;
            validate_sha256(fields[1])?;
            validate_path(fields[2])?;
            if fields[3] != "fixed-point" {
                return Err(format!(
                    "line {}: review status must be `fixed-point`",
                    index + 2
                ));
            }
            validate_date(fields[4])?;
            bindings.push(ReviewBinding {
                artifact: fields[0].to_owned(),
                source_sha256: fields[1].to_owned(),
                review_path: fields[2].to_owned(),
                status: fields[3].to_owned(),
                date: fields[4].to_owned(),
            });
        }
        validate_sorted_unique(
            bindings.iter().map(ReviewBinding::artifact),
            "review artifacts",
        )?;
        Ok(Self {
            header: header.to_owned(),
            bindings,
        })
    }

    #[must_use]
    pub fn bindings(&self) -> &[ReviewBinding] {
        &self.bindings
    }

    #[must_use]
    pub fn canonical_text(&self) -> String {
        let mut output = self.header.clone();
        output.push('\n');
        for binding in &self.bindings {
            writeln!(
                output,
                "review {} | {} | {} | {} | {}",
                binding.artifact,
                binding.source_sha256,
                binding.review_path,
                binding.status,
                binding.date
            )
            .expect("writing to String cannot fail");
        }
        output.push_str(ASSURANCE_END);
        output.push('\n');
        output
    }

    #[must_use]
    pub fn sha256(&self) -> String {
        sha256_hex(self.canonical_text().as_bytes())
    }

    /// Validates coverage, source digests, and fixed-point review records.
    ///
    /// # Errors
    ///
    /// Returns an error for missing relation coverage, unknown artifacts,
    /// stale source digests, missing files, or review records without explicit
    /// fixed-point closure.
    pub fn validate_workspace(
        &self,
        corpus: &ReferenceCorpus,
        relations: &RelationManifest,
        relation_manifest_path: &str,
        root: &Path,
    ) -> Result<(), String> {
        let relation_ids = relations
            .relations
            .iter()
            .map(RelationRecord::id)
            .collect::<HashSet<_>>();
        let covered = self
            .bindings
            .iter()
            .map(ReviewBinding::artifact)
            .collect::<BTreeSet<_>>();
        let expected = corpus
            .entries()
            .iter()
            .map(|entry| format!("entry:{}", entry.id()))
            .chain(
                corpus
                    .views()
                    .iter()
                    .map(|view| format!("view:{}", view.id())),
            )
            .chain(
                relations
                    .relations
                    .iter()
                    .map(|relation| format!("relation:{}", relation.id())),
            )
            .collect::<BTreeSet<_>>();
        let missing = expected
            .iter()
            .filter(|artifact| !covered.contains(artifact.as_str()))
            .cloned()
            .collect::<Vec<_>>();
        if !missing.is_empty() {
            return Err(format!("missing review bindings: {}", missing.join(", ")));
        }
        for binding in &self.bindings {
            let source_path = if let Some(id) = binding.artifact.strip_prefix("entry:") {
                corpus
                    .entries()
                    .iter()
                    .find(|entry| entry.id() == id)
                    .ok_or_else(|| format!("unknown entry `{id}`"))?
                    .source_path()
            } else if let Some(id) = binding.artifact.strip_prefix("view:") {
                corpus
                    .views()
                    .iter()
                    .find(|view| view.id() == id)
                    .ok_or_else(|| format!("unknown view `{id}`"))?
                    .source_path()
            } else if let Some(id) = binding.artifact.strip_prefix("relation:") {
                if !relation_ids.contains(id) {
                    return Err(format!("unknown relation `{id}`"));
                }
                relation_manifest_path
            } else {
                return Err(format!(
                    "unsupported review artifact `{}`",
                    binding.artifact
                ));
            };
            let source = resolve_file(root, source_path)?;
            let observed = sha256_hex(
                &fs::read(&source).map_err(|error| format!("{}: {error}", source.display()))?,
            );
            if observed != binding.source_sha256 {
                return Err(format!(
                    "stale review for `{}`: source digest {} != {}",
                    binding.artifact, observed, binding.source_sha256
                ));
            }
            let review = resolve_file(root, &binding.review_path)?;
            let review_text = fs::read_to_string(&review)
                .map_err(|error| format!("{}: {error}", review.display()))?;
            if !review_text.contains("Status: fixed point") {
                return Err(format!(
                    "{} does not declare fixed-point status",
                    review.display()
                ));
            }
        }
        Ok(())
    }
}

fn canonical_lines(input: &str) -> Result<Vec<&str>, String> {
    if input.starts_with('\u{feff}') || input.contains('\r') || !input.ends_with('\n') {
        return Err("sidecar must be UTF-8, LF-only, and end with LF".to_owned());
    }
    let lines = input[..input.len() - 1].split('\n').collect::<Vec<_>>();
    if lines.iter().any(|line| {
        line.is_empty() || line.trim() != *line || line.contains("  ") || line.contains('\t')
    }) {
        return Err("sidecar contains a noncanonical line".to_owned());
    }
    Ok(lines)
}

fn record_fields<'a>(
    line: &'a str,
    prefix: &str,
    expected: usize,
    line_number: usize,
) -> Result<Vec<&'a str>, String> {
    let body = line
        .strip_prefix(prefix)
        .ok_or_else(|| format!("line {line_number}: expected `{prefix}` record"))?;
    let fields = body.split(" | ").collect::<Vec<_>>();
    if fields.len() != expected || fields.iter().any(|field| field.is_empty()) {
        return Err(format!("line {line_number}: malformed `{prefix}` record"));
    }
    Ok(fields)
}

fn parse_qualifiers(value: &str) -> Result<BTreeMap<String, String>, String> {
    let mut qualifiers = BTreeMap::new();
    for pair in value.split(',') {
        let (key, item) = pair
            .split_once('=')
            .ok_or_else(|| format!("invalid qualifier `{pair}`"))?;
        validate_id(key, "qualifier key")?;
        validate_id(item, "qualifier value")?;
        if qualifiers.insert(key.to_owned(), item.to_owned()).is_some() {
            return Err(format!("duplicate qualifier `{key}`"));
        }
    }
    let canonical = qualifiers
        .iter()
        .map(|(key, item)| format!("{key}={item}"))
        .collect::<Vec<_>>()
        .join(",");
    if canonical != value {
        return Err("qualifiers must be sorted canonically".to_owned());
    }
    Ok(qualifiers)
}

fn validate_artifact_ref(value: &str, assurance: bool) -> Result<(), String> {
    let (kind, identifier) = value
        .split_once(':')
        .ok_or_else(|| format!("invalid artifact reference `{value}`"))?;
    let allowed = if assurance {
        ["entry", "view", "relation"].as_slice()
    } else {
        ["entry", "sense", "factor", "view"].as_slice()
    };
    if !allowed.contains(&kind) {
        return Err(format!("unsupported artifact reference `{value}`"));
    }
    for part in identifier.split('/') {
        validate_id(part, "artifact identifier")?;
    }
    let parts = identifier.split('/').count();
    if matches!(kind, "sense" | "factor") != (parts == 2) {
        return Err(format!("invalid qualified artifact reference `{value}`"));
    }
    Ok(())
}

fn resolve_artifact(corpus: &ReferenceCorpus, value: &str) -> Result<(), String> {
    let (kind, identifier) = value.split_once(':').expect("validated artifact reference");
    match kind {
        "entry" => corpus
            .entries()
            .iter()
            .any(|entry| entry.id() == identifier),
        "view" => corpus.views().iter().any(|view| view.id() == identifier),
        "sense" | "factor" => {
            let (entry_id, local_id) = identifier.split_once('/').expect("qualified reference");
            corpus.entries().iter().any(|entry| {
                entry.id() == entry_id
                    && if kind == "sense" {
                        entry.senses().iter().any(|sense| sense.id() == local_id)
                    } else {
                        entry.factors().iter().any(|factor| factor.id() == local_id)
                    }
            })
        }
        _ => false,
    }
    .then_some(())
    .ok_or_else(|| format!("unknown canonical artifact `{value}`"))
}

fn validate_sorted_unique<'a>(
    values: impl Iterator<Item = &'a str>,
    label: &str,
) -> Result<(), String> {
    let values = values.collect::<Vec<_>>();
    if values.windows(2).any(|pair| pair[0] >= pair[1]) {
        return Err(format!("{label} must be strictly sorted and unique"));
    }
    Ok(())
}

fn validate_id(value: &str, label: &str) -> Result<(), String> {
    let valid = !value.is_empty()
        && value.bytes().enumerate().all(|(index, byte)| {
            byte.is_ascii_lowercase() || byte.is_ascii_digit() || (byte == b'-' && index > 0)
        })
        && !value.ends_with('-')
        && !value.contains("--")
        && value.as_bytes()[0].is_ascii_lowercase();
    if valid {
        Ok(())
    } else {
        Err(format!("invalid {label} `{value}`"))
    }
}

fn validate_path(value: &str) -> Result<(), String> {
    let path = Path::new(value);
    if value.contains('\\')
        || value.contains("..")
        || path.is_absolute()
        || path.extension() != Some(OsStr::new("md"))
    {
        return Err(format!(
            "invalid repository-relative Markdown path `{value}`"
        ));
    }
    Ok(())
}

fn validate_sha256(value: &str) -> Result<(), String> {
    if value.len() == 64
        && value
            .bytes()
            .all(|byte| byte.is_ascii_digit() || (b'a'..=b'f').contains(&byte))
    {
        Ok(())
    } else {
        Err(format!("invalid SHA-256 `{value}`"))
    }
}

fn validate_date(value: &str) -> Result<(), String> {
    let bytes = value.as_bytes();
    if bytes.len() == 10
        && bytes[4] == b'-'
        && bytes[7] == b'-'
        && bytes
            .iter()
            .enumerate()
            .all(|(index, byte)| matches!(index, 4 | 7) || byte.is_ascii_digit())
    {
        Ok(())
    } else {
        Err(format!("invalid review date `{value}`"))
    }
}

fn resolve_file(root: &Path, relative: &str) -> Result<PathBuf, String> {
    let path = root.join(relative);
    if !path.is_file() {
        return Err(format!("{} is not a file", path.display()));
    }
    Ok(path)
}

fn sha256_hex(bytes: &[u8]) -> String {
    format!("{:x}", Sha256::digest(bytes))
}

#[cfg(test)]
mod tests {
    use super::*;

    const RELATIONS: &str = concat!(
        "factorium-relations-v0\n",
        "relation f1-dependency-interface | depends-on | factor:system-composition-dependency/dependency-source-target-and-direction | factor:system-composition-dependency/interfaces-and-interaction-contracts | view:constraint-system-composition-integrity | condition=required-interaction | tables/constraints/system-composition-integrity.md\n",
        "relation f2-delegation-authority | delegates-authority-to | factor:organization-role-authority/delegation-source-scope-and-limits | factor:organization-role-authority/decision-rights-and-resource-authority | view:mapping-organizational-assignment-semantics | authority=delegated-decision-rights,retained-responsibility=delegator-oversight | tables/mappings/organizational-assignment-semantics.md\n",
        "relation f3-inference-observation | derived-from | factor:claim-evidence/inference-rule-and-assumptions | factor:claim-evidence/observation-or-result | view:evidence-observation-inference-chain | method=declared-inference-rule | tables/evidence/observation-inference-chain.md\n",
        "relation f4-feedback-monitoring | feeds | factor:control-monitoring-response/outcome-measures-and-time-horizon | factor:control-monitoring-response/monitoring-method-window-and-frequency | view:diagnostic-control-response-failures | condition=observed-effect | tables/diagnostics/control-response-failures.md\n",
        "relation f5-service-interface | provides-to | factor:software-module-service-resource/owned-declarations-capability-or-subject | factor:software-module-service-resource/public-interface-and-visibility | view:mapping-software-architecture-mechanisms | target-system=bounded-service-interface | tables/mappings/software-architecture-mechanisms.md\n",
        "relation f6-evidence-obligation | satisfies-obligation | factor:governance-obligation-compliance/evidence-monitoring-and-assessment-criteria | factor:governance-obligation-compliance/obligation-sources-and-required-conduct | view:mapping-governance-compliance-mechanisms | applicability=selected-obligation-set,obligation-version=effective-version | tables/mappings/governance-compliance-mechanisms.md\n",
        "end-relations\n"
    );

    #[test]
    fn relation_sidecar_round_trips_and_covers_six_kinds() {
        let manifest = RelationManifest::parse(RELATIONS).unwrap();
        assert_eq!(manifest.canonical_text(), RELATIONS);
        assert_eq!(manifest.relations().len(), 6);
        assert_eq!(
            manifest
                .incoming(
                    RelationKind::DependsOn,
                    "factor:system-composition-dependency/interfaces-and-interaction-contracts"
                )
                .len(),
            1
        );
        assert_eq!(
            manifest
                .outgoing(
                    RelationKind::SatisfiesObligation,
                    "factor:governance-obligation-compliance/evidence-monitoring-and-assessment-criteria"
                )
                .len(),
            1
        );
    }

    #[test]
    fn relation_sidecar_rejects_missing_required_qualifier() {
        let invalid = RELATIONS.replace("condition=required-interaction", "method=wrong");
        assert!(RelationManifest::parse(&invalid)
            .unwrap_err()
            .contains("qualifiers"));
    }

    #[test]
    fn assurance_sidecar_rejects_noncanonical_status() {
        let input = concat!(
            "factorium-assurance-v0\n",
            "review entry:claim-evidence | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa | review.md | pass | 2026-08-14\n",
            "end-assurance\n"
        );
        assert!(AssuranceManifest::parse(input)
            .unwrap_err()
            .contains("fixed-point"));
    }

    #[test]
    fn assurance_v1_header_round_trips() {
        let input = concat!(
            "factorium-assurance-v1\n",
            "review entry:claim-evidence | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa | review.md | fixed-point | 2026-08-18\n",
            "end-assurance\n"
        );
        let manifest = AssuranceManifest::parse(input).expect("V1 assurance should parse");
        assert_eq!(manifest.canonical_text(), input);
    }

    #[test]
    fn assurance_rejects_unsupported_revision() {
        let input = "factorium-assurance-v2\nend-assurance\n";
        assert!(AssuranceManifest::parse(input)
            .unwrap_err()
            .contains("expected factorium-assurance-v0 or factorium-assurance-v1"));
    }
}
