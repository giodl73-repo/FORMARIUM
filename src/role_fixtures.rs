//! Generated ordered-role and ambiguity fixture families.

use crate::{sha256_hex, SchemaDocument};
use std::collections::{BTreeSet, HashMap, HashSet};
use std::error::Error;
use std::fmt::{self, Write as _};

const TRANSFER_SCHEMA: &str = include_str!("../fixtures/schemas/transfer.factor");
const ATTACHMENT_SCHEMA: &str = include_str!("../fixtures/schemas/attachment.factor");

/// One Wave 2 fixture family.
#[derive(Clone, Copy, Debug, Eq, Hash, Ord, PartialEq, PartialOrd)]
pub enum RoleFixtureFamily {
    /// Ordered giver/theme/recipient slots with repeated fillers.
    Transfer,
    /// Instrument versus patient-associated-object attachment.
    Attachment,
}

impl RoleFixtureFamily {
    /// Returns the canonical family identifier.
    #[must_use]
    pub const fn id(self) -> &'static str {
        match self {
            Self::Transfer => "transfer",
            Self::Attachment => "attachment",
        }
    }
}

/// One deterministic Wave 2 split.
#[derive(Clone, Copy, Debug, Eq, Hash, Ord, PartialEq, PartialOrd)]
pub enum RoleSplitKind {
    /// Stable family-hash interpolation split.
    Iid,
    /// Hold one ordered recipient combination in the past tense.
    SlotRecombination,
    /// Hold negated examples where giver and both recipients share a filler.
    SharedFiller,
    /// Hold one familiar predicate/object/reflexive conjunction.
    ObjectRecombination,
    /// Train explicit readings and test their shared ambiguous surface.
    SurfaceDisambiguation,
}

impl RoleSplitKind {
    /// Returns the canonical split identifier.
    #[must_use]
    pub const fn id(self) -> &'static str {
        match self {
            Self::Iid => "iid",
            Self::SlotRecombination => "slot-recombination",
            Self::SharedFiller => "shared-filler",
            Self::ObjectRecombination => "object-recombination",
            Self::SurfaceDisambiguation => "surface-disambiguation",
        }
    }
}

/// One complete role meaning.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct RoleMeaning {
    id: String,
    ordinals: Vec<usize>,
}

impl RoleMeaning {
    /// Returns the stable meaning identifier.
    #[must_use]
    pub fn id(&self) -> &str {
        &self.id
    }

    /// Returns factor ordinals in schema order.
    #[must_use]
    pub fn ordinals(&self) -> &[usize] {
        &self.ordinals
    }
}

/// One generated role corpus.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct RoleCorpus {
    family: RoleFixtureFamily,
    schema_sha256: String,
    frame_text: String,
    meanings: Vec<RoleMeaning>,
}

impl RoleCorpus {
    /// Returns the fixture family.
    #[must_use]
    pub const fn family(&self) -> RoleFixtureFamily {
        self.family
    }

    /// Returns the governing schema identity.
    #[must_use]
    pub fn schema_sha256(&self) -> &str {
        &self.schema_sha256
    }

    /// Returns canonical role-frame text.
    #[must_use]
    pub fn frame_text(&self) -> &str {
        &self.frame_text
    }

    /// Returns the role-frame identity.
    #[must_use]
    pub fn frame_sha256(&self) -> String {
        sha256_hex(self.frame_text.as_bytes())
    }

    /// Returns admitted meanings.
    #[must_use]
    pub fn meanings(&self) -> &[RoleMeaning] {
        &self.meanings
    }

    /// Returns canonical corpus custody text.
    #[must_use]
    pub fn canonical_text(&self) -> String {
        let mut output = format!(
            "factor-role-corpus-v1\nfamily {}\ngenerator exhaustive-constrained-cartesian-v1\nseed none\nschema_sha256 {}\nframe_sha256 {}\nmeanings {}\n",
            self.family.id(),
            self.schema_sha256(),
            self.frame_sha256(),
            self.meanings.len()
        );
        for meaning in &self.meanings {
            write!(output, "meaning {} ordinals", meaning.id())
                .expect("writing to String cannot fail");
            for ordinal in meaning.ordinals() {
                write!(output, " {ordinal}").expect("writing to String cannot fail");
            }
            output.push('\n');
        }
        output
    }

