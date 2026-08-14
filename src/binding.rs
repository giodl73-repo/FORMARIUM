//! Exact and approximate role/filler binding controls.

use crate::role_fixtures::{generate_role_corpora, RoleCorpus, RoleFixtureFamily, RoleMeaning};
use crate::sha256_hex;
use std::collections::{BTreeMap, BTreeSet};
use std::f64::consts::PI;
use std::fmt::Write as _;

/// Frozen HRR seed from the Wave 2 research contract.
pub const HRR_SEED: u64 = 0x4641_4354_4f52_2d32;
const DENSE_DIMENSIONS: usize = 16;
const HRR_DIMENSIONS: [usize; 3] = [64, 128, 256];

/// One binding representation owner.
#[derive(Clone, Copy, Debug, Eq, Hash, Ord, PartialEq, PartialOrd)]
pub enum BindingRepresentation {
    /// Ordered role/slot to filler records.
    TypedRecord,
    /// Sparse nonzero coordinates in an exact role-by-filler tensor product.
    SparseTpr,
    /// Concatenated one-hot filler coordinates per role slot.
    FactoredOneHot,
    /// Concatenated dense codebook segments per role slot.
    FactoredDense,
    /// Holographic reduced representation at 64 coordinates.
    Hrr64,
    /// Holographic reduced representation at 128 coordinates.
    Hrr128,
    /// Holographic reduced representation at 256 coordinates.
    Hrr256,
}

impl BindingRepresentation {
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
        }
    }

    const fn hrr_dimensions(self) -> Option<usize> {
        match self {
            Self::Hrr64 => Some(64),
            Self::Hrr128 => Some(128),
            Self::Hrr256 => Some(256),
            _ => None,
        }
    }
}

const REPRESENTATIONS: [BindingRepresentation; 7] = [
    BindingRepresentation::TypedRecord,
    BindingRepresentation::SparseTpr,
    BindingRepresentation::FactoredOneHot,
    BindingRepresentation::FactoredDense,
    BindingRepresentation::Hrr64,
    BindingRepresentation::Hrr128,
    BindingRepresentation::Hrr256,
];

/// Separate binding representation costs.
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub struct BindingAccounting {
    /// Minimum logical semantic payload from the source schema.
    pub logical_payload_bits: usize,
    /// Declared representation coordinate count.
    pub dimensions: usize,
    /// Canonical container bytes per meaning.
    pub container_bytes: usize,
    /// Shared frame and layout metadata bytes.
    pub metadata_bytes: usize,
    /// Codebook or basis parameter bits.
    pub model_parameter_bits: usize,
    /// Peak temporary bytes used by one encode/decode path.
    pub temporary_bytes: usize,
}

/// One representation result over one complete fixture family.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct BindingControlRecord {
    /// Fixture family.
    pub family: RoleFixtureFamily,
    /// Representation owner.
    pub representation: BindingRepresentation,
    /// Meanings reconstructed exactly.
    pub exact_meanings: usize,
    /// Meanings scored.
    pub total_meanings: usize,
    /// Role fillers reconstructed correctly.
    pub role_correct: usize,
    /// Role fillers scored.
    pub role_total: usize,
    /// Separate cost accounting.
    pub accounting: BindingAccounting,
}

impl BindingControlRecord {
    /// Returns whether every meaning and role binding reconstructed exactly.
    #[must_use]
    pub const fn is_perfect(&self) -> bool {
        self.exact_meanings == self.total_meanings && self.role_correct == self.role_total
    }
}

/// Complete deterministic binding-control evidence.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct BindingControlReport {
    /// Records in family and representation order.
    pub records: Vec<BindingControlRecord>,
}

