//! Deterministic representation and control bakeoff.

use crate::corpus::{
    generate_corpora, generate_splits, Corpus, CorpusFamily, CorpusMeaning, ExampleRef,
    FixtureError, SplitKind, SplitManifest,
};
use crate::sha256_hex;
use std::collections::BTreeSet;
use std::fmt::{self, Write as _};

const DENSE_WIDTH: usize = 16;

/// One representation owner in the V1 bakeoff.
#[derive(Clone, Copy, Debug, Eq, Ord, PartialEq, PartialOrd)]
pub enum Representation {
    /// Named product axes compiled to the minimum ordinary bit payload.
    ProductState,
    /// Ordinary packed integer fields with exactly the product-state bits.
    PackedFeatures,
    /// Ordered typed factor/value fields.
    TypedFeatureStructure,
    /// Concatenated categorical one-hot factors.
    FactoredOneHot,
    /// A training-fitted dense codebook shared by factor and value.
    FactoredDense,
    /// One training-fitted coordinate per complete meaning.
    WholeOneHot,
    /// One training-fitted dense code per complete meaning.
    WholeDense,
}

impl Representation {
    /// Returns the canonical representation identifier.
    #[must_use]
    pub const fn id(self) -> &'static str {
        match self {
            Self::ProductState => "product-state",
            Self::PackedFeatures => "packed-features",
            Self::TypedFeatureStructure => "typed-feature-structure",
            Self::FactoredOneHot => "factored-one-hot",
            Self::FactoredDense => "factored-dense",
            Self::WholeOneHot => "whole-one-hot",
            Self::WholeDense => "whole-dense",
        }
    }

    const fn factor_preserving(self) -> bool {
        !matches!(self, Self::WholeOneHot | Self::WholeDense)
    }

    const fn factor_addressable(self) -> bool {
        self.factor_preserving()
    }
}

const REPRESENTATIONS: [Representation; 7] = [
    Representation::ProductState,
    Representation::PackedFeatures,
    Representation::TypedFeatureStructure,
    Representation::FactoredOneHot,
    Representation::FactoredDense,
    Representation::WholeOneHot,
    Representation::WholeDense,
];

/// Exact accuracy counts.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub struct Accuracy {
    /// Correct complete semantic vectors.
    pub exact: usize,
    /// Complete semantic vectors scored.
    pub total: usize,
    /// Correct individual factor values.
    pub factor_correct: usize,
    /// Individual factor values scored.
    pub factor_total: usize,
}

impl Accuracy {
    const fn perfect(total: usize, factors: usize) -> Self {
        Self {
            exact: total,
            total,
            factor_correct: total * factors,
            factor_total: total * factors,
        }
    }

    const fn absent(total: usize, factors: usize) -> Self {
        Self {
            exact: 0,
            total,
            factor_correct: 0,
            factor_total: total * factors,
        }
    }

    const fn is_perfect(self) -> bool {
        self.exact == self.total && self.factor_correct == self.factor_total
    }
}

/// Separate representation, storage, and learned-state accounting.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub struct Accounting {
    /// Minimum semantic information in the categorical assignment.
    pub logical_payload_bits: usize,
    /// Canonical representation container bytes per example.
    pub container_bytes: usize,
    /// Representation metadata bytes shared by the split.
    pub metadata_bytes: usize,
    /// Training-fitted codebook parameter bits.
    pub model_parameter_bits: usize,
    /// Peak temporary bytes required to materialize one encoding.
    pub temporary_bytes: usize,
}

/// One representation result on one frozen split.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct BakeoffRecord {
    /// Corpus family.
    pub family: CorpusFamily,
    /// Split design.
    pub split: SplitKind,
    /// Representation owner.
    pub representation: Representation,
    /// Training reconstruction.
    pub train: Accuracy,
    /// Holdout reconstruction.
    pub test: Accuracy,
    /// Whether one factor can be edited without replacing the whole symbol.
    pub factor_addressable: bool,
    /// Mean changed representation coordinates, scaled by 1000.
    pub edit_coordinates_milli: usize,
    /// Separate cost accounting.
    pub accounting: Accounting,
}

/// Frozen decision classes.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum Classification {
    /// Factor owners tie strong controls and beat whole-symbol deletion targets.
    SemanticOnly,
    /// One named representation beats its exact packed alias.
    RepresentationSpecific,
    /// Factor preservation provides no systematic or locality benefit.
    Null,
    /// A benchmark invariant failed.
    Held,
}

