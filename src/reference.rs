//! Canonical metadata interchange for the Factorium reference.

use sha2::{Digest, Sha256};
use std::collections::{HashMap, HashSet};
use std::ffi::OsStr;
use std::fmt;
use std::fs;
use std::path::{Path, PathBuf};

const HEADER_V0: &str = "factorium-reference-v0";
const HEADER_V1: &str = "factorium-reference-v1";
const HEADER_V2: &str = "factorium-reference-v2";
const END: &str = "end-reference";

/// One supported primary reference-table family.
#[derive(Clone, Copy, Debug, Eq, Hash, PartialEq)]
pub enum Family {
    Factor,
    Formula,
    ReferenceValue,
    Mapping,
    Decision,
    Transition,
    Constraint,
    Procedure,
    Diagnostic,
    Scale,
    Evidence,
}

impl Family {
    fn parse(value: &str) -> Result<Self, String> {
        match value {
            "factor" => Ok(Self::Factor),
            "formula" => Ok(Self::Formula),
            "reference-value" => Ok(Self::ReferenceValue),
            "mapping" => Ok(Self::Mapping),
            "decision" => Ok(Self::Decision),
            "transition" => Ok(Self::Transition),
            "constraint" => Ok(Self::Constraint),
            "procedure" => Ok(Self::Procedure),
            "diagnostic" => Ok(Self::Diagnostic),
            "scale" => Ok(Self::Scale),
            "evidence" => Ok(Self::Evidence),
            _ => Err(format!("unknown family `{value}`")),
        }
    }

    /// Returns the stable interchange identifier.
    #[must_use]
    pub const fn id(self) -> &'static str {
        match self {
            Self::Factor => "factor",
            Self::Formula => "formula",
            Self::ReferenceValue => "reference-value",
            Self::Mapping => "mapping",
            Self::Decision => "decision",
            Self::Transition => "transition",
            Self::Constraint => "constraint",
            Self::Procedure => "procedure",
            Self::Diagnostic => "diagnostic",
            Self::Scale => "scale",
            Self::Evidence => "evidence",
        }
    }

    /// Returns the publication label.
    #[must_use]
    pub const fn label(self) -> &'static str {
        match self {
            Self::Factor => "Factor Table",
            Self::Formula => "Formula Table",
            Self::ReferenceValue => "Reference Value Table",
            Self::Mapping => "Mapping Table",
            Self::Decision => "Decision Table",
            Self::Transition => "Transition Table",
            Self::Constraint => "Constraint Table",
            Self::Procedure => "Procedure Table",
            Self::Diagnostic => "Diagnostic Table",
            Self::Scale => "Scale Table",
            Self::Evidence => "Evidence Table",
        }
    }

    const fn all() -> [Self; 11] {
        [
            Self::Factor,
            Self::Formula,
            Self::ReferenceValue,
            Self::Mapping,
            Self::Decision,
            Self::Transition,
            Self::Constraint,
            Self::Procedure,
            Self::Diagnostic,
            Self::Scale,
            Self::Evidence,
        ]
    }
}

impl fmt::Display for Family {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(self.id())
    }
}

/// One canonical entry metadata record.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ReferenceEntry {
    id: String,
    title: String,
    domain: String,
    maturity: String,
    source_path: String,
    summary: String,
    aliases: Vec<String>,
    senses: Vec<ReferenceSense>,
    factors: Vec<ReferenceFactor>,
}

impl ReferenceEntry {
    /// Returns the stable entry identifier.
    #[must_use]
    pub fn id(&self) -> &str {
        &self.id
    }

    /// Returns the display title.
    #[must_use]
    pub fn title(&self) -> &str {
        &self.title
    }

    /// Returns the broad navigation domain.
    #[must_use]
    pub fn domain(&self) -> &str {
        &self.domain
    }

    /// Returns the editorial maturity identifier.
    #[must_use]
    pub fn maturity(&self) -> &str {
        &self.maturity
    }

    /// Returns the repository-relative Markdown source.
    #[must_use]
    pub fn source_path(&self) -> &str {
        &self.source_path
    }

    /// Returns the compact catalog summary.
    #[must_use]
    pub fn summary(&self) -> &str {
        &self.summary
    }

