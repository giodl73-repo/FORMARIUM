//! Deterministic validation for bounded, author-declared composition traces.

use crate::{reference::ReferenceCorpus, reference_sidecar::RelationManifest};
use sha2::{Digest, Sha256};
use std::collections::BTreeMap;

const HEADER: &str = "factorium-composition-query-v0";
const END: &str = "end-query";

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
enum ClosureState {
    Complete,
    Incomplete,
    Contradictory,
    Truncated,
}

#[derive(Clone, Debug, Eq, PartialEq)]
struct Node {
    artifact: String,
    class: String,
    depth: usize,
    origin: String,
    predecessor: String,
}

#[derive(Clone, Debug, Eq, PartialEq)]
struct Check {
    id: String,
    target: String,
    outcome: String,
}

#[derive(Clone, Debug, Eq, PartialEq)]
struct Conflict {
    id: String,
    target: String,
}

/// One exact, noncanonical Composition Query trace.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct CompositionQuery {
    canonical_text: String,
    id: String,
    reference_sha256: String,
    relations_sha256: String,
    direction: String,
    budgets: BTreeMap<String, usize>,
    seeds: Vec<String>,
    nodes: Vec<Node>,
    edges: Vec<String>,
    frontiers: Vec<String>,
    conflicts: Vec<Conflict>,
    checks: Vec<Check>,
    projections: Vec<String>,
    state: ClosureState,
}

