//! Split-scored role binding and ambiguity bakeoff.

use crate::binding::{
    binding_predictions, run_binding_controls, BindingAccounting, BindingPrediction,
    BindingRepresentation,
};
use crate::role_fixtures::{
    generate_analysis_documents, generate_role_corpora, generate_role_splits, AnalysisDocument,
    AnalysisFamily, AnalysisRef, AnalysisSurface, RoleFixtureFamily, RoleSplitKind,
};
use crate::sha256_hex;
use std::collections::{BTreeMap, BTreeSet, HashMap};
use std::fmt::Write as _;

/// One representation owner in the role/ambiguity bakeoff.
#[derive(Clone, Copy, Debug, Eq, Ord, PartialEq, PartialOrd)]
pub enum RoleBakeoffRepresentation {
    /// Ordered typed role records.
    TypedRecord,
    /// Exact sparse tensor-product binding.
    SparseTpr,
    /// Concatenated one-hot role factors.
    FactoredOneHot,
    /// Explicit dense role codebook.
    FactoredDense,
    /// HRR at 64 coordinates.
    Hrr64,
    /// HRR at 128 coordinates.
    Hrr128,
    /// HRR at the frozen 256-coordinate decision dimension.
    Hrr256,
    /// One lookup entry per complete meaning.
    WholeMeaning,
    /// One lookup entry per complete candidate set.
    WholeAnalysisSet,
}

impl RoleBakeoffRepresentation {
    /// Returns the canonical representation identifier.
    #[must_use]
    pub const fn id(self) -> &'static str {
        match self {
            Self::TypedRecord => "typed-record",
            Self::SparseTpr => "sparse-tpr",
            Self::FactoredOneHot => "factored-one-hot",
            Self::FactoredDense => "factored-dense",
            Self::Hrr64 => "hrr-64",
            Self::Hrr128 => "hrr-128",
            Self::Hrr256 => "hrr-256",
            Self::WholeMeaning => "whole-meaning",
            Self::WholeAnalysisSet => "whole-analysis-set",
        }
    }

    const fn binding(self) -> Option<BindingRepresentation> {
        match self {
            Self::TypedRecord => Some(BindingRepresentation::TypedRecord),
            Self::SparseTpr => Some(BindingRepresentation::SparseTpr),
            Self::FactoredOneHot => Some(BindingRepresentation::FactoredOneHot),
            Self::FactoredDense => Some(BindingRepresentation::FactoredDense),
            Self::Hrr64 => Some(BindingRepresentation::Hrr64),
            Self::Hrr128 => Some(BindingRepresentation::Hrr128),
            Self::Hrr256 => Some(BindingRepresentation::Hrr256),
            Self::WholeMeaning | Self::WholeAnalysisSet => None,
        }
    }

    const fn role_addressable(self) -> bool {
        !matches!(self, Self::WholeMeaning | Self::WholeAnalysisSet)
    }
}

const REPRESENTATIONS: [RoleBakeoffRepresentation; 9] = [
    RoleBakeoffRepresentation::TypedRecord,
    RoleBakeoffRepresentation::SparseTpr,
    RoleBakeoffRepresentation::FactoredOneHot,
    RoleBakeoffRepresentation::FactoredDense,
    RoleBakeoffRepresentation::Hrr64,
    RoleBakeoffRepresentation::Hrr128,
    RoleBakeoffRepresentation::Hrr256,
    RoleBakeoffRepresentation::WholeMeaning,
    RoleBakeoffRepresentation::WholeAnalysisSet,
];

/// Candidate-set, meaning, and role counts for one split side.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub struct RoleScore {
    /// Surfaces with an exactly reconstructed candidate set.
    pub exact_sets: usize,
    /// Surfaces scored.
    pub total_sets: usize,
    /// Correct predicted candidates.
    pub candidate_true_positive: usize,
    /// All predicted candidates.
    pub candidate_predicted: usize,
    /// All target candidates.
    pub candidate_target: usize,
    /// Candidate meaning occurrences reconstructed exactly.
    pub exact_meanings: usize,
    /// Candidate meaning occurrences scored.
    pub total_meanings: usize,
    /// Correct role fillers.
    pub role_correct: usize,
    /// Role fillers scored.
    pub role_total: usize,
}