    /// Returns lexical aliases in canonical order.
    #[must_use]
    pub fn aliases(&self) -> &[String] {
        &self.aliases
    }

    /// Returns declared senses in canonical order.
    #[must_use]
    pub fn senses(&self) -> &[ReferenceSense] {
        &self.senses
    }

    /// Returns factors in semantic declaration order.
    #[must_use]
    pub fn factors(&self) -> &[ReferenceFactor] {
        &self.factors
    }
}

/// One stable sense under an entry.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ReferenceSense {
    id: String,
    label: String,
}

/// One stable factor under an entry.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ReferenceFactor {
    id: String,
    label: String,
}

impl ReferenceFactor {
    /// Returns the stable local factor identifier.
    #[must_use]
    pub fn id(&self) -> &str {
        &self.id
    }

    /// Returns the factor phrase used in the publication source.
    #[must_use]
    pub fn label(&self) -> &str {
        &self.label
    }
}

impl ReferenceSense {
    /// Returns the stable local sense identifier.
    #[must_use]
    pub fn id(&self) -> &str {
        &self.id
    }

    /// Returns the concise human-readable label.
    #[must_use]
    pub fn label(&self) -> &str {
        &self.label
    }
}

/// One specialized view metadata record.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ReferenceView {
    id: String,
    entry_id: String,
    sense_ids: Vec<String>,
    family: Family,
    title: String,
    source_path: String,
    summary: String,
}

impl ReferenceView {
    /// Returns the stable view identifier.
    #[must_use]
    pub fn id(&self) -> &str {
        &self.id
    }

    /// Returns the owning canonical entry identifier.
    #[must_use]
    pub fn entry_id(&self) -> &str {
        &self.entry_id
    }

    /// Returns the owning sense identifiers, or an empty slice for a visible
    /// unresolved headword candidate.
    #[must_use]
    pub fn sense_ids(&self) -> &[String] {
        &self.sense_ids
    }

    /// Returns the one primary family.
    #[must_use]
    pub const fn family(&self) -> Family {
        self.family
    }

    /// Returns the display title.
    #[must_use]
    pub fn title(&self) -> &str {
        &self.title
    }

    /// Returns the repository-relative Markdown source.
    #[must_use]
    pub fn source_path(&self) -> &str {
        &self.source_path
    }

    /// Returns the compact catalog summary.
    #[must_use]
    pub fn summary(&self) -> &str {
        &self.summary
    }
}

/// The complete canonical Factorium metadata corpus.
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ReferenceCorpus {
    header: String,
    entries: Vec<ReferenceEntry>,
    views: Vec<ReferenceView>,
}

