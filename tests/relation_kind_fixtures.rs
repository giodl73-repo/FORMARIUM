use factor::{
    reference::ReferenceCorpus,
    reference_sidecar::{RelationKind, RelationManifest},
};
use std::{fs, path::Path};

#[test]
fn decision_evidence_kind_fixture_tracks_one_admitted_kind() {
    let path = "fixtures/relations/decision-evidence-relation-kinds.factorium";
    let text = fs::read_to_string(path).unwrap();
    let manifest = RelationManifest::parse(&text).unwrap();
    assert_eq!(manifest.canonical_text(), text);
    assert_eq!(manifest.relations().len(), 5);
    assert_eq!(
        manifest.relations()[0].kind(),
        RelationKind::QualifiesOutcomeScopeOf
    );
    assert_eq!(
        manifest.relations()[4].kind(),
        RelationKind::ContributesCriterionTo
    );

    let canonical = fs::read_to_string("reference/factorium-relations-v0.factorium").unwrap();
    let admitted = manifest
        .relations()
        .iter()
        .filter(|candidate| canonical.contains(candidate.id()))
        .map(factor::reference_sidecar::RelationRecord::id)
        .collect::<Vec<_>>();
    assert_eq!(admitted, ["f27-evidence-qualifies-evaluation"]);
}

#[test]
fn decision_evidence_kind_fixtures_fail_closed() {
    let cases = [
        (
            "decision-evidence-duplicate-qualifier.factorium",
            "duplicate qualifier",
        ),
        ("decision-evidence-extra-qualifier.factorium", "qualifiers"),
        (
            "decision-evidence-inverse-kind.factorium",
            "unknown relation kind",
        ),
        (
            "decision-evidence-missing-qualifier.factorium",
            "qualifiers",
        ),
        (
            "decision-evidence-noncanonical-order.factorium",
            "qualifiers must be sorted canonically",
        ),
    ];
    for (name, expected) in cases {
        let path = format!("fixtures/relations-invalid/{name}");
        let text = fs::read_to_string(&path).unwrap();
        let error = RelationManifest::parse(&text).unwrap_err();
        assert!(
            error.contains(expected),
            "{name}: expected `{expected}` in `{error}`"
        );
    }
}

#[test]
fn canonical_sidecar_admits_one_cross_entry_relation() {
    let text = fs::read_to_string("reference/factorium-relations-v0.factorium").unwrap();
    let manifest = RelationManifest::parse(&text).unwrap();
    assert_eq!(manifest.relations().len(), 7);
    assert_eq!(
        manifest.sha256(),
        "a0568473d52be46772148c13218ea0a2e693d4705966c04e8d3b0b0dc18084f6"
    );
}

#[test]
fn decision_evidence_fixture_endpoints_resolve_when_combined_for_validation() {
    let canonical = fs::read_to_string("reference/factorium-relations-v0.factorium").unwrap();
    let candidates =
        fs::read_to_string("fixtures/relations/decision-evidence-relation-kinds.factorium")
            .unwrap();
    let canonical_records = canonical
        .lines()
        .filter(|line| line.starts_with("relation "))
        .collect::<Vec<_>>();
    let canonical_ids = canonical_records
        .iter()
        .map(|line| line["relation ".len()..].split(" | ").next().unwrap())
        .collect::<Vec<_>>();
    let mut records = canonical_records
        .into_iter()
        .chain(candidates.lines().filter(|line| {
            line.starts_with("relation ")
                && !canonical_ids.contains(&line["relation ".len()..].split(" | ").next().unwrap())
        }))
        .collect::<Vec<_>>();
    records.sort_unstable();
    let combined = format!(
        "factorium-relations-v0\n{}\nend-relations\n",
        records.join("\n")
    );
    let manifest = RelationManifest::parse(&combined).unwrap();
    let corpus = ReferenceCorpus::parse(
        &fs::read_to_string("reference/factorium-reference-v0.factorium").unwrap(),
    )
    .unwrap();
    manifest
        .validate_workspace(&corpus, Path::new("."))
        .unwrap();
    assert_eq!(manifest.relations().len(), 11);
}
