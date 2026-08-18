param(
  [string]$RepoRoot = (Split-Path -Parent $PSScriptRoot),
  [string[]]$CampaignIds = @()
)

$ErrorActionPreference = "Stop"
$fixtureRoot = Join-Path $RepoRoot "fixtures/philosophy"
$blueprint = Get-Content -Raw (Join-Path $fixtureRoot "global-philosophy-counter-sample-blueprint-01.json") | ConvertFrom-Json

function Assert-True([bool]$Condition, [string]$Message) {
  if (-not $Condition) { throw $Message }
}

if ($CampaignIds.Count -eq 0) {
  $CampaignIds = Get-ChildItem $fixtureRoot -Filter "gpc-*-result.json" |
    Where-Object { $_.Name -match '^gpc-0[2-8]-result\.json$' } |
    ForEach-Object { $_.BaseName.Substring(0, 6).ToUpperInvariant() } |
    Sort-Object
}

$totalRecords = 0
$totalAlignments = 0
foreach ($campaignId in $CampaignIds) {
  $slug = $campaignId.ToLowerInvariant()
  $campaignPath = Join-Path $fixtureRoot "$slug-campaign.json"
  $inventoryPath = Join-Path $fixtureRoot "$slug-factoring-inventory.json"
  $ledgerPath = Join-Path $fixtureRoot "$slug-alignment-ledger.json"
  $resultPath = Join-Path $fixtureRoot "$slug-result.json"

  foreach ($path in @($campaignPath, $inventoryPath, $ledgerPath, $resultPath)) {
    Assert-True (Test-Path $path) "$campaignId is missing $path."
  }

  $campaign = Get-Content -Raw $campaignPath | ConvertFrom-Json
  $inventory = Get-Content -Raw $inventoryPath | ConvertFrom-Json
  $ledger = Get-Content -Raw $ledgerPath | ConvertFrom-Json
  $result = Get-Content -Raw $resultPath | ConvertFrom-Json

  Assert-True ($campaign.campaign_id -eq $campaignId) "$campaignId campaign identity mismatch."
  Assert-True ($inventory.campaign_id -eq $campaignId) "$campaignId inventory identity mismatch."
  Assert-True ($ledger.campaign_id -eq $campaignId) "$campaignId ledger identity mismatch."
  Assert-True ($result.campaign_id -eq $campaignId) "$campaignId result identity mismatch."
  Assert-True ($campaign.status -eq "frozen-before-source-review") "$campaignId was not frozen before source review."
  Assert-True ($campaign.packet_slots.Count -eq $result.counts.frozen_packet_slots) "$campaignId packet count mismatch."
  Assert-True ($inventory.records.Count -eq $campaign.packet_slots.Count) "$campaignId inventory does not cover every packet."
  Assert-True ($ledger.records.Count -eq $inventory.records.Count) "$campaignId ledger count mismatch."
  Assert-True ($result.counts.completed_packets -eq $campaign.packet_slots.Count) "$campaignId result is incomplete."

  $factoringIds = @{}
  foreach ($record in $inventory.records) {
    foreach ($field in $blueprint.factorization_record_contract.required_fields) {
      Assert-True ($null -ne $record.PSObject.Properties[$field]) "$($record.factoring_id) lacks $field."
    }
    Assert-True (-not $factoringIds.ContainsKey($record.factoring_id)) "Duplicate factoring id $($record.factoring_id)."
    $factoringIds[$record.factoring_id] = $true
    Assert-True ($record.factors.Count -gt 0) "$($record.factoring_id) has no factors."
    foreach ($factor in $record.factors) {
      foreach ($field in $blueprint.factorization_record_contract.factor_fields) {
        Assert-True ($null -ne $factor.PSObject.Properties[$field]) "Factor in $($record.factoring_id) lacks $field."
      }
    }
  }

  $actualOrder = @($inventory.records | ForEach-Object factoring_id)
  Assert-True (($inventory.ordered_factoring_ids -join "|") -eq ($actualOrder -join "|")) "$campaignId ordered inventory mismatch."

  foreach ($alignment in $ledger.records) {
    foreach ($field in $blueprint.alignment_ledger_contract.required_fields) {
      Assert-True ($null -ne $alignment.PSObject.Properties[$field]) "$($alignment.alignment_id) lacks $field."
    }
    Assert-True ($blueprint.alignment_ledger_contract.relation_kinds -contains $alignment.relation_kind) "$($alignment.alignment_id) has invalid relation kind."
    foreach ($id in $alignment.source_factoring_ids) {
      Assert-True ($factoringIds.ContainsKey($id)) "$($alignment.alignment_id) references missing factoring $id."
    }
    if ($null -ne $alignment.candidate_factorium_owner) {
      Assert-True (Test-Path (Join-Path $RepoRoot $alignment.candidate_factorium_owner)) "$($alignment.alignment_id) has missing owner."
    }
  }

  $hashChecks = @(
    @($campaignPath, $result.inputs.campaign_sha256),
    @($inventoryPath, $result.inputs.inventory_sha256),
    @($ledgerPath, $result.inputs.alignment_ledger_sha256)
  )
  foreach ($pair in $hashChecks) {
    Assert-True ((Get-FileHash $pair[0] -Algorithm SHA256).Hash -eq $pair[1]) "$campaignId custody hash mismatch for $($pair[0])."
  }

  Assert-True (-not $result.content_admitted) "$campaignId admitted content."
  Assert-True (-not $result.factorium_owner_changed) "$campaignId changed an owner."
  Assert-True (-not $result.reader_evidence_claimed) "$campaignId claims reader evidence."
  Assert-True (-not $result.global_completeness_claimed) "$campaignId claims global completeness."

  $totalRecords += $inventory.records.Count
  $totalAlignments += $ledger.records.Count
  Write-Output "$campaignId PASS: $($inventory.records.Count) packets and immutable factorings; custody intact; zero admission."
}

Write-Output "GLOBAL CAMPAIGNS PASS: $($CampaignIds.Count) campaigns, $totalRecords factorings, $totalAlignments alignments."
