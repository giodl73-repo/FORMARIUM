param(
    [ValidateSet("sim-01", "sim-02", "sim-03", "sim-04")]
    [string]$Edition = "sim-01",
    [string]$OutputDirectory = ""
)

$ErrorActionPreference = "Stop"

$workspace = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$volume = Join-Path $workspace "volumes\01-structure-quantity-choice\VOLUME.md"
$supplement = Join-Path $workspace "volumes\01-structure-quantity-choice\FACTOR-FORGE-SIM-SUPPLEMENT.md"
$factorForgeTasks = Join-Path $workspace "volumes\01-structure-quantity-choice\FACTOR-FORGE-SIM-TASKS.md"
$factorForgeRubric = Join-Path $workspace "volumes\01-structure-quantity-choice\FACTOR-FORGE-SIM-RUBRIC.md"
$quickstart = Join-Path $workspace "volumes\01-structure-quantity-choice\PROOF-SET-SIM-QUICKSTART.md"
$style = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set.css"
$searchStyle = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-search.css"
$searchScript = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set-search.js"
$volumeDirectory = Split-Path $volume
$artifactName = "proof-set-$Edition"
$artifactTitle = switch ($Edition) {
    "sim-01" { "Factorium Proof Set Simulation 01" }
    "sim-02" { "Factorium Proof Set Expanded Simulation 02" }
    "sim-03" { "Factorium Proof Set Factor Forge Task Simulation 03" }
    "sim-04" { "Factorium Proof Set Search Simulation 04" }
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
                summary = $parts[5]
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

    if ($Edition -in @("sim-03", "sim-04")) {
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
        $selectionChecks.task_count = 8
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
if ($Edition -in @("sim-03", "sim-04")) {
    Add-ProofSource $factorForgeTasks
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
    $htmlText = $htmlText.Substring(0, $start) + $segment + $htmlText.Substring($end)
}

$searchChecks = $null
$searchAssets = @()
if ($Edition -eq "sim-04") {
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
    if ($numberedSelections.Count -ne 93 -or $guideSelections.Count -ne 2) {
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

        $searchRecords.Add([ordered]@{
            title = $selection.title
            kind = $metadata.kind
            domain = $metadata.domain
            maturity = $metadata.maturity
            path = $relativePath
            anchor = $headingBySource[$selection.path]
            summary = $metadata.summary
            text = $plainText
        })
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
<p>Search the 93 selected records and two application guides. Results open the canonical book projection below.</p>
<div class="proof-search__controls">
<label for="proof-search-query">Search terms
<input id="proof-search-query" type="search" autocomplete="off" placeholder="Try force, percentage, authority, or contract">
</label>
<label for="proof-search-kind">Record kind
<select id="proof-search-kind"><option value="">All kinds</option></select>
</label>
</div>
<p id="proof-search-status" class="proof-search__status" role="status" aria-live="polite"></p>
<ol id="proof-search-results" class="proof-search__results"></ol>
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
        duplicate_paths = 95 - $searchPaths.Count
        missing_rendered_targets = $missingSearchTargets.Count
        result_limit = 20
        execution = "static in-browser; no server or alternate content authority"
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
if ($Edition -eq "sim-04") {
    $manifestRecord.output.search_index_path = "search-index.json"
    $manifestRecord.output.search_index_sha256 = (Get-FileHash -LiteralPath $searchIndexOutput -Algorithm SHA256).Hash.ToLowerInvariant()
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
if ($Edition -in @("sim-03", "sim-04")) {
    Write-Output "tasks=$($selectionChecks.task_count)"
    Write-Output "task_coverage_records=$($selectionChecks.task_coverage_records)"
}
if ($Edition -eq "sim-04") {
    Write-Output "search_records=$($searchChecks.indexed_records)"
    Write-Output "search_missing_targets=$($searchChecks.missing_rendered_targets)"
}
Write-Output "internal_links=$($fragmentLinks.Count)"
Write-Output "missing_internal_targets=$($missingFragments.Count)"
Write-Output "filesystem_links=$($localFileLinks.Count)"
Write-Output "repository_source_links=$($repositorySourceLinks.Count)"
Write-Output "bytes=$((Get-Item -LiteralPath $html).Length)"
Write-Output "sha256=$((Get-FileHash -LiteralPath $html -Algorithm SHA256).Hash.ToLowerInvariant())"