/// One meaning-level prediction used by the split bakeoff.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct BindingPrediction {
    /// Fixture family.
    pub family: RoleFixtureFamily,
    /// Representation owner.
    pub representation: BindingRepresentation,
    /// Source meaning identifier.
    pub meaning_id: String,
    /// Predicted admitted meaning identifier, when role decoding stays valid.
    pub predicted_meaning_id: Option<String>,
    /// Correct role fillers.
    pub role_correct: usize,
    /// Role fillers scored.
    pub role_total: usize,
}

impl BindingControlReport {
    /// Returns canonical non-runtime evidence text.
    #[must_use]
    pub fn canonical_text(&self) -> String {
        let mut output = format!(
            "factor-binding-controls-v1\nhrr_seed {HRR_SEED:016x}\nhrr_dimensions 64 128 256\nhrr_decision_owner 256\nhrr_binding circular-convolution\nhrr_unbinding involution\nhrr_cleanup nearest-cosine-domain\nruntime descriptive-excluded\n"
        );
        for record in &self.records {
            writeln!(
                output,
                "record {} {} exact {}/{} roles {}/{} logical_bits {} dimensions {} container_bytes {} metadata_bytes {} parameter_bits {} temporary_bytes {}",
                record.family.id(),
                record.representation.id(),
                record.exact_meanings,
                record.total_meanings,
                record.role_correct,
                record.role_total,
                record.accounting.logical_payload_bits,
                record.accounting.dimensions,
                record.accounting.container_bytes,
                record.accounting.metadata_bytes,
                record.accounting.model_parameter_bits,
                record.accounting.temporary_bytes,
            )
            .expect("writing to String cannot fail");
        }
        output
    }

    /// Returns SHA-256 over canonical binding evidence.
    #[must_use]
    pub fn sha256(&self) -> String {
        sha256_hex(self.canonical_text().as_bytes())
    }
}

#[derive(Clone, Debug)]
struct BindingFrame {
    logical_payload_bits: usize,
    metadata_bytes: usize,
    roles: Vec<RoleSlot>,
    global_fillers: Vec<String>,
}

#[derive(Clone, Debug)]
struct RoleSlot {
    id: &'static str,
    factor_index: usize,
    domain: &'static str,
    fillers: &'static [&'static str],
}

impl BindingFrame {
    fn for_corpus(corpus: &RoleCorpus) -> Self {
        let roles = match corpus.family() {
            RoleFixtureFamily::Transfer => vec![
                RoleSlot {
                    id: "giver/sole",
                    factor_index: 0,
                    domain: "entity",
                    fillers: &["robot", "child", "artist", "scientist"],
                },
                RoleSlot {
                    id: "recipient/primary",
                    factor_index: 2,
                    domain: "entity",
                    fillers: &["robot", "child", "artist", "scientist"],
                },
                RoleSlot {
                    id: "recipient/secondary",
                    factor_index: 3,
                    domain: "entity",
                    fillers: &["robot", "child", "artist", "scientist"],
                },
                RoleSlot {
                    id: "theme/sole",
                    factor_index: 1,
                    domain: "theme",
                    fillers: &["book", "package"],
                },
            ],
            RoleFixtureFamily::Attachment => vec![
                RoleSlot {
                    id: "instrument/sole",
                    factor_index: 3,
                    domain: "object",
                    fillers: &["none", "camera", "telescope"],
                },
                RoleSlot {
                    id: "observer/sole",
                    factor_index: 0,
                    domain: "entity",
                    fillers: &["robot", "child", "artist", "scientist"],
                },
                RoleSlot {
                    id: "patient/sole",
                    factor_index: 2,
                    domain: "entity",
                    fillers: &["robot", "child", "artist", "scientist"],
                },
                RoleSlot {
                    id: "patient-associated-object/sole",
                    factor_index: 4,
                    domain: "object",
                    fillers: &["none", "camera", "telescope"],
                },
            ],
        };
        let global_fillers = roles
            .iter()
            .flat_map(|role| {
                role.fillers
                    .iter()
                    .map(move |filler| format!("{}:{filler}", role.domain))
            })
            .collect::<BTreeSet<_>>()
            .into_iter()
            .collect();
        Self {
            logical_payload_bits: match corpus.family() {
                RoleFixtureFamily::Transfer | RoleFixtureFamily::Attachment => 9,
            },
            metadata_bytes: corpus.frame_text().len(),
            roles,
            global_fillers,
        }
    }