impl ReferenceCorpus {
    /// Parses canonical Factorium Reference V0, V1, or V2 text.
    ///
    /// # Errors
    ///
    /// Returns an error for noncanonical transport, invalid identifiers,
    /// duplicate records, unknown owners, or incomplete blocks.
    pub fn parse(input: &str) -> Result<Self, String> {
        validate_transport(input)?;
        let lines: Vec<&str> = input.lines().collect();
        let header = reference_header(lines.first().copied())?;
        if lines.last() != Some(&END) {
            return Err(format!("last line: expected `{END}`"));
        }

        let mut entries = Vec::new();
        let mut views = Vec::new();
        let mut index = 1;
        while index + 1 < lines.len() {
            let line = lines[index];
            if line.starts_with("entry ") {
                let entry_fields = fields(line, "entry ", 6, index + 1)?;
                let mut aliases = Vec::new();
                let mut senses = Vec::new();
                let mut reference_factors = Vec::new();
                index += 1;
                while index < lines.len() && lines[index].starts_with("alias ") {
                    let alias = lines[index]
                        .strip_prefix("alias ")
                        .ok_or_else(|| format!("line {}: malformed alias", index + 1))?;
                    if alias.is_empty() {
                        return Err(format!("line {}: empty alias", index + 1));
                    }
                    aliases.push(alias.to_owned());
                    index += 1;
                }
                while index < lines.len() && lines[index].starts_with("sense ") {
                    let sense_fields = fields(lines[index], "sense ", 2, index + 1)?;
                    senses.push(ReferenceSense {
                        id: sense_fields[0].to_owned(),
                        label: sense_fields[1].to_owned(),
                    });
                    index += 1;
                }
                while index < lines.len() && lines[index].starts_with("factor ") {
                    let factor_fields = fields(lines[index], "factor ", 2, index + 1)?;
                    reference_factors.push(ReferenceFactor {
                        id: factor_fields[0].to_owned(),
                        label: factor_fields[1].to_owned(),
                    });
                    index += 1;
                }
                if lines.get(index) != Some(&"end-entry") {
                    return Err(format!("line {}: expected `end-entry`", index + 1));
                }
                entries.push(ReferenceEntry {
                    id: entry_fields[0].to_owned(),
                    title: entry_fields[1].to_owned(),
                    domain: entry_fields[2].to_owned(),
                    maturity: entry_fields[3].to_owned(),
                    source_path: entry_fields[4].to_owned(),
                    summary: entry_fields[5].to_owned(),
                    aliases,
                    senses,
                    factors: reference_factors,
                });
            } else if line.starts_with("view ") {
                let fields = fields(line, "view ", 7, index + 1)?;
                let sense_ids = if fields[2] == "-" {
                    Vec::new()
                } else {
                    fields[2].split(',').map(str::to_owned).collect()
                };
                views.push(ReferenceView {
                    id: fields[0].to_owned(),
                    entry_id: fields[1].to_owned(),
                    sense_ids,
                    family: Family::parse(fields[3])
                        .map_err(|error| format!("line {}: {error}", index + 1))?,
                    title: fields[4].to_owned(),
                    source_path: fields[5].to_owned(),
                    summary: fields[6].to_owned(),
                });
                index += 1;
                if lines.get(index) != Some(&"end-view") {
                    return Err(format!("line {}: expected `end-view`", index + 1));
                }
            } else {
                return Err(format!("line {}: unexpected record `{line}`", index + 1));
            }
            index += 1;
        }

        let corpus = Self {
            header: header.to_owned(),
            entries,
            views,
        };
        corpus.validate()?;
        if corpus.canonical_text() != input {
            return Err("document is valid but not in canonical ordering".to_owned());
        }
        Ok(corpus)
    }

    /// Returns entries in canonical identifier order.
    #[must_use]
    pub fn entries(&self) -> &[ReferenceEntry] {
        &self.entries
    }

    /// Returns views in canonical identifier order.
    #[must_use]
    pub fn views(&self) -> &[ReferenceView] {
        &self.views
    }

    /// Returns the exact interchange header.
    #[must_use]
    pub fn header(&self) -> &str {
        &self.header
    }