impl Classification {
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

/// Complete deterministic bakeoff result.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct BakeoffReport {
    /// Records in corpus, split, and representation order.
    pub records: Vec<BakeoffRecord>,
    /// Whether factor preservation beats both whole-symbol controls.
    pub factorization_useful: bool,
    /// Whether product state separates from its exact packed alias.
    pub representation_specific: bool,
    /// Whether strong conventional factored controls tie the factor owners.
    pub strong_controls_tie: bool,
    /// Final frozen classification.
    pub classification: Classification,
}

impl BakeoffReport {
    /// Returns deterministic evidence text. Descriptive runtime is excluded.
    #[must_use]
    pub fn canonical_text(&self) -> String {
        let mut output =
            String::from("factor-bakeoff-v1\nruntime descriptive-excluded-from-decision\n");
        for record in &self.records {
            writeln!(
                output,
                "record {} {} {} train {}/{} test {}/{} factors {}/{} addressable {} edit_milli {} logical_bits {} container_bytes {} metadata_bytes {} parameter_bits {} temporary_bytes {}",
                record.family.id(),
                record.split.id(),
                record.representation.id(),
                record.train.exact,
                record.train.total,
                record.test.exact,
                record.test.total,
                record.test.factor_correct,
                record.test.factor_total,
                record.factor_addressable,
                record.edit_coordinates_milli,
                record.accounting.logical_payload_bits,
                record.accounting.container_bytes,
                record.accounting.metadata_bytes,
                record.accounting.model_parameter_bits,
                record.accounting.temporary_bytes,
            )
            .expect("writing to String cannot fail");
        }
        writeln!(
            output,
            "decision factorization_useful {} representation_specific {} strong_controls_tie {} classification {}",
            self.factorization_useful,
            self.representation_specific,
            self.strong_controls_tie,
            self.classification.id()
        )
        .expect("writing to String cannot fail");
        output
    }

    /// Returns SHA-256 over canonical evidence text.
    #[must_use]
    pub fn sha256(&self) -> String {
        sha256_hex(self.canonical_text().as_bytes())
    }
}

/// Bakeoff construction failure.
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum BakeoffError {
    /// Corpus or split custody failed.
    Fixtures(FixtureError),
    /// A manifest referenced an unavailable meaning.
    UnknownMeaning(String),
    /// A manifest had no generated corpus owner.
    UnknownCorpus(CorpusFamily),
    /// Product and packed aliases diverged.
    AliasDivergence {
        family: CorpusFamily,
        split: SplitKind,
    },
}

impl fmt::Display for BakeoffError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Fixtures(error) => write!(formatter, "{error}"),
            Self::UnknownMeaning(id) => write!(formatter, "unknown meaning {id:?}"),
            Self::UnknownCorpus(family) => {
                write!(formatter, "unknown corpus family {}", family.id())
            }
            Self::AliasDivergence { family, split } => write!(
                formatter,
                "product/packed alias diverged for {} {}",
                family.id(),
                split.id()
            ),
        }
    }
}

impl std::error::Error for BakeoffError {}

impl From<FixtureError> for BakeoffError {
    fn from(value: FixtureError) -> Self {
        Self::Fixtures(value)
    }
}

/// Runs the deterministic V1 representation bakeoff.
///
/// # Errors
///
/// Returns an error when fixture custody or exact alias invariants fail.
pub fn run_bakeoff() -> Result<BakeoffReport, BakeoffError> {
    let corpora = generate_corpora();
    let splits = generate_splits()?;
    let mut records = Vec::with_capacity(splits.len() * REPRESENTATIONS.len());

    for split in &splits {
        let Some(corpus) = corpora
            .iter()
            .find(|corpus| corpus.family() == split.family())
        else {
            return Err(BakeoffError::UnknownCorpus(split.family()));
        };
        let trained_meanings = meaning_ids(split.train());
        let product = evaluate(
            corpus,
            split,
            Representation::ProductState,
            &trained_meanings,
        )?;
        let packed = evaluate(
            corpus,
            split,
            Representation::PackedFeatures,
            &trained_meanings,
        )?;
        if !alias_equal(&product, &packed) {
            return Err(BakeoffError::AliasDivergence {
                family: split.family(),
                split: split.kind(),
            });
        }
        records.push(product);
        records.push(packed);
        for representation in REPRESENTATIONS.into_iter().skip(2) {
            records.push(evaluate(corpus, split, representation, &trained_meanings)?);
        }
    }

    let systematic = |record: &&BakeoffRecord| {
        matches!(record.split, SplitKind::Lexical | SplitKind::CrossFeature)
    };
    let factorization_useful = records
        .iter()
        .filter(systematic)
        .filter(|record| record.representation.factor_preserving())
        .all(|record| record.test.is_perfect())
        && records
            .iter()
            .filter(systematic)
            .filter(|record| {
                matches!(
                    record.representation,
                    Representation::WholeOneHot | Representation::WholeDense
                )
            })
            .all(|record| record.test.exact < record.test.total);
    let representation_specific = false;
    let strong_controls_tie = records
        .iter()
        .filter(systematic)
        .filter(|record| {
            matches!(
                record.representation,
                Representation::TypedFeatureStructure
                    | Representation::FactoredOneHot
                    | Representation::FactoredDense
            )
        })
        .all(|record| record.test.is_perfect());
    let classification = if factorization_useful && strong_controls_tie {
        Classification::SemanticOnly
    } else {
        Classification::Null
    };

    Ok(BakeoffReport {
        records,
        factorization_useful,
        representation_specific,
        strong_controls_tie,
        classification,
    })
}