    fn role_fillers(&self, meaning: &RoleMeaning) -> Vec<usize> {
        self.roles
            .iter()
            .map(|role| meaning.ordinals()[role.factor_index])
            .collect()
    }

    fn global_filler_index(&self, role: &RoleSlot, filler: usize) -> usize {
        let key = format!("{}:{}", role.domain, role.fillers[filler]);
        self.global_fillers
            .binary_search(&key)
            .expect("frame filler is globally declared")
    }
}

/// Runs all exact controls and every frozen HRR dimension.
#[must_use]
pub fn run_binding_controls() -> BindingControlReport {
    let mut records = Vec::new();
    for corpus in generate_role_corpora() {
        let frame = BindingFrame::for_corpus(&corpus);
        let hrr = HrrOwner::new(&frame);
        for representation in REPRESENTATIONS {
            let (exact_meanings, role_correct) = if representation.hrr_dimensions().is_some() {
                evaluate_hrr(&frame, &corpus, &hrr, representation)
            } else {
                evaluate_exact(&frame, &corpus, representation)
            };
            records.push(BindingControlRecord {
                family: corpus.family(),
                representation,
                exact_meanings,
                total_meanings: corpus.meanings().len(),
                role_correct,
                role_total: corpus.meanings().len() * frame.roles.len(),
                accounting: accounting(&frame, representation),
            });
        }
    }
    BindingControlReport { records }
}

/// Returns meaning-level predictions for every family and representation.
#[must_use]
pub fn binding_predictions() -> Vec<BindingPrediction> {
    let mut predictions = Vec::new();
    for corpus in generate_role_corpora() {
        let frame = BindingFrame::for_corpus(&corpus);
        let hrr = HrrOwner::new(&frame);
        let meaning_ids = corpus
            .meanings()
            .iter()
            .map(|meaning| (meaning.ordinals().to_vec(), meaning.id().to_owned()))
            .collect::<BTreeMap<_, _>>();
        for representation in REPRESENTATIONS {
            for meaning in corpus.meanings() {
                let expected = frame.role_fillers(meaning);
                let decoded = decode_binding(&frame, &hrr, representation, &expected);
                let role_correct = expected
                    .iter()
                    .zip(&decoded)
                    .filter(|(left, right)| left == right)
                    .count();
                let mut predicted_ordinals = meaning.ordinals().to_vec();
                for (role, filler) in frame.roles.iter().zip(&decoded) {
                    predicted_ordinals[role.factor_index] = *filler;
                }
                predictions.push(BindingPrediction {
                    family: corpus.family(),
                    representation,
                    meaning_id: meaning.id().to_owned(),
                    predicted_meaning_id: meaning_ids.get(&predicted_ordinals).cloned(),
                    role_correct,
                    role_total: frame.roles.len(),
                });
            }
        }
    }
    predictions
}

/// Returns a compact deterministic control summary.
#[must_use]
pub fn binding_control_summary() -> String {
    let report = run_binding_controls();
    let mut output = report.canonical_text();
    writeln!(output, "binding_sha256 {}", report.sha256()).expect("writing to String cannot fail");
    output
}

fn evaluate_exact(
    frame: &BindingFrame,
    corpus: &RoleCorpus,
    representation: BindingRepresentation,
) -> (usize, usize) {
    let mut exact = 0;
    let mut role_correct = 0;
    for meaning in corpus.meanings() {
        let expected = frame.role_fillers(meaning);
        let decoded = decode_exact(frame, representation, &expected);
        role_correct += expected
            .iter()
            .zip(&decoded)
            .filter(|(left, right)| left == right)
            .count();
        exact += usize::from(expected == decoded);
    }
    (exact, role_correct)
}