    /// Returns the corpus identity.
    #[must_use]
    pub fn sha256(&self) -> String {
        sha256_hex(self.canonical_text().as_bytes())
    }
}

/// One surface and its complete valid candidate set.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct AnalysisSurface {
    id: String,
    template: String,
    text: String,
    candidates: Vec<String>,
}

impl AnalysisSurface {
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

    /// Returns exact ASCII surface text.
    #[must_use]
    pub fn text(&self) -> &str {
        &self.text
    }

    /// Returns candidate meaning identifiers in canonical order.
    #[must_use]
    pub fn candidates(&self) -> &[String] {
        &self.candidates
    }
}

/// One leakage-grouped analysis family.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct AnalysisFamily {
    id: String,
    surfaces: Vec<AnalysisSurface>,
}

impl AnalysisFamily {
    /// Returns the stable family identifier.
    #[must_use]
    pub fn id(&self) -> &str {
        &self.id
    }

    /// Returns surfaces in declared semantic order.
    #[must_use]
    pub fn surfaces(&self) -> &[AnalysisSurface] {
        &self.surfaces
    }
}

/// One canonical analysis-set document.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct AnalysisDocument {
    family: RoleFixtureFamily,
    frame_sha256: String,
    corpus_sha256: String,
    families: Vec<AnalysisFamily>,
}

impl AnalysisDocument {
    /// Returns the fixture family.
    #[must_use]
    pub const fn family(&self) -> RoleFixtureFamily {
        self.family
    }

    /// Returns analysis families in canonical order.
    #[must_use]
    pub fn families(&self) -> &[AnalysisFamily] {
        &self.families
    }

    /// Returns the total number of surfaces.
    #[must_use]
    pub fn surface_count(&self) -> usize {
        self.families
            .iter()
            .map(|family| family.surfaces.len())
            .sum()
    }

    /// Returns canonical analysis-set text.
    #[must_use]
    pub fn canonical_text(&self) -> String {
        let mut output = format!(
            "factor-analysis-sets-v1\nanalysis {} version 1\nframe_sha256 {}\ncorpus_sha256 {}\n",
            self.family.id(),
            self.frame_sha256,
            self.corpus_sha256
        );
        for family in &self.families {
            writeln!(output, "family {}", family.id()).expect("writing to String cannot fail");
            for surface in family.surfaces() {
                writeln!(output, "surface {}", surface.id())
                    .expect("writing to String cannot fail");
                writeln!(output, "template {}", surface.template())
                    .expect("writing to String cannot fail");
                writeln!(output, "text {}", surface.text()).expect("writing to String cannot fail");
                writeln!(output, "candidates {}", surface.candidates().len())
                    .expect("writing to String cannot fail");
                for candidate in surface.candidates() {
                    writeln!(output, "candidate {candidate}")
                        .expect("writing to String cannot fail");
                }
                output.push_str("end-surface\n");
            }
            output.push_str("end-family\n");
        }
        output
    }

    /// Returns the analysis document identity.
    #[must_use]
    pub fn sha256(&self) -> String {
        sha256_hex(self.canonical_text().as_bytes())
    }
}

/// One surface reference in a Wave 2 split.
#[derive(Clone, Debug, Eq, Hash, Ord, PartialEq, PartialOrd)]
pub struct AnalysisRef {
    family_id: String,
    surface_id: String,
}

impl AnalysisRef {
    /// Returns the analysis family identifier.
    #[must_use]
    pub fn family_id(&self) -> &str {
        &self.family_id
    }

    /// Returns the surface identifier.
    #[must_use]
    pub fn surface_id(&self) -> &str {
        &self.surface_id
    }
}

/// One validated role/ambiguity split.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct RoleSplitManifest {
    family: RoleFixtureFamily,
    kind: RoleSplitKind,
    corpus_sha256: String,
    analysis_sha256: String,
    train: Vec<AnalysisRef>,
    test: Vec<AnalysisRef>,
    candidate_overlap_allowed: bool,
}

impl RoleSplitManifest {
    /// Returns the fixture family.
    #[must_use]
    pub const fn family(&self) -> RoleFixtureFamily {
        self.family
    }

    /// Returns the split kind.
    #[must_use]
    pub const fn kind(&self) -> RoleSplitKind {
        self.kind
    }

    /// Returns training surface references.
    #[must_use]
    pub fn train(&self) -> &[AnalysisRef] {
        &self.train
    }