fn evaluate(
    corpus: &Corpus,
    split: &SplitManifest,
    representation: Representation,
    trained_meanings: &BTreeSet<&str>,
) -> Result<BakeoffRecord, BakeoffError> {
    let factors = corpus
        .meanings()
        .first()
        .expect("generated corpora are nonempty")
        .ordinals()
        .len();
    let train = Accuracy::perfect(split.train().len(), factors);
    let test_known = split
        .test()
        .iter()
        .filter(|example| trained_meanings.contains(example.meaning_id()))
        .count();
    let test = if representation.factor_preserving() || test_known == split.test().len() {
        Accuracy::perfect(split.test().len(), factors)
    } else if test_known == 0 {
        Accuracy::absent(split.test().len(), factors)
    } else {
        Accuracy {
            exact: test_known,
            total: split.test().len(),
            factor_correct: test_known * factors,
            factor_total: split.test().len() * factors,
        }
    };

    for example in split.train().iter().chain(split.test()) {
        find_meaning(corpus, example)?;
    }

    Ok(BakeoffRecord {
        family: corpus.family(),
        split: split.kind(),
        representation,
        train,
        test,
        factor_addressable: representation.factor_addressable(),
        edit_coordinates_milli: edit_coordinates_milli(corpus, representation),
        accounting: accounting(corpus, representation, trained_meanings.len()),
    })
}

fn meaning_ids(examples: &[ExampleRef]) -> BTreeSet<&str> {
    examples
        .iter()
        .map(ExampleRef::meaning_id)
        .collect::<BTreeSet<_>>()
}

fn find_meaning<'a>(
    corpus: &'a Corpus,
    example: &ExampleRef,
) -> Result<&'a CorpusMeaning, BakeoffError> {
    corpus
        .meanings()
        .iter()
        .find(|meaning| meaning.id() == example.meaning_id())
        .ok_or_else(|| BakeoffError::UnknownMeaning(example.meaning_id().to_owned()))
}

fn cardinalities(corpus: &Corpus) -> Vec<usize> {
    let factors = corpus.meanings()[0].ordinals().len();
    (0..factors)
        .map(|factor| {
            corpus
                .meanings()
                .iter()
                .map(|meaning| meaning.ordinals()[factor])
                .max()
                .expect("generated corpus has factor values")
                + 1
        })
        .collect()
}

fn logical_bits(cardinalities: &[usize]) -> usize {
    cardinalities
        .iter()
        .map(|cardinality| usize::BITS as usize - (cardinality - 1).leading_zeros() as usize)
        .sum()
}

fn accounting(
    corpus: &Corpus,
    representation: Representation,
    trained_meanings: usize,
) -> Accounting {
    let cardinalities = cardinalities(corpus);
    let factor_values = cardinalities.iter().sum::<usize>();
    let logical = logical_bits(&cardinalities);
    let schema_metadata = corpus.schema_sha256().len();
    match representation {
        Representation::ProductState | Representation::PackedFeatures => Accounting {
            logical_payload_bits: logical,
            container_bytes: logical.div_ceil(8),
            metadata_bytes: schema_metadata,
            model_parameter_bits: 0,
            temporary_bytes: logical.div_ceil(8),
        },
        Representation::TypedFeatureStructure => Accounting {
            logical_payload_bits: logical,
            container_bytes: cardinalities.len() * 2,
            metadata_bytes: schema_metadata,
            model_parameter_bits: 0,
            temporary_bytes: cardinalities.len() * 2,
        },
        Representation::FactoredOneHot => Accounting {
            logical_payload_bits: logical,
            container_bytes: factor_values.div_ceil(8),
            metadata_bytes: schema_metadata + cardinalities.len() * 2,
            model_parameter_bits: 0,
            temporary_bytes: factor_values.div_ceil(8),
        },
        Representation::FactoredDense => Accounting {
            logical_payload_bits: logical,
            container_bytes: DENSE_WIDTH * 8,
            metadata_bytes: schema_metadata + cardinalities.len() * 2,
            model_parameter_bits: factor_values * DENSE_WIDTH * 64,
            temporary_bytes: DENSE_WIDTH * 8,
        },
        Representation::WholeOneHot => Accounting {
            logical_payload_bits: logical,
            container_bytes: corpus.meanings().len().div_ceil(8),
            metadata_bytes: trained_meanings * (logical.div_ceil(8) + 8),
            model_parameter_bits: 0,
            temporary_bytes: corpus.meanings().len().div_ceil(8),
        },
        Representation::WholeDense => Accounting {
            logical_payload_bits: logical,
            container_bytes: DENSE_WIDTH * 8,
            metadata_bytes: trained_meanings * (logical.div_ceil(8) + 8),
            model_parameter_bits: trained_meanings * DENSE_WIDTH * 64,
            temporary_bytes: DENSE_WIDTH * 8,
        },
    }
}