    fn manifest_path(&self) -> &'static str {
        match self.header.as_str() {
            HEADER_V0 => "reference/factorium-reference-v0.factorium",
            HEADER_V1 => "reference/factorium-reference-v1.factorium",
            HEADER_V2 => "reference/factorium-reference-v2.factorium",
            _ => unreachable!("validated reference header"),
        }
    }

    /// Serializes the corpus to canonical text.
    #[must_use]
    pub fn canonical_text(&self) -> String {
        let mut output = self.header.clone();
        output.push('\n');
        for entry in &self.entries {
            output.push_str("entry ");
            output.push_str(&join([
                entry.id(),
                entry.title(),
                entry.domain(),
                entry.maturity(),
                entry.source_path(),
                entry.summary(),
            ]));
            output.push('\n');
            for alias in entry.aliases() {
                output.push_str("alias ");
                output.push_str(alias);
                output.push('\n');
            }
            for sense in entry.senses() {
                output.push_str("sense ");
                output.push_str(&join([sense.id(), sense.label()]));
                output.push('\n');
            }
            for factor in entry.factors() {
                output.push_str("factor ");
                output.push_str(&join([factor.id(), factor.label()]));
                output.push('\n');
            }
            output.push_str("end-entry\n");
        }
        for view in &self.views {
            output.push_str("view ");
            output.push_str(view.id());
            output.push_str(" | ");
            output.push_str(view.entry_id());
            if view.sense_ids().is_empty() {
                output.push_str(" | -");
            } else {
                output.push_str(" | ");
                output.push_str(&view.sense_ids().join(","));
            }
            output.push_str(" | ");
            output.push_str(view.family().id());
            output.push_str(" | ");
            output.push_str(view.title());
            output.push_str(" | ");
            output.push_str(view.source_path());
            output.push_str(" | ");
            output.push_str(view.summary());
            output.push('\n');
            output.push_str("end-view\n");
        }
        output.push_str(END);
        output.push('\n');
        output
    }

    /// Returns SHA-256 over exact canonical bytes.
    #[must_use]
    pub fn sha256(&self) -> String {
        let mut hasher = Sha256::new();
        hasher.update(self.canonical_text().as_bytes());
        format!("{:x}", hasher.finalize())
    }

    /// Validates linked Markdown sources and declared family ownership.
    ///
    /// # Errors
    ///
    /// Returns an error when source files, titles, maturity, senses, or family
    /// declarations disagree with the canonical metadata.
    pub fn validate_workspace(&self, root: &Path) -> Result<(), String> {
        for entry in &self.entries {
            let content = read_source(root, entry.source_path())?;
            require_heading(&content, entry.title(), entry.source_path())?;
            let status = format!("Status: {} anchor entry", entry.maturity());
            if !content.lines().any(|line| line == status) {
                return Err(format!(
                    "{}: missing exact maturity declaration `{status}`",
                    entry.source_path()
                ));
            }
            for sense in entry.senses() {
                let marker = format!("`{}`", sense.id());
                if !content.contains(&marker) {
                    return Err(format!(
                        "{}: missing declared sense marker {marker}",
                        entry.source_path()
                    ));
                }
            }
            for factor in entry.factors() {
                if !content.contains(factor.label()) {
                    return Err(format!(
                        "{}: missing declared factor phrase `{}`",
                        entry.source_path(),
                        factor.label()
                    ));
                }
            }
        }

        for view in &self.views {
            let content = read_source(root, view.source_path())?;
            require_heading(&content, view.title(), view.source_path())?;
            let family = format!("Primary family: {}", view.family().label());
            let family_lines: Vec<&str> = content
                .lines()
                .filter(|line| line.starts_with("Primary family:"))
                .collect();
            if family_lines != [family.as_str()] {
                return Err(format!(
                    "{}: expected exactly one family declaration `{family}`",
                    view.source_path()
                ));
            }
            if !view.entry_id().starts_with("unresolved-") {
                let owner_link = format!("entries/{}.md", view.entry_id());
                if !content.contains(&owner_link) {
                    return Err(format!(
                        "{}: missing canonical owner link `{owner_link}`",
                        view.source_path()
                    ));
                }
            } else if !content.contains("`unresolved-candidate`") {
                return Err(format!(
                    "{}: unresolved owner requires a visible `unresolved-candidate` marker",
                    view.source_path()
                ));
            }
        }
        Ok(())
    }

    /// Generates the canonical Markdown catalog projection.
    #[must_use]
    pub fn catalog_markdown(&self) -> String {
        let mut output = format!(
            "# Factorium Generated Catalog\n\nGenerated from `{}`. Do not edit by hand.\n\n",
            self.manifest_path()
        );
        output.push_str("Corpus identity: `");
        output.push_str(&self.sha256());
        output.push_str("`\n\n## Canonical Factor Table entries\n\n");
        for entry in &self.entries {
            output.push_str("- [");
            output.push_str(entry.title());
            output.push_str("](");
            output.push_str(relative_from_tables(entry.source_path()));
            output.push_str(") — ");
            output.push_str(entry.summary());
            output.push_str(" (`");
            output.push_str(entry.domain());
            output.push_str("`, `");
            output.push_str(entry.maturity());
            output.push_str("`)\n");
        }

        for family in Family::all() {
            let family_views: Vec<&ReferenceView> = self
                .views
                .iter()
                .filter(|view| view.family() == family)
                .collect();
            if family_views.is_empty() {
                continue;
            }
            output.push_str("\n## ");
            output.push_str(family.label());
            output.push_str(" views\n\n");
            for view in family_views {
                output.push_str("- [");
                output.push_str(view.title());
                output.push_str("](");
                output.push_str(relative_from_tables(view.source_path()));
                output.push_str(") — ");
                output.push_str(view.summary());
                output.push_str(" (owner: `");
                output.push_str(view.entry_id());
                if view.entry_id().starts_with("unresolved-") {
                    output.push_str("`, unresolved candidate");
                } else {
                    output.push_str("`, senses: `");
                    output.push_str(&view.sense_ids().join("`, `"));
                    output.push('`');
                }
                output.push_str(")\n");
            }
        }
        output
    }

    /// Generates the canonical Formula Table catalog projection.
    #[must_use]
    pub fn formula_catalog_markdown(&self) -> String {
        let mut output = format!(
            "# Generated Formula Table Catalog\n\nGenerated from `{}`. Do not edit by hand.\n\n",
            self.manifest_path()
        );
        output.push_str("Corpus identity: `");
        output.push_str(&self.sha256());
        output.push_str("`\n\n");
        output.push_str("| Formula view | Canonical owner | Sense coverage | Purpose |\n");
        output.push_str("|---|---|---|---|\n");
        for view in self
            .views()
            .iter()
            .filter(|view| view.family() == Family::Formula)
        {
            output.push_str("| [");
            output.push_str(view.title());
            output.push_str("](");
            output.push_str(
                view.source_path()
                    .strip_prefix("tables/formulas/")
                    .unwrap_or(view.source_path()),
            );
            output.push_str(") | ");
            if view.entry_id().starts_with("unresolved-") {
                output.push('`');
                output.push_str(view.entry_id());
                output.push_str("` candidate");
            } else {
                output.push('[');
                output.push_str(view.entry_id());
                output.push_str("](../entries/");
                output.push_str(view.entry_id());
                output.push_str(".md)");
            }
            output.push_str(" | ");
            if view.sense_ids().is_empty() {
                output.push_str("unresolved");
            } else {
                output.push('`');
                output.push_str(&view.sense_ids().join("`, `"));
                output.push('`');
            }
            output.push_str(" | ");
            output.push_str(&view.summary().replace('|', "\\|"));
            output.push_str(" |\n");
        }
        output
    }

    /// Generates an unresolved-candidate report from linked Markdown sources.
    ///
    /// # Errors
    ///
    /// Returns an error when a linked source cannot be read.
    pub fn unresolved_markdown(&self, root: &Path) -> Result<String, String> {
        let mut rows = Vec::new();
        let mut paths = HashSet::new();
        for path in self
            .entries
            .iter()
            .map(ReferenceEntry::source_path)
            .chain(self.views.iter().map(ReferenceView::source_path))
        {
            if !paths.insert(path) {
                continue;
            }
            let content = read_source(root, path)?;
            for (line_index, line) in content.lines().enumerate() {
                if line.starts_with("- ") && line.contains("`unresolved-candidate`") {
                    rows.push((
                        path,
                        line_index + 1,
                        line.trim_start_matches("- ").to_owned(),
                    ));
                }
            }
        }
        rows.sort();

        let mut output = String::from(
            "# Factorium Generated Unresolved Candidates\n\n\
             Generated from canonical linked Markdown sources. Do not edit by hand.\n\n",
        );
        output.push_str("| Source | Line | Candidate declaration |\n|---|---:|---|\n");
        for (path, line, declaration) in rows {
            output.push_str("| `");
            output.push_str(path);
            output.push_str("` | ");
            output.push_str(&line.to_string());
            output.push_str(" | ");
            output.push_str(&declaration.replace('|', "\\|"));
            output.push_str(" |\n");
        }
        Ok(output)
    }

    /// Writes deterministic generated projections.
    ///
    /// # Errors
    ///
    /// Returns an error for unreadable sources or failed writes.
    pub fn sync_projections(&self, root: &Path) -> Result<(), String> {
        self.validate_workspace(root)?;
        write_if_changed(
            &root.join("tables").join("CATALOG.md"),
            &self.catalog_markdown(),
        )?;
        write_if_changed(
            &root.join("tables").join("formulas").join("INDEX.md"),
            &self.formula_catalog_markdown(),
        )?;
        write_if_changed(
            &root.join("tables").join("UNRESOLVED.md"),
            &self.unresolved_markdown(root)?,
        )
    }

    /// Checks that committed projections exactly match generated output.
    ///
    /// # Errors
    ///
    /// Returns an error when a projection is missing or stale.
    pub fn validate_projections(&self, root: &Path) -> Result<(), String> {
        self.validate_workspace(root)?;
        validate_projection(
            &root.join("tables").join("CATALOG.md"),
            &self.catalog_markdown(),
        )?;
        validate_projection(
            &root.join("tables").join("formulas").join("INDEX.md"),
            &self.formula_catalog_markdown(),
        )?;
        validate_projection(
            &root.join("tables").join("UNRESOLVED.md"),
            &self.unresolved_markdown(root)?,
        )
    }

    fn validate(&self) -> Result<(), String> {
        if self.entries.is_empty() {
            return Err("reference must declare at least one entry".to_owned());
        }
        validate_sorted_unique(
            self.entries.iter().map(ReferenceEntry::id),
            "entry identifiers",
        )?;
        validate_sorted_unique(self.views.iter().map(ReferenceView::id), "view identifiers")?;
        if self.views.is_empty() {
            return Err("reference must declare at least one view".to_owned());
        }

        let entry_senses = self.validate_entries()?;
        self.validate_views(&entry_senses)
    }

    fn validate_entries(&self) -> Result<HashMap<&str, HashSet<&str>>, String> {
        let mut entry_senses = HashMap::new();
        for entry in &self.entries {
            validate_id(entry.id(), "entry")?;
            validate_id(entry.domain(), "domain")?;
            validate_maturity(entry.maturity())?;
            validate_path(entry.source_path())?;
            validate_field(entry.title(), "entry title")?;
            validate_field(entry.summary(), "entry summary")?;
            validate_sorted_unique(entry.aliases().iter().map(String::as_str), "aliases")?;
            for alias in entry.aliases() {
                validate_field(alias, "alias")?;
            }
            if entry.senses().is_empty() {
                return Err(format!("entry `{}` has no senses", entry.id()));
            }
            validate_unique(
                entry.senses().iter().map(ReferenceSense::id),
                "sense identifiers",
            )?;
            for sense in entry.senses() {
                validate_id(sense.id(), "sense")?;
                validate_field(sense.label(), "sense label")?;
            }
            if entry.factors().is_empty() {
                return Err(format!("entry `{}` has no factors", entry.id()));
            }
            validate_unique(
                entry.factors().iter().map(ReferenceFactor::id),
                "factor identifiers",
            )?;
            for factor in entry.factors() {
                validate_id(factor.id(), "factor")?;
                validate_field(factor.label(), "factor label")?;
            }
            entry_senses.insert(
                entry.id(),
                entry
                    .senses()
                    .iter()
                    .map(ReferenceSense::id)
                    .collect::<HashSet<_>>(),
            );
        }
        Ok(entry_senses)
    }

    fn validate_views(&self, entry_senses: &HashMap<&str, HashSet<&str>>) -> Result<(), String> {
        let mut path_owners = HashMap::new();
        for view in &self.views {
            validate_id(view.id(), "view")?;
            validate_path(view.source_path())?;
            validate_field(view.title(), "view title")?;
            validate_field(view.summary(), "view summary")?;
            if view.entry_id().starts_with("unresolved-") {
                validate_id(view.entry_id(), "unresolved owner")?;
                if !view.sense_ids().is_empty() {
                    return Err(format!(
                        "view `{}` has unresolved owner but declared senses",
                        view.id()
                    ));
                }
            } else if !entry_senses.contains_key(view.entry_id()) {
                return Err(format!(
                    "view `{}` references unknown entry `{}`",
                    view.id(),
                    view.entry_id()
                ));
            } else {
                if view.sense_ids().is_empty() {
                    return Err(format!("view `{}` has no owning senses", view.id()));
                }
                validate_unique(
                    view.sense_ids().iter().map(String::as_str),
                    "view sense identifiers",
                )?;
                let owner_senses = entry_senses
                    .get(view.entry_id())
                    .ok_or_else(|| format!("missing sense index for `{}`", view.entry_id()))?;
                for sense_id in view.sense_ids() {
                    validate_id(sense_id, "view sense")?;
                    if !owner_senses.contains(sense_id.as_str()) {
                        return Err(format!(
                            "view `{}` references unknown sense `{sense_id}` on `{}`",
                            view.id(),
                            view.entry_id()
                        ));
                    }
                }
            }
            if let Some(previous) = path_owners.insert(view.source_path(), view.id()) {
                return Err(format!(
                    "views `{previous}` and `{}` share source path `{}`",
                    view.id(),
                    view.source_path()
                ));
            }
        }
        Ok(())
    }
}

