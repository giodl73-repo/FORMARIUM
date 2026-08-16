param(
    [ValidateSet("sim-01", "sim-02", "sim-03", "sim-04", "sim-05", "sim-06", "sim-07", "sim-08", "sim-09", "sim-10", "sim-11", "sim-12", "sim-13", "sim-14", "sim-15", "sim-16", "sim-17", "sim-18", "sim-19")]
    [string]$Edition = "sim-01",
    [string]$OutputDirectory = ""
)

$ErrorActionPreference = "Stop"
$editionNumber = [int]$Edition.Substring(4)

$workspace = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$volume = Join-Path $workspace "volumes\01-structure-quantity-choice\VOLUME.md"
$supplement = Join-Path $workspace "volumes\01-structure-quantity-choice\FACTOR-FORGE-SIM-SUPPLEMENT.md"
$factorForgeTasks = Join-Path $workspace "volumes\01-structure-quantity-choice\FACTOR-FORGE-SIM-TASKS.md"
$factorForgeRubric = Join-Path $workspace "volumes\01-structure-quantity-choice\FACTOR-FORGE-SIM-RUBRIC.md"
$quickstart = Join-Path $workspace "volumes\01-structure-quantity-choice\PROOF-SET-SIM-QUICKSTART.md"
$compositionWorksheet = Join-Path $workspace "guides\system-dependency-composition-worksheet.md"
$evidenceWorksheet = Join-Path $workspace "guides\latency-evidence-composition-worksheet.md"
$feedbackWorksheet = Join-Path $workspace "guides\alert-feedback-composition-worksheet.md"
$conflictWorksheet = Join-Path $workspace "guides\dependency-exclusion-conflict-worksheet.md"
$frontierWorksheet = Join-Path $workspace "guides\delegated-compliance-frontier-worksheet.md"
$compositionLabSpec = Join-Path $workspace "specs\COMPOSITION-LAB.md"
$compositionReadingSpec = Join-Path $workspace "specs\COMPOSITION-READING-ROUTE.md"
$compositionFocusSpec = Join-Path $workspace "specs\COMPOSITION-FACTOR-FOCUS.md"
$compositionPaletteSpec = Join-Path $workspace "specs\COMPOSITION-PALETTE.md"
$compositionTraces = @(
    (Join-Path $workspace "fixtures\composition\system-dependency.factorium-query"),
    (Join-Path $workspace "fixtures\composition\latency-evidence.factorium-query"),
    (Join-Path $workspace "fixtures\composition\alert-feedback.factorium-query"),
    (Join-Path $workspace "fixtures\composition\dependency-exclusion-conflict.factorium-query"),
    (Join-Path $workspace "fixtures\composition\delegated-compliance-frontier.factorium-query")
)
$style = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set.css"
$searchStyle = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-search.css"
$searchScript = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-search.js"
$readerStyle = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-reader.css"
$readerScript = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-reader.js"
$contextStyle = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-context.css"
$contextScript = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-context.js"
$siteStyle = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-site.css"
$compositionStyle = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-composition.css"
$conflictStyle = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-conflict.css"
$frontierStyle = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-frontier.css"
$explorerStyle = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-explorer.css"
$labStyle = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-composition-lab.css"
$labScript = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-composition-lab.js"
$compositionReadingStyle = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-composition-reading.css"
$compositionReadingScript = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-composition-reading.js"
$compositionFocusStyle = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-composition-focus.css"
$compositionPaletteStyle = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-composition-palette.css"
$compositionPaletteScript = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-composition-palette.js"
$contextBindings = Join-Path $workspace "volumes\01-structure-quantity-choice\CONTEXT-PROFILE-SIM-BINDINGS.md"
$contextProfileSources = @(
    (Join-Path $workspace "tables\context-profiles\newtonian-mechanics.md"),
    (Join-Path $workspace "tables\context-profiles\governed-organization.md"),
    (Join-Path $workspace "tables\context-profiles\versioned-software-system.md")
)
$volumeDirectory = Split-Path $volume
$artifactName = "proof-set-$Edition"
$artifactTitle = switch ($Edition) {
    "sim-01" { "Factorium Proof Set Simulation 01" }
    "sim-02" { "Factorium Proof Set Expanded Simulation 02" }
    "sim-03" { "Factorium Proof Set Factor Forge Task Simulation 03" }
    "sim-04" { "Factorium Proof Set Search Simulation 04" }
    "sim-05" { "Factorium Proof Set Adaptive Reader Simulation 05" }
    "sim-06" { "Factorium Proof Set Context Profile Simulation 06" }
    "sim-07" { "Factorium Proof Set Book Site Simulation 07" }
    "sim-08" { "Factorium Proof Set Reader Journey Simulation 08" }
    "sim-09" { "Factorium Proof Set Composition Worksheet Simulation 09" }
    "sim-10" { "Factorium Proof Set Cross-Domain Composition Simulation 10" }
    "sim-11" { "Factorium Proof Set Incomplete Feedback Composition Simulation 11" }
    "sim-12" { "Factorium Proof Set Problem-Led Reading Simulation 12" }
    "sim-13" { "Factorium Proof Set Subtract Conflict Simulation 13" }
    "sim-14" { "Factorium Proof Set Truncated Frontier Simulation 14" }
    "sim-15" { "Factorium Proof Set Composition Explorer Simulation 15" }
    "sim-16" { "Factorium Proof Set Bounded Composition Lab Simulation 16" }
    "sim-17" { "Factorium Proof Set Closure Reading Route Simulation 17" }
    "sim-18" { "Factorium Proof Set Exact Factor Focus Simulation 18" }
    "sim-19" { "Factorium Proof Set Progressive Concept Palette Simulation 19" }
}
if ([string]::IsNullOrWhiteSpace($OutputDirectory)) {
    $OutputDirectory = "target\$artifactName"
}
$output = [System.IO.Path]::GetFullPath((Join-Path $workspace $OutputDirectory))
$html = Join-Path $output "$artifactName.html"
$manifest = Join-Path $output "manifest.json"
$searchIndexOutput = Join-Path $output "search-index.json"

$pandoc = Get-Command pandoc -ErrorAction Stop
$excludedNames = [System.Collections.Generic.HashSet[string]]::new(
    [System.StringComparer]::OrdinalIgnoreCase
)
@(
    "USABILITY-PROTOCOL.md",
    "READER-PACKET.md",
    "EVALUATOR-RUBRIC.md",
    "OBSERVATIONS.md",
    "FACTOR-FORGE-SIM-RUBRIC.md"
) | ForEach-Object { [void]$excludedNames.Add($_) }

$sources = [System.Collections.Generic.List[string]]::new()
$seen = [System.Collections.Generic.HashSet[string]]::new(
    [System.StringComparer]::OrdinalIgnoreCase
)

function Add-ProofSource {
    param([string]$Path)

    $fullPath = [System.IO.Path]::GetFullPath($Path)
    if (-not (Test-Path -LiteralPath $fullPath -PathType Leaf)) {
        throw "Missing proof source: $fullPath"
    }
    if ($seen.Add($fullPath)) {
        $sources.Add($fullPath)
    }
}

