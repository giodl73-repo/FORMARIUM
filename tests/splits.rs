use factor::corpus::{fixture_summary, generate_corpora, generate_splits, CorpusFamily, SplitKind};

#[test]
fn corpus_families_are_materially_distinct_and_group_surfaces() {
    let corpora = generate_corpora();
    let navigation = corpora
        .iter()
        .find(|corpus| corpus.family() == CorpusFamily::Navigation)
        .unwrap();
    let event = corpora
        .iter()
        .find(|corpus| corpus.family() == CorpusFamily::Event)
        .unwrap();

    assert_eq!(navigation.meanings().len(), 64);
    assert_eq!(navigation.surface_count(), 64);
    assert_eq!(event.meanings().len(), 256);
    assert_eq!(event.surface_count(), 512);
    assert!(event
        .meanings()
        .iter()
        .any(|meaning| meaning.ordinals()[0] == meaning.ordinals()[2]));
    assert!(event
        .meanings()
        .iter()
        .all(|meaning| meaning.surfaces().len() == 2));
}

#[test]
fn split_suite_has_expected_shapes_and_transfer_boundary() {
    let splits = generate_splits().unwrap();
    assert_eq!(splits.len(), 7);
    for split in &splits {
        assert!(!split.train().is_empty());
        assert!(!split.test().is_empty());
        assert_eq!(split.sha256().len(), 64);
        assert_eq!(
            split.meaning_overlap_allowed(),
            split.kind() == SplitKind::TemplateTransfer
        );
    }
}

#[test]
fn summary_is_canonical_and_stable() {
    let first = fixture_summary().unwrap();
    let second = fixture_summary().unwrap();
    assert_eq!(first, second);
    assert_eq!(
        first,
        concat!(
            "factor-fixture-summary-v1\n",
            "corpus navigation meanings 64 surfaces 64 schema_sha256 232366d68e94058537406887b36a913240a1cd0be2d0e385b2ab0d3a0da242ad corpus_sha256 696791b9f97813a2aaaa82f13110b2f1f84f112eeab0ad81459aef6c40ac434d\n",
            "corpus event meanings 256 surfaces 512 schema_sha256 e08e855f6b1ed694fae03869b9c6677183d35af22b04952a797ba684b8190f67 corpus_sha256 265c89401a76905ff59f7f5992e68e1169ed2c84784d8baea45b3820a4ecfbec\n",
            "split navigation iid train 48 test 16 overlap false split_sha256 71b44d2019b82f77537bcef382c6b9d98fb7a40db0825552b439ab772df57fa0\n",
            "split navigation lexical train 60 test 4 overlap false split_sha256 e7d797a7b0dc816dbb1de01b33b2842e06d4b986113d6ba4a7f1ccc0550f6e5e\n",
            "split navigation cross-feature train 56 test 8 overlap false split_sha256 a193436f03780d13a8c521277a952e4d484b097cfd9985b151180a8dffd871da\n",
            "split event iid train 384 test 128 overlap false split_sha256 d827912287c5b039f0f9bb69866f223562c0e1d0e7ab77751bcaa4608edadd7d\n",
            "split event lexical train 496 test 16 overlap false split_sha256 ce2e826f349a0b1634cf37cea760fcc5eedd6c6e559c488ee237d5d29596e109\n",
            "split event cross-feature train 480 test 32 overlap false split_sha256 4a7fdca8f28bb2eda8ae014aecd985a662a0a887a6672ad7b32fcf48a9133661\n",
            "split event template-transfer train 256 test 256 overlap true split_sha256 2cf485f1de1f9c1ebba040f72b821934e2e76bcdb7dc0404e7b72b967f94b5d7\n",
        )
    );
}