fn reference_header(value: Option<&str>) -> Result<&'static str, String> {
    match value {
        Some(HEADER_V0) => Ok(HEADER_V0),
        Some(HEADER_V1) => Ok(HEADER_V1),
        Some(HEADER_V2) => Ok(HEADER_V2),
        _ => Err(format!(
            "line 1: expected `{HEADER_V0}`, `{HEADER_V1}`, or `{HEADER_V2}`"
        )),
    }
}

fn validate_transport(input: &str) -> Result<(), String> {
    if !input.ends_with('\n') {
        return Err("canonical document must end with LF".to_owned());
    }
    if input.contains('\r') {
        return Err("canonical document must use LF without carriage returns".to_owned());
    }
    for (index, line) in input.lines().enumerate() {
        if line.is_empty() {
            return Err(format!("line {}: blank lines are forbidden", index + 1));
        }
        if line.trim_end() != line {
            return Err(format!("line {}: trailing whitespace", index + 1));
        }
    }
    Ok(())
}

fn fields<'a>(
    line: &'a str,
    prefix: &str,
    expected: usize,
    line_number: usize,
) -> Result<Vec<&'a str>, String> {
    let body = line
        .strip_prefix(prefix)
        .ok_or_else(|| format!("line {line_number}: expected `{prefix}`"))?;
    let values: Vec<&str> = body.split(" | ").collect();
    if values.len() != expected {
        return Err(format!(
            "line {line_number}: expected {expected} fields, found {}",
            values.len()
        ));
    }
    if values.iter().any(|value| value.is_empty()) {
        return Err(format!("line {line_number}: empty field"));
    }
    Ok(values)
}