impl CompositionQuery {
    /// Parses canonical trace text and validates its closed structural grammar.
    ///
    /// # Errors
    ///
    /// Returns an error for noncanonical transport, record order, malformed
    /// fields, duplicate identities, or an inconsistent declared state.
    #[allow(clippy::missing_panics_doc, clippy::too_many_lines)]
    pub fn parse(input: &str) -> Result<Self, String> {
        let lines = canonical_lines(input)?;
        if lines.first() != Some(&HEADER) || lines.last() != Some(&END) {
            return Err("expected factorium-composition-query-v0 document".to_owned());
        }
        let mut last_rank = 0;
        let mut query_id = None;
        let mut problem = None;
        let mut source = None;
        let mut context = None;
        let mut policy = None;
        let mut budgets = None;
        let mut seeds = Vec::new();
        let mut nodes = Vec::new();
        let mut edges = Vec::new();
        let mut frontiers = Vec::new();
        let mut conflicts = Vec::new();
        let mut checks = Vec::new();
        let mut projections = Vec::new();
        let mut state = None;

        for (offset, line) in lines[1..lines.len() - 1].iter().enumerate() {
            let line_number = offset + 2;
            let rank = record_rank(line)
                .ok_or_else(|| format!("line {line_number}: unknown query record"))?;
            if rank < last_rank {
                return Err(format!(
                    "line {line_number}: records are out of section order"
                ));
            }
            last_rank = rank;
            match rank {
                1 => set_once(&mut query_id, parse_id_record(line, "query ")?, "query")?,
                2 => {
                    let value = line.strip_prefix("problem ").unwrap();
                    if value.is_empty() || value.contains(" | ") {
                        return Err(format!("line {line_number}: invalid problem statement"));
                    }
                    set_once(&mut problem, value.to_owned(), "problem")?;
                }
                3 => {
                    let fields = fields(line, "source ", 2, line_number)?;
                    validate_sha256(fields[0])?;
                    validate_sha256(fields[1])?;
                    set_once(
                        &mut source,
                        (fields[0].to_owned(), fields[1].to_owned()),
                        "source",
                    )?;
                }
                4 => {
                    let values = fields(line, "context ", 2, line_number)?;
                    validate_id(values[0], "context profile")?;
                    parse_pairs(values[1], "context selections")?;
                    set_once(&mut context, values[0].to_owned(), "context")?;
                }
                5 => {
                    let pairs = parse_pairs(line.strip_prefix("policy ").unwrap(), "policy")?;
                    if pairs.get("follow").map(String::as_str) != Some("evaluative-required")
                        || pairs.get("stop").map(String::as_str) != Some("stable-identity")
                        || !matches!(
                            pairs.get("direction").map(String::as_str),
                            Some("forward" | "reverse")
                        )
                        || pairs.len() != 3
                    {
                        return Err(format!("line {line_number}: unsupported closure policy"));
                    }
                    set_once(&mut policy, pairs["direction"].clone(), "policy")?;
                }
                6 => set_once(
                    &mut budgets,
                    parse_budget(line.strip_prefix("budget ").unwrap())?,
                    "budget",
                )?,
                7 => seeds.push(parse_artifact_record(line, "seed ")?),
                8 => {
                    let values = fields(line, "node ", 5, line_number)?;
                    validate_artifact(values[0])?;
                    if !matches!(
                        values[1],
                        "required"
                            | "evaluative"
                            | "explanatory"
                            | "provenance"
                            | "optional"
                            | "excluded"
                            | "unresolved"
                    ) {
                        return Err(format!("line {line_number}: invalid node class"));
                    }
                    let depth = values[2]
                        .parse::<usize>()
                        .map_err(|_| format!("line {line_number}: invalid node depth"))?;
                    validate_origin(values[3])?;
                    if values[4] != "none" {
                        validate_artifact(values[4])?;
                    }
                    nodes.push(Node {
                        artifact: values[0].to_owned(),
                        class: values[1].to_owned(),
                        depth,
                        origin: values[3].to_owned(),
                        predecessor: values[4].to_owned(),
                    });
                }
                9 => edges.push(parse_id_record(line, "edge ")?),
                10 => {
                    let values = fields(line, "frontier ", 2, line_number)?;
                    validate_artifact(values[0])?;
                    validate_id(values[1], "frontier reason")?;
                    frontiers.push(values[0].to_owned());
                }
                11 => {
                    let values = fields(line, "conflict ", 3, line_number)?;
                    validate_id(values[0], "conflict ID")?;
                    validate_artifact(values[1])?;
                    validate_id(values[2], "conflict reason")?;
                    conflicts.push(Conflict {
                        id: values[0].to_owned(),
                        target: values[1].to_owned(),
                    });
                }
                12 => {
                    let values = fields(line, "check ", 4, line_number)?;
                    validate_id(values[0], "check ID")?;
                    if !matches!(
                        values[1],
                        "constraint"
                            | "diagnostic"
                            | "procedure"
                            | "formula-scope"
                            | "completeness"
                    ) {
                        return Err(format!("line {line_number}: invalid check kind"));
                    }
                    validate_artifact(values[2])?;
                    if !matches!(values[3], "pass" | "fail" | "unresolved") {
                        return Err(format!("line {line_number}: invalid check outcome"));
                    }
                    checks.push(Check {
                        id: values[0].to_owned(),
                        target: values[2].to_owned(),
                        outcome: values[3].to_owned(),
                    });
                }
                13 => {
                    let values = fields(line, "projection ", 3, line_number)?;
                    validate_artifact(values[0])?;
                    if !matches!(values[1], "selected" | "rejected" | "unresolved") {
                        return Err(format!(
                            "line {line_number}: invalid projection disposition"
                        ));
                    }
                    validate_id(values[2], "projection loss")?;
                    projections.push(values[0].to_owned());
                }
                14 => {
                    let value = line.strip_prefix("state ").unwrap();
                    let parsed = match value {
                        "complete" => ClosureState::Complete,
                        "incomplete" => ClosureState::Incomplete,
                        "contradictory" => ClosureState::Contradictory,
                        "truncated" => ClosureState::Truncated,
                        _ => return Err(format!("line {line_number}: invalid closure state")),
                    };
                    set_once(&mut state, parsed, "state")?;
                }
                _ => unreachable!(),
            }
        }

        let (reference_sha256, relations_sha256) = source.ok_or("missing source record")?;
        let query = Self {
            canonical_text: input.to_owned(),
            id: query_id.ok_or("missing query record")?,
            reference_sha256,
            relations_sha256,
            direction: policy.ok_or("missing policy record")?,
            budgets: budgets.ok_or("missing budget record")?,
            seeds,
            nodes,
            edges,
            frontiers,
            conflicts,
            checks,
            projections,
            state: state.ok_or("missing state record")?,
        };
        if problem.is_none() || context.is_none() {
            return Err("query requires problem and context records".to_owned());
        }
        query.validate_local()?;
        Ok(query)
    }

