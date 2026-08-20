use lexicon::bakeoff::{run_bakeoff, Classification, Representation};
use lexicon::corpus::SplitKind;

#[test]
fn systematic_splits_separate_factor_reuse_from_whole_memorization() {
    let report = run_bakeoff().unwrap();
    for record in report
        .records
        .iter()
        .filter(|record| matches!(record.split, SplitKind::Lexical | SplitKind::CrossFeature))
    {
        match record.representation {
            Representation::WholeOneHot | Representation::WholeDense => {
                assert_eq!(record.test.exact, 0);
            }
            _ => assert_eq!(record.test.exact, record.test.total),
        }
    }
    assert_eq!(report.classification, Classification::SemanticOnly);
}

#[test]
fn template_transfer_is_not_mislabeled_as_unseen_meaning_generalization() {
    let report = run_bakeoff().unwrap();
    for record in report
        .records
        .iter()
        .filter(|record| record.split == SplitKind::TemplateTransfer)
    {
        assert_eq!(record.test.exact, record.test.total);
    }
}

#[test]
fn accounting_keeps_payload_container_metadata_and_parameters_separate() {
    let report = run_bakeoff().unwrap();
    let factored_dense = report
        .records
        .iter()
        .find(|record| record.representation == Representation::FactoredDense)
        .unwrap();
    let whole_dense = report
        .records
        .iter()
        .find(|record| record.representation == Representation::WholeDense)
        .unwrap();
    assert!(factored_dense.accounting.logical_payload_bits > 0);
    assert!(factored_dense.accounting.container_bytes > 0);
    assert!(factored_dense.accounting.metadata_bytes > 0);
    assert!(factored_dense.accounting.model_parameter_bits > 0);
    assert!(
        whole_dense.accounting.model_parameter_bits
            > factored_dense.accounting.model_parameter_bits
    );
}

#[test]
fn canonical_evidence_identity_is_frozen() {
    let report = run_bakeoff().unwrap();
    assert_eq!(
        report.sha256(),
        "5b90a6de6f86c9b7b844c9416c7a89fb08a4a5eed62f024a2cef036e96da0615"
    );
}