    /// Returns test surface references.
    #[must_use]
    pub fn test(&self) -> &[AnalysisRef] {
        &self.test
    }

    /// Returns whether candidate meanings intentionally overlap.
    #[must_use]
    pub const fn candidate_overlap_allowed(&self) -> bool {
        self.candidate_overlap_allowed
    }

    /// Returns canonical split custody text.
    #[must_use]
    pub fn canonical_text(&self) -> String {
        let mut output = format!(
            "factor-analysis-split-v1\nfamily {}\nkind {}\nselection {}\nseed none\ncorpus_sha256 {}\nanalysis_sha256 {}\ncandidate_overlap {}\nfamily_grouping {}\natom_coverage true\npair_coverage true\ntrain {}\ntest {}\n",
            self.family.id(),
            self.kind.id(),
            selection_id(self.family, self.kind),
            self.corpus_sha256,
            self.analysis_sha256,
            self.candidate_overlap_allowed,
            !self.candidate_overlap_allowed,
            self.train.len(),
            self.test.len()
        );
        for reference in &self.train {
            writeln!(
                output,
                "train {} {}",
                reference.family_id(),
                reference.surface_id()
            )
            .expect("writing to String cannot fail");
        }
        for reference in &self.test {
            writeln!(
                output,
                "test {} {}",
                reference.family_id(),
                reference.surface_id()
            )
            .expect("writing to String cannot fail");
        }
        output
    }

    /// Returns the split identity.
    #[must_use]
    pub fn sha256(&self) -> String {
        sha256_hex(self.canonical_text().as_bytes())
    }
}

/// Role fixture construction or validation failure.
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum RoleFixtureError {
    /// A candidate meaning was unknown.
    UnknownCandidate(String),
    /// A candidate set was empty, duplicated, or noncanonical.
    InvalidCandidates(String),
    /// A surface or family identifier was duplicated.
    DuplicateIdentifier(String),
    /// One split side was empty.
    EmptySide,
    /// An ordinary split separated one analysis family.
    FamilyLeakage(String),
    /// An ordinary split shared candidate meanings.
    CandidateLeakage(String),
    /// A test atom was absent from training.
    MissingAtom { factor: usize, value: usize },
    /// A test factor pair was absent from training.
    MissingPair {
        left_factor: usize,
        left_value: usize,
        right_factor: usize,
        right_value: usize,
    },
    /// A split reference was unknown or duplicated.
    InvalidReference(String),
    /// Surface-disambiguation used the wrong surface class.
    InvalidDisambiguation(String),
}

impl fmt::Display for RoleFixtureError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::UnknownCandidate(id) => write!(formatter, "unknown candidate {id:?}"),
            Self::InvalidCandidates(id) => write!(formatter, "invalid candidates for {id:?}"),
            Self::DuplicateIdentifier(id) => write!(formatter, "duplicate identifier {id:?}"),
            Self::EmptySide => formatter.write_str("split sides must both be nonempty"),
            Self::FamilyLeakage(id) => write!(formatter, "analysis family {id:?} leaks"),
            Self::CandidateLeakage(id) => write!(formatter, "candidate meaning {id:?} leaks"),
            Self::MissingAtom { factor, value } => {
                write!(formatter, "test atom ({factor},{value}) is absent from training")
            }
            Self::MissingPair {
                left_factor,
                left_value,
                right_factor,
                right_value,
            } => write!(
                formatter,
                "test pair ({left_factor},{left_value})/({right_factor},{right_value}) is absent from training"
            ),
            Self::InvalidReference(id) => write!(formatter, "invalid split reference {id:?}"),
            Self::InvalidDisambiguation(id) => {
                write!(formatter, "invalid disambiguation surface {id:?}")
            }
        }
    }
}

impl Error for RoleFixtureError {}

/// Generates both Wave 2 corpora and validates schema/domain compatibility.
#[must_use]
pub fn generate_role_corpora() -> Vec<RoleCorpus> {
    vec![generate_transfer_corpus(), generate_attachment_corpus()]
}

/// Generates and validates both analysis documents.
///
/// # Errors
///
/// Returns a candidate, ordering, identity, or duplicate failure.
pub fn generate_analysis_documents() -> Result<Vec<AnalysisDocument>, RoleFixtureError> {
    let corpora = generate_role_corpora();
    let documents = vec![
        generate_transfer_analysis(&corpora[0]),
        generate_attachment_analysis(&corpora[1]),
    ];
    for (corpus, document) in corpora.iter().zip(&documents) {
        validate_analysis(corpus, document)?;
    }
    Ok(documents)
}

