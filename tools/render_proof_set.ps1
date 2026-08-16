param(
    [ValidateSet("sim-01", "sim-02", "sim-03", "sim-04", "sim-05", "sim-06", "sim-07", "sim-08", "sim-09", "sim-10", "sim-11", "sim-12", "sim-13", "sim-14")]
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

    $siteIndex = Join-Path $output "index.html"
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
    $siteData = "window.FACTORIUM_SEARCH_INDEX=$searchJson;`n" +
        "window.FACTORIUM_SOURCE_INDEX=$sourceIndexJson;`n" +
        "window.FACTORIUM_CONTEXT_PROFILES=$contextJson;`n"
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
    $homeProblemNav = ""
    $nestedProblemNav = ""
    $heroDeck = "A linked reference for selecting senses, comparing decompositions, choosing bounded relations, and recognizing structures that fail."
    if ($editionNumber -ge 12) {
        $problemJourneys = @(
            [ordered]@{
                state = "Complete trace · structural review"
                title = "Review a system dependency"
                description = "Join dependency and interface concepts, run a structural constraint, and retain the exact closure trace."
                source = $compositionWorksheet
            },
            [ordered]@{
                state = "Complete trace · unresolved claim"
                title = "Evaluate a performance claim"
                description = "Separate observations from inference and see why complete graph custody does not settle a causal claim."
                source = $evidenceWorksheet
            },
            [ordered]@{
                state = "Incomplete trace · unresolved decision"
                title = "Trace an alert to user outcomes"
                description = "Traverse feedback in reverse and preserve the missing outcome evidence instead of inventing an answer."
                source = $feedbackWorksheet
            }
        )
        if ($editionNumber -ge 13) {
            $problemJourneys += [ordered]@{
                state = "Contradictory trace · repair required"
                title = "Subtract a required interface"
                description = "See why a requested exclusion stays visible as a conflict when an admitted dependency still requires that node."
                source = $conflictWorksheet
            }
        }
        if ($editionNumber -ge 14) {
            $problemJourneys += [ordered]@{
                state = "Truncated trace · frontier visible"
                title = "Review delegated compliance"
                description = "Resolve delegated authority first, then stop at the declared edge budget with obligation satisfaction still visible as a frontier."
                source = $frontierWorksheet
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
<nav class="site-nav" aria-label="Primary">$homeProblemNav<a href="#start">Start</a><a href="#search">Search</a><a href="#contents">Contents</a><a href="$quickstartPage">Quickstart</a></nav>
</div></header>
<main id="main-content" class="site-main">
<section class="site-hero">
<p class="site-kicker">Proof Set · book-site simulation</p>
<h1>Structure, Quantity, and Choice</h1>
<p class="site-hero__deck">$heroDeck</p>
</section>$problemSection
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
<nav class="site-nav" aria-label="Primary">$nestedProblemNav<a href="../index.html#start">Start</a><a href="../index.html#search">Search</a><a href="../index.html#contents">Contents</a><a href="../entries/$($pageBySource[$quickstart])">Quickstart</a></nav>
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
<nav class="site-nav" aria-label="Primary">$nestedProblemNav<a href="../index.html#start">Start</a><a href="../index.html#search">Search</a><a href="../index.html#contents">Contents</a><a href="$($pageBySource[$quickstart])">Quickstart</a></nav>
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
<main id="main-content" class="site-entry" data-source-path="$encodedSource">$segment</main>
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
    $actualAssetFiles = @(Get-ChildItem -LiteralPath $siteAssetDirectory -File)
    $unexpectedAssetNames = @($actualAssetFiles.Name | Where-Object { $_ -notin $expectedAssetNames })
    $missingAssetNames = @($expectedAssetNames | Where-Object { $_ -notin $actualAssetFiles.Name })
    if ($actualChapterFiles.Count -ne $siteChapters.Count -or
        $actualEntryFiles.Count -ne $sources.Count -or
        $unexpectedAssetNames.Count -ne 0 -or $missingAssetNames.Count -ne 0) {
        throw "Stale or incomplete site output: chapters=$($actualChapterFiles.Count)/$($siteChapters.Count) entries=$($actualEntryFiles.Count)/$($sources.Count) unexpected-assets=$($unexpectedAssetNames -join ',') missing-assets=$($missingAssetNames -join ',')"
    }
    $siteHtmlFiles = @($siteIndex) +
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
        canonical_content_authority = "repository Markdown and reference metadata"
        execution = "multi-page static files; no server"
        identity = $siteIdentity
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
if ($editionNumber -ge 4) {
    $manifestRecord.output.search_index_path = "search-index.json"
    $manifestRecord.output.search_index_sha256 = (Get-FileHash -LiteralPath $searchIndexOutput -Algorithm SHA256).Hash.ToLowerInvariant()
}
if ($editionNumber -ge 7) {
    $manifestRecord.output.site_index_path = "index.html"
    $manifestRecord.output.site_index_sha256 = (Get-FileHash -LiteralPath $siteIndex -Algorithm SHA256).Hash.ToLowerInvariant()
    $manifestRecord.output.site_identity = $siteChecks.identity
    $manifestRecord.output.site_file_count = 1 + $siteChecks.chapter_pages + $siteChecks.source_pages + $siteAssets.Count
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
    Write-Output "site_pages=$($siteChecks.source_pages + $siteChecks.chapter_pages + 1)"
    Write-Output "site_chapters=$($siteChecks.chapter_pages)"
    Write-Output "site_chapter_subsections=$($siteChecks.chapter_subsections)"
    Write-Output "site_entry_pages=$($siteChecks.indexed_entry_pages)"
    Write-Output "site_first_journey_targets=$($siteChecks.first_journey_targets)"
    Write-Output "site_problem_led_targets=$($siteChecks.problem_led_targets)"
    Write-Output "site_missing_targets=$($siteChecks.missing_local_targets)"
    Write-Output "site_identity=$($siteChecks.identity)"
}
Write-Output "internal_links=$($fragmentLinks.Count)"
Write-Output "missing_internal_targets=$($missingFragments.Count)"
Write-Output "filesystem_links=$($localFileLinks.Count)"
Write-Output "repository_source_links=$($repositorySourceLinks.Count)"
Write-Output "bytes=$((Get-Item -LiteralPath $html).Length)"
Write-Output "sha256=$((Get-FileHash -LiteralPath $html -Algorithm SHA256).Hash.ToLowerInvariant())"
