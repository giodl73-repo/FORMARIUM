//! Reference parser and canonical writer for Semantic Factor Schema v1.

pub mod bakeoff;
pub mod corpus;
pub mod packet;
pub mod role_fixtures;

use sha2::{Digest, Sha256};
use std::collections::HashSet;
use std::error::Error;
use std::fmt;

const HEADER: &str = "factor-schema-v1";

/// One parsed schema document.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct SchemaDocument {
    schema: Schema,
    meanings: Vec<Meaning>,
}

impl SchemaDocument {
    /// Parses canonical Semantic Factor Schema v1 text.
    ///
    /// # Errors
    ///
    /// Returns a structured error for any grammar, canonicalization, or
    /// semantic validation failure.
    pub fn parse(input: &str) -> Result<Self, ParseError> {
        if input.contains("\r\n") {
            if input.replace("\r\n", "").contains('\n') {
                return Err(ParseError::new(0, ParseErrorKind::MixedLineEndings));
            }
            let normalized = input.replace("\r\n", "\n");
            Parser::new(&normalized)?.parse()
        } else {
            Parser::new(input)?.parse()
        }
    }

    /// Returns the parsed schema.
    #[must_use]
    pub const fn schema(&self) -> &Schema {
        &self.schema
    }

    /// Returns the complete meanings in canonical order.
    #[must_use]
    pub fn meanings(&self) -> &[Meaning] {
        &self.meanings
    }

    /// Serializes the complete document to canonical text.
    #[must_use]
    pub fn canonical_text(&self) -> String {
        let mut output = self.schema.canonical_text();
        for meaning in &self.meanings {
            output.push_str("meaning ");
            output.push_str(meaning.id());
            output.push('\n');
            for assignment in meaning.assignments() {
                output.push_str(assignment.factor());
                output.push('=');
                output.push_str(assignment.value());
                output.push('\n');
            }
            output.push_str("end-meaning\n");
        }
        output
    }

    /// Returns SHA-256 over the exact canonical document bytes.
    #[must_use]
    pub fn document_sha256(&self) -> String {
        sha256_hex(self.canonical_text().as_bytes())
    }
}

/// One ordered semantic schema.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Schema {
    id: String,
    version: u64,
    factors: Vec<Factor>,
    logical_bits: u32,
}

impl Schema {
    /// Returns the stable schema identifier.
    #[must_use]
    pub fn id(&self) -> &str {
        &self.id
    }

    /// Returns the positive schema version.
    #[must_use]
    pub const fn version(&self) -> u64 {
        self.version
    }

    /// Returns factors in canonical declaration order.
    #[must_use]
    pub fn factors(&self) -> &[Factor] {
        &self.factors
    }

    /// Returns the minimum packed logical payload width.
    #[must_use]
    pub const fn logical_bits(&self) -> u32 {
        self.logical_bits
    }

    /// Returns canonical text containing only the schema declarations.
    #[must_use]
    pub fn canonical_text(&self) -> String {
        let mut output = String::from(HEADER);
        output.push('\n');
        output.push_str("schema ");
        output.push_str(self.id());
        output.push_str(" version ");
        output.push_str(&self.version.to_string());
        output.push('\n');
        for factor in &self.factors {
            output.push_str("factor ");
            output.push_str(factor.id());
            output.push('\n');
            for value in factor.values() {
                output.push_str("value ");
                output.push_str(value);
                output.push('\n');
            }
            output.push_str("end-factor\n");
        }
        output
    }

    /// Returns SHA-256 over the exact canonical schema declaration bytes.
    #[must_use]
    pub fn sha256(&self) -> String {
        sha256_hex(self.canonical_text().as_bytes())
    }

    /// Decodes a packed alias into canonical assignments.
    ///
    /// # Errors
    ///
    /// Returns an error when high bits are set or a factor contains an unused
    /// ordinal pattern.
    pub fn decode_packed(&self, packed: u128) -> Result<Vec<Assignment>, PackedValueError> {
        if self.logical_bits < 128 && packed >= (1_u128 << self.logical_bits) {
            return Err(PackedValueError::HighBitsSet {
                logical_bits: self.logical_bits,
                packed,
            });
        }

        let mut assignments = Vec::with_capacity(self.factors.len());
        for factor in &self.factors {
            let mask = (1_u128 << factor.width()) - 1;
            let ordinal = ((packed >> factor.offset()) & mask) as usize;
            let Some(value) = factor.values().get(ordinal) else {
                return Err(PackedValueError::UnusedOrdinal {
                    factor: factor.id().to_owned(),
                    ordinal,
                });
            };
            assignments.push(Assignment {
                factor: factor.id().to_owned(),
                value: value.clone(),
            });
        }
        Ok(assignments)
    }
}