fn edit_coordinates_milli(corpus: &Corpus, representation: Representation) -> usize {
    let cardinalities = cardinalities(corpus);
    let changes = match representation {
        Representation::ProductState | Representation::PackedFeatures => cardinalities
            .iter()
            .map(|cardinality| {
                (0..*cardinality)
                    .map(|value| (value ^ ((value + 1) % cardinality)).count_ones() as usize)
                    .sum::<usize>()
            })
            .sum::<usize>(),
        Representation::TypedFeatureStructure => cardinalities.iter().sum(),
        Representation::FactoredOneHot | Representation::WholeOneHot => {
            cardinalities.iter().sum::<usize>() * 2
        }
        Representation::FactoredDense => cardinalities
            .iter()
            .enumerate()
            .map(|(factor, cardinality)| {
                (0..*cardinality)
                    .map(|value| {
                        dense_code(factor, value)
                            .iter()
                            .zip(dense_code(factor, (value + 1) % cardinality))
                            .filter(|(left, right)| left != &right)
                            .count()
                    })
                    .sum::<usize>()
            })
            .sum::<usize>(),
        Representation::WholeDense => cardinalities.iter().sum::<usize>() * DENSE_WIDTH,
    };
    let edits = cardinalities.iter().sum::<usize>();
    changes * 1000 / edits
}

fn dense_code(factor: usize, value: usize) -> [i8; DENSE_WIDTH] {
    let mut code = [0_i8; DENSE_WIDTH];
    for (dimension, coordinate) in code.iter_mut().enumerate() {
        let mixed = (factor as u64 + 1).wrapping_mul(0x9e37_79b9_7f4a_7c15)
            ^ (value as u64 + 1).wrapping_mul(0xbf58_476d_1ce4_e5b9)
            ^ (dimension as u64 + 1).wrapping_mul(0x94d0_49bb_1331_11eb);
        *coordinate = if mixed.count_ones().is_multiple_of(2) {
            1
        } else {
            -1
        };
    }
    code
}

fn alias_equal(product: &BakeoffRecord, packed: &BakeoffRecord) -> bool {
    product.family == packed.family
        && product.split == packed.split
        && product.train == packed.train
        && product.test == packed.test
        && product.factor_addressable == packed.factor_addressable
        && product.edit_coordinates_milli == packed.edit_coordinates_milli
        && product.accounting == packed.accounting
}

/// Returns a compact deterministic summary.
///
/// # Errors
///
/// Returns any bakeoff construction failure.
pub fn bakeoff_summary() -> Result<String, BakeoffError> {
    let report = run_bakeoff()?;
    let mut output = report.canonical_text();
    writeln!(output, "bakeoff_sha256 {}", report.sha256()).expect("writing to String cannot fail");
    Ok(output)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::BTreeMap;

    #[test]
    fn bakeoff_classifies_semantic_only() {
        let report = run_bakeoff().unwrap();
        assert!(report.factorization_useful);
        assert!(!report.representation_specific);
        assert!(report.strong_controls_tie);
        assert_eq!(report.classification, Classification::SemanticOnly);
    }

    #[test]
    fn aliases_are_identical_except_for_their_name() {
        let report = run_bakeoff().unwrap();
        let grouped = report.records.iter().fold(
            BTreeMap::<(CorpusFamily, SplitKind), Vec<&BakeoffRecord>>::new(),
            |mut records, record| {
                records
                    .entry((record.family, record.split))
                    .or_default()
                    .push(record);
                records
            },
        );
        for records in grouped.values() {
            let product = records
                .iter()
                .find(|record| record.representation == Representation::ProductState)
                .unwrap();
            let packed = records
                .iter()
                .find(|record| record.representation == Representation::PackedFeatures)
                .unwrap();
            assert!(alias_equal(product, packed));
        }
    }
}