function Get-CompositionTraceSummary {
    param(
        [string]$Path,
        [string]$Worksheet
    )

    $text = Get-Content -LiteralPath $Path -Raw
    if ($text.Contains("`r") -or -not $text.EndsWith("`n")) {
        throw "Composition trace is not canonical LF text: $Path"
    }
    $lines = @($text.TrimEnd("`n").Split("`n"))
    if ($lines[0] -ne "factorium-composition-query-v0" -or $lines[-1] -ne "end-query") {
        throw "Composition trace has an invalid envelope: $Path"
    }

    function Single-Record {
        param([string]$Prefix)

        $matches = @($lines | Where-Object { $_.StartsWith($Prefix, [System.StringComparison]::Ordinal) })
        if ($matches.Count -ne 1) {
            throw "Composition trace requires one '$Prefix' record: $Path"
        }
        return $matches[0].Substring($Prefix.Length)
    }

    function Repeated-Records {
        param([string]$Prefix)

        return @($lines |
            Where-Object { $_.StartsWith($Prefix, [System.StringComparison]::Ordinal) } |
            ForEach-Object { $_.Substring($Prefix.Length) })
    }

    $budget = [ordered]@{}
    foreach ($pair in (Single-Record "budget ").Split(",")) {
        $parts = $pair.Split("=", 2)
        if ($parts.Count -ne 2) {
            throw "Composition trace has an invalid budget pair: $Path"
        }
        $budget[$parts[0]] = [int]$parts[1]
    }
    foreach ($key in @("depth", "edges", "nodes", "work")) {
        if (-not $budget.Contains($key)) {
            throw "Composition trace budget omits '$key': $Path"
        }
    }

    $policy = [ordered]@{}
    foreach ($pair in (Single-Record "policy ").Split(",")) {
        $parts = $pair.Split("=", 2)
        if ($parts.Count -ne 2) {
            throw "Composition trace has an invalid policy pair: $Path"
        }
        $policy[$parts[0]] = $parts[1]
    }

    $source = (Single-Record "source ") -split ' \| '
    if ($source.Count -ne 2) {
        throw "Composition trace has an invalid source record: $Path"
    }
    $referencePath = Join-Path $workspace "reference\factorium-reference-v0.factorium"
    $relationsPath = Join-Path $workspace "reference\factorium-relations-v0.factorium"
    $referenceHash = (Get-FileHash -LiteralPath $referencePath -Algorithm SHA256).Hash.ToLowerInvariant()
    $relationsHash = (Get-FileHash -LiteralPath $relationsPath -Algorithm SHA256).Hash.ToLowerInvariant()
    if ($source[0] -ne $referenceHash -or $source[1] -ne $relationsHash) {
        throw "Composition trace source digest drift: $Path"
    }

    $seeds = @(Repeated-Records "seed ")
    $nodes = @(Repeated-Records "node ")
    $edges = @(Repeated-Records "edge ")
    $frontiers = @(Repeated-Records "frontier ")
    $conflicts = @(Repeated-Records "conflict ")
    $checks = @(Repeated-Records "check ")
    $projections = @(Repeated-Records "projection ")
    $actualWork = $seeds.Count + $nodes.Count + $edges.Count + $frontiers.Count +
        $conflicts.Count + $checks.Count + $projections.Count
    if ($actualWork -ne $budget.work -or $nodes.Count -gt $budget.nodes -or $edges.Count -gt $budget.edges) {
        throw "Composition trace budget accounting drift: $Path"
    }

    $sha256 = (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash.ToLowerInvariant()
    if (-not (Get-Content -LiteralPath $Worksheet -Raw).Contains($sha256)) {
        throw "Composition worksheet omits exact trace identity: $Worksheet"
    }

    return [ordered]@{
        path = [System.IO.Path]::GetFullPath($Path)
        worksheet = [System.IO.Path]::GetFullPath($Worksheet)
        id = Single-Record "query "
        problem = Single-Record "problem "
        context = Single-Record "context "
        direction = $policy.direction
        budget = $budget
        seeds = $seeds
        nodes = $nodes
        edges = $edges
        frontiers = $frontiers
        conflicts = $conflicts
        checks = $checks
        projections = $projections
        state = Single-Record "state "
        sha256 = $sha256
    }
}

function Get-WorkspaceMarkdownPathSet {
    param([string]$Document)

    $documentDirectory = Split-Path $Document
    $documentText = Get-Content -LiteralPath $Document -Raw
    $paths = [System.Collections.Generic.HashSet[string]]::new(
        [System.StringComparer]::OrdinalIgnoreCase
    )
    [regex]::Matches($documentText, '\[[^\]]+\]\(([^)#]+\.md)(?:#[^)]+)?\)') |
        ForEach-Object {
            $target = [System.IO.Path]::GetFullPath(
                (Join-Path $documentDirectory $_.Groups[1].Value)
            )
            if ($target.StartsWith($workspace, [System.StringComparison]::OrdinalIgnoreCase)) {
                $relativeTarget = [System.IO.Path]::GetRelativePath($workspace, $target).Replace("\", "/")
                [void]$paths.Add($relativeTarget)
            }
        }
    return ,$paths
}

function Get-NumberedSelections {
    param([string]$Document)

    $documentDirectory = Split-Path $Document
    $documentText = Get-Content -LiteralPath $Document -Raw
    foreach ($match in [regex]::Matches(
        $documentText,
        '(?m)^\d+\. \[([^\]]+)\]\(([^)#]+\.md)(?:#[^)]+)?\)'
    )) {
        [ordered]@{
            title = $match.Groups[1].Value
            path = [System.IO.Path]::GetFullPath(
                (Join-Path $documentDirectory $match.Groups[2].Value)
            )
        }
    }
}

function Get-GuideSelections {
    $volumeText = Get-Content -LiteralPath $volume -Raw
    foreach ($match in [regex]::Matches(
        $volumeText,
        '(?m)^- \[([^\]]+ Guide)\]\((\.\./\.\./guides/[^)#]+\.md)\)'
    )) {
        [ordered]@{
            title = $match.Groups[1].Value
            path = [System.IO.Path]::GetFullPath(
                (Join-Path $volumeDirectory $match.Groups[2].Value)
            )
        }
    }
    if ($editionNumber -ge 9) {
        [ordered]@{
            title = "Report Generator Dependency Composition Worksheet"
            path = [System.IO.Path]::GetFullPath($compositionWorksheet)
        }
    }
    if ($editionNumber -ge 10) {
        [ordered]@{
            title = "Latency Claim Evidence Composition Worksheet"
            path = [System.IO.Path]::GetFullPath($evidenceWorksheet)
        }
    }
    if ($editionNumber -ge 11) {
        [ordered]@{
            title = "Alert and Outcome Feedback Composition Worksheet"
            path = [System.IO.Path]::GetFullPath($feedbackWorksheet)
        }
    }
    if ($editionNumber -ge 13) {
        [ordered]@{
            title = "Dependency Exclusion Conflict Composition Worksheet"
            path = [System.IO.Path]::GetFullPath($conflictWorksheet)
        }
    }
    if ($editionNumber -ge 14) {
        [ordered]@{
            title = "Delegated Compliance Frontier Composition Worksheet"
            path = [System.IO.Path]::GetFullPath($frontierWorksheet)
        }
    }
}

function Get-SiteChapterSelections {
    param([string]$Document)

    $documentDirectory = Split-Path $Document
    $documentText = Get-Content -LiteralPath $Document -Raw
    $chapterMatches = [regex]::Matches(
        $documentText,
        '(?m)^## Part ([IVX]+) - (.+)$'
    )
    for ($chapterIndex = 0; $chapterIndex -lt $chapterMatches.Count; $chapterIndex++) {
        $chapterMatch = $chapterMatches[$chapterIndex]
        $chapterEnd = if ($chapterIndex -lt $chapterMatches.Count - 1) {
            $chapterMatches[$chapterIndex + 1].Index
        }
        else {
            $documentText.Length
        }
        $chapterText = $documentText.Substring($chapterMatch.Index, $chapterEnd - $chapterMatch.Index)
        $selectionPattern = '(?m)^\d+\. \[[^\]]+\]\(([^)#]+\.md)(?:#[^)]+)?\)'
        $chapterPaths = @(
            foreach ($selectionMatch in [regex]::Matches($chapterText, $selectionPattern)) {
                [System.IO.Path]::GetFullPath(
                    (Join-Path $documentDirectory $selectionMatch.Groups[1].Value)
                )
            }
        )
        $chapterGroups = [System.Collections.Generic.List[object]]::new()
        $groupMatches = [regex]::Matches($chapterText, '(?m)^### (.+)$')
        if ($groupMatches.Count -eq 0) {
            $chapterGroups.Add([ordered]@{
                title = "Chapter records"
                paths = $chapterPaths
            })
        }
        else {
            $firstGroupText = $chapterText.Substring(0, $groupMatches[0].Index)
            $ungroupedPaths = @(
                foreach ($selectionMatch in [regex]::Matches($firstGroupText, $selectionPattern)) {
                    [System.IO.Path]::GetFullPath(
                        (Join-Path $documentDirectory $selectionMatch.Groups[1].Value)
                    )
                }
            )
            if ($ungroupedPaths.Count -gt 0) {
                $chapterGroups.Add([ordered]@{
                    title = "Chapter records"
                    paths = $ungroupedPaths
                })
            }
            for ($groupIndex = 0; $groupIndex -lt $groupMatches.Count; $groupIndex++) {
                $groupMatch = $groupMatches[$groupIndex]
                $groupEnd = if ($groupIndex -lt $groupMatches.Count - 1) {
                    $groupMatches[$groupIndex + 1].Index
                }
                else {
                    $chapterText.Length
                }
                $groupText = $chapterText.Substring($groupMatch.Index, $groupEnd - $groupMatch.Index)
                $groupPaths = @(
                    foreach ($selectionMatch in [regex]::Matches($groupText, $selectionPattern)) {
                        [System.IO.Path]::GetFullPath(
                            (Join-Path $documentDirectory $selectionMatch.Groups[1].Value)
                        )
                    }
                )
                if ($groupPaths.Count -gt 0) {
                    $chapterGroups.Add([ordered]@{
                        title = $groupMatch.Groups[1].Value.Trim()
                        paths = $groupPaths
                    })
                }
            }
        }
        [ordered]@{
            key = "part-$($chapterMatch.Groups[1].Value.ToLowerInvariant())"
            title = $chapterMatch.Groups[2].Value.Trim()
            paths = $chapterPaths
            groups = @($chapterGroups)
        }
    }
}

function ConvertTo-SearchText {
    param([string]$Markdown)

    $plain = $Markdown
    $plain = [regex]::Replace($plain, '(?s)```.*?```', ' ')
    $plain = [regex]::Replace($plain, '!?(?:\[([^\]]*)\])\([^)]*\)', '$1')
    $plain = [regex]::Replace($plain, '[#*`_|>~-]', ' ')
    $plain = [regex]::Replace($plain, '\s+', ' ').Trim()
    return $plain
}

function Get-SearchSummary {
    param([string]$Markdown)

    $titlePattern = [regex]::new('(?m)^# .*$\r?\n?')
    $withoutTitle = $titlePattern.Replace($Markdown, '', 1)
    foreach ($block in [regex]::Split($withoutTitle, '(?:\r?\n){2,}')) {
        $plain = ConvertTo-SearchText $block
        if ($plain.Length -ge 35 -and -not $block.TrimStart().StartsWith('|')) {
            if ($plain.Length -gt 280) {
                return $plain.Substring(0, 277).TrimEnd() + '...'
            }
            return $plain
        }
    }
    return "Open this record in the generated proof."
}

function ConvertTo-SitePageName {
    param([string]$RelativePath)

    $stem = [System.IO.Path]::ChangeExtension($RelativePath.Replace("\", "/"), $null)
    $slug = [regex]::Replace($stem.ToLowerInvariant(), '[^a-z0-9]+', '-').Trim('-')
    if ([string]::IsNullOrWhiteSpace($slug)) {
        throw "Could not derive site page name from: $RelativePath"
    }
    return "$slug.html"
}

$selectionChecks = [ordered]@{
    mode = "base volume path selection"
}
$canonicalMetadata = [System.Collections.Generic.Dictionary[string, object]]::new(
    [System.StringComparer]::OrdinalIgnoreCase
)
if ($Edition -ne "sim-01") {
    $canonicalKinds = [System.Collections.Generic.Dictionary[string, string]]::new(
        [System.StringComparer]::OrdinalIgnoreCase
    )
    $entryDomains = [System.Collections.Generic.Dictionary[string, string]]::new(
        [System.StringComparer]::OrdinalIgnoreCase
    )
    foreach ($line in Get-Content -LiteralPath (Join-Path $workspace "reference\factorium-reference-v0.factorium")) {
        if ($line.StartsWith("entry ", [System.StringComparison]::Ordinal)) {
            $parts = $line -split ' \| '
            $entryId = $parts[0].Substring("entry ".Length)
            $entryDomains[$entryId] = $parts[2]
            $canonicalKinds[$parts[4]] = "entry"
            $canonicalMetadata[$parts[4]] = [ordered]@{
                kind = "entry"
                domain = $parts[2]
                maturity = $parts[3]
                summary = ConvertTo-SearchText $parts[5]
            }
        }
        elseif ($line.StartsWith("view ", [System.StringComparison]::Ordinal)) {
            $parts = $line -split ' \| '
            $canonicalKinds[$parts[5]] = "view"
            $canonicalMetadata[$parts[5]] = [ordered]@{
                kind = $parts[3]
                domain = $entryDomains[$parts[1]]
                maturity = ""
                summary = $parts[6]
            }
        }
    }

    $volumePaths = Get-WorkspaceMarkdownPathSet $volume
    $supplementPaths = Get-WorkspaceMarkdownPathSet $supplement
    $expectedDelta = [System.Collections.Generic.HashSet[string]]::new(
        [System.StringComparer]::OrdinalIgnoreCase
    )
    foreach ($canonicalPath in $canonicalKinds.Keys) {
        if (-not $volumePaths.Contains($canonicalPath)) {
            [void]$expectedDelta.Add($canonicalPath)
        }
    }

    $missingDelta = @($expectedDelta | Where-Object { -not $supplementPaths.Contains($_) })
    $extraDelta = @($supplementPaths | Where-Object { -not $expectedDelta.Contains($_) })
    if ($missingDelta.Count -ne 0 -or $extraDelta.Count -ne 0) {
        throw "Factor Forge supplement mismatch: missing=$($missingDelta -join ',') extra=$($extraDelta -join ',')"
    }

    $deltaEntries = @($expectedDelta | Where-Object { $canonicalKinds[$_] -eq "entry" }).Count
    $deltaViews = @($expectedDelta | Where-Object { $canonicalKinds[$_] -eq "view" }).Count
    $selectionChecks = [ordered]@{
        mode = "exact current canonical delta from base volume paths"
        canonical_entries = @($canonicalKinds.Values | Where-Object { $_ -eq "entry" }).Count
        canonical_views = @($canonicalKinds.Values | Where-Object { $_ -eq "view" }).Count
        delta_entries = $deltaEntries
        delta_views = $deltaViews
        delta_records = $expectedDelta.Count
        combined_projection_records = 78 + $expectedDelta.Count
        missing_delta_paths = $missingDelta.Count
        extra_delta_paths = $extraDelta.Count
    }

    if ($editionNumber -ge 3) {
        $rubricText = Get-Content -LiteralPath $factorForgeRubric -Raw
        $taskCoverage = [System.Collections.Generic.HashSet[string]]::new(
            [System.StringComparer]::OrdinalIgnoreCase
        )
        [regex]::Matches($rubricText, '`(tables/[^`]+\.md)`') | ForEach-Object {
            [void]$taskCoverage.Add($_.Groups[1].Value)
        }
        $missingTaskCoverage = @($expectedDelta | Where-Object { -not $taskCoverage.Contains($_) })
        $extraTaskCoverage = @($taskCoverage | Where-Object { -not $expectedDelta.Contains($_) })
        if ($missingTaskCoverage.Count -ne 0 -or $extraTaskCoverage.Count -ne 0) {
            throw "Factor Forge task coverage mismatch: missing=$($missingTaskCoverage -join ',') extra=$($extraTaskCoverage -join ',')"
        }
        $selectionChecks.task_count = 24
        $selectionChecks.task_coverage_records = $taskCoverage.Count
        $selectionChecks.missing_task_coverage_paths = $missingTaskCoverage.Count
        $selectionChecks.extra_task_coverage_paths = $extraTaskCoverage.Count
    }
}

Add-ProofSource $quickstart
Add-ProofSource $volume

$selectionDocuments = [System.Collections.Generic.List[string]]::new()
$selectionDocuments.Add($volume)
if ($Edition -ne "sim-01") {
    Add-ProofSource $supplement
    $selectionDocuments.Add($supplement)
}
if ($editionNumber -ge 3) {
    Add-ProofSource $factorForgeTasks
}
if ($editionNumber -ge 6) {
    foreach ($contextProfileSource in $contextProfileSources) {
        Add-ProofSource $contextProfileSource
    }
}
if ($editionNumber -ge 9) {
    Add-ProofSource $compositionWorksheet
}
if ($editionNumber -ge 10) {
    Add-ProofSource $evidenceWorksheet
}
if ($editionNumber -ge 11) {
    Add-ProofSource $feedbackWorksheet
}
if ($editionNumber -ge 13) {
    Add-ProofSource $conflictWorksheet
}
if ($editionNumber -ge 14) {
    Add-ProofSource $frontierWorksheet
}
if ($editionNumber -ge 16) {
    Add-ProofSource $compositionLabSpec
}
if ($editionNumber -ge 17) {
    Add-ProofSource $compositionReadingSpec
}
if ($editionNumber -ge 18) {
    Add-ProofSource $compositionFocusSpec
}
if ($editionNumber -ge 19) {
    Add-ProofSource $compositionPaletteSpec
}

foreach ($selectionDocument in $selectionDocuments) {
    $selectionDirectory = Split-Path $selectionDocument
    $selectionText = Get-Content -LiteralPath $selectionDocument -Raw
    $links = [regex]::Matches($selectionText, '\[[^\]]+\]\(([^)#]+)(?:#[^)]+)?\)')
    foreach ($link in $links) {
        $relative = $link.Groups[1].Value
        if (-not $relative.EndsWith(".md", [System.StringComparison]::OrdinalIgnoreCase)) {
            continue
        }
        if ($excludedNames.Contains([System.IO.Path]::GetFileName($relative))) {
            continue
        }
        Add-ProofSource (Join-Path $selectionDirectory $relative)
    }
}

New-Item -ItemType Directory -Force -Path $output | Out-Null

$pandocSources = foreach ($source in $sources) {
    [System.IO.Path]::GetRelativePath($workspace, $source).Replace("\", "/")
}
$relativeStyle = [System.IO.Path]::GetRelativePath($workspace, $style).Replace("\", "/")
$pandocArguments = @(
    "--from=gfm",
    "--to=html5",
    "--standalone",
    "--file-scope",
    "--toc",
    "--toc-depth=3",
    "--embed-resources",
    "--css=$relativeStyle",
    "--metadata=title:$artifactTitle",
    "--output=$html"
) + $pandocSources

Push-Location $workspace
try {
    & $pandoc.Source @pandocArguments
    if ($LASTEXITCODE -ne 0) {
        throw "Pandoc failed with exit code $LASTEXITCODE"
    }
}
finally {
    Pop-Location
}

$htmlText = Get-Content -LiteralPath $html -Raw
$headingMatches = [regex]::Matches($htmlText, '<h1 id="([^"]+)"')
if ($headingMatches.Count -ne $sources.Count) {
    throw "Expected one top-level heading per source; found $($headingMatches.Count) for $($sources.Count) sources"
}

$headingBySource = [System.Collections.Generic.Dictionary[string, string]]::new(
    [System.StringComparer]::OrdinalIgnoreCase
)
for ($index = 0; $index -lt $sources.Count; $index++) {
    $headingBySource[$sources[$index]] = $headingMatches[$index].Groups[1].Value
}
$quickstartHeading = $headingBySource[$quickstart]
$sourceCommit = (git -C $workspace rev-parse HEAD).Trim()
$renderedSegmentBySource = [System.Collections.Generic.Dictionary[string, string]]::new(
    [System.StringComparer]::OrdinalIgnoreCase
)

for ($index = $sources.Count - 1; $index -ge 0; $index--) {
    $start = $headingMatches[$index].Index
    $end = if ($index -eq $sources.Count - 1) {
        $htmlText.LastIndexOf('</body>', [System.StringComparison]::Ordinal)
    }
    else {
        $headingMatches[$index + 1].Index
    }
    if ($end -lt $start) {
        throw "Could not identify rendered segment for $($sources[$index])"
    }

    $segment = $htmlText.Substring($start, $end - $start)
    $currentDirectory = Split-Path $sources[$index]
    $segment = [regex]::Replace(
        $segment,
        'href="([^"#?]+\.md)(#[^"]*)?"',
        {
            param($match)

            $rawTarget = [System.Net.WebUtility]::HtmlDecode($match.Groups[1].Value)
            if ([System.Uri]::IsWellFormedUriString($rawTarget, [System.UriKind]::Absolute)) {
                return $match.Value
            }

            $target = [System.IO.Path]::GetFullPath((Join-Path $currentDirectory $rawTarget))
            if ($headingBySource.ContainsKey($target)) {
                if ($match.Groups[2].Success) {
                    $relativeTarget = [System.IO.Path]::GetRelativePath($workspace, $target)
                    $scope = $relativeTarget.ToLowerInvariant().Replace("\", "__").Replace("/", "__").Replace(".", "") + "__"
                    return 'href="#' + $scope + $match.Groups[2].Value.Substring(1) + '"'
                }
                return 'href="#' + $headingBySource[$target] + '"'
            }

            if ($excludedNames.Contains([System.IO.Path]::GetFileName($target))) {
                return 'href="#' + $quickstartHeading + '"'
            }

            if ($target.StartsWith($workspace, [System.StringComparison]::OrdinalIgnoreCase)) {
                $relativeTarget = [System.IO.Path]::GetRelativePath($workspace, $target).Replace("\", "/")
                return 'href="https://github.com/giodl73-repo/FACTORIUM/blob/main/' + $relativeTarget + $match.Groups[2].Value + '"'
            }

            return $match.Value
        }
    )
    $renderedSegmentBySource[$sources[$index]] = $segment
    $htmlText = $htmlText.Substring(0, $start) + $segment + $htmlText.Substring($end)
}

$searchChecks = $null
$searchAssets = @()
$readerChecks = $null
$contextChecks = $null
$contextAssets = @()
$siteChecks = $null
$siteAssets = @()
$siteIndex = $null
$compositionChecks = $null
$compositionLabChecks = $null
$compositionReadingChecks = $null
$compositionFocusChecks = $null
$compositionPaletteChecks = $null
$compositionFocusRecords = @()
if ($editionNumber -ge 4) {
    foreach ($asset in @($searchStyle, $searchScript)) {
        if (-not (Test-Path -LiteralPath $asset -PathType Leaf)) {
            throw "Missing search asset: $asset"
        }
    }

    $numberedSelections = @(
        Get-NumberedSelections $volume
        Get-NumberedSelections $supplement
    )
    $guideSelections = @(Get-GuideSelections)
    $expectedGuideCount = if ($editionNumber -ge 14) {
        7
    }
    elseif ($editionNumber -ge 13) {
        6
    }
    elseif ($editionNumber -ge 11) {
        5
    }
    elseif ($editionNumber -eq 10) {
        4
    }
    elseif ($editionNumber -eq 9) {
        3
    }
    else {
        2
    }
    if ($numberedSelections.Count -ne 122 -or $guideSelections.Count -ne $expectedGuideCount) {
        throw "Search selection mismatch: numbered=$($numberedSelections.Count) guides=$($guideSelections.Count)"
    }

    $searchRecords = [System.Collections.Generic.List[object]]::new()
    $searchPaths = [System.Collections.Generic.HashSet[string]]::new(
        [System.StringComparer]::OrdinalIgnoreCase
    )
    $missingSearchTargets = [System.Collections.Generic.List[string]]::new()
    foreach ($selection in @($numberedSelections) + @($guideSelections)) {
        if (-not $searchPaths.Add($selection.path)) {
            throw "Duplicate search selection: $($selection.path)"
        }
        if (-not $headingBySource.ContainsKey($selection.path)) {
            $missingSearchTargets.Add($selection.path)
            continue
        }

        $relativePath = [System.IO.Path]::GetRelativePath($workspace, $selection.path).Replace("\", "/")
        $markdown = Get-Content -LiteralPath $selection.path -Raw
        $plainText = ConvertTo-SearchText $markdown
        if ($plainText.Length -gt 12000) {
            $plainText = $plainText.Substring(0, 12000)
        }
        $metadata = if ($canonicalMetadata.ContainsKey($relativePath)) {
            $canonicalMetadata[$relativePath]
        }
        else {
            $directoryKind = ([System.IO.Path]::GetDirectoryName($relativePath).Replace("\", "/").Split('/') | Select-Object -Last 1)
            $derivedKind = switch ($directoryKind) {
                "roots" { "root" }
                "roles" { "role" }
                "composites" { "composite" }
                "primes" { "prime" }
                "guides" { "guide" }
                default { $directoryKind.TrimEnd('s') }
            }
            $derivedDomain = switch ($derivedKind) {
                "root" { "structure" }
                "role" { "structure" }
                "composite" { "security" }
                "prime" { "security" }
                "guide" { "application" }
                default { "" }
            }
            [ordered]@{
                kind = $derivedKind
                domain = $derivedDomain
                maturity = ""
                summary = (Get-SearchSummary $markdown)
            }
        }

        $searchRecord = [ordered]@{
            title = $selection.title
            kind = $metadata.kind
            domain = $metadata.domain
            maturity = $metadata.maturity
            path = $relativePath
            anchor = $headingBySource[$selection.path]
            summary = $metadata.summary
            text = $plainText
        }
        if ($editionNumber -ge 7) {
            $searchRecord.href = "entries/$(ConvertTo-SitePageName $relativePath)"
        }
        $searchRecords.Add($searchRecord)
    }
    if ($missingSearchTargets.Count -ne 0) {
        throw "Search index has $($missingSearchTargets.Count) missing rendered targets"
    }

    $searchJson = $searchRecords | ConvertTo-Json -Depth 4 -Compress
    $searchJson = $searchJson.Replace('</', '<\/')
    [System.IO.File]::WriteAllText(
        $searchIndexOutput,
        ($searchRecords | ConvertTo-Json -Depth 4),
        [System.Text.UTF8Encoding]::new($false)
    )
    $searchCss = Get-Content -LiteralPath $searchStyle -Raw
    $searchJavaScript = Get-Content -LiteralPath $searchScript -Raw
    $searchShell = @'
<section class="proof-search" aria-labelledby="proof-search-heading">
<h2 id="proof-search-heading">Search this proof</h2>
<p>Search the selected records and application guides. Results open the canonical book projection below.</p>
<div class="proof-search__controls">
<label for="proof-search-query">Search terms
<input id="proof-search-query" type="search" autocomplete="off" placeholder="Try force, sample, balance, workflow, or contract">
</label>
<label for="proof-search-kind">Record kind
<select id="proof-search-kind"><option value="">All kinds</option></select>
</label>
<label for="proof-search-domain">Domain
<select id="proof-search-domain"><option value="">All domains</option></select>
</label>
</div>
<p id="proof-search-status" class="proof-search__status" role="status" aria-live="polite"></p>
<ol id="proof-search-results" class="proof-search__results"></ol>
<noscript><p>Search needs JavaScript. Every destination remains available in Browse the book.</p></noscript>
</section>
'@
    $htmlText = $htmlText.Replace('</head>', "<style>`n$searchCss`n</style>`n</head>")
    $navigationIndex = $htmlText.IndexOf('<nav id="TOC"', [System.StringComparison]::Ordinal)
    if ($navigationIndex -lt 0) {
        throw "Could not locate proof navigation for search shell"
    }
    $htmlText = $htmlText.Insert($navigationIndex, $searchShell)
    $searchBootstrap = "<script>window.FACTORIUM_SEARCH_INDEX=$searchJson;</script>`n<script>$searchJavaScript</script>`n"
    $htmlText = $htmlText.Replace('</body>', $searchBootstrap + '</body>')

    $searchAssets = foreach ($asset in @($searchStyle, $searchScript)) {
        [ordered]@{
            path = [System.IO.Path]::GetRelativePath($workspace, $asset).Replace("\", "/")
            sha256 = (Get-FileHash -LiteralPath $asset -Algorithm SHA256).Hash.ToLowerInvariant()
        }
    }
    $searchChecks = [ordered]@{
        numbered_records = $numberedSelections.Count
        application_guides = $guideSelections.Count
        indexed_records = $searchRecords.Count
        indexed_domains = @($searchRecords.domain | Where-Object { -not [string]::IsNullOrWhiteSpace($_) } | Sort-Object -Unique).Count
        duplicate_paths = $searchRecords.Count - $searchPaths.Count
        missing_rendered_targets = $missingSearchTargets.Count
        result_limit = 20
        execution = "static in-browser; no server or alternate content authority"
    }
}

if ($editionNumber -ge 5) {
    foreach ($asset in @($readerStyle, $readerScript)) {
        if (-not (Test-Path -LiteralPath $asset -PathType Leaf)) {
            throw "Missing reader asset: $asset"
        }
    }
    $sourceIndex = foreach ($source in $sources) {
        [ordered]@{
            path = [System.IO.Path]::GetRelativePath($workspace, $source).Replace("\", "/")
            anchor = $headingBySource[$source]
        }
    }
    $sourceIndexJson = ($sourceIndex | ConvertTo-Json -Depth 3 -Compress).Replace('</', '<\/')
    $readerCss = Get-Content -LiteralPath $readerStyle -Raw
    $readerJavaScript = Get-Content -LiteralPath $readerScript -Raw
    $readerShell = @'
<section class="reader-toolbar" aria-labelledby="reader-toolbar-heading" hidden>
<div class="reader-toolbar__heading">
<div>
<h2 id="reader-toolbar-heading">Reading view</h2>
<p id="reader-profile-status" class="reader-toolbar__status" role="status" aria-live="polite"></p>
</div>
<button id="reader-toc-toggle" type="button" aria-controls="TOC" aria-expanded="false">Show contents</button>
</div>
<div class="reader-toolbar__profiles" role="group" aria-label="Reading profile">
<button type="button" data-reader-profile="compact" aria-pressed="false" title="Titles and orientations, minimal metadata, tight spacing">Compact</button>
<button type="button" data-reader-profile="abbreviated" aria-pressed="false" title="Core reference content, minimal metadata, tight spacing">Abbreviated</button>
<button type="button" data-reader-profile="book" aria-pressed="true" title="Core reference content, essential metadata, comfortable spacing">Book</button>
<button type="button" data-reader-profile="full" aria-pressed="false" title="All content, metadata, provenance, and supporting sources">Full</button>
</div>
<details class="reader-toolbar__advanced">
<summary>Customize this view</summary>
<div class="reader-toolbar__controls">
<label for="reader-detail">Content detail
<select id="reader-detail">
<option value="summary">Summary</option><option value="core">Core</option><option value="full">All</option>
</select></label>
<label for="reader-metadata">Metadata
<select id="reader-metadata">
<option value="minimal">Minimal</option><option value="essential">Essential</option><option value="full">All</option>
</select></label>
<label for="reader-density">Spacing
<select id="reader-density">
<option value="tight">Tight</option><option value="comfortable">Comfortable</option>
</select></label>
<label for="reader-qualifiers">Context notation
<select id="reader-qualifiers">
<option value="folded">Fold repeated qualifier</option><option value="explicit">Show @ context</option>
</select></label>
</div>
</details>
</section>
'@
    $htmlText = $htmlText.Replace('</head>', "<style>`n$readerCss`n</style>`n</head>")
    $navigationIndex = $htmlText.IndexOf('<nav id="TOC"', [System.StringComparison]::Ordinal)
    if ($navigationIndex -lt 0) {
        throw "Could not locate proof navigation for reader controls"
    }
    $htmlText = $htmlText.Insert($navigationIndex, $readerShell)
    $readerBootstrap = "<script>window.FACTORIUM_SOURCE_INDEX=$sourceIndexJson;</script>`n<script>$readerJavaScript</script>`n"
    $htmlText = $htmlText.Replace('</body>', $readerBootstrap + '</body>')
    $searchAssets = @($searchAssets) + @(
        foreach ($asset in @($readerStyle, $readerScript)) {
            [ordered]@{
                path = [System.IO.Path]::GetRelativePath($workspace, $asset).Replace("\", "/")
                sha256 = (Get-FileHash -LiteralPath $asset -Algorithm SHA256).Hash.ToLowerInvariant()
            }
        }
    )
    $readerChecks = [ordered]@{
        profiles = @("compact", "abbreviated", "book", "full")
        default_profile = "book"
        detail_levels = @("summary", "core", "full")
        metadata_levels = @("minimal", "essential", "full")
        density_levels = @("tight", "comfortable")
        context_qualifier_modes = @("folded", "explicit")
        default_context_qualifiers = "folded"
        indexed_sources = @($sourceIndex).Count
        indexed_records = $searchChecks.indexed_records
        per_entry_full_override = $true
        deep_link_reveal = $true
    }
}

if ($editionNumber -ge 6) {
    foreach ($asset in @($contextStyle, $contextScript, $contextBindings)) {
        if (-not (Test-Path -LiteralPath $asset -PathType Leaf)) {
            throw "Missing context-profile asset: $asset"
        }
    }

    $profileRecords = [System.Collections.Generic.List[object]]::new()
    $profilesById = [System.Collections.Generic.Dictionary[string, object]]::new(
        [System.StringComparer]::OrdinalIgnoreCase
    )
    foreach ($profileSource in $contextProfileSources) {
        $profileText = Get-Content -LiteralPath $profileSource -Raw
        $profileIdMatch = [regex]::Match($profileText, '(?m)^Profile ID: `([^`]+)`$')
        $profileNameMatch = [regex]::Match($profileText, '(?m)^# (.+?) Context Profile$')
        $profileSummaryMatch = [regex]::Match($profileText, '(?m)^Summary: (.+)$')
        $profileDefaultsMatch = [regex]::Match($profileText, '(?m)^Defaults: (.+)$')
        $profileRequiresMatch = [regex]::Match($profileText, '(?m)^Requires: (.+)$')
        if (-not $profileIdMatch.Success -or -not $profileNameMatch.Success -or
            -not $profileSummaryMatch.Success -or -not $profileDefaultsMatch.Success -or
            -not $profileRequiresMatch.Success) {
            throw "Incomplete context profile contract: $profileSource"
        }
        $profileId = $profileIdMatch.Groups[1].Value
        if ($profilesById.ContainsKey($profileId)) {
            throw "Duplicate context profile ID: $profileId"
        }
        $profileRecord = [ordered]@{
            id = $profileId
            name = $profileNameMatch.Groups[1].Value
            summary = $profileSummaryMatch.Groups[1].Value
            defaults = @($profileDefaultsMatch.Groups[1].Value -split '; ' | ForEach-Object { $_.Trim('`') })
            requires = @($profileRequiresMatch.Groups[1].Value -split '; ' | ForEach-Object { $_.Trim('`') })
            path = [System.IO.Path]::GetRelativePath($workspace, $profileSource).Replace("\", "/")
            anchor = $headingBySource[$profileSource]
        }
        if ($editionNumber -ge 7) {
            $profileRelativePath = [System.IO.Path]::GetRelativePath($workspace, $profileSource).Replace("\", "/")
            $profileRecord.href = ConvertTo-SitePageName $profileRelativePath
        }
        $profilesById[$profileId] = $profileRecord
        $profileRecords.Add($profileRecord)
    }

    $selectedSearchPaths = [System.Collections.Generic.HashSet[string]]::new(
        [System.StringComparer]::OrdinalIgnoreCase
    )
    foreach ($record in $searchRecords) {
        [void]$selectedSearchPaths.Add($record.path)
    }
    $bindingText = Get-Content -LiteralPath $contextBindings -Raw
    $bindingMatches = [regex]::Matches(
        $bindingText,
        '(?m)^\| \[([^\]]+)\]\(([^)]+\.md)\) \| `([^`]+)` \| ([^|]+) \|$'
    )
    $bindingRecords = [System.Collections.Generic.List[object]]::new()
    $bindingKeys = [System.Collections.Generic.HashSet[string]]::new(
        [System.StringComparer]::OrdinalIgnoreCase
    )
    $bindingDirectory = Split-Path $contextBindings
    foreach ($bindingMatch in $bindingMatches) {
        $bindingPath = [System.IO.Path]::GetFullPath(
            (Join-Path $bindingDirectory $bindingMatch.Groups[2].Value)
        )
        $relativeBindingPath = [System.IO.Path]::GetRelativePath($workspace, $bindingPath).Replace("\", "/")
        $bindingProfileId = $bindingMatch.Groups[3].Value
        $bindingAppliesTo = $bindingMatch.Groups[4].Value.Trim()
        if (-not $profilesById.ContainsKey($bindingProfileId)) {
            throw "Unknown context profile binding: $bindingProfileId"
        }
        if (-not $selectedSearchPaths.Contains($relativeBindingPath)) {
            throw "Context profile binds unselected record: $relativeBindingPath"
        }
        $bindingKey = "$relativeBindingPath|$bindingProfileId|$bindingAppliesTo"
        if (-not $bindingKeys.Add($bindingKey)) {
            throw "Duplicate context profile binding: $bindingKey"
        }
        $bindingRecords.Add([ordered]@{
            title = $bindingMatch.Groups[1].Value
            path = $relativeBindingPath
            profileId = $bindingProfileId
            appliesTo = $bindingAppliesTo
        })
    }
    if ($profileRecords.Count -ne 3 -or $bindingRecords.Count -ne 16) {
        throw "Context profile shape mismatch: profiles=$($profileRecords.Count) bindings=$($bindingRecords.Count)"
    }

    $contextPayload = [ordered]@{
        profiles = $profileRecords
        bindings = $bindingRecords
    }
    $contextJson = ($contextPayload | ConvertTo-Json -Depth 5 -Compress).Replace('</', '<\/')
    $contextCss = Get-Content -LiteralPath $contextStyle -Raw
    $contextJavaScript = Get-Content -LiteralPath $contextScript -Raw
    $htmlText = $htmlText.Replace('</head>', "<style>`n$contextCss`n</style>`n</head>")
    $contextBootstrap = "<script>window.FACTORIUM_CONTEXT_PROFILES=$contextJson;</script>`n<script>$contextJavaScript</script>`n"
    $htmlText = $htmlText.Replace('</body>', $contextBootstrap + '</body>')

    $contextAssets = foreach ($asset in @($contextStyle, $contextScript, $contextBindings)) {
        [ordered]@{
            path = [System.IO.Path]::GetRelativePath($workspace, $asset).Replace("\", "/")
            sha256 = (Get-FileHash -LiteralPath $asset -Algorithm SHA256).Hash.ToLowerInvariant()
        }
    }
    $contextChecks = [ordered]@{
        profiles = $profileRecords.Count
        bindings = $bindingRecords.Count
        selected_binding_paths = $bindingKeys.Count
        missing_profile_ids = 0
        unselected_binding_paths = 0
        duplicate_bindings = 0
        canonical_interchange_changed = $false
    }
}

[System.IO.File]::WriteAllText(
    $html,
    $htmlText,
    [System.Text.UTF8Encoding]::new($false)
)

$ids = [System.Collections.Generic.HashSet[string]]::new(
    [System.StringComparer]::Ordinal
)
[regex]::Matches($htmlText, ' id="([^"]+)"') | ForEach-Object {
    [void]$ids.Add($_.Groups[1].Value)
}
$fragmentLinks = [regex]::Matches($htmlText, 'href="#([^"]+)"')
$missingFragments = [System.Collections.Generic.List[string]]::new()
foreach ($fragmentLink in $fragmentLinks) {
    if (-not $ids.Contains($fragmentLink.Groups[1].Value)) {
        $missingFragments.Add($fragmentLink.Groups[1].Value)
    }
}
$localFileLinks = [regex]::Matches(
    $htmlText,
    'href="(?!#|https?://|mailto:|data:)[^"]+"'
)
$repositorySourceLinks = [regex]::Matches(
    $htmlText,
    'href="https://github\.com/giodl73-repo/FACTORIUM/blob/[^"]+"'
)
if ($missingFragments.Count -ne 0) {
    throw "Rendered proof has $($missingFragments.Count) unresolved fragment links"
}
if ($localFileLinks.Count -ne 0) {
    throw "Rendered proof has $($localFileLinks.Count) filesystem-dependent links"
}

if ($editionNumber -ge 7) {
    if (-not (Test-Path -LiteralPath $siteStyle -PathType Leaf)) {
        throw "Missing proof-site asset: $siteStyle"
    }
    if ($editionNumber -ge 16) {
        foreach ($asset in @($labStyle, $labScript, $compositionLabSpec)) {
            if (-not (Test-Path -LiteralPath $asset -PathType Leaf)) {
                throw "Missing composition-lab asset: $asset"
            }
        }
    }
    if ($editionNumber -ge 17) {
        foreach ($asset in @($compositionReadingStyle, $compositionReadingScript, $compositionReadingSpec)) {
            if (-not (Test-Path -LiteralPath $asset -PathType Leaf)) {
                throw "Missing composition-reading asset: $asset"
            }
        }
    }
    if ($editionNumber -ge 18) {
        foreach ($asset in @($compositionFocusStyle, $compositionFocusSpec)) {
            if (-not (Test-Path -LiteralPath $asset -PathType Leaf)) {
                throw "Missing composition-focus asset: $asset"
            }
        }
    }
    if ($editionNumber -ge 19) {
        foreach ($asset in @($compositionPaletteStyle, $compositionPaletteScript, $compositionPaletteSpec)) {
            if (-not (Test-Path -LiteralPath $asset -PathType Leaf)) {
                throw "Missing composition-palette asset: $asset"
            }
        }
    }

    $siteIndex = Join-Path $output "index.html"
    $siteCompose = if ($editionNumber -ge 16) { Join-Path $output "compose.html" } else { $null }
    $siteEntryDirectory = Join-Path $output "entries"
    $siteChapterDirectory = Join-Path $output "chapters"
    $siteAssetDirectory = Join-Path $output "assets"
    New-Item -ItemType Directory -Force -Path $siteEntryDirectory, $siteChapterDirectory, $siteAssetDirectory | Out-Null

    $pageBySource = [System.Collections.Generic.Dictionary[string, string]]::new(
        [System.StringComparer]::OrdinalIgnoreCase
    )
    $pageNames = [System.Collections.Generic.HashSet[string]]::new(
        [System.StringComparer]::OrdinalIgnoreCase
    )
    foreach ($source in $sources) {
        $relativeSource = [System.IO.Path]::GetRelativePath($workspace, $source).Replace("\", "/")
        $pageName = ConvertTo-SitePageName $relativeSource
        if (-not $pageNames.Add($pageName)) {
            throw "Duplicate site page name: $pageName"
        }
        $pageBySource[$source] = $pageName
    }

    $sourceByRenderedId = [System.Collections.Generic.Dictionary[string, string]]::new(
        [System.StringComparer]::Ordinal
    )
    foreach ($source in $sources) {
        foreach ($idMatch in [regex]::Matches($renderedSegmentBySource[$source], ' id="([^"]+)"')) {
            $renderedId = $idMatch.Groups[1].Value
            if ($sourceByRenderedId.ContainsKey($renderedId)) {
                throw "Duplicate rendered site ID: $renderedId"
            }
            $sourceByRenderedId[$renderedId] = $source
        }
    }

    $searchRecordByPath = [System.Collections.Generic.Dictionary[string, object]]::new(
        [System.StringComparer]::OrdinalIgnoreCase
    )
    $searchRecordIndexByPath = [System.Collections.Generic.Dictionary[string, int]]::new(
        [System.StringComparer]::OrdinalIgnoreCase
    )
    for ($recordIndex = 0; $recordIndex -lt $searchRecords.Count; $recordIndex++) {
        $searchRecord = $searchRecords[$recordIndex]
        $searchRecordByPath[$searchRecord.path] = $searchRecord
        $searchRecordIndexByPath[$searchRecord.path] = $recordIndex
    }

    $siteChapters = [System.Collections.Generic.List[object]]::new()
    foreach ($chapter in @(Get-SiteChapterSelections $volume) + @(Get-SiteChapterSelections $supplement)) {
        $siteChapters.Add($chapter)
    }
    $siteChapters.Add([ordered]@{
        key = "applications"
        title = "Applications"
        paths = @($guideSelections | ForEach-Object { $_.path })
        groups = @([ordered]@{
            title = "Factor Guides"
            paths = @($guideSelections | ForEach-Object { $_.path })
        })
    })
    $chapterBySearchPath = [System.Collections.Generic.Dictionary[string, object]]::new(
        [System.StringComparer]::OrdinalIgnoreCase
    )
    foreach ($chapter in $siteChapters) {
        $groupPathSet = [System.Collections.Generic.HashSet[string]]::new(
            [System.StringComparer]::OrdinalIgnoreCase
        )
        foreach ($group in $chapter.groups) {
            foreach ($groupPath in $group.paths) {
                if (-not $groupPathSet.Add($groupPath)) {
                    throw "Chapter subsection repeats a record: $($chapter.key) $groupPath"
                }
            }
        }
        $missingGroupPaths = @($chapter.paths | Where-Object { -not $groupPathSet.Contains($_) })
        $extraGroupPaths = @($groupPathSet | Where-Object { $_ -notin $chapter.paths })
        if ($missingGroupPaths.Count -ne 0 -or $extraGroupPaths.Count -ne 0) {
            throw "Chapter subsection coverage mismatch: chapter=$($chapter.key) missing=$($missingGroupPaths -join ',') extra=$($extraGroupPaths -join ',')"
        }
        foreach ($chapterPath in $chapter.paths) {
            $chapterRelativePath = [System.IO.Path]::GetRelativePath($workspace, $chapterPath).Replace("\", "/")
            if (-not $searchRecordByPath.ContainsKey($chapterRelativePath)) {
                throw "Chapter contains an unindexed record: $chapterRelativePath"
            }
            if ($chapterBySearchPath.ContainsKey($chapterRelativePath)) {
                throw "Record appears in more than one site chapter: $chapterRelativePath"
            }
            $chapterBySearchPath[$chapterRelativePath] = $chapter
        }
    }
    if ($siteChapters.Count -ne 12 -or $chapterBySearchPath.Count -ne $searchRecords.Count) {
        throw "Site chapter coverage mismatch: chapters=$($siteChapters.Count) records=$($chapterBySearchPath.Count)"
    }

    $siteCssParts = @(
        (Get-Content -LiteralPath $style -Raw),
        (Get-Content -LiteralPath $searchStyle -Raw),
        (Get-Content -LiteralPath $readerStyle -Raw),
        (Get-Content -LiteralPath $contextStyle -Raw),
        (Get-Content -LiteralPath $siteStyle -Raw)
    )
    if ($editionNumber -ge 12) {
        $siteCssParts += (Get-Content -LiteralPath $compositionStyle -Raw)
    }
    if ($editionNumber -ge 13) {
        $siteCssParts += (Get-Content -LiteralPath $conflictStyle -Raw)
    }
    if ($editionNumber -ge 14) {
        $siteCssParts += (Get-Content -LiteralPath $frontierStyle -Raw)
    }
    if ($editionNumber -ge 15) {
        $siteCssParts += (Get-Content -LiteralPath $explorerStyle -Raw)
    }
    if ($editionNumber -ge 16) {
        $siteCssParts += (Get-Content -LiteralPath $labStyle -Raw)
    }
    if ($editionNumber -ge 17) {
        $siteCssParts += (Get-Content -LiteralPath $compositionReadingStyle -Raw)
    }
    if ($editionNumber -ge 18) {
        $siteCssParts += (Get-Content -LiteralPath $compositionFocusStyle -Raw)
    }
    if ($editionNumber -ge 19) {
        $siteCssParts += (Get-Content -LiteralPath $compositionPaletteStyle -Raw)
    }
    $siteCss = $siteCssParts -join "`n"
    [System.IO.File]::WriteAllText(
        (Join-Path $siteAssetDirectory "site.css"),
        $siteCss,
        [System.Text.UTF8Encoding]::new($false)
    )
    [System.IO.File]::WriteAllText(
        (Join-Path $siteAssetDirectory "search.js"),
        (Get-Content -LiteralPath $searchScript -Raw),
        [System.Text.UTF8Encoding]::new($false)
    )
    [System.IO.File]::WriteAllText(
        (Join-Path $siteAssetDirectory "reader.js"),
        (Get-Content -LiteralPath $readerScript -Raw),
        [System.Text.UTF8Encoding]::new($false)
    )
    [System.IO.File]::WriteAllText(
        (Join-Path $siteAssetDirectory "context.js"),
        (Get-Content -LiteralPath $contextScript -Raw),
        [System.Text.UTF8Encoding]::new($false)
    )
    $compositionLabJson = "null"
    $compositionReadingJson = "null"
    if ($editionNumber -ge 16) {
        $relationManifestPath = Join-Path $workspace "reference\factorium-relations-v0.factorium"
        $referenceManifestPath = Join-Path $workspace "reference\factorium-reference-v0.factorium"
        $labRelations = @(
            foreach ($line in Get-Content -LiteralPath $relationManifestPath) {
                if (-not $line.StartsWith("relation ", [System.StringComparison]::Ordinal)) {
                    continue
                }
                $fields = $line.Substring("relation ".Length) -split ' \| '
                if ($fields.Count -ne 7) {
                    throw "Composition Lab relation field drift: $line"
                }
                $scopeSource = [System.IO.Path]::GetFullPath((Join-Path $workspace $fields[6]))
                if (-not $pageBySource.ContainsKey($scopeSource)) {
                    throw "Composition Lab scope source is absent from site: $scopeSource"
                }
                [ordered]@{
                    id = $fields[0]
                    verb = $fields[1]
                    source = $fields[2]
                    target = $fields[3]
                    scope = $fields[4]
                    qualifiers = $fields[5]
                    scopeHref = "entries/$($pageBySource[$scopeSource])"
                }
            }
        )
        if ($labRelations.Count -ne 6 -or @($labRelations.id | Sort-Object -Unique).Count -ne 6) {
            throw "Composition Lab requires six unique reviewed relations"
        }
        $compositionLabPayload = [ordered]@{
            schema = "factorium-composition-lab-payload-v0"
            referenceSha256 = (Get-FileHash -LiteralPath $referenceManifestPath -Algorithm SHA256).Hash.ToLowerInvariant()
            relationsSha256 = (Get-FileHash -LiteralPath $relationManifestPath -Algorithm SHA256).Hash.ToLowerInvariant()
            relations = $labRelations
        }
        $compositionLabJson = $compositionLabPayload | ConvertTo-Json -Depth 5 -Compress
        $labRuntimeText = Get-Content -LiteralPath $labScript -Raw
        $readingHookLine = '          if (root && typeof root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER === "function") root.FACTORIUM_COMPOSITION_READING_ROUTE_RENDER(identified);'
        if (-not $labRuntimeText.Contains($readingHookLine)) {
            throw "Composition Lab runtime omits the reading-route extension hook"
        }
        if ($editionNumber -eq 16) {
            $labRuntimeText = $labRuntimeText.Replace("$readingHookLine`r`n", "").Replace("$readingHookLine`n", "")
            if ($labRuntimeText.Contains($readingHookLine)) {
                throw "Composition Lab sim-16 hook removal failed"
            }
        }
        [System.IO.File]::WriteAllText(
            (Join-Path $siteAssetDirectory "composition-lab.js"),
            $labRuntimeText,
            [System.Text.UTF8Encoding]::new($false)
        )
        $compositionLabChecks = [ordered]@{
            mode = "local bounded closure over explicit reviewed relation allowlist"
            relation_records = $labRelations.Count
            seed_artifacts = @($labRelations.source + $labRelations.target | Sort-Object -Unique).Count
            scope_views = @($labRelations.scope | Sort-Object -Unique).Count
            automatic_relation_discovery = $false
            natural_language_semantic_selection = $false
            check_outcomes = "unresolved-only"
            persistence = "none"
            specification = "specs/COMPOSITION-LAB.md"
        }
        if ($editionNumber -ge 17) {
            $readingArtifacts = @($labRelations.source + $labRelations.target + $labRelations.scope | Sort-Object -Unique)
            $readingArtifactSet = [System.Collections.Generic.HashSet[string]]::new(
                [System.StringComparer]::Ordinal
            )
            foreach ($artifact in $readingArtifacts) { [void]$readingArtifactSet.Add($artifact) }
            $factorBindings = [System.Collections.Generic.Dictionary[string, object]]::new(
                [System.StringComparer]::Ordinal
            )
            $viewBindings = [System.Collections.Generic.Dictionary[string, object]]::new(
                [System.StringComparer]::Ordinal
            )
            $currentEntry = $null
            foreach ($line in Get-Content -LiteralPath $referenceManifestPath) {
                if ($line.StartsWith("entry ", [System.StringComparison]::Ordinal)) {
                    $fields = $line -split ' \| '
                    if ($fields.Count -ne 6) { throw "Composition reading entry field drift: $line" }
                    $currentEntry = [ordered]@{
                        id = $fields[0].Substring("entry ".Length)
                        title = $fields[1]
                        source = [System.IO.Path]::GetFullPath((Join-Path $workspace $fields[4]))
                    }
                }
                elseif ($line.StartsWith("factor ", [System.StringComparison]::Ordinal)) {
                    if ($null -eq $currentEntry) { throw "Composition reading factor has no entry: $line" }
                    $fields = $line -split ' \| '
                    if ($fields.Count -ne 2) { throw "Composition reading factor field drift: $line" }
                    $artifact = "factor:$($currentEntry.id)/$($fields[0].Substring("factor ".Length))"
                    if (-not $readingArtifactSet.Contains($artifact)) { continue }
                    if ($factorBindings.ContainsKey($artifact)) {
                        throw "Duplicate composition reading factor binding: $artifact"
                    }
                    if (-not $pageBySource.ContainsKey($currentEntry.source)) {
                        throw "Composition reading anchor page is absent: $($currentEntry.source)"
                    }
                    $factorBinding = [ordered]@{
                        artifact = $artifact
                        label = $fields[1]
                        pageTitle = $currentEntry.title
                        kind = "anchor"
                        href = "entries/$($pageBySource[$currentEntry.source])"
                    }
                    if ($editionNumber -ge 18) {
                        $focusId = "factor-focus-$($artifact.Substring("factor:".Length).Replace("/", "-"))"
                        if ($focusId -notmatch '^factor-focus-[a-z0-9]+(?:-[a-z0-9]+)*$') {
                            throw "Composition factor focus ID is invalid: $focusId"
                        }
                        $factorBinding.focusHref = "$($factorBinding.href)#$focusId"
                        $compositionFocusRecords += [ordered]@{
                            artifact = $artifact
                            label = $fields[1]
                            entryTitle = $currentEntry.title
                            source = $currentEntry.source
                            page = $factorBinding.href
                            focusId = $focusId
                            focusHref = $factorBinding.focusHref
                        }
                    }
                    $factorBindings[$artifact] = $factorBinding
                }
                elseif ($line -eq "end-entry") {
                    $currentEntry = $null
                }
                elseif ($line.StartsWith("view ", [System.StringComparison]::Ordinal)) {
                    $fields = $line -split ' \| '
                    if ($fields.Count -ne 7) { throw "Composition reading view field drift: $line" }
                    $artifact = "view:$($fields[0].Substring("view ".Length))"
                    if (-not $readingArtifactSet.Contains($artifact)) { continue }
                    if ($viewBindings.ContainsKey($artifact)) {
                        throw "Duplicate composition reading view binding: $artifact"
                    }
                    $viewSource = [System.IO.Path]::GetFullPath((Join-Path $workspace $fields[5]))
                    if (-not $pageBySource.ContainsKey($viewSource)) {
                        throw "Composition reading view page is absent: $viewSource"
                    }
                    $viewBindings[$artifact] = [ordered]@{
                        artifact = $artifact
                        label = $fields[4]
                        pageTitle = $fields[4]
                        kind = "view"
                        href = "entries/$($pageBySource[$viewSource])"
                    }
                }
            }
            $readingBindings = @(
                foreach ($artifact in $readingArtifacts) {
                    if ($factorBindings.ContainsKey($artifact)) { $factorBindings[$artifact] }
                    elseif ($viewBindings.ContainsKey($artifact)) { $viewBindings[$artifact] }
                    else { throw "Composition reading artifact has no exact reference binding: $artifact" }
                }
            )
            if ($readingBindings.Count -ne 18 -or
                @($readingBindings.artifact | Sort-Object -Unique).Count -ne 18 -or
                @($readingBindings | Where-Object { $_.kind -eq "anchor" }).Count -ne 12 -or
                @($readingBindings | Where-Object { $_.kind -eq "view" }).Count -ne 6) {
                throw "Composition reading requires 12 endpoint and 6 scope bindings"
            }
            $compositionReadingPayload = [ordered]@{
                schema = "factorium-composition-reading-payload-v0"
                referenceSha256 = $compositionLabPayload.referenceSha256
                relationsSha256 = $compositionLabPayload.relationsSha256
                bindings = $readingBindings
            }
            $compositionReadingJson = $compositionReadingPayload | ConvertTo-Json -Depth 5 -Compress
            $readingRuntimeText = Get-Content -LiteralPath $compositionReadingScript -Raw
            $focusValidationLine = '      if (binding.focusHref !== undefined) assert(/^entries\/[a-z0-9-]+\.html#factor-focus-[a-z0-9-]+$/.test(binding.focusHref), "Reading binding has invalid factor focus destination");'
            $orderedNodesLine = '    var orderedNodes = result.graph.nodes.slice().sort(function (left, right) { return left.artifact.localeCompare(right.artifact); });'
            $orderedLoopLine = '    orderedNodes.forEach(function (node) {'
            $focusCreateLine = '        if (binding.focusHref) page.focusHref = binding.focusHref;'
            $focusUpdateLine = '          if (binding.focusHref) page.focusHref = binding.focusHref;'
            foreach ($marker in @($focusValidationLine, $orderedNodesLine, $orderedLoopLine, $focusCreateLine, $focusUpdateLine, 'page.focusHref || page.href')) {
                if (-not $readingRuntimeText.Contains($marker)) {
                    throw "Composition reading runtime extension marker drift: $marker"
                }
            }
            if ($editionNumber -eq 17) {
                foreach ($line in @($focusValidationLine, $orderedNodesLine, $focusUpdateLine, $focusCreateLine)) {
                    $readingRuntimeText = $readingRuntimeText.Replace("$line`r`n", "").Replace("$line`n", "")
                }
                $readingRuntimeText = $readingRuntimeText.Replace($orderedLoopLine, '    result.graph.nodes.forEach(function (node) {')
                $readingRuntimeText = $readingRuntimeText.Replace('page.focusHref || page.href', 'page.href')
                foreach ($marker in @($focusValidationLine, $orderedNodesLine, $orderedLoopLine, $focusCreateLine, $focusUpdateLine, 'page.focusHref || page.href')) {
                    if ($readingRuntimeText.Contains($marker)) {
                        throw "Composition Reading sim-17 extension removal failed: $marker"
                    }
                }
            }
            [System.IO.File]::WriteAllText(
                (Join-Path $siteAssetDirectory "composition-reading.js"),
                $readingRuntimeText,
                [System.Text.UTF8Encoding]::new($false)
            )
            $compositionReadingChecks = [ordered]@{
                mode = "deterministic admitted-closure reading projection"
                artifact_bindings = $readingBindings.Count
                endpoint_bindings = @($readingBindings | Where-Object { $_.kind -eq "anchor" }).Count
                scope_bindings = @($readingBindings | Where-Object { $_.kind -eq "view" }).Count
                projection_scope = "admitted graph nodes only"
                ordering = "start, continue, evaluate; then title, destination, artifact"
                deduplication = "local destination with all artifact bindings retained"
                authority = "existing book pages"
                persistence = "none"
                specification = "specs/COMPOSITION-READING-ROUTE.md"
            }
            if ($editionNumber -ge 18) {
                if ($compositionFocusRecords.Count -ne 12 -or
                    @($compositionFocusRecords.focusId | Sort-Object -Unique).Count -ne 12 -or
                    @($compositionFocusRecords.source | Sort-Object -Unique).Count -ne 6) {
                    throw "Composition factor focus requires 12 unique factors across 6 anchor pages"
                }
                $compositionFocusChecks = [ordered]@{
                    factor_focus_records = $compositionFocusRecords.Count
                    anchor_pages = @($compositionFocusRecords.source | Sort-Object -Unique).Count
                    scope_focus_records = 0
                    target_behavior = "CSS :target; JavaScript not required"
                    source_handoff = "existing Root factorization heading"
                    canonical_source_mutation = $false
                    specification = "specs/COMPOSITION-FACTOR-FOCUS.md"
                }
            }
            if ($editionNumber -ge 19) {
                $paletteGroupCounts = @{}
                foreach ($binding in $readingBindings | Where-Object { $_.kind -eq "anchor" }) {
                    if (-not $paletteGroupCounts.ContainsKey($binding.href)) {
                        $paletteGroupCounts[$binding.href] = 0
                    }
                    $paletteGroupCounts[$binding.href] += 1
                }
                if ($paletteGroupCounts.Count -ne 6 -or
                    @($paletteGroupCounts.Values | Where-Object { $_ -ne 2 }).Count -ne 0) {
                    throw "Composition palette requires six anchor groups of two exact factors"
                }
                [System.IO.File]::WriteAllText(
                    (Join-Path $siteAssetDirectory "composition-palette.js"),
                    (Get-Content -LiteralPath $compositionPaletteScript -Raw),
                    [System.Text.UTF8Encoding]::new($false)
                )
                $compositionPaletteChecks = [ordered]@{
                    concept_groups = $paletteGroupCounts.Count
                    concept_controls = @($readingBindings | Where-Object { $_.kind -eq "anchor" }).Count
                    relation_readiness_records = $labRelations.Count
                    readiness_inputs = "explicit seeds, selected relation allowlist, direction"
                    natural_language_semantic_selection = $false
                    automatic_selection = $false
                    disabled_relations = 0
                    persistence = "none"
                    specification = "specs/COMPOSITION-PALETTE.md"
                }
            }
        }
    }
    $siteData = "window.FACTORIUM_SEARCH_INDEX=$searchJson;`n" +
        "window.FACTORIUM_SOURCE_INDEX=$sourceIndexJson;`n" +
        "window.FACTORIUM_CONTEXT_PROFILES=$contextJson;`n"
    if ($editionNumber -ge 16) {
        $siteData += "window.FACTORIUM_COMPOSITION_LAB=$compositionLabJson;`n"
    }
    if ($editionNumber -ge 17) {
        $siteData += "window.FACTORIUM_COMPOSITION_READING=$compositionReadingJson;`n"
    }
    [System.IO.File]::WriteAllText(
        (Join-Path $siteAssetDirectory "site-data.js"),
        $siteData,
        [System.Text.UTF8Encoding]::new($false)
    )

    $firstJourney = @(
        [ordered]@{
            label = "Step 1"
            title = "Choose a coordinate"
            description = "Use the Root Table to decide which recurring question organizes the problem."
            source = (Join-Path $workspace "tables\foundations\ROOT-TABLE.md")
        },
        [ordered]@{
            label = "Step 2"
            title = "Name the structural job"
            description = "Use Factor Roles to distinguish pivots, components, contexts, constraints, and derived views."
            source = (Join-Path $workspace "tables\foundations\FACTOR-ROLES.md")
        },
        [ordered]@{
            label = "Step 3"
            title = "Judge a decomposition"
            description = "Check whether the proposed factors preserve meaning, alternatives, and usable boundaries."
            source = (Join-Path $workspace "tables\entries\factorization-quality.md")
        },
        [ordered]@{
            label = "Step 4"
            title = "Recognize a failure"
            description = "Use the diagnostic to separate the failure's owner from its visible symptom."
            source = (Join-Path $workspace "tables\diagnostics\factorization-failures.md")
        },
        [ordered]@{
            label = "Step 5"
            title = "See the method applied"
            description = "Follow a complete Factor Guide from local question through selected relation and controls."
            source = (Join-Path $workspace "guides\aqueous-solution-amount-concentration.md")
        }
    )
    $firstJourneySources = [System.Collections.Generic.HashSet[string]]::new(
        [System.StringComparer]::OrdinalIgnoreCase
    )
    $firstJourneyItems = [System.Text.StringBuilder]::new()
    foreach ($step in $firstJourney) {
        $stepSource = [System.IO.Path]::GetFullPath($step.source)
        if (-not $firstJourneySources.Add($stepSource)) {
            throw "First journey repeats a source: $stepSource"
        }
        if (-not $pageBySource.ContainsKey($stepSource)) {
            throw "First journey source is absent from the proof selection: $stepSource"
        }
        $encodedLabel = [System.Net.WebUtility]::HtmlEncode($step.label)
        $encodedTitle = [System.Net.WebUtility]::HtmlEncode($step.title)
        $encodedDescription = [System.Net.WebUtility]::HtmlEncode($step.description)
        [void]$firstJourneyItems.AppendLine(
            "<li><span>$encodedLabel</span><a href=`"entries/$($pageBySource[$stepSource])`">$encodedTitle</a><p>$encodedDescription</p></li>"
        )
    }
    if ($firstJourneySources.Count -ne 5) {
        throw "First journey target count mismatch: $($firstJourneySources.Count)"
    }

    $problemLedTargets = 0
    $problemSection = ""
    $compositionSection = ""
    $homeProblemNav = ""
    $nestedProblemNav = ""
    $homeComposeNav = ""
    $nestedComposeNav = ""
    $compositionTraceTargets = 0
    $heroDeck = "A linked reference for selecting senses, comparing decompositions, choosing bounded relations, and recognizing structures that fail."
    if ($editionNumber -ge 12) {
        $problemJourneys = @(
            [ordered]@{
                state = "Complete trace · structural review"
                title = "Review a system dependency"
                description = "Join dependency and interface concepts, run a structural constraint, and retain the exact closure trace."
                source = $compositionWorksheet
                trace = $compositionTraces[0]
            },
            [ordered]@{
                state = "Complete trace · unresolved claim"
                title = "Evaluate a performance claim"
                description = "Separate observations from inference and see why complete graph custody does not settle a causal claim."
                source = $evidenceWorksheet
                trace = $compositionTraces[1]
            },
            [ordered]@{
                state = "Incomplete trace · unresolved decision"
                title = "Trace an alert to user outcomes"
                description = "Traverse feedback in reverse and preserve the missing outcome evidence instead of inventing an answer."
                source = $feedbackWorksheet
                trace = $compositionTraces[2]
            }
        )
        if ($editionNumber -ge 13) {
            $problemJourneys += [ordered]@{
                state = "Contradictory trace · repair required"
                title = "Subtract a required interface"
                description = "See why a requested exclusion stays visible as a conflict when an admitted dependency still requires that node."
                source = $conflictWorksheet
                trace = $compositionTraces[3]
            }
        }
        if ($editionNumber -ge 14) {
            $problemJourneys += [ordered]@{
                state = "Truncated trace · frontier visible"
                title = "Review delegated compliance"
                description = "Resolve delegated authority first, then stop at the declared edge budget with obligation satisfaction still visible as a frontier."
                source = $frontierWorksheet
                trace = $compositionTraces[4]
            }
        }
        $problemSources = [System.Collections.Generic.HashSet[string]]::new(
            [System.StringComparer]::OrdinalIgnoreCase
        )
        $problemItems = [System.Text.StringBuilder]::new()
        foreach ($problem in $problemJourneys) {
            $problemSource = [System.IO.Path]::GetFullPath($problem.source)
            if (-not $problemSources.Add($problemSource)) {
                throw "Problem-led route repeats a source: $problemSource"
            }
            if (-not $pageBySource.ContainsKey($problemSource)) {
                throw "Problem-led route source is absent from the proof selection: $problemSource"
            }
            $encodedState = [System.Net.WebUtility]::HtmlEncode($problem.state)
            $encodedTitle = [System.Net.WebUtility]::HtmlEncode($problem.title)
            $encodedDescription = [System.Net.WebUtility]::HtmlEncode($problem.description)
            [void]$problemItems.AppendLine(
                "<li><span class=`"site-problem-state`">$encodedState</span><a href=`"entries/$($pageBySource[$problemSource])`">$encodedTitle</a><p>$encodedDescription</p></li>"
            )
        }
        $problemLedTargets = $problemSources.Count
        $expectedProblemTargetCount = if ($editionNumber -ge 14) { 5 } elseif ($editionNumber -ge 13) { 4 } else { 3 }
        if ($problemLedTargets -ne $expectedProblemTargetCount) {
            throw "Problem-led target count mismatch: $problemLedTargets"
        }
        $problemSection = @"

<section id="problems" class="site-problems" aria-labelledby="site-problems-heading">
<p class="site-kicker">Problem-led reading</p>
<h2 id="site-problems-heading">Start with what you need to decide</h2>
<p class="site-problems__intro">Each worked Composition Query selects several concepts and senses, follows a bounded typed closure, runs declared checks, and flattens the graph into a traceable guide.</p>
<ul class="site-problem-grid">$problemItems</ul>
<p class="site-problem-note"><strong>Worked examples, not a live builder.</strong> Choose one to inspect its declared graph, exclusions, Evaluation, state, and projection. Interactive construction remains later Workbench scope.</p>
</section>
"@
        $homeProblemNav = '<a href="#problems">Problems</a>'
        $nestedProblemNav = '<a href="../index.html#problems">Problems</a>'
        $heroDeck = "Start from a question you need to answer, follow its bounded concept closure, or look up one entry at a time. The tables remain the authority; worked guides show how several concepts combine."

        if ($editionNumber -ge 15) {
            $traceSummaries = @(
                foreach ($problem in $problemJourneys) {
                    Get-CompositionTraceSummary -Path $problem.trace -Worksheet $problem.source
                }
            )
            $traceIds = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::Ordinal)
            $traceStates = [ordered]@{
                complete = 0
                incomplete = 0
                contradictory = 0
                truncated = 0
            }
            $traceItems = [System.Text.StringBuilder]::new()
            for ($traceIndex = 0; $traceIndex -lt $traceSummaries.Count; $traceIndex++) {
                $trace = $traceSummaries[$traceIndex]
                $problem = $problemJourneys[$traceIndex]
                if (-not $traceIds.Add($trace.id)) {
                    throw "Composition explorer repeats trace ID: $($trace.id)"
                }
                if ($trace.worksheet -ne [System.IO.Path]::GetFullPath($problem.source)) {
                    throw "Composition explorer worksheet mismatch: $($trace.id)"
                }
                if (-not $problem.state.ToLowerInvariant().StartsWith($trace.state)) {
                    throw "Composition explorer state/card mismatch: $($trace.id)"
                }
                if (-not $traceStates.Contains($trace.state)) {
                    throw "Composition explorer has an unknown state: $($trace.state)"
                }
                $traceStates[$trace.state] += 1

                $encodedTraceId = [System.Net.WebUtility]::HtmlEncode($trace.id)
                $encodedProblem = [System.Net.WebUtility]::HtmlEncode($trace.problem)
                $encodedState = [System.Net.WebUtility]::HtmlEncode($trace.state)
                $encodedContext = [System.Net.WebUtility]::HtmlEncode($trace.context)
                $encodedDirection = [System.Net.WebUtility]::HtmlEncode($trace.direction)
                $encodedDigest = [System.Net.WebUtility]::HtmlEncode($trace.sha256)
                $guidePage = $pageBySource[[System.IO.Path]::GetFullPath($problem.source)]

                $seedItems = [System.Text.StringBuilder]::new()
                foreach ($seed in $trace.seeds) {
                    [void]$seedItems.AppendLine("<li><code>$([System.Net.WebUtility]::HtmlEncode($seed))</code></li>")
                }
                $edgeItems = [System.Text.StringBuilder]::new()
                foreach ($edge in $trace.edges) {
                    [void]$edgeItems.AppendLine("<li><code>$([System.Net.WebUtility]::HtmlEncode($edge))</code><span>admitted relation</span></li>")
                }
                foreach ($node in $trace.nodes) {
                    $nodeFields = $node -split ' \| '
                    if ($nodeFields[0] -notin $trace.seeds) {
                        [void]$edgeItems.AppendLine(
                            "<li><code>$([System.Net.WebUtility]::HtmlEncode($nodeFields[0]))</code><span>$([System.Net.WebUtility]::HtmlEncode($nodeFields[1])) · depth $([System.Net.WebUtility]::HtmlEncode($nodeFields[2]))</span></li>"
                        )
                    }
                }
                $checkItems = [System.Text.StringBuilder]::new()
                foreach ($check in $trace.checks) {
                    $checkFields = $check -split ' \| '
                    [void]$checkItems.AppendLine(
                        "<li><code>$([System.Net.WebUtility]::HtmlEncode($checkFields[0]))</code><span>$([System.Net.WebUtility]::HtmlEncode($checkFields[1])) · <strong>$([System.Net.WebUtility]::HtmlEncode($checkFields[3]))</strong></span></li>"
                    )
                }
                $stopItems = [System.Text.StringBuilder]::new()
                foreach ($frontier in $trace.frontiers) {
                    $fields = $frontier -split ' \| '
                    [void]$stopItems.AppendLine("<li><span>Frontier</span><code>$([System.Net.WebUtility]::HtmlEncode($fields[0]))</code><small>$([System.Net.WebUtility]::HtmlEncode($fields[1]))</small></li>")
                }
                foreach ($conflict in $trace.conflicts) {
                    $fields = $conflict -split ' \| '
                    [void]$stopItems.AppendLine("<li><span>Conflict</span><code>$([System.Net.WebUtility]::HtmlEncode($fields[1]))</code><small>$([System.Net.WebUtility]::HtmlEncode($fields[2]))</small></li>")
                }
                if ($trace.frontiers.Count -eq 0 -and $trace.conflicts.Count -eq 0) {
                    [void]$stopItems.AppendLine("<li><span>Stop</span><strong>No frontier or conflict</strong><small>State follows the declared checks and working graph.</small></li>")
                }

                $seedLabel = if ($trace.seeds.Count -eq 1) { "seed" } else { "seeds" }
                $nodeLabel = if ($trace.nodes.Count -eq 1) { "node" } else { "nodes" }
                $edgeLabel = if ($trace.edges.Count -eq 1) { "join" } else { "joins" }
                $projectionLabel = if ($trace.projections.Count -eq 1) { "row" } else { "rows" }
                [void]$traceItems.AppendLine(@"
<details class="site-trace" data-trace-id="$encodedTraceId" data-trace-state="$encodedState"$(if ($traceIndex -eq 0) { " open" })>
<summary><span class="site-trace__state">$encodedState</span><strong>$encodedProblem</strong><span class="site-trace__counts">$($trace.seeds.Count) $seedLabel · $($trace.nodes.Count) $nodeLabel · $($trace.edges.Count) $edgeLabel</span></summary>
<div class="site-trace__body">
<div class="site-trace__policy"><span><strong>Context</strong> $encodedContext</span><span><strong>Policy</strong> $encodedDirection · evaluative-required · stable-identity</span><span><strong>Budget</strong> depth $($trace.budget.depth) · edges $($trace.budget.edges) · nodes $($trace.budget.nodes) · work $($trace.budget.work)</span></div>
<div class="site-trace__stages">
<section><p>Add</p><h3>Selected seeds</h3><ul>$seedItems</ul></section>
<section><p>Multiply</p><h3>Join and admitted nodes</h3><ul>$edgeItems</ul></section>
<section><p>Evaluate</p><h3>Declared checks</h3><ul>$checkItems</ul></section>
<section><p>Stop</p><h3>Closure boundary</h3><ul>$stopItems</ul></section>
</div>
<div class="site-trace__footer"><span><strong>Flatten</strong> $($trace.projections.Count) loss-declared projection $projectionLabel</span><a href="entries/$guidePage">Read the full Factor Guide</a><code title="Exact trace SHA-256">$encodedDigest</code></div>
</div>
</details>
"@)
            }
            if ($traceSummaries.Count -ne 5 -or $traceStates.complete -ne 2 -or
                $traceStates.incomplete -ne 1 -or $traceStates.contradictory -ne 1 -or
                $traceStates.truncated -ne 1) {
                throw "Composition explorer trace/state coverage mismatch"
            }
            $compositionTraceTargets = $traceSummaries.Count
            $compositionChecks = [ordered]@{
                mode = "read-only exact trace inspection; no discovery or graph mutation"
                trace_count = $traceSummaries.Count
                worksheet_targets = $traceSummaries.Count
                unique_trace_ids = $traceIds.Count
                states = $traceStates
                records = @(
                    foreach ($trace in $traceSummaries) {
                        [ordered]@{
                            id = $trace.id
                            state = $trace.state
                            seeds = $trace.seeds.Count
                            nodes = $trace.nodes.Count
                            edges = $trace.edges.Count
                            frontiers = $trace.frontiers.Count
                            conflicts = $trace.conflicts.Count
                            checks = $trace.checks.Count
                            projections = $trace.projections.Count
                            work = $trace.budget.work
                            sha256 = $trace.sha256
                        }
                    }
                )
            }
            $compositionSection = @"

<section id="compose" class="site-compose" aria-labelledby="site-compose-heading">
<p class="site-kicker">Read-only composition explorer</p>
<h2 id="site-compose-heading">Compare how the working graphs close</h2>
<p class="site-compose__intro">These panels are generated from the five exact trace manifests. Open them to compare what was added, which typed join was admitted, what was evaluated, where closure stopped, and how many rows survive flattening.</p>
<div class="site-trace-list">$traceItems</div>
<p class="site-compose__note"><strong>Exact traces, not automatic closure.</strong> This view inspects reviewed examples; it cannot add concepts, discover edges, change a policy, or infer a domain answer.</p>
</section>
"@
            $homeComposeNav = '<a href="#compose">Compose</a>'
            $nestedComposeNav = '<a href="../index.html#compose">Compose</a>'
        }
        if ($editionNumber -ge 16) {
            $homeComposeNav = '<a href="compose.html">Compose</a><a href="#compose">Traces</a>'
            $nestedComposeNav = '<a href="../compose.html">Compose</a><a href="../index.html#compose">Traces</a>'
        }
    }

    $chapterItems = [System.Text.StringBuilder]::new()
    foreach ($chapter in $siteChapters) {
        $encodedChapterTitle = [System.Net.WebUtility]::HtmlEncode($chapter.title)
        $chapterLabel = if ($chapter.key.StartsWith("part-")) {
            $chapter.key.Replace("part-", "Part ").ToUpperInvariant()
        }
        else {
            "Guided use"
        }
        [void]$chapterItems.AppendLine(
            "<li><span>$chapterLabel</span><a href=`"chapters/$($chapter.key).html`">$encodedChapterTitle</a><p>$($chapter.paths.Count) records</p></li>"
        )
    }
    $homeSearchShell = $searchShell.Replace(
        "Results open the canonical book projection below.",
        "Results open dedicated reading pages generated from the canonical book sources."
    )
    $homeSearchShell = $homeSearchShell.Replace("Search this proof", "Search the book")
    $quickstartPage = "entries/$($pageBySource[$quickstart])"
    $homeHtml = @"
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="A searchable, table-first Factorium book simulation.">
<title>Structure, Quantity, and Choice · Factorium</title>
<link rel="stylesheet" href="assets/site.css">
</head>
<body class="proof-site reader-ready">
<a class="site-skip" href="#main-content">Skip to content</a>
<header class="site-header"><div class="site-header__inner">
<a class="site-brand" href="index.html">Factorium</a>
<nav class="site-nav" aria-label="Primary">$homeProblemNav$homeComposeNav<a href="#start">Start</a><a href="#search">Search</a><a href="#contents">Contents</a><a href="$quickstartPage">Quickstart</a></nav>
</div></header>
<main id="main-content" class="site-main">
<section class="site-hero">
<p class="site-kicker">Proof Set · book-site simulation</p>
<h1>Structure, Quantity, and Choice</h1>
<p class="site-hero__deck">$heroDeck</p>
</section>$problemSection$compositionSection
<section id="start" class="site-start" aria-labelledby="site-start-heading">
<p class="site-kicker">First journey</p>
<h2 id="site-start-heading">From a vague problem to a bounded factorization</h2>
<p>Follow the method once, then search directly or enter any chapter.</p>
<ol class="site-journey">$firstJourneyItems</ol>
</section>
<div id="search">$homeSearchShell</div>
<section id="contents" class="site-contents">
<h2>Browse the book</h2>
<p class="site-contents__intro">$($siteChapters.Count) chapters organize $($searchRecords.Count) indexed records and guides. Every destination also has a dedicated lookup page.</p>
<ol class="site-chapter-grid">$chapterItems</ol>
</section>
</main>
<footer class="site-footer">Internal deterministic simulation · not reader evidence or preview-01</footer>
<script src="assets/site-data.js"></script>
<script src="assets/search.js"></script>
</body>
</html>
"@
    [System.IO.File]::WriteAllText($siteIndex, $homeHtml, [System.Text.UTF8Encoding]::new($false))

    if ($editionNumber -ge 16) {
        $labSpecPage = "entries/$($pageBySource[[System.IO.Path]::GetFullPath($compositionLabSpec)])"
        $compositionLabHtml = @"
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="A bounded local simulation of explicit typed composition closure.">
<title>Bounded Composition Lab · Factorium</title>
<link rel="stylesheet" href="assets/site.css">
</head>
<body class="proof-site lab-page">
<a class="site-skip" href="#main-content">Skip to content</a>
<header class="site-header"><div class="site-header__inner">
<a class="site-brand" href="index.html">Factorium</a>
<nav class="site-nav" aria-label="Primary"><a href="index.html#problems">Problems</a><a href="compose.html" aria-current="page">Compose</a><a href="index.html#compose">Traces</a><a href="index.html#search">Search</a><a href="index.html#contents">Contents</a><a href="$quickstartPage">Quickstart</a></nav>
</div></header>
<main id="main-content" class="site-main lab-main">
<nav class="site-breadcrumbs" aria-label="Breadcrumb"><a href="index.html">Structure, Quantity, and Choice</a> / Bounded Composition Lab</nav>
<section class="lab-hero">
<p class="site-kicker">Local interactive simulation</p>
<h1>Build a bounded working graph</h1>
<p>Choose exact concepts and reviewed relations. The lab will follow only your allowlist, stop at finite budgets, keep exclusions visible, and flatten a structural draft.</p>
<div class="lab-boundary-note"><strong>Your words do not choose the graph.</strong> The problem statement names your work; only explicit seed and relation selections control closure. All checks remain unresolved.</div>
</section>
<div class="lab-layout">
<form id="composition-lab-form" class="composition-lab" novalidate>
<section class="lab-form-section">
<span class="lab-step">1 · Frame</span>
<h2>Name the local problem and context</h2>
<label class="lab-field"><span>Problem statement</span><textarea name="problem" rows="3" minlength="10" maxlength="240" required>Review a system dependency and its required interaction contract.</textarea><small>Identity and reading context only; no semantic extraction.</small></label>
<div class="lab-fields-two">
<label class="lab-field"><span>Context profile ID</span><input name="contextId" value="synthetic-query-lab" pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required></label>
<label class="lab-field"><span>Context selections</span><input name="contextSelections" value="boundary=declared-system,reference-frame=not-applicable" required><small>Comma-separated lower-kebab <code>key=value</code>; <code>reference-frame</code> is mandatory.</small></label>
</div>
</section>
<section class="lab-form-section">
<span class="lab-step">2 · Add</span>
<h2>Select one to three seed concepts</h2>
<p class="lab-help">Only exact endpoints from the six reviewed typed relations are available.</p>
<div id="composition-lab-seeds" class="lab-choice-grid"></div>
</section>
<section class="lab-form-section">
<span class="lab-step">3 · Multiply</span>
<h2>Allow specific typed relations</h2>
<p class="lab-help">Selection is explicit. Names, links, and lexical similarity never become edges.</p>
<div id="composition-lab-relations" class="lab-choice-grid lab-choice-grid--relations"></div>
</section>
<section class="lab-form-section">
<span class="lab-step">4 · Bound</span>
<h2>Declare direction and finite budgets</h2>
<div class="lab-budget-grid">
<label class="lab-field"><span>Direction</span><select name="direction"><option value="forward">Forward</option><option value="reverse">Reverse</option></select></label>
<label class="lab-field"><span>Depth</span><input name="depth" type="number" min="1" max="6" value="1" required></label>
<label class="lab-field"><span>Edges</span><input name="edges" type="number" min="1" max="6" value="1" required></label>
<label class="lab-field"><span>Nodes</span><input name="nodes" type="number" min="3" max="24" value="6" required></label>
</div>
</section>
<details class="lab-form-section lab-exclusions">
<summary><span><span class="lab-step">5 · Subtract</span><strong>Request optional exclusions</strong></span></summary>
<p class="lab-help">A reached required or evaluative node remains in the graph and creates a contradiction.</p>
<div id="composition-lab-exclusions" class="lab-choice-grid"></div>
</details>
<div class="lab-submit"><button type="submit">Run bounded closure</button><p>No data leaves this page. Reloading deletes the result.</p></div>
</form>
<aside class="lab-contract">
<p class="site-kicker">Before you run it</p>
<h2>What this lab can—and cannot—do</h2>
<ul><li>It can follow explicit F1-F6 relations in one direction.</li><li>It can expose budget frontiers, unreachable predecessors, and exclusion conflicts.</li><li>It can assign unresolved structural checks to admitted scope views.</li><li>It cannot discover concepts from prose, decide compatibility, evaluate domain evidence, or emit a canonical trace.</li></ul>
<a href="$labSpecPage">Read the full simulation contract</a>
</aside>
</div>
<section id="composition-lab-result" class="lab-result" tabindex="-1" aria-live="polite">
<p class="lab-result__empty">Configure the explicit request, then run bounded closure. The result will appear here.</p>
</section>
<noscript><p class="lab-error">This local simulation requires JavaScript. The book, worked traces, and Factor Guides remain available without it.</p></noscript>
</main>
<footer class="site-footer">Local synthetic work product · no persistence · not canonical content</footer>
<script src="assets/site-data.js"></script>
<script src="assets/composition-lab.js"></script>
</body>
</html>
"@
        if ($editionNumber -ge 17) {
            $readingSpecPage = "entries/$($pageBySource[[System.IO.Path]::GetFullPath($compositionReadingSpec)])"
            foreach ($marker in @(
                '<p>Choose exact concepts and reviewed relations. The lab will follow only your allowlist, stop at finite budgets, keep exclusions visible, and flatten a structural draft.</p>',
                "<a href=`"$labSpecPage`">Read the full simulation contract</a>",
                '<script src="assets/composition-lab.js"></script>'
            )) {
                if (-not $compositionLabHtml.Contains($marker)) {
                    throw "Composition reading page integration marker drift: $marker"
                }
            }
            $compositionLabHtml = $compositionLabHtml.Replace(
                '<p>Choose exact concepts and reviewed relations. The lab will follow only your allowlist, stop at finite budgets, keep exclusions visible, and flatten a structural draft.</p>',
                '<p>Choose exact concepts and reviewed relations. The lab will follow only your allowlist, stop at finite budgets, keep exclusions visible, flatten a structural draft, and route the admitted closure into the book.</p>'
            ).Replace(
                "<a href=`"$labSpecPage`">Read the full simulation contract</a>",
                "<a href=`"$labSpecPage`">Read the full simulation contract</a><a href=`"$readingSpecPage`">Read the reading-route contract</a>"
            ).Replace(
                '<script src="assets/composition-lab.js"></script>',
                "<script src=`"assets/composition-lab.js`"></script>`n<script src=`"assets/composition-reading.js`"></script>"
            )
            if (-not $compositionLabHtml.Contains("href=`"$readingSpecPage`"") -or
                -not $compositionLabHtml.Contains('src="assets/composition-reading.js"')) {
                throw "Composition reading page integration failed"
            }
            if ($editionNumber -ge 18) {
                $focusSpecPage = "entries/$($pageBySource[[System.IO.Path]::GetFullPath($compositionFocusSpec)])"
                $readingContractLink = "<a href=`"$readingSpecPage`">Read the reading-route contract</a>"
                if (-not $compositionLabHtml.Contains($readingContractLink)) {
                    throw "Composition factor-focus contract marker drift"
                }
                $compositionLabHtml = $compositionLabHtml.Replace(
                    $readingContractLink,
                    "$readingContractLink<a href=`"$focusSpecPage`">Read the factor-focus contract</a>"
                )
            }
            if ($editionNumber -ge 19) {
                $paletteSpecPage = "entries/$($pageBySource[[System.IO.Path]::GetFullPath($compositionPaletteSpec)])"
                $focusContractLink = "<a href=`"$focusSpecPage`">Read the factor-focus contract</a>"
                foreach ($marker in @(
                    $focusContractLink,
                    '<h2>Select one to three seed concepts</h2>',
                    '<script src="assets/composition-reading.js"></script>'
                )) {
                    if (-not $compositionLabHtml.Contains($marker)) {
                        throw "Composition palette page integration marker drift: $marker"
                    }
                }
                $compositionLabHtml = $compositionLabHtml.Replace(
                    $focusContractLink,
                    "$focusContractLink<a href=`"$paletteSpecPage`">Read the concept-palette contract</a>"
                ).Replace(
                    '<h2>Select one to three seed concepts</h2>',
                    '<h2>Choose one to three concepts by topic</h2>'
                ).Replace(
                    '<script src="assets/composition-reading.js"></script>',
                    "<script src=`"assets/composition-reading.js`"></script>`n<script src=`"assets/composition-palette.js`"></script>"
                )
            }
        }
        [System.IO.File]::WriteAllText($siteCompose, $compositionLabHtml, [System.Text.UTF8Encoding]::new($false))
    }

    for ($chapterIndex = 0; $chapterIndex -lt $siteChapters.Count; $chapterIndex++) {
        $chapter = $siteChapters[$chapterIndex]
        $encodedChapterTitle = [System.Net.WebUtility]::HtmlEncode($chapter.title)
        $chapterLabel = if ($chapter.key.StartsWith("part-")) {
            $chapter.key.Replace("part-", "Part ").ToUpperInvariant()
        }
        else {
            "Guided use"
        }
        $chapterGroupItems = [System.Text.StringBuilder]::new()
        foreach ($group in $chapter.groups) {
            $encodedGroupTitle = [System.Net.WebUtility]::HtmlEncode($group.title)
            $chapterRecordItems = [System.Text.StringBuilder]::new()
            foreach ($chapterPath in $group.paths) {
                $chapterRelativePath = [System.IO.Path]::GetRelativePath($workspace, $chapterPath).Replace("\", "/")
                $chapterRecord = $searchRecordByPath[$chapterRelativePath]
                $encodedRecordTitle = [System.Net.WebUtility]::HtmlEncode($chapterRecord.title)
                $encodedRecordMeta = [System.Net.WebUtility]::HtmlEncode(
                    (@($chapterRecord.kind, $chapterRecord.domain) | Where-Object { -not [string]::IsNullOrWhiteSpace($_) }) -join " · "
                )
                $recordPage = [System.IO.Path]::GetFileName($chapterRecord.href)
                [void]$chapterRecordItems.AppendLine(
                    "<li><a href=`"../entries/$recordPage`">$encodedRecordTitle</a><span>$encodedRecordMeta</span></li>"
                )
            }
            [void]$chapterGroupItems.AppendLine(
                "<section class=`"site-chapter-group`"><h2>$encodedGroupTitle</h2><ol class=`"site-entry-grid`">$chapterRecordItems</ol></section>"
            )
        }
        $previousChapter = "<span></span>"
        $nextChapter = "<span></span>"
        if ($chapterIndex -gt 0) {
            $previous = $siteChapters[$chapterIndex - 1]
            $previousTitle = [System.Net.WebUtility]::HtmlEncode($previous.title)
            $previousChapter = "<a rel=`"prev`" href=`"$($previous.key).html`"><span>Previous chapter</span>$previousTitle</a>"
        }
        if ($chapterIndex -lt $siteChapters.Count - 1) {
            $next = $siteChapters[$chapterIndex + 1]
            $nextTitle = [System.Net.WebUtility]::HtmlEncode($next.title)
            $nextChapter = "<a rel=`"next`" href=`"$($next.key).html`"><span>Next chapter</span>$nextTitle</a>"
        }
        $chapterHtml = @"
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>$encodedChapterTitle · Factorium</title>
<link rel="stylesheet" href="../assets/site.css">
</head>
<body class="proof-site reader-ready">
<a class="site-skip" href="#main-content">Skip to content</a>
<header class="site-header"><div class="site-header__inner">
<a class="site-brand" href="../index.html">Factorium</a>
<nav class="site-nav" aria-label="Primary">$nestedProblemNav$nestedComposeNav<a href="../index.html#start">Start</a><a href="../index.html#search">Search</a><a href="../index.html#contents">Contents</a><a href="../entries/$($pageBySource[$quickstart])">Quickstart</a></nav>
</div></header>
<main id="main-content" class="site-main">
<nav class="site-breadcrumbs" aria-label="Breadcrumb"><a href="../index.html">Structure, Quantity, and Choice</a> / $encodedChapterTitle</nav>
<section class="site-chapter-heading"><p class="site-kicker">$chapterLabel</p><h1>$encodedChapterTitle</h1><p>$($chapter.paths.Count) records in the curated reading sequence.</p></section>
<div class="site-chapter-groups">$chapterGroupItems</div>
<nav class="site-pagination" aria-label="Chapter sequence">$previousChapter$nextChapter</nav>
</main>
<footer class="site-footer">Internal deterministic simulation · not reader evidence or preview-01</footer>
</body>
</html>
"@
        [System.IO.File]::WriteAllText(
            (Join-Path $siteChapterDirectory "$($chapter.key).html"),
            $chapterHtml,
            [System.Text.UTF8Encoding]::new($false)
        )
    }

    foreach ($source in $sources) {
        $relativeSource = [System.IO.Path]::GetRelativePath($workspace, $source).Replace("\", "/")
        $segment = $renderedSegmentBySource[$source]
        $segment = [regex]::Replace(
            $segment,
            'href="#([^"]+)"',
            {
                param($match)

                $targetId = $match.Groups[1].Value
                if (-not $sourceByRenderedId.ContainsKey($targetId)) {
                    return $match.Value
                }
                $targetSource = $sourceByRenderedId[$targetId]
                if ($targetSource.Equals($source, [System.StringComparison]::OrdinalIgnoreCase)) {
                    return $match.Value
                }
                return 'href="' + $pageBySource[$targetSource] + '#' + $targetId + '"'
            }
        )

        $record = if ($searchRecordByPath.ContainsKey($relativeSource)) {
            $searchRecordByPath[$relativeSource]
        }
        else {
            $null
        }
        $headingMatch = [regex]::Match($segment, '<h1 id="[^"]+">(.+?)</h1>', [System.Text.RegularExpressions.RegexOptions]::Singleline)
        if (-not $headingMatch.Success) {
            throw "Site page has no top-level heading: $relativeSource"
        }
        $headingText = [System.Net.WebUtility]::HtmlDecode(
            [regex]::Replace($headingMatch.Groups[1].Value, '<[^>]+>', '')
        ).Trim()
        $pageTitle = if ($null -ne $record) { $record.title } else { $headingText }
        $encodedPageTitle = [System.Net.WebUtility]::HtmlEncode($pageTitle)
        $encodedSource = [System.Net.WebUtility]::HtmlEncode($relativeSource)

        $readerControls = ""
        $pageScripts = ""
        $pagination = ""
        if ($null -ne $record) {
            $readerControls = $readerShell
            $pageScripts = @"
<script src="../assets/site-data.js"></script>
<script src="../assets/reader.js"></script>
<script src="../assets/context.js"></script>
"@
            $sequenceIndex = $searchRecordIndexByPath[$relativeSource]
            $previousLink = "<span></span>"
            $nextLink = "<span></span>"
            if ($sequenceIndex -gt 0) {
                $previous = $searchRecords[$sequenceIndex - 1]
                $previousTitle = [System.Net.WebUtility]::HtmlEncode($previous.title)
                $previousPage = [System.IO.Path]::GetFileName($previous.href)
                $previousLink = "<a rel=`"prev`" href=`"$previousPage`"><span>Previous</span>$previousTitle</a>"
            }
            if ($sequenceIndex -lt $searchRecords.Count - 1) {
                $next = $searchRecords[$sequenceIndex + 1]
                $nextTitle = [System.Net.WebUtility]::HtmlEncode($next.title)
                $nextPage = [System.IO.Path]::GetFileName($next.href)
                $nextLink = "<a rel=`"next`" href=`"$nextPage`"><span>Next</span>$nextTitle</a>"
            }
            $pagination = "<nav class=`"site-pagination`" aria-label=`"Entry sequence`">$previousLink$nextLink</nav>"
        }

        $factorFocusHtml = ""
        if ($editionNumber -ge 18) {
            $sourceFocusRecords = @($compositionFocusRecords | Where-Object {
                $_.source.Equals($source, [System.StringComparison]::OrdinalIgnoreCase)
            })
            if ($sourceFocusRecords.Count -gt 0) {
                $rootFactorizationMatches = [regex]::Matches(
                    $segment,
                    '<h2 id="([^"]+)">Root\s*factorization</h2>',
                    [System.Text.RegularExpressions.RegexOptions]::Singleline
                )
                if ($rootFactorizationMatches.Count -ne 1) {
                    throw "Composition factor focus requires one Root factorization heading: $relativeSource"
                }
                $rootFactorizationId = $rootFactorizationMatches[0].Groups[1].Value
                $focusCards = [System.Text.StringBuilder]::new()
                foreach ($focusRecord in $sourceFocusRecords | Sort-Object artifact) {
                    $encodedFocusId = [System.Net.WebUtility]::HtmlEncode($focusRecord.focusId)
                    $encodedFocusLabel = [System.Net.WebUtility]::HtmlEncode($focusRecord.label)
                    $encodedFocusArtifact = [System.Net.WebUtility]::HtmlEncode($focusRecord.artifact)
                    $encodedFocusEntry = [System.Net.WebUtility]::HtmlEncode($focusRecord.entryTitle)
                    $focusTitleId = "$encodedFocusId-title"
                    [void]$focusCards.AppendLine(@"
<aside id="$encodedFocusId" class="factor-focus" aria-labelledby="$focusTitleId">
<p class="factor-focus__kicker">Composition focus</p>
<p id="$focusTitleId" class="factor-focus__title">$encodedFocusLabel</p>
<p>This generated landing point identifies an exact factor owned by <strong>$encodedFocusEntry</strong>. The repository entry remains authoritative.</p>
<code>$encodedFocusArtifact</code>
<a href="#$rootFactorizationId">Read the owning Root factorization</a>
</aside>
"@)
                }
                $factorFocusHtml = "<section class=`"factor-focus-stack`" aria-label=`"Composition factor focus`">$focusCards</section>"
            }
        }

        $pageHtml = @"
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>$encodedPageTitle · Factorium</title>
<link rel="stylesheet" href="../assets/site.css">
</head>
<body class="proof-site">
<a class="site-skip" href="#main-content">Skip to content</a>
<header class="site-header"><div class="site-header__inner">
<a class="site-brand" href="../index.html">Factorium</a>
<nav class="site-nav" aria-label="Primary">$nestedProblemNav$nestedComposeNav<a href="../index.html#start">Start</a><a href="../index.html#search">Search</a><a href="../index.html#contents">Contents</a><a href="$($pageBySource[$quickstart])">Quickstart</a></nav>
</div></header>
<div class="site-main">
<nav class="site-breadcrumbs" aria-label="Breadcrumb"><a href="../index.html">Structure, Quantity, and Choice</a>$(
    if ($null -ne $record) {
        $entryChapter = $chapterBySearchPath[$relativeSource]
        $entryChapterTitle = [System.Net.WebUtility]::HtmlEncode($entryChapter.title)
        " / <a href=`"../chapters/$($entryChapter.key).html`">$entryChapterTitle</a>"
    }
) / $encodedPageTitle</nav>
$readerControls
<main id="main-content" class="site-entry" data-source-path="$encodedSource">$factorFocusHtml$segment</main>
$pagination
</div>
<footer class="site-footer">Canonical source: $encodedSource · simulation projection</footer>
$pageScripts
</body>
</html>
"@
        $pagePath = Join-Path $siteEntryDirectory $pageBySource[$source]
        [System.IO.File]::WriteAllText($pagePath, $pageHtml, [System.Text.UTF8Encoding]::new($false))
    }

    $actualChapterFiles = @(Get-ChildItem -LiteralPath $siteChapterDirectory -Filter "*.html")
    $actualEntryFiles = @(Get-ChildItem -LiteralPath $siteEntryDirectory -Filter "*.html")
    $expectedAssetNames = @("context.js", "reader.js", "search.js", "site-data.js", "site.css")
    if ($editionNumber -ge 16) {
        $expectedAssetNames += "composition-lab.js"
    }
    if ($editionNumber -ge 17) {
        $expectedAssetNames += "composition-reading.js"
    }
    if ($editionNumber -ge 19) {
        $expectedAssetNames += "composition-palette.js"
    }
    $actualAssetFiles = @(Get-ChildItem -LiteralPath $siteAssetDirectory -File)
    $unexpectedAssetNames = @($actualAssetFiles.Name | Where-Object { $_ -notin $expectedAssetNames })
    $missingAssetNames = @($expectedAssetNames | Where-Object { $_ -notin $actualAssetFiles.Name })
    if ($actualChapterFiles.Count -ne $siteChapters.Count -or
        $actualEntryFiles.Count -ne $sources.Count -or
        $unexpectedAssetNames.Count -ne 0 -or $missingAssetNames.Count -ne 0) {
        throw "Stale or incomplete site output: chapters=$($actualChapterFiles.Count)/$($siteChapters.Count) entries=$($actualEntryFiles.Count)/$($sources.Count) unexpected-assets=$($unexpectedAssetNames -join ',') missing-assets=$($missingAssetNames -join ',')"
    }
    $siteHtmlFiles = @($siteIndex) +
        @(if ($editionNumber -ge 16) { $siteCompose }) +
        @($actualChapterFiles | ForEach-Object { $_.FullName }) +
        @($actualEntryFiles | ForEach-Object { $_.FullName })
    $idsBySiteFile = [System.Collections.Generic.Dictionary[string, object]]::new(
        [System.StringComparer]::OrdinalIgnoreCase
    )
    foreach ($siteHtmlFile in $siteHtmlFiles) {
        $sitePageText = Get-Content -LiteralPath $siteHtmlFile -Raw
        $sitePageIds = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::Ordinal)
        [regex]::Matches($sitePageText, ' id="([^"]+)"') | ForEach-Object {
            [void]$sitePageIds.Add($_.Groups[1].Value)
        }
        $idsBySiteFile[[System.IO.Path]::GetFullPath($siteHtmlFile)] = $sitePageIds
    }

    $siteLocalLinks = 0
    $missingSiteTargets = [System.Collections.Generic.List[string]]::new()
    foreach ($siteHtmlFile in $siteHtmlFiles) {
        $sitePageText = Get-Content -LiteralPath $siteHtmlFile -Raw
        foreach ($siteLink in [regex]::Matches($sitePageText, '(?:href|src)="([^"]+)"')) {
            $siteTarget = [System.Net.WebUtility]::HtmlDecode($siteLink.Groups[1].Value)
            if ($siteTarget -match '^(?:https?://|mailto:|data:)' ) {
                continue
            }
            $siteLocalLinks += 1
            $targetParts = $siteTarget -split '#', 2
            $targetPath = $targetParts[0]
            $targetFragment = if ($targetParts.Count -eq 2) { $targetParts[1] } else { "" }
            $resolvedTarget = if ([string]::IsNullOrWhiteSpace($targetPath)) {
                [System.IO.Path]::GetFullPath($siteHtmlFile)
            }
            else {
                [System.IO.Path]::GetFullPath((Join-Path (Split-Path $siteHtmlFile) $targetPath))
            }
            if (-not $resolvedTarget.StartsWith($output, [System.StringComparison]::OrdinalIgnoreCase) -or
                -not (Test-Path -LiteralPath $resolvedTarget -PathType Leaf)) {
                $missingSiteTargets.Add("$siteHtmlFile -> $siteTarget")
                continue
            }
            if (-not [string]::IsNullOrWhiteSpace($targetFragment) -and
                $idsBySiteFile.ContainsKey($resolvedTarget) -and
                -not $idsBySiteFile[$resolvedTarget].Contains($targetFragment)) {
                $missingSiteTargets.Add("$siteHtmlFile -> $siteTarget")
            }
        }
    }
    if ($missingSiteTargets.Count -ne 0) {
        throw "Book site has $($missingSiteTargets.Count) missing local targets: $($missingSiteTargets[0])"
    }

    $siteOutputFiles = @($siteIndex) +
        @(if ($editionNumber -ge 16) { $siteCompose }) +
        @(Get-ChildItem -LiteralPath $siteChapterDirectory -File | ForEach-Object { $_.FullName }) +
        @(Get-ChildItem -LiteralPath $siteEntryDirectory -File | ForEach-Object { $_.FullName }) +
        @(Get-ChildItem -LiteralPath $siteAssetDirectory -File | ForEach-Object { $_.FullName })
    $siteFileRecords = foreach ($siteOutputFile in $siteOutputFiles | Sort-Object) {
        [ordered]@{
            path = [System.IO.Path]::GetRelativePath($output, $siteOutputFile).Replace("\", "/")
            sha256 = (Get-FileHash -LiteralPath $siteOutputFile -Algorithm SHA256).Hash.ToLowerInvariant()
            bytes = (Get-Item -LiteralPath $siteOutputFile).Length
        }
    }
    $siteIdentityInput = ($siteFileRecords | ForEach-Object { "$($_.path)|$($_.sha256)|$($_.bytes)" }) -join "`n"
    $siteIdentityBytes = [System.Text.Encoding]::UTF8.GetBytes($siteIdentityInput)
    $siteIdentityHash = [System.Security.Cryptography.SHA256]::HashData($siteIdentityBytes)
    $siteIdentity = [System.Convert]::ToHexString($siteIdentityHash).ToLowerInvariant()
    $siteAssets = @($siteFileRecords | Where-Object { $_.path.StartsWith("assets/") })
    $siteChecks = [ordered]@{
        home_pages = 1
        chapter_pages = $siteChapters.Count
        chapter_subsections = @(foreach ($chapter in $siteChapters) { $chapter.groups }).Count
        source_pages = $sources.Count
        indexed_entry_pages = $searchRecords.Count
        supporting_source_pages = $sources.Count - $searchRecords.Count
        unique_page_names = $pageNames.Count
        local_links = $siteLocalLinks
        missing_local_targets = $missingSiteTargets.Count
        previous_next_sequence_records = $searchRecords.Count
        first_journey_targets = $firstJourneySources.Count
        problem_led_targets = $problemLedTargets
        composition_trace_targets = $compositionTraceTargets
        canonical_content_authority = "repository Markdown and reference metadata"
        execution = "multi-page static files; no server"
        identity = $siteIdentity
    }
    if ($editionNumber -ge 16) {
        $siteChecks.composition_lab_pages = 1
    }
    if ($editionNumber -ge 18) {
        $siteChecks.composition_factor_focus_records = $compositionFocusRecords.Count
    }
    if ($editionNumber -ge 19) {
        $siteChecks.composition_palette_groups = $compositionPaletteChecks.concept_groups
    }
}

$sourceRecords = foreach ($source in $sources) {
    [ordered]@{
        path = [System.IO.Path]::GetRelativePath($workspace, $source).Replace("\", "/")
        sha256 = (Get-FileHash -LiteralPath $source -Algorithm SHA256).Hash.ToLowerInvariant()
    }
}

$gitStatus = @(git -C $workspace status --porcelain)
$manifestRecord = [ordered]@{
    artifact = $artifactName
    edition = $Edition
    status = "internal simulation rendering; not reader evidence or preview-01"
    source_commit = $sourceCommit
    workspace_dirty_at_render = $gitStatus.Count -gt 0
    pandoc = (& $pandoc.Source --version | Select-Object -First 1)
    source_count = $sources.Count
    excluded_moderator_files = @(
        "USABILITY-PROTOCOL.md",
        "READER-PACKET.md",
        "EVALUATOR-RUBRIC.md",
        "OBSERVATIONS.md",
        "FACTOR-FORGE-SIM-RUBRIC.md"
    )
    sources = $sourceRecords
    selection_checks = $selectionChecks
    search_checks = $searchChecks
    search_assets = $searchAssets
    reader_checks = $readerChecks
    context_checks = $contextChecks
    context_assets = $contextAssets
    site_checks = $siteChecks
    site_assets = $siteAssets
    composition_checks = $compositionChecks
    rendering_checks = [ordered]@{
        internal_fragment_links = $fragmentLinks.Count
        missing_fragment_targets = $missingFragments.Count
        filesystem_dependent_links = $localFileLinks.Count
        repository_source_links = $repositorySourceLinks.Count
    }
    output = [ordered]@{
        path = "$artifactName.html"
        sha256 = (Get-FileHash -LiteralPath $html -Algorithm SHA256).Hash.ToLowerInvariant()
        bytes = (Get-Item -LiteralPath $html).Length
    }
}
if ($editionNumber -ge 16) {
    $manifestRecord.composition_lab_checks = $compositionLabChecks
}
if ($editionNumber -ge 17) {
    $manifestRecord.composition_reading_checks = $compositionReadingChecks
}
if ($editionNumber -ge 18) {
    $manifestRecord.composition_factor_focus_checks = $compositionFocusChecks
}
if ($editionNumber -ge 19) {
    $manifestRecord.composition_palette_checks = $compositionPaletteChecks
}
if ($editionNumber -ge 4) {
    $manifestRecord.output.search_index_path = "search-index.json"
    $manifestRecord.output.search_index_sha256 = (Get-FileHash -LiteralPath $searchIndexOutput -Algorithm SHA256).Hash.ToLowerInvariant()
}
if ($editionNumber -ge 7) {
    $manifestRecord.output.site_index_path = "index.html"
    $manifestRecord.output.site_index_sha256 = (Get-FileHash -LiteralPath $siteIndex -Algorithm SHA256).Hash.ToLowerInvariant()
    $manifestRecord.output.site_identity = $siteChecks.identity
    $compositionLabPageCount = if ($editionNumber -ge 16) { $siteChecks.composition_lab_pages } else { 0 }
    $manifestRecord.output.site_file_count = 1 + $compositionLabPageCount + $siteChecks.chapter_pages + $siteChecks.source_pages + $siteAssets.Count
}

$manifestRecord | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $manifest -Encoding utf8

Write-Output "artifact=$html"
Write-Output "manifest=$manifest"
Write-Output "sources=$($sources.Count)"
if ($Edition -ne "sim-01") {
    Write-Output "delta_entries=$($selectionChecks.delta_entries)"
    Write-Output "delta_views=$($selectionChecks.delta_views)"
    Write-Output "combined_records=$($selectionChecks.combined_projection_records)"
}
if ($editionNumber -ge 3) {
    Write-Output "tasks=$($selectionChecks.task_count)"
    Write-Output "task_coverage_records=$($selectionChecks.task_coverage_records)"
}
if ($editionNumber -ge 4) {
    Write-Output "search_records=$($searchChecks.indexed_records)"
    Write-Output "search_missing_targets=$($searchChecks.missing_rendered_targets)"
}
if ($editionNumber -ge 5) {
    Write-Output "reader_profiles=$($readerChecks.profiles.Count)"
    Write-Output "reader_default=$($readerChecks.default_profile)"
}
if ($editionNumber -ge 6) {
    Write-Output "context_profiles=$($contextChecks.profiles)"
    Write-Output "context_bindings=$($contextChecks.bindings)"
}
if ($editionNumber -ge 7) {
    Write-Output "site=$siteIndex"
    $compositionLabPageCount = if ($editionNumber -ge 16) { $siteChecks.composition_lab_pages } else { 0 }
    Write-Output "site_pages=$($siteChecks.source_pages + $siteChecks.chapter_pages + $compositionLabPageCount + 1)"
    Write-Output "site_chapters=$($siteChecks.chapter_pages)"
    Write-Output "site_chapter_subsections=$($siteChecks.chapter_subsections)"
    Write-Output "site_entry_pages=$($siteChecks.indexed_entry_pages)"
    Write-Output "site_first_journey_targets=$($siteChecks.first_journey_targets)"
    Write-Output "site_problem_led_targets=$($siteChecks.problem_led_targets)"
    if ($editionNumber -ge 15) {
        Write-Output "site_composition_trace_targets=$($siteChecks.composition_trace_targets)"
    }
    if ($editionNumber -ge 16) {
        Write-Output "site_composition_lab_pages=$($siteChecks.composition_lab_pages)"
        Write-Output "site_composition_lab_relations=$($compositionLabChecks.relation_records)"
    }
    if ($editionNumber -ge 17) {
        Write-Output "site_composition_reading_bindings=$($compositionReadingChecks.artifact_bindings)"
    }
    if ($editionNumber -ge 18) {
        Write-Output "site_composition_factor_focus_records=$($compositionFocusChecks.factor_focus_records)"
    }
    if ($editionNumber -ge 19) {
        Write-Output "site_composition_palette_groups=$($compositionPaletteChecks.concept_groups)"
    }
    Write-Output "site_missing_targets=$($siteChecks.missing_local_targets)"
    Write-Output "site_identity=$($siteChecks.identity)"
}
Write-Output "internal_links=$($fragmentLinks.Count)"
Write-Output "missing_internal_targets=$($missingFragments.Count)"
Write-Output "filesystem_links=$($localFileLinks.Count)"
Write-Output "repository_source_links=$($repositorySourceLinks.Count)"
Write-Output "bytes=$((Get-Item -LiteralPath $html).Length)"
Write-Output "sha256=$((Get-FileHash -LiteralPath $html -Algorithm SHA256).Hash.ToLowerInvariant())"