/// One ordered factor declaration.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Factor {
    id: String,
    values: Vec<String>,
    width: u32,
    offset: u32,
}

impl Factor {
    /// Returns the factor identifier.
    #[must_use]
    pub fn id(&self) -> &str {
        &self.id
    }

    /// Returns value identifiers in canonical ordinal order.
    #[must_use]
    pub fn values(&self) -> &[String] {
        &self.values
    }

    /// Returns the minimum ordinal bit width.
    #[must_use]
    pub const fn width(&self) -> u32 {
        self.width
    }

    /// Returns the least-significant-bit offset in the packed alias.
    #[must_use]
    pub const fn offset(&self) -> u32 {
        self.offset
    }
}

/// One complete meaning.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Meaning {
    id: String,
    assignments: Vec<Assignment>,
    packed: u128,
}

impl Meaning {
    /// Returns the stable meaning identifier.
    #[must_use]
    pub fn id(&self) -> &str {
        &self.id
    }

    /// Returns assignments in canonical factor order.
    #[must_use]
    pub fn assignments(&self) -> &[Assignment] {
        &self.assignments
    }

    /// Returns the exact ordinary packed alias.
    #[must_use]
    pub const fn packed(&self) -> u128 {
        self.packed
    }
}

/// One factor/value assignment.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Assignment {
    factor: String,
    value: String,
}

impl Assignment {
    /// Returns the factor identifier.
    #[must_use]
    pub fn factor(&self) -> &str {
        &self.factor
    }

    /// Returns the value identifier.
    #[must_use]
    pub fn value(&self) -> &str {
        &self.value
    }
}

/// A canonical parsing or semantic validation failure.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ParseError {
    line: usize,
    kind: ParseErrorKind,
}

impl ParseError {
    const fn new(line: usize, kind: ParseErrorKind) -> Self {
        Self { line, kind }
    }

    /// Returns the one-based source line, or zero for file-level failures.
    #[must_use]
    pub const fn line(&self) -> usize {
        self.line
    }

    /// Returns the failure category.
    #[must_use]
    pub const fn kind(&self) -> &ParseErrorKind {
        &self.kind
    }
}

impl fmt::Display for ParseError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        if self.line == 0 {
            write!(formatter, "{}", self.kind)
        } else {
            write!(formatter, "line {}: {}", self.line, self.kind)
        }
    }
}

impl Error for ParseError {}

/// Categories of schema parsing failure.
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum ParseErrorKind {
    /// Input begins with a UTF-8 byte-order mark.
    ByteOrderMark,
    /// Input contains a carriage return.
    CarriageReturn,
    /// Input mixes LF and CRLF transport.
    MixedLineEndings,
    /// Input does not end in LF.
    MissingFinalLf,
    /// A line is empty or is not canonical.
    NonCanonicalLine,
    /// The v1 header is absent.
    InvalidHeader,
    /// The schema declaration is malformed.
    InvalidSchemaDeclaration,
    /// An identifier violates the lower-kebab contract.
    InvalidIdentifier { identifier: String },
    /// The schema version is zero or malformed.
    InvalidVersion,
    /// A factor declaration is malformed.
    InvalidFactorDeclaration,
    /// A value declaration is malformed.
    InvalidValueDeclaration,
    /// A meaning declaration is malformed.
    InvalidMeaningDeclaration,
    /// A factor or meaning identifier is duplicated.
    DuplicateIdentifier { identifier: String },
    /// A value is duplicated within one factor.
    DuplicateValue { factor: String, value: String },
    /// A factor declares fewer than two values.
    TooFewValues { factor: String },
    /// The schema has no factors.
    NoFactors,
    /// The packed schema exceeds 128 logical bits.
    SchemaTooWide { logical_bits: u32 },
    /// An assignment is malformed.
    InvalidAssignment,
    /// A meaning assignment is missing, duplicated, or out of order.
    AssignmentOrder { expected: String, observed: String },
    /// An assignment uses an undeclared value.
    UnknownValue { factor: String, value: String },
    /// A meaning omits one or more factors.
    IncompleteMeaning {
        meaning: String,
        expected: usize,
        observed: usize,
    },
    /// An unexpected line or end of file was encountered.
    UnexpectedInput { expected: String },
}