fn decode_binding(
    frame: &BindingFrame,
    hrr: &HrrOwner,
    representation: BindingRepresentation,
    expected: &[usize],
) -> Vec<usize> {
    if let Some(dimensions) = representation.hrr_dimensions() {
        let encoded = hrr.encode(frame, expected, dimensions);
        frame
            .roles
            .iter()
            .map(|role| hrr.decode_role(&encoded, role, dimensions))
            .collect()
    } else {
        decode_exact(frame, representation, expected)
    }
}

fn decode_exact(
    frame: &BindingFrame,
    representation: BindingRepresentation,
    expected: &[usize],
) -> Vec<usize> {
    match representation {
        BindingRepresentation::TypedRecord => decode_typed(&encode_typed(expected)),
        BindingRepresentation::SparseTpr => decode_tpr(frame, &encode_tpr(frame, expected)),
        BindingRepresentation::FactoredOneHot => {
            decode_one_hot(frame, &encode_one_hot(frame, expected))
        }
        BindingRepresentation::FactoredDense => decode_dense(frame, &encode_dense(frame, expected)),
        _ => unreachable!(),
    }
}

fn encode_typed(fillers: &[usize]) -> Vec<u16> {
    fillers
        .iter()
        .map(|filler| u16::try_from(*filler).expect("fixture filler fits u16"))
        .collect()
}

fn decode_typed(encoded: &[u16]) -> Vec<usize> {
    encoded.iter().map(|value| usize::from(*value)).collect()
}

fn encode_tpr(frame: &BindingFrame, fillers: &[usize]) -> Vec<(u16, u16)> {
    frame
        .roles
        .iter()
        .zip(fillers)
        .enumerate()
        .map(|(role_index, (role, filler))| {
            (
                u16::try_from(role_index).expect("fixture role fits u16"),
                u16::try_from(frame.global_filler_index(role, *filler))
                    .expect("fixture filler fits u16"),
            )
        })
        .collect()
}

fn decode_tpr(frame: &BindingFrame, encoded: &[(u16, u16)]) -> Vec<usize> {
    encoded
        .iter()
        .enumerate()
        .map(|(role_index, (encoded_role, global_filler))| {
            assert_eq!(usize::from(*encoded_role), role_index);
            let key = &frame.global_fillers[usize::from(*global_filler)];
            let role = &frame.roles[role_index];
            role.fillers
                .iter()
                .position(|filler| key == &format!("{}:{filler}", role.domain))
                .expect("global filler belongs to role domain")
        })
        .collect()
}

fn encode_one_hot(frame: &BindingFrame, fillers: &[usize]) -> Vec<u8> {
    let dimensions = frame
        .roles
        .iter()
        .map(|role| role.fillers.len())
        .sum::<usize>();
    let mut encoded = vec![0_u8; dimensions];
    let mut offset = 0;
    for (role, filler) in frame.roles.iter().zip(fillers) {
        encoded[offset + filler] = 1;
        offset += role.fillers.len();
    }
    encoded
}

fn decode_one_hot(frame: &BindingFrame, encoded: &[u8]) -> Vec<usize> {
    let mut offset = 0;
    frame
        .roles
        .iter()
        .map(|role| {
            let segment = &encoded[offset..offset + role.fillers.len()];
            offset += role.fillers.len();
            segment
                .iter()
                .position(|coordinate| *coordinate == 1)
                .expect("one-hot segment has one active coordinate")
        })
        .collect()
}

fn encode_dense(frame: &BindingFrame, fillers: &[usize]) -> Vec<i8> {
    let segment = DENSE_DIMENSIONS / frame.roles.len();
    let mut encoded = vec![0_i8; DENSE_DIMENSIONS];
    for (role_index, filler) in fillers.iter().enumerate() {
        let code = local_dense_code(*filler, segment);
        encoded[role_index * segment..(role_index + 1) * segment].copy_from_slice(&code);
    }
    encoded
}