/// Generates and validates every Wave 2 split.
///
/// # Errors
///
/// Returns a grouping, reference, coverage, or transfer failure.
pub fn generate_role_splits() -> Result<Vec<RoleSplitManifest>, RoleFixtureError> {
    let corpora = generate_role_corpora();
    let documents = generate_analysis_documents()?;
    let mut splits = Vec::new();
    for (corpus, document) in corpora.iter().zip(&documents) {
        let kinds: &[RoleSplitKind] = match corpus.family() {
            RoleFixtureFamily::Transfer => &[
                RoleSplitKind::Iid,
                RoleSplitKind::SlotRecombination,
                RoleSplitKind::SharedFiller,
            ],
            RoleFixtureFamily::Attachment => &[
                RoleSplitKind::Iid,
                RoleSplitKind::ObjectRecombination,
                RoleSplitKind::SurfaceDisambiguation,
            ],
        };
        for kind in kinds {
            let manifest = if *kind == RoleSplitKind::SurfaceDisambiguation {
                disambiguation_manifest(corpus, document)
            } else {
                grouped_manifest(corpus, document, *kind)
            };
            validate_split(corpus, document, &manifest)?;
            splits.push(manifest);
        }
    }
    Ok(splits)
}

/// Returns the canonical Wave 2 fixture summary.
///
/// # Errors
///
/// Returns any analysis or split validation failure.
pub fn role_fixture_summary() -> Result<String, RoleFixtureError> {
    let corpora = generate_role_corpora();
    let documents = generate_analysis_documents()?;
    let splits = generate_role_splits()?;
    let mut output = String::from("factor-role-fixture-summary-v1\n");
    for (corpus, document) in corpora.iter().zip(&documents) {
        writeln!(
            output,
            "corpus {} meanings {} families {} surfaces {} schema_sha256 {} frame_sha256 {} corpus_sha256 {} analysis_sha256 {}",
            corpus.family().id(),
            corpus.meanings().len(),
            document.families().len(),
            document.surface_count(),
            corpus.schema_sha256(),
            corpus.frame_sha256(),
            corpus.sha256(),
            document.sha256()
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
            split.candidate_overlap_allowed(),
            split.sha256()
        )
        .expect("writing to String cannot fail");
    }
    Ok(output)
}

fn generate_transfer_corpus() -> RoleCorpus {
    let schema = SchemaDocument::parse(TRANSFER_SCHEMA).expect("transfer schema is valid");
    assert_factor_values(
        &schema,
        &[
            &["robot", "child", "artist", "scientist"],
            &["book", "package"],
            &["robot", "child", "artist", "scientist"],
            &["robot", "child", "artist", "scientist"],
            &["present", "past"],
            &["affirmative", "negated"],
        ],
    );
    let mut meanings = Vec::with_capacity(512);
    for giver in 0..4 {
        for theme in 0..2 {
            for primary in 0..4 {
                for secondary in 0..4 {
                    for tense in 0..2 {
                        for polarity in 0..2 {
                            meanings.push(RoleMeaning {
                                id: format!(
                                    "g{giver}-t{theme}-rp{primary}-rs{secondary}-te{tense}-p{polarity}"
                                ),
                                ordinals: vec![
                                    giver, theme, primary, secondary, tense, polarity,
                                ],
                            });
                        }
                    }
                }
            }
        }
    }
    let schema_sha256 = schema.schema().sha256();
    RoleCorpus {
        family: RoleFixtureFamily::Transfer,
        frame_text: transfer_frame(&schema_sha256),
        schema_sha256,
        meanings,
    }
}