impl fmt::Display for ParseErrorKind {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::ByteOrderMark => formatter.write_str("UTF-8 byte-order mark is not canonical"),
            Self::CarriageReturn => formatter.write_str("carriage returns are not canonical"),
            Self::MixedLineEndings => formatter.write_str("mixed LF and CRLF transport is invalid"),
            Self::MissingFinalLf => formatter.write_str("canonical input must end with LF"),
            Self::NonCanonicalLine => {
                formatter.write_str("line is empty or not canonically spaced")
            }
            Self::InvalidHeader => formatter.write_str("expected factor-schema-v1 header"),
            Self::InvalidSchemaDeclaration => formatter.write_str("invalid schema declaration"),
            Self::InvalidIdentifier { identifier } => {
                write!(formatter, "invalid identifier {identifier:?}")
            }
            Self::InvalidVersion => {
                formatter.write_str("schema version must be a positive integer")
            }
            Self::InvalidFactorDeclaration => formatter.write_str("invalid factor declaration"),
            Self::InvalidValueDeclaration => formatter.write_str("invalid value declaration"),
            Self::InvalidMeaningDeclaration => formatter.write_str("invalid meaning declaration"),
            Self::DuplicateIdentifier { identifier } => {
                write!(formatter, "duplicate identifier {identifier:?}")
            }
            Self::DuplicateValue { factor, value } => {
                write!(formatter, "factor {factor:?} duplicates value {value:?}")
            }
            Self::TooFewValues { factor } => {
                write!(
                    formatter,
                    "factor {factor:?} must declare at least two values"
                )
            }
            Self::NoFactors => formatter.write_str("schema must declare at least one factor"),
            Self::SchemaTooWide { logical_bits } => {
                write!(
                    formatter,
                    "schema requires {logical_bits} bits; maximum is 128"
                )
            }
            Self::InvalidAssignment => formatter.write_str("invalid assignment"),
            Self::AssignmentOrder { expected, observed } => write!(
                formatter,
                "expected assignment for {expected:?}, observed {observed:?}"
            ),
            Self::UnknownValue { factor, value } => {
                write!(formatter, "factor {factor:?} has no value {value:?}")
            }
            Self::IncompleteMeaning {
                meaning,
                expected,
                observed,
            } => write!(
                formatter,
                "meaning {meaning:?} has {observed} assignments; expected {expected}"
            ),
            Self::UnexpectedInput { expected } => write!(formatter, "expected {expected}"),
        }
    }
}

/// A packed alias that cannot represent a valid meaning.
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum PackedValueError {
    /// Bits above the logical payload are nonzero.
    HighBitsSet { logical_bits: u32, packed: u128 },
    /// A factor's bit pattern maps to no declared value.
    UnusedOrdinal { factor: String, ordinal: usize },
}

impl fmt::Display for PackedValueError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::HighBitsSet {
                logical_bits,
                packed,
            } => write!(
                formatter,
                "packed value {packed} sets bits above logical width {logical_bits}"
            ),
            Self::UnusedOrdinal { factor, ordinal } => {
                write!(formatter, "factor {factor:?} has no ordinal {ordinal}")
            }
        }
    }
}

impl Error for PackedValueError {}

struct Parser<'a> {
    lines: Vec<&'a str>,
    index: usize,
}

