//! Deterministic semantic corpora and split manifests.

use crate::{sha256_hex, SchemaDocument};
use std::collections::{BTreeSet, HashMap, HashSet};
use std::error::Error;
use std::fmt::{self, Write as _};

const NAVIGATION_SCHEMA: &str = include_str!("../fixtures/schemas/navigation.factor");
const EVENT_SCHEMA: &str = include_str!("../fixtures/schemas/event.factor");

/// One generated corpus family.
#[derive(Clone, Copy, Debug, Eq, Hash, Ord, PartialEq, PartialOrd)]
pub enum CorpusFamily {
    /// Navigation commands over action, direction, manner, count, and polarity.
    Navigation,
    /// Transitive events with distinct agent and patient roles and two templates.
    Event,
}

impl CorpusFamily {
    /// Returns the canonical family identifier.
    #[must_use]
    pub const fn id(self) -> &'static str {
        match self {
            Self::Navigation => "navigation",
            Self::Event => "event",
        }
    }
}

/// One deterministic split design.
#[derive(Clone, Copy, Debug, Eq, Hash, Ord, PartialEq, PartialOrd)]
pub enum SplitKind {
    /// Deterministic semantic-ordinal 75/25 interpolation split.
    Iid,
    /// Hold selected combinations involving one familiar lexical value.
    Lexical,
    /// Hold a declared higher-order feature conjunction.
    CrossFeature,
    /// Train and test on different surfaces for the same event meanings.
    TemplateTransfer,
}

impl SplitKind {
    /// Returns the canonical split identifier.
    #[must_use]
    pub const fn id(self) -> &'static str {
        match self {
            Self::Iid => "iid",
            Self::Lexical => "lexical",
            Self::CrossFeature => "cross-feature",
            Self::TemplateTransfer => "template-transfer",
        }
    }
}

/// One complete generated semantic corpus.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Corpus {
    family: CorpusFamily,
    schema_sha256: String,
    meanings: Vec<CorpusMeaning>,
}

impl Corpus {
    /// Returns the corpus family.
    #[must_use]
    pub const fn family(&self) -> CorpusFamily {
        self.family
    }

    /// Returns the governing canonical schema identity.
    #[must_use]
    pub fn schema_sha256(&self) -> &str {
        &self.schema_sha256
    }

    /// Returns generated meanings in semantic ordinal order.
    #[must_use]
    pub fn meanings(&self) -> &[CorpusMeaning] {
        &self.meanings
    }

    /// Returns the total number of rendered surfaces.
    #[must_use]
    pub fn surface_count(&self) -> usize {
        self.meanings
            .iter()
            .map(|meaning| meaning.surfaces.len())
            .sum()
    }

    /// Returns canonical corpus custody text.
    #[must_use]
    pub fn canonical_text(&self) -> String {
        let mut output = format!(
            "factor-corpus-v1\nfamily {}\ngenerator exhaustive-cartesian-v1\nseed none\nschema_sha256 {}\nmeanings {}\nsurfaces {}\n",
            self.family.id(),
            self.schema_sha256,
            self.meanings.len(),
            self.surface_count()
        );
        for meaning in &self.meanings {
            output.push_str("meaning ");
            output.push_str(meaning.id());
            output.push_str(" ordinals");
            for ordinal in meaning.ordinals() {
                output.push(' ');
                output.push_str(&ordinal.to_string());
            }
            output.push('\n');
            for surface in meaning.surfaces() {
                output.push_str("surface ");
                output.push_str(surface.id());
                output.push_str(" template ");
                output.push_str(surface.template());
                output.push_str(" text_sha256 ");
                output.push_str(&surface.text_sha256());
                output.push('\n');
            }
            output.push_str("end-meaning\n");
        }
        output
    }

    /// Returns SHA-256 over canonical corpus custody text.
    #[must_use]
    pub fn sha256(&self) -> String {
        sha256_hex(self.canonical_text().as_bytes())
    }
}

/// One semantic meaning with one or more grouped surfaces.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct CorpusMeaning {
    id: String,
    ordinals: Vec<usize>,
    surfaces: Vec<Surface>,
}

impl CorpusMeaning {
    /// Returns the stable meaning identifier.
    #[must_use]
    pub fn id(&self) -> &str {
        &self.id
    }

    /// Returns factor value ordinals in schema order.
    #[must_use]
    pub fn ordinals(&self) -> &[usize] {
        &self.ordinals
    }