    /// Validates references, relation traces, source identities, and budgets.
    ///
    /// # Errors
    ///
    /// Returns an error when the declared trace disagrees with the selected
    /// canonical corpus or relation sidecar.
    pub fn validate_sources(
        &self,
        corpus: &ReferenceCorpus,
        relations: &RelationManifest,
    ) -> Result<(), String> {
        if self.reference_sha256 != corpus.sha256() {
            return Err("reference source digest does not match".to_owned());
        }
        if self.relations_sha256 != relations.sha256() {
            return Err("relation source digest does not match".to_owned());
        }
        for artifact in self
            .seeds
            .iter()
            .chain(self.nodes.iter().map(|node| &node.artifact))
            .chain(self.frontiers.iter())
            .chain(self.conflicts.iter().map(|conflict| &conflict.target))
            .chain(self.checks.iter().map(|check| &check.target))
            .chain(self.projections.iter())
        {
            resolve_artifact(corpus, artifact)?;
        }
        let node_map = self
            .nodes
            .iter()
            .map(|node| (node.artifact.as_str(), node))
            .collect::<BTreeMap<_, _>>();
        for edge_id in &self.edges {
            let relation = relations
                .relations()
                .iter()
                .find(|relation| relation.id() == edge_id)
                .ok_or_else(|| format!("unknown admitted relation `{edge_id}`"))?;
            for artifact in [relation.source(), relation.target(), relation.scope()] {
                let node = node_map.get(artifact).ok_or_else(|| {
                    format!("relation `{edge_id}` requires working node `{artifact}`")
                })?;
                if node.class == "excluded" {
                    return Err(format!(
                        "relation `{edge_id}` uses excluded node `{artifact}`"
                    ));
                }
            }
        }
        for node in &self.nodes {
            if let Some(edge_id) = node.origin.strip_prefix("relation:") {
                let relation = relations
                    .relations()
                    .iter()
                    .find(|relation| relation.id() == edge_id)
                    .ok_or_else(|| format!("node origin names unknown relation `{edge_id}`"))?;
                let (expected_predecessor, expected_artifact) = if self.direction == "forward" {
                    (relation.source(), relation.target())
                } else {
                    (relation.target(), relation.source())
                };
                if !self.edges.iter().any(|id| id == edge_id)
                    || node.artifact != expected_artifact
                    || node.predecessor != expected_predecessor
                {
                    return Err(format!("invalid relation origin for `{}`", node.artifact));
                }
            } else if let Some(edge_id) = node.origin.strip_prefix("scope:") {
                let relation = relations
                    .relations()
                    .iter()
                    .find(|relation| relation.id() == edge_id)
                    .ok_or_else(|| format!("node origin names unknown relation `{edge_id}`"))?;
                let expected_predecessor = if self.direction == "forward" {
                    relation.source()
                } else {
                    relation.target()
                };
                if !self.edges.iter().any(|id| id == edge_id)
                    || node.artifact != relation.scope()
                    || node.predecessor != expected_predecessor
                {
                    return Err(format!("invalid scope origin for `{}`", node.artifact));
                }
            }
        }
        Ok(())
    }

    #[must_use]
    pub fn id(&self) -> &str {
        &self.id
    }