impl RoleScore {
    const fn is_perfect(self) -> bool {
        self.exact_sets == self.total_sets
            && self.candidate_true_positive == self.candidate_predicted
            && self.candidate_true_positive == self.candidate_target
            && self.exact_meanings == self.total_meanings
            && self.role_correct == self.role_total
    }
}

/// One split/representation result.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct RoleBakeoffRecord {
    /// Fixture family.
    pub family: RoleFixtureFamily,
    /// Split owner.
    pub split: RoleSplitKind,
    /// Representation owner.
    pub representation: RoleBakeoffRepresentation,
    /// Training-side result.
    pub train: RoleScore,
    /// Holdout-side result.
    pub test: RoleScore,
    /// Whether one role can be addressed without replacing a whole symbol.
    pub role_addressable: bool,
    /// Changed representation coordinates for one role edit, scaled by 1000.
    pub role_edit_coordinates_milli: usize,
    /// Separate representation accounting.
    pub accounting: BindingAccounting,
}

/// Frozen role/ambiguity classification.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum RoleBakeoffClassification {
    /// Factor sharing helps, but no named role representation is uniquely better.
    SemanticOnly,
    /// The frozen HRR owner separates from exact conventional controls.
    RepresentationSpecific,
    /// Role factorization or candidate composition provides no benefit.
    Null,
    /// A custody or control invariant failed.
    Held,
}

impl RoleBakeoffClassification {
    /// Returns the canonical classification identifier.
    #[must_use]
    pub const fn id(self) -> &'static str {
        match self {
            Self::SemanticOnly => "semantic-only",
            Self::RepresentationSpecific => "representation-specific",
            Self::Null => "null",
            Self::Held => "held",
        }
    }
}

/// Complete deterministic role/ambiguity bakeoff report.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct RoleBakeoffReport {
    /// Records in split and representation order.
    pub records: Vec<RoleBakeoffRecord>,
    /// Whether factor sharing beats complete-meaning lookup.
    pub role_factorization_useful: bool,
    /// Whether composing familiar readings beats complete-set lookup.
    pub ambiguity_composition_useful: bool,
    /// Whether exact conventional factored controls tie.
    pub strong_controls_tie: bool,
    /// Final classification.
    pub classification: RoleBakeoffClassification,
}

impl RoleBakeoffReport {
    /// Returns canonical non-runtime evidence.
    #[must_use]
    pub fn canonical_text(&self) -> String {
        let mut output = String::from(
            "factor-role-bakeoff-v1\nhrr_decision_owner 256\nruntime descriptive-excluded\n",
        );
        for record in &self.records {
            writeln!(
                output,
                "record {} {} {} train_sets {}/{} train_candidates {}/{}/{} train_meanings {}/{} train_roles {}/{} test_sets {}/{} test_candidates {}/{}/{} test_meanings {}/{} test_roles {}/{} addressable {} edit_milli {} logical_bits {} dimensions {} container_bytes {} metadata_bytes {} parameter_bits {} temporary_bytes {}",
                record.family.id(),
                record.split.id(),
                record.representation.id(),
                record.train.exact_sets,
                record.train.total_sets,
                record.train.candidate_true_positive,
                record.train.candidate_predicted,
                record.train.candidate_target,
                record.train.exact_meanings,
                record.train.total_meanings,
                record.train.role_correct,
                record.train.role_total,
                record.test.exact_sets,
                record.test.total_sets,
                record.test.candidate_true_positive,
                record.test.candidate_predicted,
                record.test.candidate_target,
                record.test.exact_meanings,
                record.test.total_meanings,
                record.test.role_correct,
                record.test.role_total,
                record.role_addressable,
                record.role_edit_coordinates_milli,
                record.accounting.logical_payload_bits,
                record.accounting.dimensions,
                record.accounting.container_bytes,
                record.accounting.metadata_bytes,
                record.accounting.model_parameter_bits,
                record.accounting.temporary_bytes,
            )
            .expect("writing to String cannot fail");
        }
        writeln!(
            output,
            "decision role_factorization_useful {} ambiguity_composition_useful {} strong_controls_tie {} representation_specific {} classification {}",
            self.role_factorization_useful,
            self.ambiguity_composition_useful,
            self.strong_controls_tie,
            self.representation_specific(),
            self.classification.id()
        )
        .expect("writing to String cannot fail");
        output
    }

