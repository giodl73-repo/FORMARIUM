use lexicon::{PackedValueError, ParseErrorKind, SchemaDocument};

const NAVIGATION: &str = include_str!("../fixtures/schemas/navigation.factor");
const EVENT: &str = include_str!("../fixtures/schemas/event.factor");
const MISSING_FACTOR: &str = include_str!("../fixtures/invalid/missing-factor.factor");
const OUT_OF_ORDER: &str = include_str!("../fixtures/invalid/out-of-order.factor");
const UNKNOWN_VALUE: &str = include_str!("../fixtures/invalid/unknown-value.factor");
const DUPLICATE_VALUE: &str = include_str!("../fixtures/invalid/duplicate-value.factor");

#[test]
fn canonical_fixtures_round_trip_exactly() {
    for fixture in [NAVIGATION, EVENT] {
        let document = SchemaDocument::parse(fixture).unwrap();
        assert_eq!(document.canonical_text(), fixture.replace("\r\n", "\n"));
        assert_eq!(document.schema().sha256().len(), 64);
        assert_eq!(document.document_sha256().len(), 64);
        for meaning in document.meanings() {
            assert_eq!(
                document.schema().decode_packed(meaning.packed()).unwrap(),
                meaning.assignments()
            );
        }
    }
}

#[test]
fn invalid_fixtures_fail_for_the_declared_reason() {
    assert!(matches!(
        SchemaDocument::parse(MISSING_FACTOR).unwrap_err().kind(),
        ParseErrorKind::IncompleteMeaning { .. }
    ));
    assert!(matches!(
        SchemaDocument::parse(OUT_OF_ORDER).unwrap_err().kind(),
        ParseErrorKind::AssignmentOrder { .. }
    ));
    assert!(matches!(
        SchemaDocument::parse(UNKNOWN_VALUE).unwrap_err().kind(),
        ParseErrorKind::UnknownValue { .. }
    ));
    assert!(matches!(
        SchemaDocument::parse(DUPLICATE_VALUE).unwrap_err().kind(),
        ParseErrorKind::DuplicateValue { .. }
    ));
}

#[test]
fn packed_alias_rejects_unused_patterns() {
    let source = "factor-schema-v1\nschema triad version 1\nfactor value\nvalue a\nvalue b\nvalue c\nend-factor\n";
    let document = SchemaDocument::parse(source).unwrap();
    assert!(matches!(
        document.schema().decode_packed(3),
        Err(PackedValueError::UnusedOrdinal { .. })
    ));
}
