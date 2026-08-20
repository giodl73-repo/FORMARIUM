use lexicon::role_fixtures::{
    generate_analysis_documents, generate_role_corpora, generate_role_splits, role_fixture_summary,
    RoleFixtureFamily, RoleSplitKind,
};

#[test]
fn repeated_fillers_and_ambiguous_candidate_sets_are_retained() {
    let corpora = generate_role_corpora();
    let transfer = corpora
        .iter()
        .find(|corpus| corpus.family() == RoleFixtureFamily::Transfer)
        .unwrap();
    assert!(transfer.meanings().iter().any(|meaning| {
        meaning.ordinals()[0] == meaning.ordinals()[2]
            && meaning.ordinals()[0] == meaning.ordinals()[3]
    }));

    let analyses = generate_analysis_documents().unwrap();
    let attachment = analyses
        .iter()
        .find(|document| document.family() == RoleFixtureFamily::Attachment)
        .unwrap();
    assert!(attachment
        .families()
        .iter()
        .all(|family| family.surfaces()[0].candidates().len() == 2));
    assert!(attachment.families().iter().all(|family| {
        family.surfaces()[1..]
            .iter()
            .all(|surface| surface.candidates().len() == 1)
    }));
}

#[test]
fn ordinary_splits_group_families_and_transfer_declares_overlap() {
    let splits = generate_role_splits().unwrap();
    assert_eq!(splits.len(), 6);
    for split in &splits {
        assert_eq!(
            split.candidate_overlap_allowed(),
            split.kind() == RoleSplitKind::SurfaceDisambiguation
        );
    }
}

#[test]
fn role_fixture_summary_is_deterministic() {
    let first = role_fixture_summary().unwrap();
    let second = role_fixture_summary().unwrap();
    assert_eq!(first, second);
    assert_eq!(
        first,
        concat!(
            "factor-role-fixture-summary-v1\n",
            "corpus transfer meanings 512 families 512 surfaces 1024 schema_sha256 f0e423d5edd701cc53deb28b2018008763edfb95226d50a95dee09806d65f0c3 frame_sha256 84dc96f04871dc217b6e9b53d28e9339748939e19fdfb2b23f9cea620c12c34b corpus_sha256 1f4b68f1f5328ea56a875aed9a8c0faf0f0d3c8f6b34346b6a935a0b26cb70ae analysis_sha256 9de41c2eb6a2c245482444a53df9543dc2470e728af77a8ce90ebd5f26d8abc8\n",
            "corpus attachment meanings 128 families 64 surfaces 192 schema_sha256 2ff4b23625d4e7f93f4d4c34fcd16a7465d5145e03237791bb79b9dbb9a58cc9 frame_sha256 9f6c4d824e29ec6b4dd172cfdde19e6e6e3ceaf2c24c5324a0339fbc00a7d6a8 corpus_sha256 ab39a250c0b2ede1194366a8cb789cad3f9917914941b386fbf9e35284d18f91 analysis_sha256 6f0f57c9e4d2286fd84241197e3f0c8a9bb8525d57ea23d60be325cda053a7d5\n",
            "split transfer iid train 768 test 256 overlap false split_sha256 63d4da23539fc9d7c2b0371b276da1c1f55ca6c2d4ac66d32619471749eb32cc\n",
            "split transfer slot-recombination train 992 test 32 overlap false split_sha256 f60b0dae9e8f0bfa05e58006f5d2b6895cd0a4a839898ea4a6e88161ca43ffab\n",
            "split transfer shared-filler train 992 test 32 overlap false split_sha256 2a77a59824a6edf6acf11abfc6945221e554dd39c008788ee0a04186c6de1418\n",
            "split attachment iid train 144 test 48 overlap false split_sha256 fc9274921331a18b8c569f7051dc4dce98331ed38ce40e7503891368ab08cffb\n",
            "split attachment object-recombination train 180 test 12 overlap false split_sha256 3f04cd73af3c8aa9bdde3ee1e3cf82b1852dcad1b351f860691517fde65ffea0\n",
            "split attachment surface-disambiguation train 128 test 64 overlap true split_sha256 f8b89f28e60352d326c0dd54fd5cd712894fd1af3a290f10050369a4816c02cd\n",
        )
    );
}