    /// Returns SHA-256 over canonical evidence.
    #[must_use]
    pub fn sha256(&self) -> String {
        sha256_hex(self.canonical_text().as_bytes())
    }

    /// Returns whether the frozen HRR owner has a unique semantic advantage.
    #[must_use]
    pub const fn representation_specific(&self) -> bool {
        matches!(
            self.classification,
            RoleBakeoffClassification::RepresentationSpecific
        )
    }
}

/// Runs the frozen role/ambiguity bakeoff.
#[must_use]
pub fn run_role_bakeoff() -> RoleBakeoffReport {
    let records = build_records();
    derive_report(records)
}

fn build_records() -> Vec<RoleBakeoffRecord> {
    let corpora = generate_role_corpora();
    let documents = generate_analysis_documents().expect("role analyses are valid");
    let splits = generate_role_splits().expect("role splits are valid");
    let predictions = binding_predictions();
    let prediction_map = predictions
        .iter()
        .map(|prediction| {
            (
                (
                    prediction.family,
                    prediction.representation,
                    prediction.meaning_id.as_str(),
                ),
                prediction,
            )
        })
        .collect::<HashMap<_, _>>();
    let control_accounting = run_binding_controls()
        .records
        .into_iter()
        .map(|record| ((record.family, record.representation), record.accounting))
        .collect::<BTreeMap<_, _>>();
    let mut records = Vec::with_capacity(splits.len() * REPRESENTATIONS.len());

    for split in &splits {
        let corpus = corpora
            .iter()
            .find(|corpus| corpus.family() == split.family())
            .expect("split has a corpus");
        let document = documents
            .iter()
            .find(|document| document.family() == split.family())
            .expect("split has an analysis document");
        let surfaces = surface_map(document);
        let trained_meanings = candidate_ids(split.train(), &surfaces);
        let trained_sets = candidate_sets(split.train(), &surfaces);

        for representation in REPRESENTATIONS {
            let train = score_side(
                split.train(),
                &surfaces,
                split.family(),
                representation,
                &prediction_map,
                &trained_meanings,
                &trained_sets,
            );
            let test = score_side(
                split.test(),
                &surfaces,
                split.family(),
                representation,
                &prediction_map,
                &trained_meanings,
                &trained_sets,
            );
            let accounting = if let Some(binding) = representation.binding() {
                control_accounting[&(split.family(), binding)]
            } else {
                whole_accounting(
                    corpus.meanings().len(),
                    document,
                    representation,
                    trained_meanings.len(),
                    trained_sets.len(),
                )
            };
            records.push(RoleBakeoffRecord {
                family: split.family(),
                split: split.kind(),
                representation,
                train,
                test,
                role_addressable: representation.role_addressable(),
                role_edit_coordinates_milli: role_edit_milli(representation),
                accounting,
            });
        }
    }

    records
}