    /// Returns every surface grouped under this meaning.
    #[must_use]
    pub fn surfaces(&self) -> &[Surface] {
        &self.surfaces
    }
}

/// One rendered observation associated with a meaning.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Surface {
    id: String,
    template: String,
    text: String,
}

impl Surface {
    /// Returns the stable surface identifier.
    #[must_use]
    pub fn id(&self) -> &str {
        &self.id
    }

    /// Returns the template identifier.
    #[must_use]
    pub fn template(&self) -> &str {
        &self.template
    }

    /// Returns the rendered text.
    #[must_use]
    pub fn text(&self) -> &str {
        &self.text
    }

    /// Returns SHA-256 over template identity and exact UTF-8 text.
    #[must_use]
    pub fn text_sha256(&self) -> String {
        sha256_hex(format!("{}\n{}\n", self.template, self.text).as_bytes())
    }
}

/// A reference to one surface example.
#[derive(Clone, Debug, Eq, Hash, Ord, PartialEq, PartialOrd)]
pub struct ExampleRef {
    meaning_id: String,
    surface_id: String,
}

impl ExampleRef {
    /// Returns the referenced meaning.
    #[must_use]
    pub fn meaning_id(&self) -> &str {
        &self.meaning_id
    }

    /// Returns the referenced surface.
    #[must_use]
    pub fn surface_id(&self) -> &str {
        &self.surface_id
    }
}

/// One validated deterministic split manifest.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct SplitManifest {
    family: CorpusFamily,
    kind: SplitKind,
    schema_sha256: String,
    corpus_sha256: String,
    train: Vec<ExampleRef>,
    test: Vec<ExampleRef>,
    meaning_overlap_allowed: bool,
}

impl SplitManifest {
    /// Returns the corpus family.
    #[must_use]
    pub const fn family(&self) -> CorpusFamily {
        self.family
    }

    /// Returns the split kind.
    #[must_use]
    pub const fn kind(&self) -> SplitKind {
        self.kind
    }

    /// Returns training examples in canonical order.
    #[must_use]
    pub fn train(&self) -> &[ExampleRef] {
        &self.train
    }

    /// Returns test examples in canonical order.
    #[must_use]
    pub fn test(&self) -> &[ExampleRef] {
        &self.test
    }

    /// Returns whether meaning overlap is intentionally admitted.
    #[must_use]
    pub const fn meaning_overlap_allowed(&self) -> bool {
        self.meaning_overlap_allowed
    }

    /// Returns canonical split custody text.
    #[must_use]
    pub fn canonical_text(&self) -> String {
        let mut output = format!(
            "factor-split-v1\nfamily {}\nkind {}\nselection {}\nseed none\nschema_sha256 {}\ncorpus_sha256 {}\nmeaning_overlap {}\nsurface_grouping {}\natom_coverage true\npair_coverage true\ntrain {}\ntest {}\n",
            self.family.id(),
            self.kind.id(),
            selection_id(self.family, self.kind),
            self.schema_sha256,
            self.corpus_sha256,
            self.meaning_overlap_allowed,
            !self.meaning_overlap_allowed,
            self.train.len(),
            self.test.len()
        );
        for example in &self.train {
            output.push_str("train ");
            output.push_str(example.meaning_id());
            output.push(' ');
            output.push_str(example.surface_id());
            output.push('\n');
        }
        for example in &self.test {
            output.push_str("test ");
            output.push_str(example.meaning_id());
            output.push(' ');
            output.push_str(example.surface_id());
            output.push('\n');
        }
        output
    }

    /// Returns SHA-256 over canonical split custody text.
    #[must_use]
    pub fn sha256(&self) -> String {
        sha256_hex(self.canonical_text().as_bytes())
    }
}

/// A corpus or split invariant failure.
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum FixtureError {
    /// One example appears more than once in a split.
    DuplicateExample { surface_id: String },
    /// A non-transfer split places one meaning on both sides.
    MeaningLeakage { meaning_id: String },
    /// A grouped split separates surfaces belonging to one meaning.
    SurfaceGroupSplit { meaning_id: String },
    /// A test atom does not occur in training.
    MissingAtomCoverage { factor: usize, value: usize },
    /// A test pair does not occur in training.
    MissingPairCoverage {
        left_factor: usize,
        left_value: usize,
        right_factor: usize,
        right_value: usize,
    },
    /// Template transfer uses the wrong template on one side.
    InvalidTemplateTransfer { surface_id: String },
    /// A split side is empty.
    EmptySide,
    /// A manifest references an unknown meaning or surface.
    UnknownReference { identifier: String },
}