fn join<const N: usize>(values: [&str; N]) -> String {
    values.join(" | ")
}

fn validate_sorted_unique<'a>(
    values: impl Iterator<Item = &'a str>,
    label: &str,
) -> Result<(), String> {
    let mut previous: Option<&str> = None;
    for value in values {
        if let Some(previous_value) = previous {
            if value <= previous_value {
                return Err(format!(
                    "{label} must be unique and sorted: `{value}` follows `{previous_value}`"
                ));
            }
        }
        previous = Some(value);
    }
    Ok(())
}

fn validate_unique<'a>(values: impl Iterator<Item = &'a str>, label: &str) -> Result<(), String> {
    let mut observed = HashSet::new();
    for value in values {
        if !observed.insert(value) {
            return Err(format!("{label} contains duplicate `{value}`"));
        }
    }
    Ok(())
}

fn validate_id(value: &str, label: &str) -> Result<(), String> {
    let mut characters = value.chars();
    let Some(first) = characters.next() else {
        return Err(format!("{label} identifier is empty"));
    };
    if !first.is_ascii_lowercase() {
        return Err(format!("{label} identifier `{value}` must start lowercase"));
    }
    let mut previous_hyphen = false;
    for character in characters {
        if character == '-' {
            if previous_hyphen {
                return Err(format!("{label} identifier `{value}` has repeated hyphen"));
            }
            previous_hyphen = true;
        } else if character.is_ascii_lowercase() || character.is_ascii_digit() {
            previous_hyphen = false;
        } else {
            return Err(format!(
                "{label} identifier `{value}` contains invalid byte"
            ));
        }
    }
    if previous_hyphen {
        return Err(format!("{label} identifier `{value}` ends with hyphen"));
    }
    Ok(())
}