    #[must_use]
    pub fn state(&self) -> &'static str {
        match self.state {
            ClosureState::Complete => "complete",
            ClosureState::Incomplete => "incomplete",
            ClosureState::Contradictory => "contradictory",
            ClosureState::Truncated => "truncated",
        }
    }

    #[must_use]
    pub fn node_count(&self) -> usize {
        self.nodes.len()
    }

    #[must_use]
    pub fn edge_count(&self) -> usize {
        self.edges.len()
    }

    #[must_use]
    pub fn canonical_text(&self) -> &str {
        &self.canonical_text
    }

    /// Returns SHA-256 over the exact canonical trace bytes.
    #[must_use]
    pub fn sha256(&self) -> String {
        format!("{:x}", Sha256::digest(self.canonical_text.as_bytes()))
    }

    #[allow(clippy::too_many_lines)]
    fn validate_local(&self) -> Result<(), String> {
        strictly_sorted(&self.seeds, "seeds")?;
        strictly_sorted_by(&self.nodes, |node| &node.artifact, "nodes")?;
        strictly_sorted(&self.edges, "edges")?;
        strictly_sorted(&self.frontiers, "frontiers")?;
        strictly_sorted_by(&self.conflicts, |conflict| &conflict.id, "conflicts")?;
        strictly_sorted_by(&self.checks, |check| &check.id, "checks")?;
        strictly_sorted(&self.projections, "projections")?;
        if self.seeds.is_empty() || self.checks.is_empty() || self.projections.is_empty() {
            return Err("query requires at least one seed, check, and projection".to_owned());
        }
        let node_map = self
            .nodes
            .iter()
            .map(|node| (node.artifact.as_str(), node))
            .collect::<BTreeMap<_, _>>();
        for seed in &self.seeds {
            let node = node_map
                .get(seed.as_str())
                .ok_or_else(|| format!("seed `{seed}` is not a working node"))?;
            if node.class != "required"
                || node.depth != 0
                || node.origin != "seed"
                || node.predecessor != "none"
            {
                return Err(format!(
                    "seed `{seed}` must be a required depth-zero seed node"
                ));
            }
        }
        for projection in &self.projections {
            if !node_map.contains_key(projection.as_str()) {
                return Err(format!("projection `{projection}` is not a working node"));
            }
        }
        for node in &self.nodes {
            let derived = node.origin.starts_with("relation:") || node.origin.starts_with("scope:");
            if derived {
                if node.predecessor == "none" || !node_map.contains_key(node.predecessor.as_str()) {
                    return Err(format!(
                        "derived node `{}` requires a working predecessor",
                        node.artifact
                    ));
                }
            } else if node.predecessor != "none" {
                return Err(format!(
                    "node `{}` cannot declare a predecessor",
                    node.artifact
                ));
            }
        }
        let max_depth = self.nodes.iter().map(|node| node.depth).max().unwrap_or(0);
        let work = self.seeds.len()
            + self.nodes.len()
            + self.edges.len()
            + self.frontiers.len()
            + self.conflicts.len()
            + self.checks.len()
            + self.projections.len();
        let observed = [
            ("nodes", self.nodes.len()),
            ("edges", self.edges.len()),
            ("depth", max_depth),
            ("work", work),
        ];
        for (key, value) in observed {
            if value > self.budgets[key] {
                return Err(format!(
                    "{key} budget exceeded: {value} > {}",
                    self.budgets[key]
                ));
            }
        }
        let unresolved = self.nodes.iter().any(|node| node.class == "unresolved")
            || self
                .checks
                .iter()
                .any(|check| check.outcome == "unresolved");
        let failed = self.checks.iter().any(|check| check.outcome == "fail");
        match self.state {
            ClosureState::Complete
                if !self.frontiers.is_empty()
                    || !self.conflicts.is_empty()
                    || unresolved
                    || failed =>
            {
                Err(
                    "complete state cannot hide frontier, conflict, unresolved, or failed records"
                        .to_owned(),
                )
            }
            ClosureState::Incomplete if !unresolved && self.frontiers.is_empty() => {
                Err("incomplete state requires an unresolved record or frontier".to_owned())
            }
            ClosureState::Contradictory if self.conflicts.is_empty() => {
                Err("contradictory state requires a conflict".to_owned())
            }
            ClosureState::Truncated => {
                let reached = observed
                    .iter()
                    .any(|(key, value)| *value == self.budgets[*key]);
                if self.frontiers.is_empty() || !reached {
                    Err("truncated state requires a frontier and a reached budget".to_owned())
                } else {
                    Ok(())
                }
            }
            _ => Ok(()),
        }
    }
}

fn record_rank(line: &str) -> Option<usize> {
    [
        "query ",
        "problem ",
        "source ",
        "context ",
        "policy ",
        "budget ",
        "seed ",
        "node ",
        "edge ",
        "frontier ",
        "conflict ",
        "check ",
        "projection ",
        "state ",
    ]
    .iter()
    .position(|prefix| line.starts_with(prefix))
    .map(|index| index + 1)
}

fn canonical_lines(input: &str) -> Result<Vec<&str>, String> {
    if input.starts_with('\u{feff}') || input.contains('\r') || !input.ends_with('\n') {
        return Err("query must be UTF-8, LF-only, and end with LF".to_owned());
    }
    let lines = input[..input.len() - 1].split('\n').collect::<Vec<_>>();
    if lines.iter().any(|line| {
        line.is_empty() || line.trim() != *line || line.contains("  ") || line.contains('\t')
    }) {
        return Err("query contains a noncanonical line".to_owned());
    }
    Ok(lines)
}

fn fields<'a>(
    line: &'a str,
    prefix: &str,
    count: usize,
    number: usize,
) -> Result<Vec<&'a str>, String> {
    let values = line
        .strip_prefix(prefix)
        .unwrap()
        .split(" | ")
        .collect::<Vec<_>>();
    if values.len() != count || values.iter().any(|value| value.is_empty()) {
        Err(format!("line {number}: malformed `{prefix}` record"))
    } else {
        Ok(values)
    }
}

fn set_once<T>(slot: &mut Option<T>, value: T, label: &str) -> Result<(), String> {
    if slot.replace(value).is_some() {
        Err(format!("duplicate {label} record"))
    } else {
        Ok(())
    }
}