fn generate_attachment_corpus() -> RoleCorpus {
    let schema = SchemaDocument::parse(ATTACHMENT_SCHEMA).expect("attachment schema is valid");
    assert_factor_values(
        &schema,
        &[
            &["robot", "child", "artist", "scientist"],
            &["sees", "photographs"],
            &["robot", "child", "artist", "scientist"],
            &["none", "camera", "telescope"],
            &["none", "camera", "telescope"],
        ],
    );
    let mut meanings = Vec::with_capacity(128);
    for observer in 0..4 {
        for predicate in 0..2 {
            for patient in 0..4 {
                for object in 1..3 {
                    meanings.push(RoleMeaning {
                        id: format!("o{observer}-v{predicate}-p{patient}-x{object}-instrument"),
                        ordinals: vec![observer, predicate, patient, object, 0],
                    });
                    meanings.push(RoleMeaning {
                        id: format!("o{observer}-v{predicate}-p{patient}-x{object}-patient-object"),
                        ordinals: vec![observer, predicate, patient, 0, object],
                    });
                }
            }
        }
    }
    meanings.sort_by(|left, right| left.id.cmp(&right.id));
    let schema_sha256 = schema.schema().sha256();
    RoleCorpus {
        family: RoleFixtureFamily::Attachment,
        frame_text: attachment_frame(&schema_sha256),
        schema_sha256,
        meanings,
    }
}

fn assert_factor_values(schema: &SchemaDocument, expected: &[&[&str]]) {
    assert_eq!(schema.schema().factors().len(), expected.len());
    for (factor, values) in schema.schema().factors().iter().zip(expected) {
        assert_eq!(
            factor
                .values()
                .iter()
                .map(String::as_str)
                .collect::<Vec<_>>(),
            *values
        );
    }
}

fn transfer_frame(schema_sha256: &str) -> String {
    format!(
        "factor-role-frame-v1\nframe transfer version 1\nschema_sha256 {schema_sha256}\ndomain entity\nvalue artist\nvalue child\nvalue robot\nvalue scientist\nend-domain\ndomain theme\nvalue book\nvalue package\nend-domain\nrole giver\nslot sole factor giver domain entity\nend-role\nrole recipient\nslot primary factor recipient-primary domain entity\nslot secondary factor recipient-secondary domain entity\nend-role\nrole theme\nslot sole factor theme domain theme\nend-role\n"
    )
}

fn attachment_frame(schema_sha256: &str) -> String {
    format!(
        "factor-role-frame-v1\nframe attachment version 1\nschema_sha256 {schema_sha256}\ndomain entity\nvalue artist\nvalue child\nvalue robot\nvalue scientist\nend-domain\ndomain object\nvalue camera\nvalue none\nvalue telescope\nend-domain\nrole instrument\nslot sole factor instrument domain object\nend-role\nrole observer\nslot sole factor observer domain entity\nend-role\nrole patient\nslot sole factor patient domain entity\nend-role\nrole patient-associated-object\nslot sole factor patient-associated-object domain object\nend-role\nconstraint exactly-one-non-none instrument patient-associated-object\n"
    )
}

fn generate_transfer_analysis(corpus: &RoleCorpus) -> AnalysisDocument {
    let entities = ["robot", "child", "artist", "scientist"];
    let themes = ["book", "package"];
    let mut families = Vec::with_capacity(corpus.meanings().len());
    for meaning in corpus.meanings() {
        let ordinal = meaning.ordinals();
        let giver = entities[ordinal[0]];
        let theme = themes[ordinal[1]];
        let primary = entities[ordinal[2]];
        let secondary = entities[ordinal[3]];
        let tense = ordinal[4];
        let negated = ordinal[5] == 1;
        let canonical_verb = match (tense, negated) {
            (0, false) => "gives",
            (0, true) => "does not give",
            (1, false) => "gave",
            (1, true) => "did not give",
            _ => unreachable!(),
        };
        let receive_verb = match (tense, negated) {
            (0, false) => "receive",
            (0, true) => "do not receive",
            (1, false) => "received",
            (1, true) => "did not receive",
            _ => unreachable!(),
        };
        let family_id = format!("family-{}", meaning.id());
        families.push(AnalysisFamily {
            id: family_id.clone(),
            surfaces: vec![
                AnalysisSurface {
                    id: format!("{family_id}-giver-first"),
                    template: "giver-first".to_owned(),
                    text: format!(
                        "{giver} {canonical_verb} {theme} first to {primary} then to {secondary}"
                    ),
                    candidates: vec![meaning.id().to_owned()],
                },
                AnalysisSurface {
                    id: format!("{family_id}-recipients-first"),
                    template: "recipients-first".to_owned(),
                    text: format!(
                        "first {primary} then {secondary} {receive_verb} {theme} from {giver}"
                    ),
                    candidates: vec![meaning.id().to_owned()],
                },
            ],
        });
    }
    AnalysisDocument {
        family: corpus.family(),
        frame_sha256: corpus.frame_sha256(),
        corpus_sha256: corpus.sha256(),
        families,
    }
}

