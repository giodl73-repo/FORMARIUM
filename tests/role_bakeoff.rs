use lexicon::role_bakeoff::{
    role_bakeoff_summary, run_role_bakeoff, RoleBakeoffClassification, RoleBakeoffRepresentation,
};
use lexicon::role_fixtures::RoleSplitKind;

#[test]
fn systematic_splits_separate_role_reuse_from_whole_lookup() {
    let report = run_role_bakeoff();
    for record in report.records.iter().filter(|record| {
        matches!(
            record.split,
            RoleSplitKind::SlotRecombination
                | RoleSplitKind::SharedFiller
                | RoleSplitKind::ObjectRecombination
        )
    }) {
        match record.representation {
            RoleBakeoffRepresentation::WholeMeaning
            | RoleBakeoffRepresentation::WholeAnalysisSet => {
                assert_eq!(record.test.exact_sets, 0);
            }
            RoleBakeoffRepresentation::Hrr64 => {}
            _ => assert_eq!(record.test.exact_sets, record.test.total_sets),
        }
    }
}

#[test]
fn disambiguation_distinguishes_familiar_meanings_from_unseen_sets() {
    let report = run_role_bakeoff();
    let records = report
        .records
        .iter()
        .filter(|record| record.split == RoleSplitKind::SurfaceDisambiguation)
        .collect::<Vec<_>>();
    let whole_meaning = records
        .iter()
        .find(|record| record.representation == RoleBakeoffRepresentation::WholeMeaning)
        .unwrap();
    let whole_set = records
        .iter()
        .find(|record| record.representation == RoleBakeoffRepresentation::WholeAnalysisSet)
        .unwrap();
    assert_eq!(whole_meaning.test.exact_sets, whole_meaning.test.total_sets);
    assert_eq!(whole_set.test.exact_sets, 0);
}

#[test]
fn role_bakeoff_summary_is_deterministic() {
    let first = role_bakeoff_summary();
    let second = role_bakeoff_summary();
    assert_eq!(first, second);
    assert!(first.starts_with("factor-role-bakeoff-v1\n"));
    assert!(first.contains("classification semantic-only\n"));
    assert!(first.contains(
        "role_bakeoff_sha256 c23fa50ece30254d8a4d2e819d065cf26e7463f56569d4faa20a1b7fc38dae8d\n"
    ));
    assert_eq!(
        run_role_bakeoff().classification,
        RoleBakeoffClassification::SemanticOnly
    );
}