fn decode_dense(frame: &BindingFrame, encoded: &[i8]) -> Vec<usize> {
    let segment = DENSE_DIMENSIONS / frame.roles.len();
    frame
        .roles
        .iter()
        .enumerate()
        .map(|(role_index, role)| {
            let observed = &encoded[role_index * segment..(role_index + 1) * segment];
            (0..role.fillers.len())
                .min_by_key(|filler| {
                    observed
                        .iter()
                        .zip(local_dense_code(*filler, segment))
                        .filter(|(left, right)| left != &right)
                        .count()
                })
                .expect("role domain is nonempty")
        })
        .collect()
}

fn local_dense_code(value: usize, dimensions: usize) -> Vec<i8> {
    (0..dimensions)
        .map(|dimension| {
            let bit = (value >> (dimension % 2)) & 1;
            if bit == 0 {
                -1
            } else {
                1
            }
        })
        .collect()
}

fn accounting(frame: &BindingFrame, representation: BindingRepresentation) -> BindingAccounting {
    let roles = frame.roles.len();
    let factored_dimensions = frame
        .roles
        .iter()
        .map(|role| role.fillers.len())
        .sum::<usize>();
    if let Some(dimensions) = representation.hrr_dimensions() {
        let basis_count = roles + frame.global_fillers.len();
        return BindingAccounting {
            logical_payload_bits: frame.logical_payload_bits,
            dimensions,
            container_bytes: dimensions * 8,
            metadata_bytes: frame.metadata_bytes,
            model_parameter_bits: basis_count * dimensions * 64,
            temporary_bytes: dimensions * 16 * 3,
        };
    }
    match representation {
        BindingRepresentation::TypedRecord => BindingAccounting {
            logical_payload_bits: frame.logical_payload_bits,
            dimensions: roles,
            container_bytes: roles * 2,
            metadata_bytes: frame.metadata_bytes,
            model_parameter_bits: 0,
            temporary_bytes: roles * 2,
        },
        BindingRepresentation::SparseTpr => BindingAccounting {
            logical_payload_bits: frame.logical_payload_bits,
            dimensions: roles * frame.global_fillers.len(),
            container_bytes: roles * 4,
            metadata_bytes: frame.metadata_bytes,
            model_parameter_bits: 0,
            temporary_bytes: roles * 4,
        },
        BindingRepresentation::FactoredOneHot => BindingAccounting {
            logical_payload_bits: frame.logical_payload_bits,
            dimensions: factored_dimensions,
            container_bytes: factored_dimensions.div_ceil(8),
            metadata_bytes: frame.metadata_bytes + roles * 2,
            model_parameter_bits: 0,
            temporary_bytes: factored_dimensions.div_ceil(8),
        },
        BindingRepresentation::FactoredDense => BindingAccounting {
            logical_payload_bits: frame.logical_payload_bits,
            dimensions: DENSE_DIMENSIONS,
            container_bytes: DENSE_DIMENSIONS,
            metadata_bytes: frame.metadata_bytes + roles * 2,
            model_parameter_bits: factored_dimensions * (DENSE_DIMENSIONS / roles) * 8,
            temporary_bytes: DENSE_DIMENSIONS,
        },
        _ => unreachable!(),
    }
}

struct HrrOwner {
    roles: BTreeMap<(usize, String), Vec<f64>>,
    fillers: BTreeMap<(usize, String), Vec<f64>>,
}