impl<'a> Parser<'a> {
    fn new(input: &'a str) -> Result<Self, ParseError> {
        if input.starts_with('\u{feff}') {
            return Err(ParseError::new(0, ParseErrorKind::ByteOrderMark));
        }
        if !input.ends_with('\n') {
            return Err(ParseError::new(0, ParseErrorKind::MissingFinalLf));
        }
        if input.contains('\r') {
            return Err(ParseError::new(0, ParseErrorKind::CarriageReturn));
        }

        let lines = input[..input.len() - 1].split('\n').collect::<Vec<_>>();
        for (index, line) in lines.iter().enumerate() {
            if line.is_empty() || line.trim() != *line || line.contains("  ") || line.contains('\t')
            {
                return Err(ParseError::new(index + 1, ParseErrorKind::NonCanonicalLine));
            }
        }
        Ok(Self { lines, index: 0 })
    }

    fn parse(mut self) -> Result<SchemaDocument, ParseError> {
        if self.take() != Some(HEADER) {
            return Err(ParseError::new(1, ParseErrorKind::InvalidHeader));
        }
        let (schema_id, version) = self.parse_schema_declaration()?;
        let mut factors = Vec::new();
        let mut factor_ids = HashSet::new();
        let mut logical_bits = 0_u32;

        while self.peek().is_some_and(|line| line.starts_with("factor ")) {
            let factor = self.parse_factor(logical_bits)?;
            if !factor_ids.insert(factor.id.clone()) {
                return Err(self.error(ParseErrorKind::DuplicateIdentifier {
                    identifier: factor.id,
                }));
            }
            logical_bits = logical_bits.checked_add(factor.width).ok_or_else(|| {
                self.error(ParseErrorKind::SchemaTooWide {
                    logical_bits: u32::MAX,
                })
            })?;
            if logical_bits > 128 {
                return Err(self.error(ParseErrorKind::SchemaTooWide { logical_bits }));
            }
            factors.push(factor);
        }
        if factors.is_empty() {
            return Err(self.error(ParseErrorKind::NoFactors));
        }

        let schema = Schema {
            id: schema_id,
            version,
            factors,
            logical_bits,
        };
        let mut meanings = Vec::new();
        let mut meaning_ids = HashSet::new();
        while self.peek().is_some() {
            let meaning = self.parse_meaning(&schema)?;
            if !meaning_ids.insert(meaning.id.clone()) {
                return Err(self.error(ParseErrorKind::DuplicateIdentifier {
                    identifier: meaning.id,
                }));
            }
            meanings.push(meaning);
        }

        Ok(SchemaDocument { schema, meanings })
    }

    fn parse_schema_declaration(&mut self) -> Result<(String, u64), ParseError> {
        let line_number = self.line_number();
        let line = self.take().ok_or_else(|| {
            ParseError::new(line_number, ParseErrorKind::InvalidSchemaDeclaration)
        })?;
        let tokens = line.split(' ').collect::<Vec<_>>();
        if tokens.len() != 4 || tokens[0] != "schema" || tokens[2] != "version" {
            return Err(ParseError::new(
                line_number,
                ParseErrorKind::InvalidSchemaDeclaration,
            ));
        }
        validate_identifier(tokens[1], line_number)?;
        let version = tokens[3]
            .parse::<u64>()
            .ok()
            .filter(|version| *version > 0)
            .ok_or_else(|| ParseError::new(line_number, ParseErrorKind::InvalidVersion))?;
        Ok((tokens[1].to_owned(), version))
    }

    fn parse_factor(&mut self, offset: u32) -> Result<Factor, ParseError> {
        let line_number = self.line_number();
        let declaration = self.take().ok_or_else(|| {
            ParseError::new(line_number, ParseErrorKind::InvalidFactorDeclaration)
        })?;
        let id = declaration
            .strip_prefix("factor ")
            .filter(|id| !id.contains(' '))
            .ok_or_else(|| {
                ParseError::new(line_number, ParseErrorKind::InvalidFactorDeclaration)
            })?;
        validate_identifier(id, line_number)?;

        let mut values = Vec::new();
        let mut value_ids = HashSet::new();
        loop {
            let value_line_number = self.line_number();
            let line = self.take().ok_or_else(|| {
                ParseError::new(
                    value_line_number,
                    ParseErrorKind::UnexpectedInput {
                        expected: "value or end-factor".to_owned(),
                    },
                )
            })?;
            if line == "end-factor" {
                break;
            }
            let value = line
                .strip_prefix("value ")
                .filter(|value| !value.contains(' '))
                .ok_or_else(|| {
                    ParseError::new(value_line_number, ParseErrorKind::InvalidValueDeclaration)
                })?;
            validate_identifier(value, value_line_number)?;
            if !value_ids.insert(value.to_owned()) {
                return Err(ParseError::new(
                    value_line_number,
                    ParseErrorKind::DuplicateValue {
                        factor: id.to_owned(),
                        value: value.to_owned(),
                    },
                ));
            }
            values.push(value.to_owned());
        }

        if values.len() < 2 {
            return Err(ParseError::new(
                line_number,
                ParseErrorKind::TooFewValues {
                    factor: id.to_owned(),
                },
            ));
        }
        let width = usize::BITS - (values.len() - 1).leading_zeros();
        Ok(Factor {
            id: id.to_owned(),
            values,
            width,
            offset,
        })
    }