fn derive_report(records: Vec<RoleBakeoffRecord>) -> RoleBakeoffReport {
    let systematic = |record: &&RoleBakeoffRecord| {
        matches!(
            record.split,
            RoleSplitKind::SlotRecombination
                | RoleSplitKind::SharedFiller
                | RoleSplitKind::ObjectRecombination
        )
    };
    let decision_owners = |representation| {
        matches!(
            representation,
            RoleBakeoffRepresentation::TypedRecord
                | RoleBakeoffRepresentation::SparseTpr
                | RoleBakeoffRepresentation::FactoredOneHot
                | RoleBakeoffRepresentation::FactoredDense
                | RoleBakeoffRepresentation::Hrr256
        )
    };
    let role_factorization_useful = records
        .iter()
        .filter(systematic)
        .filter(|record| decision_owners(record.representation))
        .all(|record| record.test.is_perfect())
        && records
            .iter()
            .filter(systematic)
            .filter(|record| {
                matches!(
                    record.representation,
                    RoleBakeoffRepresentation::WholeMeaning
                        | RoleBakeoffRepresentation::WholeAnalysisSet
                )
            })
            .all(|record| record.test.exact_sets < record.test.total_sets);
    let ambiguity_composition_useful = records
        .iter()
        .filter(|record| record.split == RoleSplitKind::SurfaceDisambiguation)
        .filter(|record| decision_owners(record.representation))
        .all(|record| record.test.is_perfect())
        && records
            .iter()
            .filter(|record| record.split == RoleSplitKind::SurfaceDisambiguation)
            .find(|record| record.representation == RoleBakeoffRepresentation::WholeAnalysisSet)
            .is_some_and(|record| record.test.exact_sets == 0)
        && records
            .iter()
            .filter(|record| record.split == RoleSplitKind::SurfaceDisambiguation)
            .find(|record| record.representation == RoleBakeoffRepresentation::WholeMeaning)
            .is_some_and(|record| record.test.is_perfect());
    let strong_controls_tie = records
        .iter()
        .filter(|record| {
            matches!(
                record.representation,
                RoleBakeoffRepresentation::TypedRecord
                    | RoleBakeoffRepresentation::SparseTpr
                    | RoleBakeoffRepresentation::FactoredOneHot
                    | RoleBakeoffRepresentation::FactoredDense
            )
        })
        .all(|record| record.train.is_perfect() && record.test.is_perfect());
    let classification =
        if role_factorization_useful && ambiguity_composition_useful && strong_controls_tie {
            RoleBakeoffClassification::SemanticOnly
        } else {
            RoleBakeoffClassification::Null
        };

    RoleBakeoffReport {
        records,
        role_factorization_useful,
        ambiguity_composition_useful,
        strong_controls_tie,
        classification,
    }
}

/// Returns canonical evidence plus its identity.
#[must_use]
pub fn role_bakeoff_summary() -> String {
    let report = run_role_bakeoff();
    let mut output = report.canonical_text();
    writeln!(output, "role_bakeoff_sha256 {}", report.sha256())
        .expect("writing to String cannot fail");
    output
}

fn surface_map(document: &AnalysisDocument) -> HashMap<&str, &AnalysisSurface> {
    document
        .families()
        .iter()
        .flat_map(AnalysisFamily::surfaces)
        .map(|surface| (surface.id(), surface))
        .collect()
}

fn candidate_ids<'a>(
    references: &[AnalysisRef],
    surfaces: &HashMap<&str, &'a AnalysisSurface>,
) -> BTreeSet<&'a str> {
    references
        .iter()
        .flat_map(|reference| {
            surfaces[reference.surface_id()]
                .candidates()
                .iter()
                .map(String::as_str)
        })
        .collect()
}

fn candidate_sets(
    references: &[AnalysisRef],
    surfaces: &HashMap<&str, &AnalysisSurface>,
) -> BTreeSet<Vec<String>> {
    references
        .iter()
        .map(|reference| surfaces[reference.surface_id()].candidates().to_vec())
        .collect()
}