fn generate_attachment_analysis(corpus: &RoleCorpus) -> AnalysisDocument {
    let entities = ["robot", "child", "artist", "scientist"];
    let predicates = ["sees", "photographs"];
    let objects = ["none", "camera", "telescope"];
    let meanings = corpus
        .meanings()
        .iter()
        .map(|meaning| (meaning.id(), meaning))
        .collect::<HashMap<_, _>>();
    let mut families = Vec::with_capacity(64);
    for observer in 0..4 {
        for (predicate, predicate_id) in predicates.iter().enumerate() {
            for patient in 0..4 {
                for (object, object_id) in objects.iter().enumerate().skip(1) {
                    let observer_id = entities[observer];
                    let patient_id = entities[patient];
                    let instrument =
                        format!("o{observer}-v{predicate}-p{patient}-x{object}-instrument");
                    let patient_object =
                        format!("o{observer}-v{predicate}-p{patient}-x{object}-patient-object");
                    assert!(meanings.contains_key(instrument.as_str()));
                    assert!(meanings.contains_key(patient_object.as_str()));
                    let family_id = format!("family-o{observer}-v{predicate}-p{patient}-x{object}");
                    let mut candidates = vec![instrument.clone(), patient_object.clone()];
                    candidates.sort();
                    let infinitive = if predicate == 0 { "see" } else { "photograph" };
                    families.push(AnalysisFamily {
                        id: family_id.clone(),
                        surfaces: vec![
                            AnalysisSurface {
                                id: format!("{family_id}-ambiguous"),
                                template: "attachment-ambiguous".to_owned(),
                                text: format!(
                                    "{observer_id} {predicate_id} {patient_id} with {object_id}"
                                ),
                                candidates,
                            },
                            AnalysisSurface {
                                id: format!("{family_id}-instrument"),
                                template: "instrument-explicit".to_owned(),
                                text: format!(
                                    "{observer_id} uses {object_id} to {infinitive} {patient_id}"
                                ),
                                candidates: vec![instrument],
                            },
                            AnalysisSurface {
                                id: format!("{family_id}-patient-object"),
                                template: "patient-object-explicit".to_owned(),
                                text: format!(
                                    "{observer_id} {predicate_id} {patient_id} carrying {object_id}"
                                ),
                                candidates: vec![patient_object],
                            },
                        ],
                    });
                }
            }
        }
    }
    AnalysisDocument {
        family: corpus.family(),
        frame_sha256: corpus.frame_sha256(),
        corpus_sha256: corpus.sha256(),
        families,
    }
}

fn validate_analysis(
    corpus: &RoleCorpus,
    document: &AnalysisDocument,
) -> Result<(), RoleFixtureError> {
    let meanings = corpus
        .meanings()
        .iter()
        .map(RoleMeaning::id)
        .collect::<HashSet<_>>();
    let mut family_ids = HashSet::new();
    let mut surface_ids = HashSet::new();
    for family in document.families() {
        if !family_ids.insert(family.id()) {
            return Err(RoleFixtureError::DuplicateIdentifier(
                family.id().to_owned(),
            ));
        }
        for surface in family.surfaces() {
            if !surface_ids.insert(surface.id()) {
                return Err(RoleFixtureError::DuplicateIdentifier(
                    surface.id().to_owned(),
                ));
            }
            if surface.candidates().is_empty()
                || !surface
                    .candidates()
                    .windows(2)
                    .all(|pair| pair[0] < pair[1])
            {
                return Err(RoleFixtureError::InvalidCandidates(surface.id().to_owned()));
            }
            for candidate in surface.candidates() {
                if !meanings.contains(candidate.as_str()) {
                    return Err(RoleFixtureError::UnknownCandidate(candidate.clone()));
                }
            }
        }
    }
    Ok(())
}