fn validate_maturity(value: &str) -> Result<(), String> {
    match value {
        "candidate" | "supported" | "established" | "disputed" | "deprecated" => Ok(()),
        _ => Err(format!("unknown maturity `{value}`")),
    }
}

fn validate_path(value: &str) -> Result<(), String> {
    validate_field(value, "source path")?;
    if value.contains('\\') || value.starts_with('/') || value.contains("..") {
        return Err(format!("source path `{value}` must be repository-relative"));
    }
    if Path::new(value).extension() != Some(OsStr::new("md")) {
        return Err(format!("source path `{value}` must identify Markdown"));
    }
    Ok(())
}

fn validate_field(value: &str, label: &str) -> Result<(), String> {
    if value.contains('|') || value.contains('\n') || value.contains('\r') {
        return Err(format!("{label} contains a reserved delimiter"));
    }
    Ok(())
}

fn read_source(root: &Path, source_path: &str) -> Result<String, String> {
    let path = root.join(PathBuf::from(source_path));
    fs::read_to_string(&path).map_err(|error| format!("{}: {error}", path.display()))
}

fn require_heading(content: &str, title: &str, source_path: &str) -> Result<(), String> {
    let expected = format!("# {title}");
    if content.lines().next() != Some(expected.as_str()) {
        return Err(format!("{source_path}: expected first line `{expected}`"));
    }
    Ok(())
}