impl fmt::Display for FixtureError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::DuplicateExample { surface_id } => {
                write!(formatter, "duplicate example {surface_id:?}")
            }
            Self::MeaningLeakage { meaning_id } => {
                write!(formatter, "meaning {meaning_id:?} leaks across split sides")
            }
            Self::SurfaceGroupSplit { meaning_id } => {
                write!(formatter, "meaning {meaning_id:?} has split surfaces")
            }
            Self::MissingAtomCoverage { factor, value } => {
                write!(formatter, "test atom ({factor},{value}) is absent from training")
            }
            Self::MissingPairCoverage {
                left_factor,
                left_value,
                right_factor,
                right_value,
            } => write!(
                formatter,
                "test pair ({left_factor},{left_value})/({right_factor},{right_value}) is absent from training"
            ),
            Self::InvalidTemplateTransfer { surface_id } => {
                write!(formatter, "surface {surface_id:?} violates template transfer")
            }
            Self::EmptySide => formatter.write_str("split sides must both be nonempty"),
            Self::UnknownReference { identifier } => {
                write!(formatter, "unknown split reference {identifier:?}")
            }
        }
    }
}

impl Error for FixtureError {}

/// Generates both V1 corpus families.
#[must_use]
pub fn generate_corpora() -> Vec<Corpus> {
    vec![generate_navigation(), generate_events()]
}

/// Generates and validates every V1 split manifest.
///
/// # Errors
///
/// Returns an invariant failure when coverage, grouping, identity, or transfer
/// requirements do not hold.
pub fn generate_splits() -> Result<Vec<SplitManifest>, FixtureError> {
    let corpora = generate_corpora();
    let mut manifests = Vec::new();
    for corpus in &corpora {
        for kind in [SplitKind::Iid, SplitKind::Lexical, SplitKind::CrossFeature] {
            let manifest = grouped_manifest(corpus, kind);
            validate_manifest(corpus, &manifest)?;
            manifests.push(manifest);
        }
        if corpus.family() == CorpusFamily::Event {
            let manifest = template_transfer_manifest(corpus);
            validate_manifest(corpus, &manifest)?;
            manifests.push(manifest);
        }
    }
    Ok(manifests)
}

/// Returns a compact canonical summary for CLI and release records.
///
/// # Errors
///
/// Returns any split validation failure.
pub fn fixture_summary() -> Result<String, FixtureError> {
    let corpora = generate_corpora();
    let splits = generate_splits()?;
    let mut output = String::from("factor-fixture-summary-v1\n");
    for corpus in &corpora {
        writeln!(
            output,
            "corpus {} meanings {} surfaces {} schema_sha256 {} corpus_sha256 {}",
            corpus.family().id(),
            corpus.meanings().len(),
            corpus.surface_count(),
            corpus.schema_sha256(),
            corpus.sha256()
        )
        .expect("writing to String cannot fail");
    }
    for split in &splits {
        writeln!(
            output,
            "split {} {} train {} test {} overlap {} split_sha256 {}",
            split.family().id(),
            split.kind().id(),
            split.train().len(),
            split.test().len(),
            split.meaning_overlap_allowed(),
            split.sha256()
        )
        .expect("writing to String cannot fail");
    }
    Ok(output)
}

fn generate_navigation() -> Corpus {
    let schema = SchemaDocument::parse(NAVIGATION_SCHEMA).expect("navigation schema is valid");
    let actions = ["walk", "jump", "push", "pull"];
    let directions = ["left", "right"];
    let manners = ["slowly", "quickly"];
    let counts = ["once", "twice"];
    let polarities = ["affirmative", "negated"];
    let mut meanings = Vec::with_capacity(64);

    for (action, action_id) in actions.iter().enumerate() {
        for (direction, direction_id) in directions.iter().enumerate() {
            for (manner, manner_id) in manners.iter().enumerate() {
                for (count, count_id) in counts.iter().enumerate() {
                    for (polarity, polarity_id) in polarities.iter().enumerate() {
                        let id = format!(
                            "{action_id}-{direction_id}-{manner_id}-{count_id}-{polarity_id}"
                        );
                        let prefix = if polarity == 1 { "do not " } else { "" };
                        let text =
                            format!("{prefix}{action_id} {direction_id} {manner_id} {count_id}");
                        meanings.push(CorpusMeaning {
                            id: id.clone(),
                            ordinals: vec![action, direction, manner, count, polarity],
                            surfaces: vec![Surface {
                                id: format!("{id}-canonical"),
                                template: "canonical".to_owned(),
                                text,
                            }],
                        });
                    }
                }
            }
        }
    }

    Corpus {
        family: CorpusFamily::Navigation,
        schema_sha256: schema.schema().sha256(),
        meanings,
    }
}