impl HrrOwner {
    fn new(frame: &BindingFrame) -> Self {
        let mut roles = BTreeMap::new();
        let mut fillers = BTreeMap::new();
        for dimensions in HRR_DIMENSIONS {
            for role in &frame.roles {
                roles.insert(
                    (dimensions, role.id.to_owned()),
                    basis_vector(dimensions, &format!("role:{}", role.id)),
                );
            }
            for filler in &frame.global_fillers {
                fillers.insert(
                    (dimensions, filler.clone()),
                    basis_vector(dimensions, &format!("filler:{filler}")),
                );
            }
        }
        Self { roles, fillers }
    }

    fn encode(&self, frame: &BindingFrame, fillers: &[usize], dimensions: usize) -> Vec<f64> {
        let mut encoded = vec![0.0; dimensions];
        for (role, filler) in frame.roles.iter().zip(fillers) {
            let role_vector = &self.roles[&(dimensions, role.id.to_owned())];
            let filler_key = format!("{}:{}", role.domain, role.fillers[*filler]);
            let filler_vector = &self.fillers[&(dimensions, filler_key)];
            let binding = circular_convolution(role_vector, filler_vector);
            for (coordinate, value) in encoded.iter_mut().zip(binding) {
                *coordinate += value;
            }
        }
        encoded
    }

    fn decode_role(&self, encoded: &[f64], role: &RoleSlot, dimensions: usize) -> usize {
        let role_vector = &self.roles[&(dimensions, role.id.to_owned())];
        let estimate = circular_convolution(encoded, &involution(role_vector));
        role.fillers
            .iter()
            .enumerate()
            .max_by(|(_, left), (_, right)| {
                let left_key = format!("{}:{left}", role.domain);
                let right_key = format!("{}:{right}", role.domain);
                cosine(&estimate, &self.fillers[&(dimensions, left_key)])
                    .total_cmp(&cosine(&estimate, &self.fillers[&(dimensions, right_key)]))
            })
            .map(|(ordinal, _)| ordinal)
            .expect("role domain is nonempty")
    }
}

fn evaluate_hrr(
    frame: &BindingFrame,
    corpus: &RoleCorpus,
    owner: &HrrOwner,
    representation: BindingRepresentation,
) -> (usize, usize) {
    let dimensions = representation
        .hrr_dimensions()
        .expect("HRR representation has dimensions");
    let mut exact = 0;
    let mut role_correct = 0;
    for meaning in corpus.meanings() {
        let expected = frame.role_fillers(meaning);
        let encoded = owner.encode(frame, &expected, dimensions);
        let decoded = frame
            .roles
            .iter()
            .map(|role| owner.decode_role(&encoded, role, dimensions))
            .collect::<Vec<_>>();
        role_correct += expected
            .iter()
            .zip(&decoded)
            .filter(|(left, right)| left == right)
            .count();
        exact += usize::from(expected == decoded);
    }
    (exact, role_correct)
}

#[derive(Clone, Copy)]
struct Complex {
    re: f64,
    im: f64,
}

impl Complex {
    const fn new(re: f64, im: f64) -> Self {
        Self { re, im }
    }

    fn multiply(self, other: Self) -> Self {
        Self {
            re: self.re * other.re - self.im * other.im,
            im: self.re * other.im + self.im * other.re,
        }
    }
}

fn circular_convolution(left: &[f64], right: &[f64]) -> Vec<f64> {
    assert_eq!(left.len(), right.len());
    assert!(left.len().is_power_of_two());
    let mut left_frequency = left
        .iter()
        .map(|value| Complex::new(*value, 0.0))
        .collect::<Vec<_>>();
    let mut right_frequency = right
        .iter()
        .map(|value| Complex::new(*value, 0.0))
        .collect::<Vec<_>>();
    fft(&mut left_frequency, false);
    fft(&mut right_frequency, false);
    let mut product = left_frequency
        .iter()
        .zip(right_frequency)
        .map(|(left_value, right_value)| left_value.multiply(right_value))
        .collect::<Vec<_>>();
    fft(&mut product, true);
    product.into_iter().map(|value| value.re).collect()
}

