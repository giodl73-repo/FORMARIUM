use formarium::binding::{binding_control_summary, run_binding_controls, BindingRepresentation};
use formarium::role_fixtures::RoleFixtureFamily;

#[test]
fn exact_binding_controls_round_trip_all_meanings() {
    let report = run_binding_controls();
    for record in report.records.iter().filter(|record| {
        matches!(
            record.representation,
            BindingRepresentation::TypedRecord
                | BindingRepresentation::SparseTpr
                | BindingRepresentation::FactoredOneHot
                | BindingRepresentation::FactoredDense
        )
    }) {
        assert!(record.is_perfect());
    }
}

#[test]
fn all_frozen_hrr_dimensions_are_retained() {
    let report = run_binding_controls();
    for family in [RoleFixtureFamily::Transfer, RoleFixtureFamily::Attachment] {
        for representation in [
            BindingRepresentation::Hrr64,
            BindingRepresentation::Hrr128,
            BindingRepresentation::Hrr256,
        ] {
            let record = report
                .records
                .iter()
                .find(|record| record.family == family && record.representation == representation)
                .unwrap();
            assert!(record.role_correct > 0);
            assert_eq!(
                record.accounting.dimensions,
                match representation {
                    BindingRepresentation::Hrr64 => 64,
                    BindingRepresentation::Hrr128 => 128,
                    BindingRepresentation::Hrr256 => 256,
                    _ => unreachable!(),
                }
            );
        }
    }
}

#[test]
fn binding_summary_is_deterministic() {
    let first = binding_control_summary();
    let second = binding_control_summary();
    assert_eq!(first, second);
    assert_eq!(
        first,
        concat!(
            "factor-binding-controls-v1\n",
            "hrr_seed 464143544f522d32\n",
            "hrr_dimensions 64 128 256\n",
            "hrr_decision_owner 256\n",
            "hrr_binding circular-convolution\n",
            "hrr_unbinding involution\n",
            "hrr_cleanup nearest-cosine-domain\n",
            "runtime descriptive-excluded\n",
            "record transfer typed-record exact 512/512 roles 2048/2048 logical_bits 9 dimensions 4 container_bytes 8 metadata_bytes 497 parameter_bits 0 temporary_bytes 8\n",
            "record transfer sparse-tpr exact 512/512 roles 2048/2048 logical_bits 9 dimensions 24 container_bytes 16 metadata_bytes 497 parameter_bits 0 temporary_bytes 16\n",
            "record transfer factored-one-hot exact 512/512 roles 2048/2048 logical_bits 9 dimensions 14 container_bytes 2 metadata_bytes 505 parameter_bits 0 temporary_bytes 2\n",
            "record transfer factored-dense exact 512/512 roles 2048/2048 logical_bits 9 dimensions 16 container_bytes 16 metadata_bytes 505 parameter_bits 448 temporary_bytes 16\n",
            "record transfer hrr-64 exact 452/512 roles 1988/2048 logical_bits 9 dimensions 64 container_bytes 512 metadata_bytes 497 parameter_bits 40960 temporary_bytes 3072\n",
            "record transfer hrr-128 exact 512/512 roles 2048/2048 logical_bits 9 dimensions 128 container_bytes 1024 metadata_bytes 497 parameter_bits 81920 temporary_bytes 6144\n",
            "record transfer hrr-256 exact 512/512 roles 2048/2048 logical_bits 9 dimensions 256 container_bytes 2048 metadata_bytes 497 parameter_bits 163840 temporary_bytes 12288\n",
            "record attachment typed-record exact 128/128 roles 512/512 logical_bits 9 dimensions 4 container_bytes 8 metadata_bytes 627 parameter_bits 0 temporary_bytes 8\n",
            "record attachment sparse-tpr exact 128/128 roles 512/512 logical_bits 9 dimensions 28 container_bytes 16 metadata_bytes 627 parameter_bits 0 temporary_bytes 16\n",
            "record attachment factored-one-hot exact 128/128 roles 512/512 logical_bits 9 dimensions 14 container_bytes 2 metadata_bytes 635 parameter_bits 0 temporary_bytes 2\n",
            "record attachment factored-dense exact 128/128 roles 512/512 logical_bits 9 dimensions 16 container_bytes 16 metadata_bytes 635 parameter_bits 448 temporary_bytes 16\n",
            "record attachment hrr-64 exact 120/128 roles 504/512 logical_bits 9 dimensions 64 container_bytes 512 metadata_bytes 627 parameter_bits 45056 temporary_bytes 3072\n",
            "record attachment hrr-128 exact 128/128 roles 512/512 logical_bits 9 dimensions 128 container_bytes 1024 metadata_bytes 627 parameter_bits 90112 temporary_bytes 6144\n",
            "record attachment hrr-256 exact 128/128 roles 512/512 logical_bits 9 dimensions 256 container_bytes 2048 metadata_bytes 627 parameter_bits 180224 temporary_bytes 12288\n",
            "binding_sha256 a6c19ea8a47c5de0b343b5de6800b62e1471195833898ba3444131740eb62137\n",
        )
    );
}