fn generate_events() -> Corpus {
    let schema = SchemaDocument::parse(EVENT_SCHEMA).expect("event schema is valid");
    let entities = ["robot", "child", "artist", "scientist"];
    let predicates = ["sees", "helps", "follows", "avoids"];
    let past_predicates = ["saw", "helped", "followed", "avoided"];
    let base_predicates = ["see", "help", "follow", "avoid"];
    let tenses = ["present", "past"];
    let polarities = ["affirmative", "negated"];
    let mut meanings = Vec::with_capacity(256);

    for (agent, agent_id) in entities.iter().enumerate() {
        for (predicate, predicate_id) in predicates.iter().enumerate() {
            for (patient, patient_id) in entities.iter().enumerate() {
                for (tense, tense_id) in tenses.iter().enumerate() {
                    for (polarity, polarity_id) in polarities.iter().enumerate() {
                        let id = format!(
                            "{agent_id}-{predicate_id}-{patient_id}-{tense_id}-{polarity_id}"
                        );
                        let active = match (tense, polarity) {
                            (0, 0) => format!("{agent_id} {predicate_id} {patient_id}"),
                            (0, 1) => format!(
                                "{} does not {} {}",
                                agent_id, base_predicates[predicate], patient_id
                            ),
                            (1, 0) => format!(
                                "{} {} {}",
                                agent_id, past_predicates[predicate], patient_id
                            ),
                            (1, 1) => format!(
                                "{} did not {} {}",
                                agent_id, base_predicates[predicate], patient_id
                            ),
                            _ => unreachable!(),
                        };
                        let passive = match (tense, polarity) {
                            (0, 0) => format!(
                                "{} is {} by {}",
                                patient_id,
                                passive_participle(predicate),
                                agent_id
                            ),
                            (0, 1) => format!(
                                "{} is not {} by {}",
                                patient_id,
                                passive_participle(predicate),
                                agent_id
                            ),
                            (1, 0) => format!(
                                "{} was {} by {}",
                                patient_id,
                                passive_participle(predicate),
                                agent_id
                            ),
                            (1, 1) => format!(
                                "{} was not {} by {}",
                                patient_id,
                                passive_participle(predicate),
                                agent_id
                            ),
                            _ => unreachable!(),
                        };
                        meanings.push(CorpusMeaning {
                            id: id.clone(),
                            ordinals: vec![agent, predicate, patient, tense, polarity],
                            surfaces: vec![
                                Surface {
                                    id: format!("{id}-active"),
                                    template: "active".to_owned(),
                                    text: active,
                                },
                                Surface {
                                    id: format!("{id}-passive"),
                                    template: "passive".to_owned(),
                                    text: passive,
                                },
                            ],
                        });
                    }
                }
            }
        }
    }

    Corpus {
        family: CorpusFamily::Event,
        schema_sha256: schema.schema().sha256(),
        meanings,
    }
}

const fn passive_participle(predicate: usize) -> &'static str {
    match predicate {
        0 => "seen",
        1 => "helped",
        2 => "followed",
        3 => "avoided",
        _ => unreachable!(),
    }
}

fn grouped_manifest(corpus: &Corpus, kind: SplitKind) -> SplitManifest {
    let mut train = Vec::new();
    let mut test = Vec::new();
    for meaning in corpus.meanings() {
        let is_test = match (corpus.family(), kind) {
            (_, SplitKind::Iid) => semantic_bucket(meaning.ordinals()) == 0,
            (CorpusFamily::Navigation, SplitKind::Lexical) => {
                meaning.ordinals[0] == 1
                    && meaning.ordinals[1] == 1
                    && meaning.ordinals[2] == meaning.ordinals[3]
            }
            (CorpusFamily::Event, SplitKind::Lexical) => {
                meaning.ordinals[1] == 1
                    && meaning.ordinals[0] == meaning.ordinals[2]
                    && meaning.ordinals[3] == 1
            }
            (CorpusFamily::Navigation, SplitKind::CrossFeature) => {
                meaning.ordinals[2] == 1 && meaning.ordinals[3] == 1 && meaning.ordinals[4] == 1
            }
            (CorpusFamily::Event, SplitKind::CrossFeature) => {
                meaning.ordinals[0] == meaning.ordinals[2]
                    && meaning.ordinals[3] == 1
                    && meaning.ordinals[4] == 1
            }
            (_, SplitKind::TemplateTransfer) => unreachable!(),
        };
        let destination = if is_test { &mut test } else { &mut train };
        destination.extend(meaning.surfaces().iter().map(|surface| ExampleRef {
            meaning_id: meaning.id().to_owned(),
            surface_id: surface.id().to_owned(),
        }));
    }
    SplitManifest {
        family: corpus.family(),
        kind,
        schema_sha256: corpus.schema_sha256().to_owned(),
        corpus_sha256: corpus.sha256(),
        train,
        test,
        meaning_overlap_allowed: false,
    }
}

