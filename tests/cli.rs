use std::process::Command;

#[test]
fn check_command_reports_canonical_identity() {
    let output = Command::new(env!("CARGO_BIN_EXE_factor"))
        .args(["check", "fixtures/schemas/navigation.factor"])
        .output()
        .unwrap();
    assert!(output.status.success());
    let stdout = String::from_utf8(output.stdout).unwrap();
    assert!(stdout.contains("schema=navigation\n"));
    assert!(stdout.contains("logical_bits=6\n"));
    assert!(stdout.contains("schema_sha256="));
    assert!(stdout.contains("document_sha256="));
}

#[test]
fn check_command_rejects_invalid_fixture() {
    let output = Command::new(env!("CARGO_BIN_EXE_factor"))
        .args(["check", "fixtures/invalid/unknown-value.factor"])
        .output()
        .unwrap();
    assert!(!output.status.success());
    assert!(String::from_utf8(output.stderr)
        .unwrap()
        .contains("has no value"));
}
