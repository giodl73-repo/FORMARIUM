param([string]$RepoRoot = (Split-Path -Parent $PSScriptRoot))

$ErrorActionPreference = "Stop"

function Assert-True([bool]$Condition, [string]$Message) {
  if (-not $Condition) { throw $Message }
}

$fixtureRoot = Join-Path $RepoRoot "fixtures/philosophy"
$campaignPath = Join-Path $fixtureRoot "gpc-09-campaign.json"
$reconciliationPath = Join-Path $fixtureRoot "gpc-09-reconciliation.json"
$campaign = Get-Content -Raw $campaignPath | ConvertFrom-Json
$reconciliation = Get-Content -Raw $reconciliationPath | ConvertFrom-Json

Assert-True ($campaign.status -eq "frozen-before-global-reconciliation") "GPC-09 inputs were not frozen before reconciliation."
Assert-True ($reconciliation.status -eq "one-pass-reconciliation-complete") "GPC-09 reconciliation is incomplete."

$expectedIds = @()
$inputCount = 0
foreach ($input in $campaign.ordered_inputs) {
  $inventoryPath = Join-Path $RepoRoot $input.inventory_path
  $dispositionPath = Join-Path $RepoRoot $input.disposition_path
  Assert-True (Test-Path $inventoryPath) "Missing inventory $($input.inventory_path)."
  Assert-True (Test-Path $dispositionPath) "Missing disposition $($input.disposition_path)."
  Assert-True ((Get-FileHash $inventoryPath -Algorithm SHA256).Hash -eq $input.inventory_sha256) "Inventory custody mismatch for $($input.campaign_id)."
  Assert-True ((Get-FileHash $dispositionPath -Algorithm SHA256).Hash -eq $input.disposition_sha256) "Disposition custody mismatch for $($input.campaign_id)."
  $inventory = Get-Content -Raw $inventoryPath | ConvertFrom-Json
  Assert-True ($inventory.records.Count -eq $input.record_count) "Record count mismatch for $($input.campaign_id)."
  $expectedIds += @($inventory.records | ForEach-Object factoring_id)
  $inputCount += $inventory.records.Count
}
Assert-True ($inputCount -eq $campaign.input_count) "Frozen input total mismatch."

$groupIds = @{}
foreach ($group in $reconciliation.alignment_groups) {
  Assert-True (-not $groupIds.ContainsKey($group.group_id)) "Duplicate alignment group $($group.group_id)."
  $groupIds[$group.group_id] = $true
  foreach ($owner in $group.current_owners) {
    Assert-True (Test-Path (Join-Path $RepoRoot $owner)) "Missing current owner $owner."
  }
}

$actualIds = @()
foreach ($entry in $reconciliation.complete_source_to_output_ledger) {
  Assert-True ($groupIds.ContainsKey($entry.output_id)) "Ledger references unknown output $($entry.output_id)."
  $actualIds += @($entry.source_factoring_ids)
}

Assert-True ($actualIds.Count -eq $expectedIds.Count) "Source-to-output ledger cardinality mismatch."
Assert-True (($actualIds | Sort-Object -Unique).Count -eq $actualIds.Count) "Source-to-output ledger duplicates an input."
$missing = @(Compare-Object $expectedIds $actualIds | Where-Object SideIndicator -eq '<=')
$extra = @(Compare-Object $expectedIds $actualIds | Where-Object SideIndicator -eq '=>')
Assert-True ($missing.Count -eq 0) "Source-to-output ledger omits frozen inputs."
Assert-True ($extra.Count -eq 0) "Source-to-output ledger introduces unknown inputs."

foreach ($unmapped in $reconciliation.unmapped_factorings) {
  Assert-True ($expectedIds -contains $unmapped.source_factoring_id) "Unmapped record is not a frozen input: $($unmapped.source_factoring_id)."
}

Assert-True (-not $reconciliation.content_admitted) "GPC-09 admitted content during reconciliation."
Assert-True (-not $reconciliation.factorium_owner_changed) "GPC-09 changed a Factorium owner during reconciliation."
Assert-True (-not $reconciliation.reader_evidence_claimed) "GPC-09 claims reader evidence."
Assert-True (-not $reconciliation.global_completeness_claimed) "GPC-09 claims global completeness."

Write-Output "GPC-09 PASS: $inputCount frozen inputs, $($reconciliation.alignment_groups.Count) alignment groups, $($reconciliation.conflict_groups.Count) conflict groups, complete one-pass custody, zero admission."