fn semantic_bucket(ordinals: &[usize]) -> u64 {
    let mut hash = 14_695_981_039_346_656_037_u64;
    for ordinal in ordinals {
        hash ^= u64::try_from(*ordinal + 1).expect("fixture ordinals fit u64");
        hash = hash.wrapping_mul(1_099_511_628_211);
    }
    hash % 4
}

const fn selection_id(family: CorpusFamily, kind: SplitKind) -> &'static str {
    match (family, kind) {
        (_, SplitKind::Iid) => "semantic-fnv1a64-mod4-bucket0",
        (CorpusFamily::Navigation, SplitKind::Lexical) => "jump-right-manner-equals-count",
        (CorpusFamily::Event, SplitKind::Lexical) => "helps-reflexive-past",
        (CorpusFamily::Navigation, SplitKind::CrossFeature) => "quickly-twice-negated",
        (CorpusFamily::Event, SplitKind::CrossFeature) => "reflexive-past-negated",
        (CorpusFamily::Event, SplitKind::TemplateTransfer) => "active-to-passive",
        (CorpusFamily::Navigation, SplitKind::TemplateTransfer) => {
            "unsupported-navigation-template-transfer"
        }
    }
}

fn template_transfer_manifest(corpus: &Corpus) -> SplitManifest {
    let mut train = Vec::with_capacity(corpus.meanings().len());
    let mut test = Vec::with_capacity(corpus.meanings().len());
    for meaning in corpus.meanings() {
        train.push(ExampleRef {
            meaning_id: meaning.id().to_owned(),
            surface_id: meaning.surfaces()[0].id().to_owned(),
        });
        test.push(ExampleRef {
            meaning_id: meaning.id().to_owned(),
            surface_id: meaning.surfaces()[1].id().to_owned(),
        });
    }
    SplitManifest {
        family: corpus.family(),
        kind: SplitKind::TemplateTransfer,
        schema_sha256: corpus.schema_sha256().to_owned(),
        corpus_sha256: corpus.sha256(),
        train,
        test,
        meaning_overlap_allowed: true,
    }
}

fn validate_manifest(corpus: &Corpus, manifest: &SplitManifest) -> Result<(), FixtureError> {
    if manifest.train.is_empty() || manifest.test.is_empty() {
        return Err(FixtureError::EmptySide);
    }

    let meanings = corpus
        .meanings()
        .iter()
        .map(|meaning| (meaning.id(), meaning))
        .collect::<HashMap<_, _>>();
    let surfaces = corpus
        .meanings()
        .iter()
        .flat_map(|meaning| {
            meaning
                .surfaces()
                .iter()
                .map(move |surface| (surface.id(), (meaning.id(), surface.template())))
        })
        .collect::<HashMap<_, _>>();

    let mut examples = HashSet::new();
    for example in manifest.train.iter().chain(&manifest.test) {
        if !examples.insert(example.surface_id()) {
            return Err(FixtureError::DuplicateExample {
                surface_id: example.surface_id().to_owned(),
            });
        }
        let Some((meaning_id, _)) = surfaces.get(example.surface_id()) else {
            return Err(FixtureError::UnknownReference {
                identifier: example.surface_id().to_owned(),
            });
        };
        if *meaning_id != example.meaning_id() || !meanings.contains_key(example.meaning_id()) {
            return Err(FixtureError::UnknownReference {
                identifier: example.meaning_id().to_owned(),
            });
        }
    }

    let train_meanings = manifest
        .train
        .iter()
        .map(ExampleRef::meaning_id)
        .collect::<BTreeSet<_>>();
    let test_meanings = manifest
        .test
        .iter()
        .map(ExampleRef::meaning_id)
        .collect::<BTreeSet<_>>();

    if manifest.kind == SplitKind::TemplateTransfer {
        validate_template_transfer(manifest, &surfaces, &train_meanings, &test_meanings)?;
    } else {
        if let Some(meaning_id) = train_meanings.intersection(&test_meanings).next() {
            return Err(FixtureError::MeaningLeakage {
                meaning_id: (*meaning_id).to_owned(),
            });
        }
        for meaning in corpus.meanings() {
            let train_count = meaning
                .surfaces()
                .iter()
                .filter(|surface| {
                    manifest
                        .train
                        .iter()
                        .any(|item| item.surface_id() == surface.id())
                })
                .count();
            let test_count = meaning
                .surfaces()
                .iter()
                .filter(|surface| {
                    manifest
                        .test
                        .iter()
                        .any(|item| item.surface_id() == surface.id())
                })
                .count();
            if train_count > 0 && test_count > 0 {
                return Err(FixtureError::SurfaceGroupSplit {
                    meaning_id: meaning.id().to_owned(),
                });
            }
        }
        validate_coverage(corpus, &train_meanings, &test_meanings)?;
    }
    Ok(())
}