fn grouped_manifest(
    corpus: &RoleCorpus,
    document: &AnalysisDocument,
    kind: RoleSplitKind,
) -> RoleSplitManifest {
    let meaning_map = corpus
        .meanings()
        .iter()
        .map(|meaning| (meaning.id(), meaning))
        .collect::<HashMap<_, _>>();
    let mut train = Vec::new();
    let mut test = Vec::new();
    for family in document.families() {
        let representative = meaning_map[family.surfaces()[0].candidates()[0].as_str()];
        let ordinal = representative.ordinals();
        let is_test = match (corpus.family(), kind) {
            (_, RoleSplitKind::Iid) => semantic_bucket(ordinal) == 0,
            (RoleFixtureFamily::Transfer, RoleSplitKind::SlotRecombination) => {
                ordinal[2] == 3 && ordinal[3] == 1 && ordinal[4] == 1
            }
            (RoleFixtureFamily::Transfer, RoleSplitKind::SharedFiller) => {
                ordinal[0] == ordinal[2] && ordinal[0] == ordinal[3] && ordinal[5] == 1
            }
            (RoleFixtureFamily::Attachment, RoleSplitKind::ObjectRecombination) => {
                ordinal[1] == 1 && ordinal[3].max(ordinal[4]) == 2 && ordinal[0] == ordinal[2]
            }
            _ => unreachable!(),
        };
        let destination = if is_test { &mut test } else { &mut train };
        destination.extend(family.surfaces().iter().map(|surface| AnalysisRef {
            family_id: family.id().to_owned(),
            surface_id: surface.id().to_owned(),
        }));
    }
    RoleSplitManifest {
        family: corpus.family(),
        kind,
        corpus_sha256: corpus.sha256(),
        analysis_sha256: document.sha256(),
        train,
        test,
        candidate_overlap_allowed: false,
    }
}

fn disambiguation_manifest(corpus: &RoleCorpus, document: &AnalysisDocument) -> RoleSplitManifest {
    let mut train = Vec::new();
    let mut test = Vec::new();
    for family in document.families() {
        for surface in family.surfaces() {
            let reference = AnalysisRef {
                family_id: family.id().to_owned(),
                surface_id: surface.id().to_owned(),
            };
            if surface.candidates().len() > 1 {
                test.push(reference);
            } else {
                train.push(reference);
            }
        }
    }
    RoleSplitManifest {
        family: corpus.family(),
        kind: RoleSplitKind::SurfaceDisambiguation,
        corpus_sha256: corpus.sha256(),
        analysis_sha256: document.sha256(),
        train,
        test,
        candidate_overlap_allowed: true,
    }
}

fn validate_split(
    corpus: &RoleCorpus,
    document: &AnalysisDocument,
    manifest: &RoleSplitManifest,
) -> Result<(), RoleFixtureError> {
    if manifest.train().is_empty() || manifest.test().is_empty() {
        return Err(RoleFixtureError::EmptySide);
    }
    let surfaces = document
        .families()
        .iter()
        .flat_map(|family| {
            family
                .surfaces()
                .iter()
                .map(move |surface| (surface.id(), (family.id(), surface)))
        })
        .collect::<HashMap<_, _>>();
    let mut references = HashSet::new();
    for reference in manifest.train().iter().chain(manifest.test()) {
        if !references.insert(reference.surface_id()) {
            return Err(RoleFixtureError::InvalidReference(
                reference.surface_id().to_owned(),
            ));
        }
        let Some((family_id, _)) = surfaces.get(reference.surface_id()) else {
            return Err(RoleFixtureError::InvalidReference(
                reference.surface_id().to_owned(),
            ));
        };
        if *family_id != reference.family_id() {
            return Err(RoleFixtureError::InvalidReference(
                reference.family_id().to_owned(),
            ));
        }
    }

    let train_families = manifest
        .train()
        .iter()
        .map(AnalysisRef::family_id)
        .collect::<BTreeSet<_>>();
    let test_families = manifest
        .test()
        .iter()
        .map(AnalysisRef::family_id)
        .collect::<BTreeSet<_>>();
    let train_candidates = candidate_ids(manifest.train(), &surfaces);
    let test_candidates = candidate_ids(manifest.test(), &surfaces);

    if manifest.candidate_overlap_allowed() {
        if train_families != test_families || train_candidates != test_candidates {
            return Err(RoleFixtureError::InvalidDisambiguation(
                manifest.kind().id().to_owned(),
            ));
        }
        for reference in manifest.train() {
            if surfaces[reference.surface_id()].1.candidates().len() != 1 {
                return Err(RoleFixtureError::InvalidDisambiguation(
                    reference.surface_id().to_owned(),
                ));
            }
        }
        for reference in manifest.test() {
            if surfaces[reference.surface_id()].1.candidates().len() <= 1 {
                return Err(RoleFixtureError::InvalidDisambiguation(
                    reference.surface_id().to_owned(),
                ));
            }
        }
    } else {
        if let Some(family) = train_families.intersection(&test_families).next() {
            return Err(RoleFixtureError::FamilyLeakage((*family).to_owned()));
        }
        if let Some(candidate) = train_candidates.intersection(&test_candidates).next() {
            return Err(RoleFixtureError::CandidateLeakage((*candidate).to_owned()));
        }
        validate_coverage(corpus, &train_candidates, &test_candidates)?;
    }
    Ok(())
}