    fn parse_meaning(&mut self, schema: &Schema) -> Result<Meaning, ParseError> {
        let line_number = self.line_number();
        let declaration = self.take().ok_or_else(|| {
            ParseError::new(line_number, ParseErrorKind::InvalidMeaningDeclaration)
        })?;
        let id = declaration
            .strip_prefix("meaning ")
            .filter(|id| !id.contains(' '))
            .ok_or_else(|| {
                ParseError::new(line_number, ParseErrorKind::InvalidMeaningDeclaration)
            })?;
        validate_identifier(id, line_number)?;

        let mut assignments = Vec::with_capacity(schema.factors.len());
        let mut packed = 0_u128;
        for factor in &schema.factors {
            let assignment_line_number = self.line_number();
            let line = self.take().ok_or_else(|| {
                ParseError::new(
                    assignment_line_number,
                    ParseErrorKind::IncompleteMeaning {
                        meaning: id.to_owned(),
                        expected: schema.factors.len(),
                        observed: assignments.len(),
                    },
                )
            })?;
            if line == "end-meaning" {
                return Err(ParseError::new(
                    assignment_line_number,
                    ParseErrorKind::IncompleteMeaning {
                        meaning: id.to_owned(),
                        expected: schema.factors.len(),
                        observed: assignments.len(),
                    },
                ));
            }
            let (observed_factor, value) = parse_assignment(line, assignment_line_number)?;
            if observed_factor != factor.id() {
                return Err(ParseError::new(
                    assignment_line_number,
                    ParseErrorKind::AssignmentOrder {
                        expected: factor.id().to_owned(),
                        observed: observed_factor.to_owned(),
                    },
                ));
            }
            let ordinal = factor
                .values()
                .iter()
                .position(|candidate| candidate == value)
                .ok_or_else(|| {
                    ParseError::new(
                        assignment_line_number,
                        ParseErrorKind::UnknownValue {
                            factor: factor.id().to_owned(),
                            value: value.to_owned(),
                        },
                    )
                })?;
            packed |= (ordinal as u128) << factor.offset();
            assignments.push(Assignment {
                factor: observed_factor.to_owned(),
                value: value.to_owned(),
            });
        }

        let end_line_number = self.line_number();
        if self.take() != Some("end-meaning") {
            return Err(ParseError::new(
                end_line_number,
                ParseErrorKind::UnexpectedInput {
                    expected: "end-meaning".to_owned(),
                },
            ));
        }

        Ok(Meaning {
            id: id.to_owned(),
            assignments,
            packed,
        })
    }

    fn peek(&self) -> Option<&'a str> {
        self.lines.get(self.index).copied()
    }

    fn take(&mut self) -> Option<&'a str> {
        let line = self.peek()?;
        self.index += 1;
        Some(line)
    }

    const fn line_number(&self) -> usize {
        self.index + 1
    }

    fn error(&self, kind: ParseErrorKind) -> ParseError {
        ParseError::new(self.line_number().saturating_sub(1), kind)
    }
}

fn parse_assignment(line: &str, line_number: usize) -> Result<(&str, &str), ParseError> {
    let mut parts = line.split('=');
    let factor = parts.next().unwrap_or_default();
    let value = parts.next().unwrap_or_default();
    if factor.is_empty() || value.is_empty() || parts.next().is_some() {
        return Err(ParseError::new(
            line_number,
            ParseErrorKind::InvalidAssignment,
        ));
    }
    validate_identifier(factor, line_number)?;
    validate_identifier(value, line_number)?;
    Ok((factor, value))
}