fn parse_id_record(line: &str, prefix: &str) -> Result<String, String> {
    let value = line.strip_prefix(prefix).unwrap();
    validate_id(value, prefix.trim())?;
    Ok(value.to_owned())
}

fn parse_artifact_record(line: &str, prefix: &str) -> Result<String, String> {
    let value = line.strip_prefix(prefix).unwrap();
    validate_artifact(value)?;
    Ok(value.to_owned())
}

fn parse_budget(value: &str) -> Result<BTreeMap<String, usize>, String> {
    let mut pairs = BTreeMap::new();
    for pair in value.split(',') {
        let (key, item) = pair
            .split_once('=')
            .ok_or_else(|| "invalid budget pair".to_owned())?;
        validate_id(key, "budget key")?;
        if pairs.insert(key.to_owned(), item.to_owned()).is_some() {
            return Err(format!("duplicate budget key `{key}`"));
        }
    }
    let canonical = pairs
        .iter()
        .map(|(key, item)| format!("{key}={item}"))
        .collect::<Vec<_>>()
        .join(",");
    if canonical != value {
        return Err("budget must be strictly sorted and canonical".to_owned());
    }
    let expected = ["depth", "edges", "nodes", "work"];
    if pairs.keys().map(String::as_str).collect::<Vec<_>>() != expected {
        return Err("budget requires sorted depth, edges, nodes, and work keys".to_owned());
    }
    let mut output = BTreeMap::new();
    for (key, value) in pairs {
        let number = value
            .parse::<usize>()
            .map_err(|_| format!("invalid {key} budget"))?;
        if key != "depth" && number == 0 {
            return Err(format!("{key} budget must be positive"));
        }
        output.insert(key, number);
    }
    Ok(output)
}

fn parse_pairs(value: &str, label: &str) -> Result<BTreeMap<String, String>, String> {
    let mut output = BTreeMap::new();
    for pair in value.split(',') {
        let (key, item) = pair
            .split_once('=')
            .ok_or_else(|| format!("invalid {label} pair"))?;
        validate_id(key, label)?;
        validate_id(item, label)?;
        if output.insert(key.to_owned(), item.to_owned()).is_some() {
            return Err(format!("duplicate {label} key `{key}`"));
        }
    }
    let canonical = output
        .iter()
        .map(|(key, item)| format!("{key}={item}"))
        .collect::<Vec<_>>()
        .join(",");
    if canonical != value {
        return Err(format!("{label} must be strictly sorted and canonical"));
    }
    Ok(output)
}

fn validate_origin(value: &str) -> Result<(), String> {
    if value == "seed" {
        return Ok(());
    }
    for prefix in ["relation:", "scope:", "manual:"] {
        if let Some(id) = value.strip_prefix(prefix) {
            return validate_id(id, "node origin");
        }
    }
    Err(format!("invalid node origin `{value}`"))
}

fn validate_artifact(value: &str) -> Result<(), String> {
    let (kind, identifier) = value
        .split_once(':')
        .ok_or_else(|| format!("invalid artifact `{value}`"))?;
    if !matches!(kind, "entry" | "sense" | "factor" | "view") {
        return Err(format!("unsupported artifact `{value}`"));
    }
    let parts = identifier.split('/').collect::<Vec<_>>();
    if matches!(kind, "sense" | "factor") != (parts.len() == 2) {
        return Err(format!("invalid qualified artifact `{value}`"));
    }
    for part in parts {
        validate_id(part, "artifact identifier")?;
    }
    Ok(())
}

fn validate_id(value: &str, label: &str) -> Result<(), String> {
    let valid = !value.is_empty()
        && value.bytes().enumerate().all(|(index, byte)| {
            byte.is_ascii_lowercase() || byte.is_ascii_digit() || (byte == b'-' && index > 0)
        })
        && !value.ends_with('-')
        && !value.contains("--")
        && value.as_bytes()[0].is_ascii_lowercase();
    if valid {
        Ok(())
    } else {
        Err(format!("invalid {label} `{value}`"))
    }
}

fn validate_sha256(value: &str) -> Result<(), String> {
    if value.len() == 64
        && value
            .bytes()
            .all(|byte| byte.is_ascii_digit() || (b'a'..=b'f').contains(&byte))
    {
        Ok(())
    } else {
        Err(format!("invalid SHA-256 `{value}`"))
    }
}

fn strictly_sorted(values: &[String], label: &str) -> Result<(), String> {
    if values.windows(2).any(|pair| pair[0] >= pair[1]) {
        Err(format!("{label} must be strictly sorted and unique"))
    } else {
        Ok(())
    }
}