fn fft(values: &mut [Complex], inverse: bool) {
    let length = values.len();
    let mut reversed = 0;
    for index in 1..length {
        let mut bit = length >> 1;
        while reversed & bit != 0 {
            reversed ^= bit;
            bit >>= 1;
        }
        reversed ^= bit;
        if index < reversed {
            values.swap(index, reversed);
        }
    }
    let mut block = 2;
    while block <= length {
        let angle = 2.0 * PI / usize_to_f64(block) * if inverse { 1.0 } else { -1.0 };
        let root = Complex::new(angle.cos(), angle.sin());
        for start in (0..length).step_by(block) {
            let mut weight = Complex::new(1.0, 0.0);
            for offset in 0..block / 2 {
                let even = values[start + offset];
                let odd = values[start + offset + block / 2].multiply(weight);
                values[start + offset] = Complex::new(even.re + odd.re, even.im + odd.im);
                values[start + offset + block / 2] =
                    Complex::new(even.re - odd.re, even.im - odd.im);
                weight = weight.multiply(root);
            }
        }
        block *= 2;
    }
    if inverse {
        for value in values {
            value.re /= usize_to_f64(length);
            value.im /= usize_to_f64(length);
        }
    }
}

fn involution(vector: &[f64]) -> Vec<f64> {
    let mut inverse = Vec::with_capacity(vector.len());
    inverse.push(vector[0]);
    inverse.extend(vector[1..].iter().rev());
    inverse
}

fn cosine(left: &[f64], right: &[f64]) -> f64 {
    let dot = left
        .iter()
        .zip(right)
        .map(|(left_value, right_value)| left_value * right_value)
        .sum::<f64>();
    let left_norm = left.iter().map(|value| value * value).sum::<f64>().sqrt();
    let right_norm = right.iter().map(|value| value * value).sum::<f64>().sqrt();
    dot / (left_norm * right_norm)
}

fn basis_vector(dimensions: usize, key: &str) -> Vec<f64> {
    let scale = 1.0 / usize_to_f64(dimensions).sqrt();
    let key_hash = fnv1a64(key.as_bytes());
    (0..dimensions)
        .map(|coordinate| {
            let random = splitmix64(
                HRR_SEED ^ key_hash ^ (coordinate as u64 + 1).wrapping_mul(0x9e37_79b9_7f4a_7c15),
            );
            if random & 1 == 0 {
                -scale
            } else {
                scale
            }
        })
        .collect()
}

fn fnv1a64(bytes: &[u8]) -> u64 {
    let mut hash = 14_695_981_039_346_656_037_u64;
    for byte in bytes {
        hash ^= u64::from(*byte);
        hash = hash.wrapping_mul(1_099_511_628_211);
    }
    hash
}

fn splitmix64(mut value: u64) -> u64 {
    value = value.wrapping_add(0x9e37_79b9_7f4a_7c15);
    value = (value ^ (value >> 30)).wrapping_mul(0xbf58_476d_1ce4_e5b9);
    value = (value ^ (value >> 27)).wrapping_mul(0x94d0_49bb_1331_11eb);
    value ^ (value >> 31)
}

fn usize_to_f64(value: usize) -> f64 {
    f64::from(u32::try_from(value).expect("binding dimensions fit u32"))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn fft_convolution_matches_small_direct_result() {
        let left = [1.0, 2.0, 3.0, 4.0];
        let right = [4.0, 3.0, 2.0, 1.0];
        let actual = circular_convolution(&left, &right);
        let expected = [24.0, 22.0, 24.0, 30.0];
        for (actual_value, expected_value) in actual.iter().zip(expected) {
            assert!((actual_value - expected_value).abs() < 1e-9);
        }
    }

    #[test]
    fn exact_controls_round_trip_every_binding() {
        let report = run_binding_controls();
        for record in report
            .records
            .iter()
            .filter(|record| record.representation.hrr_dimensions().is_none())
        {
            assert!(record.is_perfect());
        }
    }
}
