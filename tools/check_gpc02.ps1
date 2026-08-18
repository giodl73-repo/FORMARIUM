param(
  [string]$RepoRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = "Stop"
$fixtureRoot = Join-Path $RepoRoot "fixtures/philosophy"
$campaignPath = Join-Path $fixtureRoot "gpc-02-campaign.json"
$inventoryPath = Join-Path $fixtureRoot "gpc-02-factoring-inventory.json"
$ledgerPath = Join-Path $fixtureRoot "gpc-02-alignment-ledger.json"
$resultPath = Join-Path $fixtureRoot "gpc-02-result.json"
$blueprintPath = Join-Path $fixtureRoot "global-philosophy-counter-sample-blueprint-01.json"

$campaign = Get-Content -Raw $campaignPath | ConvertFrom-Json
$inventory = Get-Content -Raw $inventoryPath | ConvertFrom-Json
$ledger = Get-Content -Raw $ledgerPath | ConvertFrom-Json
$result = Get-Content -Raw $resultPath | ConvertFrom-Json
$blueprint = Get-Content -Raw $blueprintPath | ConvertFrom-Json

function Assert-True([bool]$Condition, [string]$Message) {
  if (-not $Condition) { throw $Message }
}

Assert-True ($campaign.status -eq "frozen-before-source-review") "Campaign was not frozen before source review."
Assert-True ($campaign.packet_slots.Count -eq 18) "Expected 18 frozen packet slots."
Assert-True ($inventory.records.Count -eq 18) "Expected 18 source-local factorings."
Assert-True ($ledger.records.Count -eq 18) "Expected 18 lane-local alignment candidates."
Assert-True ($result.counts.completed_packets -eq 18) "Result does not complete all packets."

$requiredRecordFields = @($blueprint.factorization_record_contract.required_fields)
$requiredFactorFields = @($blueprint.factorization_record_contract.factor_fields)
$factoringIds = @{}
foreach ($record in $inventory.records) {
  foreach ($field in $requiredRecordFields) {
    Assert-True ($null -ne $record.$field) "Factoring $($record.factoring_id) lacks $field."
  }
  Assert-True (-not $factoringIds.ContainsKey($record.factoring_id)) "Duplicate factoring id $($record.factoring_id)."
  $factoringIds[$record.factoring_id] = $true
  Assert-True ($record.factors.Count -gt 0) "Factoring $($record.factoring_id) has no factors."
  foreach ($factor in $record.factors) {
    foreach ($field in $requiredFactorFields) {
      Assert-True ($null -ne $factor.$field) "Factor in $($record.factoring_id) lacks $field."
    }
  }
}
Assert-True (($inventory.ordered_factoring_ids -join "|") -eq (($inventory.records | ForEach-Object factoring_id) -join "|")) "Ordered inventory does not match record order."

$allowedRelations = @($blueprint.alignment_ledger_contract.relation_kinds)
foreach ($alignment in $ledger.records) {
  foreach ($field in $blueprint.alignment_ledger_contract.required_fields) {
    Assert-True ($null -ne $alignment.PSObject.Properties[$field]) "Alignment $($alignment.alignment_id) lacks $field."
  }
  Assert-True ($allowedRelations -contains $alignment.relation_kind) "Alignment $($alignment.alignment_id) has invalid relation kind."
  foreach ($id in $alignment.source_factoring_ids) {
    Assert-True ($factoringIds.ContainsKey($id)) "Alignment $($alignment.alignment_id) references missing factoring $id."
  }
  if ($null -ne $alignment.candidate_factorium_owner) {
    Assert-True (Test-Path (Join-Path $RepoRoot $alignment.candidate_factorium_owner)) "Missing owner $($alignment.candidate_factorium_owner)."
  }
}

$expectedHashes = @{
  $campaignPath = $result.inputs.campaign_sha256
  $inventoryPath = $result.inputs.inventory_sha256
  $ledgerPath = $result.inputs.alignment_ledger_sha256
}
foreach ($path in $expectedHashes.Keys) {
  $actual = (Get-FileHash $path -Algorithm SHA256).Hash
  Assert-True ($actual -eq $expectedHashes[$path]) "Custody hash mismatch for $path."
}

Assert-True (-not $result.content_admitted) "GPC-02 must not admit content."
Assert-True (-not $result.factorium_owner_changed) "GPC-02 must not change owners."
Assert-True (-not $result.reader_evidence_claimed) "GPC-02 must not claim reader evidence."
Assert-True (-not $result.global_completeness_claimed) "GPC-02 must not claim global completeness."

Write-Output "GPC-02 PASS: 18/18 packets, 18 immutable factorings, 18 typed alignments, hashes intact, zero content admission."