fn candidate_ids<'a>(
    references: &'a [AnalysisRef],
    surfaces: &HashMap<&str, (&str, &'a AnalysisSurface)>,
) -> BTreeSet<&'a str> {
    references
        .iter()
        .flat_map(|reference| {
            surfaces[reference.surface_id()]
                .1
                .candidates()
                .iter()
                .map(String::as_str)
        })
        .collect()
}

fn validate_coverage(
    corpus: &RoleCorpus,
    train_ids: &BTreeSet<&str>,
    test_ids: &BTreeSet<&str>,
) -> Result<(), RoleFixtureError> {
    let meanings = corpus
        .meanings()
        .iter()
        .map(|meaning| (meaning.id(), meaning))
        .collect::<HashMap<_, _>>();
    let train = train_ids.iter().map(|id| meanings[*id]).collect::<Vec<_>>();
    let test = test_ids.iter().map(|id| meanings[*id]).collect::<Vec<_>>();
    for meaning in test {
        for (factor, value) in meaning.ordinals().iter().enumerate() {
            if !train
                .iter()
                .any(|candidate| candidate.ordinals()[factor] == *value)
            {
                return Err(RoleFixtureError::MissingAtom {
                    factor,
                    value: *value,
                });
            }
        }
        for left in 0..meaning.ordinals().len() {
            for right in (left + 1)..meaning.ordinals().len() {
                if !train.iter().any(|candidate| {
                    candidate.ordinals()[left] == meaning.ordinals()[left]
                        && candidate.ordinals()[right] == meaning.ordinals()[right]
                }) {
                    return Err(RoleFixtureError::MissingPair {
                        left_factor: left,
                        left_value: meaning.ordinals()[left],
                        right_factor: right,
                        right_value: meaning.ordinals()[right],
                    });
                }
            }
        }
    }
    Ok(())
}

fn semantic_bucket(ordinals: &[usize]) -> u64 {
    let mut hash = 14_695_981_039_346_656_037_u64;
    for ordinal in ordinals {
        hash ^= u64::try_from(*ordinal + 1).expect("fixture ordinals fit u64");
        hash = hash.wrapping_mul(1_099_511_628_211);
    }
    hash % 4
}

const fn selection_id(family: RoleFixtureFamily, kind: RoleSplitKind) -> &'static str {
    match (family, kind) {
        (_, RoleSplitKind::Iid) => "semantic-fnv1a64-mod4-bucket0",
        (RoleFixtureFamily::Transfer, RoleSplitKind::SlotRecombination) => {
            "primary-scientist-secondary-child-past"
        }
        (RoleFixtureFamily::Transfer, RoleSplitKind::SharedFiller) => {
            "giver-primary-secondary-equal-negated"
        }
        (RoleFixtureFamily::Attachment, RoleSplitKind::ObjectRecombination) => {
            "photographs-telescope-observer-equals-patient"
        }
        (RoleFixtureFamily::Attachment, RoleSplitKind::SurfaceDisambiguation) => {
            "explicit-readings-to-ambiguous-surface"
        }
        _ => "unsupported-role-split",
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn fixture_shapes_are_stable() {
        let corpora = generate_role_corpora();
        let analyses = generate_analysis_documents().unwrap();
        assert_eq!(corpora[0].meanings().len(), 512);
        assert_eq!(analyses[0].families().len(), 512);
        assert_eq!(analyses[0].surface_count(), 1024);
        assert_eq!(corpora[1].meanings().len(), 128);
        assert_eq!(analyses[1].families().len(), 64);
        assert_eq!(analyses[1].surface_count(), 192);
    }

    #[test]
    fn every_role_split_validates() {
        assert_eq!(generate_role_splits().unwrap().len(), 6);
    }
}