fn relative_from_tables(source_path: &str) -> &str {
    source_path.strip_prefix("tables/").unwrap_or(source_path)
}

fn write_if_changed(path: &Path, expected: &str) -> Result<(), String> {
    if fs::read_to_string(path).ok().as_deref() == Some(expected) {
        return Ok(());
    }
    fs::write(path, expected).map_err(|error| format!("{}: {error}", path.display()))
}

fn validate_projection(path: &Path, expected: &str) -> Result<(), String> {
    let actual =
        fs::read_to_string(path).map_err(|error| format!("{}: {error}", path.display()))?;
    if actual != expected {
        return Err(format!(
            "{} is stale; run `factor reference-sync`",
            path.display()
        ));
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::{Family, ReferenceCorpus};

    const SAMPLE: &str = "\
factorium-reference-v0
entry sample-entry | Sample Entry | examples | candidate | tables/entries/sample-entry.md | Demonstrates one entry.
alias example
sense sample-sense | sample sense
factor sample-factor | sample factor
end-entry
view sample-formula | sample-entry | sample-sense | formula | Sample Formula | tables/formulas/sample-formula.md | Demonstrates one view.
end-view
end-reference
";

    #[test]
    fn canonical_round_trip() {
        let corpus = ReferenceCorpus::parse(SAMPLE).expect("sample should parse");
        assert_eq!(corpus.canonical_text(), SAMPLE);
        assert_eq!(corpus.entries().len(), 1);
        assert_eq!(corpus.views()[0].family(), Family::Formula);
    }

    #[test]
    fn v1_header_round_trips_without_changing_record_grammar() {
        let input = SAMPLE.replacen("factorium-reference-v0", "factorium-reference-v1", 1);
        let corpus = ReferenceCorpus::parse(&input).expect("V1 sample should parse");
        assert_eq!(corpus.header(), "factorium-reference-v1");
        assert_eq!(corpus.canonical_text(), input);
    }

    #[test]
    fn v2_header_round_trips_without_changing_record_grammar() {
        let input = SAMPLE.replacen("factorium-reference-v0", "factorium-reference-v2", 1);
        let corpus = ReferenceCorpus::parse(&input).expect("V2 sample should parse");
        assert_eq!(corpus.header(), "factorium-reference-v2");
        assert_eq!(corpus.canonical_text(), input);
    }

    #[test]
    fn rejects_unsupported_reference_revision() {
        let input = SAMPLE.replacen("factorium-reference-v0", "factorium-reference-v3", 1);
        assert!(ReferenceCorpus::parse(&input)
            .unwrap_err()
            .contains("expected `factorium-reference-v0`, `factorium-reference-v1`, or `factorium-reference-v2`"));
    }

    #[test]
    fn rejects_unknown_owner() {
        let input = SAMPLE.replace(
            "view sample-formula | sample-entry",
            "view sample-formula | missing",
        );
        let error = ReferenceCorpus::parse(&input).expect_err("unknown owner should fail");
        assert!(error.contains("unknown entry"));
    }

    #[test]
    fn rejects_noncanonical_order() {
        let input = "\
factorium-reference-v0
entry z-entry | Z Entry | examples | candidate | tables/entries/z-entry.md | Z.
sense z-sense | z
factor z-factor | z
end-entry
entry a-entry | A Entry | examples | candidate | tables/entries/a-entry.md | A.
sense a-sense | a
factor a-factor | a
end-entry
end-reference
";
        let error = ReferenceCorpus::parse(input).expect_err("order should fail");
        assert!(error.contains("sorted"));
    }
}