fn validate_identifier(identifier: &str, line_number: usize) -> Result<(), ParseError> {
    let mut chars = identifier.bytes();
    let Some(first) = chars.next() else {
        return Err(ParseError::new(
            line_number,
            ParseErrorKind::InvalidIdentifier {
                identifier: identifier.to_owned(),
            },
        ));
    };
    if !first.is_ascii_lowercase() {
        return Err(ParseError::new(
            line_number,
            ParseErrorKind::InvalidIdentifier {
                identifier: identifier.to_owned(),
            },
        ));
    }

    let mut previous_hyphen = false;
    for byte in chars {
        let valid = byte.is_ascii_lowercase() || byte.is_ascii_digit() || byte == b'-';
        if !valid || (byte == b'-' && previous_hyphen) {
            return Err(ParseError::new(
                line_number,
                ParseErrorKind::InvalidIdentifier {
                    identifier: identifier.to_owned(),
                },
            ));
        }
        previous_hyphen = byte == b'-';
    }
    if identifier.ends_with('-') {
        return Err(ParseError::new(
            line_number,
            ParseErrorKind::InvalidIdentifier {
                identifier: identifier.to_owned(),
            },
        ));
    }
    Ok(())
}

pub(crate) fn sha256_hex(bytes: &[u8]) -> String {
    let digest = Sha256::digest(bytes);
    let mut output = String::with_capacity(digest.len() * 2);
    for byte in digest {
        use fmt::Write as _;
        write!(output, "{byte:02x}").expect("writing to String cannot fail");
    }
    output
}

#[cfg(test)]
mod tests {
    use super::*;

    const NAVIGATION: &str = include_str!("../fixtures/schemas/navigation.factor");

    #[test]
    fn navigation_fixture_round_trips_and_packs_to_53() {
        let document = SchemaDocument::parse(NAVIGATION).unwrap();
        assert_eq!(document.canonical_text(), NAVIGATION.replace("\r\n", "\n"));
        assert_eq!(document.schema().id(), "navigation");
        assert_eq!(document.schema().logical_bits(), 6);
        assert_eq!(document.meanings()[0].packed(), 53);
        assert_eq!(
            document
                .schema()
                .decode_packed(document.meanings()[0].packed())
                .unwrap(),
            document.meanings()[0].assignments()
        );
    }

    #[test]
    fn normalizes_crlf_but_rejects_noncanonical_variants() {
        let crlf = NAVIGATION.replace("\r\n", "\n").replace('\n', "\r\n");
        let document = SchemaDocument::parse(&crlf).unwrap();
        assert_eq!(document.canonical_text(), crlf.replace("\r\n", "\n"));
        let mixed = NAVIGATION.replace("\r\n", "\n").replacen('\n', "\r\n", 1);
        assert!(matches!(
            SchemaDocument::parse(&mixed),
            Err(ParseError {
                kind: ParseErrorKind::MixedLineEndings,
                ..
            })
        ));
        assert!(matches!(
            SchemaDocument::parse(NAVIGATION.trim_end()),
            Err(ParseError {
                kind: ParseErrorKind::MissingFinalLf,
                ..
            })
        ));
        assert!(matches!(
            SchemaDocument::parse("factor-schema-v1\rschema demo version 1\n"),
            Err(ParseError {
                kind: ParseErrorKind::CarriageReturn,
                ..
            })
        ));
        assert!(matches!(
            SchemaDocument::parse(&NAVIGATION.replace("schema navigation", "schema  navigation")),
            Err(ParseError {
                kind: ParseErrorKind::NonCanonicalLine,
                ..
            })
        ));
    }

    #[test]
    fn unused_ordinals_and_high_bits_fail_closed() {
        let source = "factor-schema-v1\nschema triad version 1\nfactor value\nvalue a\nvalue b\nvalue c\nend-factor\n";
        let document = SchemaDocument::parse(source).unwrap();
        assert!(matches!(
            document.schema().decode_packed(3),
            Err(PackedValueError::UnusedOrdinal { ordinal: 3, .. })
        ));
        assert!(matches!(
            document.schema().decode_packed(4),
            Err(PackedValueError::HighBitsSet { .. })
        ));
    }
}
