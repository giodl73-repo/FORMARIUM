param(
    [string]$OutputDirectory = "target\proof-set-sim-01"
)

$ErrorActionPreference = "Stop"

$workspace = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$volume = Join-Path $workspace "volumes\01-structure-quantity-choice\VOLUME.md"
$quickstart = Join-Path $workspace "volumes\01-structure-quantity-choice\PROOF-SET-SIM-QUICKSTART.md"
$style = Join-Path $workspace "volumes\01-structure-quantity-choice\proof-set.css"
$volumeDirectory = Split-Path $volume
$output = [System.IO.Path]::GetFullPath((Join-Path $workspace $OutputDirectory))
$html = Join-Path $output "proof-set-sim-01.html"
$manifest = Join-Path $output "manifest.json"

$pandoc = Get-Command pandoc -ErrorAction Stop
$excludedNames = [System.Collections.Generic.HashSet[string]]::new(
    [System.StringComparer]::OrdinalIgnoreCase
)
@(
    "USABILITY-PROTOCOL.md",
    "READER-PACKET.md",
    "EVALUATOR-RUBRIC.md",
    "OBSERVATIONS.md"
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

Add-ProofSource $quickstart
Add-ProofSource $volume

$volumeText = Get-Content -LiteralPath $volume -Raw
$links = [regex]::Matches($volumeText, '\[[^\]]+\]\(([^)#]+)(?:#[^)]+)?\)')
foreach ($link in $links) {
    $relative = $link.Groups[1].Value
    if (-not $relative.EndsWith(".md", [System.StringComparison]::OrdinalIgnoreCase)) {
        continue
    }
    if ($excludedNames.Contains([System.IO.Path]::GetFileName($relative))) {
        continue
    }
    Add-ProofSource (Join-Path $volumeDirectory $relative)
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
    "--metadata=title:Factorium Proof Set Simulation 01",
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
    artifact = "proof-set-sim-01"
    status = "internal simulation rendering; not reader evidence or preview-01"
    source_commit = $sourceCommit
    workspace_dirty_at_render = $gitStatus.Count -gt 0
    pandoc = (& $pandoc.Source --version | Select-Object -First 1)
    source_count = $sources.Count
    excluded_moderator_files = @(
        "USABILITY-PROTOCOL.md",
        "READER-PACKET.md",
        "EVALUATOR-RUBRIC.md",
        "OBSERVATIONS.md"
    )
    sources = $sourceRecords
    rendering_checks = [ordered]@{
        internal_fragment_links = $fragmentLinks.Count
        missing_fragment_targets = $missingFragments.Count
        filesystem_dependent_links = $localFileLinks.Count
        repository_source_links = $repositorySourceLinks.Count
    }
    output = [ordered]@{
        path = "proof-set-sim-01.html"
        sha256 = (Get-FileHash -LiteralPath $html -Algorithm SHA256).Hash.ToLowerInvariant()
        bytes = (Get-Item -LiteralPath $html).Length
    }
}

$manifestRecord | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $manifest -Encoding utf8

Write-Output "artifact=$html"
Write-Output "manifest=$manifest"
Write-Output "sources=$($sources.Count)"
Write-Output "internal_links=$($fragmentLinks.Count)"
Write-Output "missing_internal_targets=$($missingFragments.Count)"
Write-Output "filesystem_links=$($localFileLinks.Count)"
Write-Output "repository_source_links=$($repositorySourceLinks.Count)"
Write-Output "bytes=$((Get-Item -LiteralPath $html).Length)"
Write-Output "sha256=$((Get-FileHash -LiteralPath $html -Algorithm SHA256).Hash.ToLowerInvariant())"