fn validate_template_transfer(
    manifest: &SplitManifest,
    surfaces: &HashMap<&str, (&str, &str)>,
    train_meanings: &BTreeSet<&str>,
    test_meanings: &BTreeSet<&str>,
) -> Result<(), FixtureError> {
    if train_meanings != test_meanings {
        return Err(FixtureError::MeaningLeakage {
            meaning_id: "template-transfer-meaning-set".to_owned(),
        });
    }
    for example in &manifest.train {
        if surfaces[example.surface_id()].1 != "active" {
            return Err(FixtureError::InvalidTemplateTransfer {
                surface_id: example.surface_id().to_owned(),
            });
        }
    }
    for example in &manifest.test {
        if surfaces[example.surface_id()].1 != "passive" {
            return Err(FixtureError::InvalidTemplateTransfer {
                surface_id: example.surface_id().to_owned(),
            });
        }
    }
    Ok(())
}

fn validate_coverage(
    corpus: &Corpus,
    train_ids: &BTreeSet<&str>,
    test_ids: &BTreeSet<&str>,
) -> Result<(), FixtureError> {
    let train = corpus
        .meanings()
        .iter()
        .filter(|meaning| train_ids.contains(meaning.id()))
        .collect::<Vec<_>>();
    let test = corpus
        .meanings()
        .iter()
        .filter(|meaning| test_ids.contains(meaning.id()))
        .collect::<Vec<_>>();

    for meaning in &test {
        for (factor, value) in meaning.ordinals().iter().copied().enumerate() {
            if !train
                .iter()
                .any(|candidate| candidate.ordinals()[factor] == value)
            {
                return Err(FixtureError::MissingAtomCoverage { factor, value });
            }
        }
        for left_factor in 0..meaning.ordinals().len() {
            for right_factor in left_factor + 1..meaning.ordinals().len() {
                let left_value = meaning.ordinals()[left_factor];
                let right_value = meaning.ordinals()[right_factor];
                if !train.iter().any(|candidate| {
                    candidate.ordinals()[left_factor] == left_value
                        && candidate.ordinals()[right_factor] == right_value
                }) {
                    return Err(FixtureError::MissingPairCoverage {
                        left_factor,
                        left_value,
                        right_factor,
                        right_value,
                    });
                }
            }
        }
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn generated_corpora_have_frozen_shapes() {
        let corpora = generate_corpora();
        assert_eq!(corpora[0].meanings().len(), 64);
        assert_eq!(corpora[0].surface_count(), 64);
        assert_eq!(corpora[1].meanings().len(), 256);
        assert_eq!(corpora[1].surface_count(), 512);
        assert_eq!(corpora[1].meanings()[0].surfaces().len(), 2);
    }

    #[test]
    fn every_manifest_validates() {
        let manifests = generate_splits().unwrap();
        assert_eq!(manifests.len(), 7);
        assert_eq!(
            manifests
                .iter()
                .filter(|manifest| manifest.kind() == SplitKind::TemplateTransfer)
                .count(),
            1
        );
    }

    #[test]
    fn generated_identities_are_deterministic() {
        assert_eq!(fixture_summary().unwrap(), fixture_summary().unwrap());
    }
}