fn score_side(
    references: &[AnalysisRef],
    surfaces: &HashMap<&str, &AnalysisSurface>,
    family: RoleFixtureFamily,
    representation: RoleBakeoffRepresentation,
    predictions: &HashMap<(RoleFixtureFamily, BindingRepresentation, &str), &BindingPrediction>,
    trained_meanings: &BTreeSet<&str>,
    trained_sets: &BTreeSet<Vec<String>>,
) -> RoleScore {
    let mut score = RoleScore {
        exact_sets: 0,
        total_sets: references.len(),
        candidate_true_positive: 0,
        candidate_predicted: 0,
        candidate_target: 0,
        exact_meanings: 0,
        total_meanings: 0,
        role_correct: 0,
        role_total: 0,
    };
    for reference in references {
        let surface = surfaces[reference.surface_id()];
        let target = surface
            .candidates()
            .iter()
            .map(String::as_str)
            .collect::<BTreeSet<_>>();
        let mut predicted = BTreeSet::new();
        score.candidate_target += target.len();
        score.total_meanings += target.len();
        score.role_total += target.len() * 4;

        if let Some(binding) = representation.binding() {
            for candidate in &target {
                let prediction = predictions[&(family, binding, *candidate)];
                if let Some(predicted_id) = &prediction.predicted_meaning_id {
                    predicted.insert(predicted_id.as_str());
                }
                score.exact_meanings +=
                    usize::from(prediction.predicted_meaning_id.as_deref() == Some(*candidate));
                score.role_correct += prediction.role_correct;
            }
        } else if representation == RoleBakeoffRepresentation::WholeMeaning {
            for candidate in &target {
                if trained_meanings.contains(candidate) {
                    predicted.insert(*candidate);
                    score.exact_meanings += 1;
                    score.role_correct += 4;
                }
            }
        } else if trained_sets.contains(surface.candidates()) {
            predicted.extend(&target);
            score.exact_meanings += target.len();
            score.role_correct += target.len() * 4;
        }

        score.candidate_true_positive += predicted.intersection(&target).count();
        score.candidate_predicted += predicted.len();
        score.exact_sets += usize::from(predicted == target);
    }
    score
}

fn whole_accounting(
    meanings: usize,
    document: &AnalysisDocument,
    representation: RoleBakeoffRepresentation,
    trained_meanings: usize,
    trained_sets: usize,
) -> BindingAccounting {
    match representation {
        RoleBakeoffRepresentation::WholeMeaning => BindingAccounting {
            logical_payload_bits: 9,
            dimensions: meanings,
            container_bytes: meanings.div_ceil(8),
            metadata_bytes: trained_meanings * 10,
            model_parameter_bits: 0,
            temporary_bytes: meanings.div_ceil(8),
        },
        RoleBakeoffRepresentation::WholeAnalysisSet => {
            let possible_sets = document
                .families()
                .iter()
                .flat_map(AnalysisFamily::surfaces)
                .map(|surface| surface.candidates().to_vec())
                .collect::<BTreeSet<_>>()
                .len();
            BindingAccounting {
                logical_payload_bits: 9,
                dimensions: possible_sets,
                container_bytes: possible_sets.div_ceil(8),
                metadata_bytes: trained_sets * 18,
                model_parameter_bits: 0,
                temporary_bytes: possible_sets.div_ceil(8),
            }
        }
        _ => unreachable!(),
    }
}

const fn role_edit_milli(representation: RoleBakeoffRepresentation) -> usize {
    match representation {
        RoleBakeoffRepresentation::TypedRecord => 1_000,
        RoleBakeoffRepresentation::SparseTpr
        | RoleBakeoffRepresentation::FactoredOneHot
        | RoleBakeoffRepresentation::WholeMeaning
        | RoleBakeoffRepresentation::WholeAnalysisSet => 2_000,
        RoleBakeoffRepresentation::FactoredDense => 2_666,
        RoleBakeoffRepresentation::Hrr64 => 64_000,
        RoleBakeoffRepresentation::Hrr128 => 128_000,
        RoleBakeoffRepresentation::Hrr256 => 256_000,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn classification_is_semantic_only() {
        let report = run_role_bakeoff();
        assert!(report.role_factorization_useful);
        assert!(report.ambiguity_composition_useful);
        assert!(report.strong_controls_tie);
        assert!(!report.representation_specific());
        assert_eq!(
            report.classification,
            RoleBakeoffClassification::SemanticOnly
        );
    }
}
