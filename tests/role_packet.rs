use lexicon::role_packet::{build_role_packet, validate_role_packet, write_role_packet};
use std::fs;
use std::time::{SystemTime, UNIX_EPOCH};

#[test]
fn role_packet_round_trips_through_the_filesystem() {
    let nonce = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_nanos();
    let root = std::env::temp_dir().join(format!("factor-role-packet-{nonce}"));
    let packet = write_role_packet(&root).unwrap();
    assert_eq!(validate_role_packet(&root).unwrap(), packet.sha256());
    fs::remove_dir_all(root).unwrap();
}

#[test]
fn role_packet_contains_frozen_wave_two_evidence() {
    let packet = build_role_packet().unwrap();
    assert_eq!(packet.files().len(), 19);
    assert_eq!(packet.sha256().len(), 64);
    assert!(packet.manifest().contains("analysis transfer "));
    assert!(packet.manifest().contains("result role-ambiguity "));
}

#[test]
fn committed_role_packet_identity_is_frozen() {
    let release = std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("artifacts")
        .join("factor-role-v1");
    assert_eq!(
        validate_role_packet(&release).unwrap(),
        "99deb8e8276df63a368dac85e1cbc90095f20936eeb8126eb9100f8a825e441d"
    );
}

#[test]
fn role_packet_validation_rejects_unlisted_files() {
    let nonce = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_nanos();
    let root = std::env::temp_dir().join(format!("factor-role-packet-extra-{nonce}"));
    write_role_packet(&root).unwrap();
    fs::write(root.join("extra.txt"), "not listed\n").unwrap();
    assert!(validate_role_packet(&root).is_err());
    fs::remove_dir_all(root).unwrap();
}