fn strictly_sorted_by<T>(
    values: &[T],
    key: impl Fn(&T) -> &String,
    label: &str,
) -> Result<(), String> {
    if values.windows(2).any(|pair| key(&pair[0]) >= key(&pair[1])) {
        Err(format!("{label} must be strictly sorted and unique"))
    } else {
        Ok(())
    }
}

fn resolve_artifact(corpus: &ReferenceCorpus, value: &str) -> Result<(), String> {
    let (kind, identifier) = value.split_once(':').expect("validated artifact");
    let found = match kind {
        "entry" => corpus
            .entries()
            .iter()
            .any(|entry| entry.id() == identifier),
        "view" => corpus.views().iter().any(|view| view.id() == identifier),
        "sense" | "factor" => {
            let (entry_id, local_id) = identifier.split_once('/').expect("qualified artifact");
            corpus.entries().iter().any(|entry| {
                entry.id() == entry_id
                    && if kind == "sense" {
                        entry.senses().iter().any(|sense| sense.id() == local_id)
                    } else {
                        entry.factors().iter().any(|factor| factor.id() == local_id)
                    }
            })
        }
        _ => false,
    };
    if found {
        Ok(())
    } else {
        Err(format!("unknown canonical artifact `{value}`"))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::fs;

    fn sources() -> (ReferenceCorpus, RelationManifest) {
        let corpus = ReferenceCorpus::parse(
            &fs::read_to_string("reference/factorium-reference-v0.factorium").unwrap(),
        )
        .unwrap();
        let relations = RelationManifest::parse(
            &fs::read_to_string("reference/factorium-relations-v0.factorium").unwrap(),
        )
        .unwrap();
        (corpus, relations)
    }

    #[test]
    fn committed_trace_round_trips_and_validates() {
        let (corpus, relations) = sources();
        for (path, state) in [
            (
                "fixtures/composition/alert-feedback.factorium-query",
                "incomplete",
            ),
            (
                "fixtures/composition/causal-outcome-scope.factorium-query",
                "incomplete",
            ),
            (
                "fixtures/composition/constraint-feasibility.factorium-query",
                "incomplete",
            ),
            (
                "fixtures/composition/delegated-compliance-frontier.factorium-query",
                "truncated",
            ),
            (
                "fixtures/composition/dependency-exclusion-conflict.factorium-query",
                "contradictory",
            ),
            (
                "fixtures/composition/decision-evidence.factorium-query",
                "incomplete",
            ),
            (
                "fixtures/composition/latency-evidence.factorium-query",
                "complete",
            ),
            (
                "fixtures/composition/risk-consequence.factorium-query",
                "incomplete",
            ),
            (
                "fixtures/composition/system-dependency.factorium-query",
                "complete",
            ),
            (
                "fixtures/composition/value-criterion.factorium-query",
                "incomplete",
            ),
        ] {
            let input = fs::read_to_string(path).unwrap();
            let query = CompositionQuery::parse(&input).unwrap();
            query.validate_sources(&corpus, &relations).unwrap();
            assert_eq!(query.canonical_text(), input);
            assert_eq!(query.state(), state);
        }
    }

    #[test]
    fn adversarial_states_fail_closed() {
        let (corpus, relations) = sources();
        for path in [
            "fixtures/composition-invalid/ambiguous-join-direction.factorium-query",
            "fixtures/composition-invalid/causal-outcome-wrong-predecessor.factorium-query",
            "fixtures/composition-invalid/constraint-feasibility-wrong-predecessor.factorium-query",
            "fixtures/composition-invalid/cycle-replay.factorium-query",
            "fixtures/composition-invalid/evidence-evaluation-wrong-predecessor.factorium-query",
            "fixtures/composition-invalid/hidden-frontier.factorium-query",
            "fixtures/composition-invalid/incompatible-sense-complete.factorium-query",
            "fixtures/composition-invalid/missing-context.factorium-query",
            "fixtures/composition-invalid/required-exclusion.factorium-query",
            "fixtures/composition-invalid/risk-consequence-wrong-predecessor.factorium-query",
            "fixtures/composition-invalid/unreached-truncation.factorium-query",
            "fixtures/composition-invalid/value-criterion-wrong-predecessor.factorium-query",
        ] {
            let result = CompositionQuery::parse(&fs::read_to_string(path).unwrap())
                .and_then(|query| query.validate_sources(&corpus, &relations));
            assert!(result.is_err(), "{path}");
        }
    }
}
