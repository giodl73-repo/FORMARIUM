use lexicon::packet::{build_packet, validate_packet, write_packet};
use std::fs;
use std::time::{SystemTime, UNIX_EPOCH};

#[test]
fn packet_round_trips_through_the_filesystem() {
    let nonce = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_nanos();
    let root = std::env::temp_dir().join(format!("factor-packet-{nonce}"));
    let packet = write_packet(&root).unwrap();
    assert_eq!(validate_packet(&root).unwrap(), packet.sha256());
    fs::remove_dir_all(root).unwrap();
}

#[test]
fn committed_release_identity_is_frozen_while_new_producers_get_new_identities() {
    let packet = build_packet().unwrap();
    assert_eq!(packet.files().len(), 15);
    assert_eq!(packet.sha256().len(), 64);
    let release = std::path::Path::new(env!("CARGO_MANIFEST_DIR"))
        .join("artifacts")
        .join("factor-v1");
    assert_eq!(
        validate_packet(&release).unwrap(),
        "70190b6e53e8482b37a036f0945b095ac92235bb78333c27f42455c2b27010a9"
    );
}

#[test]
fn packet_validation_rejects_unlisted_files() {
    let nonce = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_nanos();
    let root = std::env::temp_dir().join(format!("factor-packet-extra-{nonce}"));
    write_packet(&root).unwrap();
    fs::write(root.join("extra.txt"), "not listed\n").unwrap();
    assert!(validate_packet(&root).is_err());
    fs::remove_dir_all(root).unwrap();
}
