param(
  [Parameter(Mandatory = $true)]
  [string]$Token,

  [Parameter(Mandatory = $false)]
  [string]$ProjectKey = "techCamp-proyecto",

  [Parameter(Mandatory = $false)]
  [string]$SonarUrl = "http://localhost:9001",

  [Parameter(Mandatory = $false)]
  [string]$OutDir = ".\sonar-export"
)

$ErrorActionPreference = "Stop"

function New-BasicAuthHeader {
  param([string]$TokenValue)
  $auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("${TokenValue}:"))
  return @{ Authorization = "Basic $auth" }
}

function Get-PagedResults {
  param(
    [string]$BaseUrl,
    [hashtable]$Headers,
    [string]$ItemsProperty
  )

  $page = 1
  $pageSize = 500
  $all = @()

  while ($true) {
    $url = "$BaseUrl&ps=$pageSize&p=$page"
    $resp = Invoke-RestMethod -Uri $url -Headers $Headers -Method Get

    if (-not $resp.$ItemsProperty) { break }

    $items = @($resp.$ItemsProperty)
    $all += $items

    if ($items.Count -lt $pageSize) { break }
    $page++
  }

  return $all
}

function Get-RuleCweMap {
  param(
    [array]$RuleKeys,
    [hashtable]$Headers,
    [string]$SonarBaseUrl
  )

  $map = @{}

  foreach ($rk in ($RuleKeys | Sort-Object -Unique)) {
    if ([string]::IsNullOrWhiteSpace($rk)) { continue }

    try {
      $ruleUrl = "$SonarBaseUrl/api/rules/show?key=$([uri]::EscapeDataString($rk))"
      $ruleResp = Invoke-RestMethod -Uri $ruleUrl -Headers $Headers -Method Get

      $cwe = @()

      if ($ruleResp.rule.securityStandards) {
        foreach ($std in $ruleResp.rule.securityStandards) {
          if ($std -match "^cwe:") {
            $cwe += $std.Replace("cwe:", "CWE-").ToUpper()
          }
        }
      }

      if ($cwe.Count -eq 0 -and $ruleResp.rule.tags) {
        foreach ($tag in $ruleResp.rule.tags) {
          if ($tag -match "^cwe") {
            $normalized = $tag -replace "^cwe[-_:]?", ""
            if ($normalized -match "^\d+$") {
              $cwe += "CWE-$normalized"
            }
          }
        }
      }

      $map[$rk] = if ($cwe.Count -gt 0) { ($cwe | Sort-Object -Unique) -join ";" } else { "" }
    }
    catch {
      $map[$rk] = ""
    }
  }

  return $map
}

Write-Host "Preparando exportación de SonarQube..." -ForegroundColor Cyan
$headers = New-BasicAuthHeader -TokenValue $Token

if (-not (Test-Path $OutDir)) {
  New-Item -ItemType Directory -Path $OutDir | Out-Null
}

$issuesBaseUrl = "$SonarUrl/api/issues/search?componentKeys=$([uri]::EscapeDataString($ProjectKey))&types=VULNERABILITY,BUG,CODE_SMELL&additionalFields=_all"
$hotspotsBaseUrl = "$SonarUrl/api/hotspots/search?projectKey=$([uri]::EscapeDataString($ProjectKey))"

Write-Host "Descargando issues..." -ForegroundColor Yellow
$issues = Get-PagedResults -BaseUrl $issuesBaseUrl -Headers $headers -ItemsProperty "issues"

Write-Host "Descargando hotspots..." -ForegroundColor Yellow
$hotspots = Get-PagedResults -BaseUrl $hotspotsBaseUrl -Headers $headers -ItemsProperty "hotspots"

$ruleKeys = @()
$ruleKeys += $issues | ForEach-Object { $_.rule }
$ruleKeys += $hotspots | ForEach-Object { $_.rule }

Write-Host "Consultando CWE por regla..." -ForegroundColor Yellow
$cweMap = Get-RuleCweMap -RuleKeys $ruleKeys -Headers $headers -SonarBaseUrl $SonarUrl

$issuesExport = $issues | ForEach-Object {
  [PSCustomObject]@{
    key          = $_.key
    type         = $_.type
    severity     = $_.severity
    status       = $_.status
    resolution   = $_.resolution
    message      = $_.message
    component    = $_.component
    line         = $_.line
    rule         = $_.rule
    cwe          = $cweMap[$_.rule]
    effort       = $_.effort
    creationDate = $_.creationDate
    updateDate   = $_.updateDate
    author       = $_.author
    tags         = ($_.tags -join ";")
  }
}

$hotspotsExport = $hotspots | ForEach-Object {
  [PSCustomObject]@{
    key                      = $_.key
    vulnerabilityProbability = $_.vulnerabilityProbability
    status                   = $_.status
    message                  = $_.message
    component                = $_.component
    line                     = $_.line
    rule                     = $_.rule
    cwe                      = $cweMap[$_.rule]
    creationDate             = $_.creationDate
    updateDate               = $_.updateDate
    author                   = $_.author
    assignee                 = $_.assignee
  }
}

$issuesCsv = Join-Path $OutDir "sonar-issues-with-cwe.csv"
$hotspotsCsv = Join-Path $OutDir "sonar-hotspots-with-cwe.csv"

$issuesExport | Export-Csv -Path $issuesCsv -NoTypeInformation -Encoding UTF8
$hotspotsExport | Export-Csv -Path $hotspotsCsv -NoTypeInformation -Encoding UTF8

$summary = [PSCustomObject]@{
  projectKey      = $ProjectKey
  sonarUrl        = $SonarUrl
  totalIssues     = @($issuesExport).Count
  totalHotspots   = @($hotspotsExport).Count
  exportedAt      = (Get-Date).ToString("s")
  issuesCsv       = (Resolve-Path $issuesCsv).Path
  hotspotsCsv     = (Resolve-Path $hotspotsCsv).Path
}
$summary | ConvertTo-Json | Out-File (Join-Path $OutDir "summary.json") -Encoding utf8

Write-Host ""
Write-Host "Exportación completada." -ForegroundColor Green
Write-Host "Issues:   $issuesCsv"
Write-Host "Hotspots: $hotspotsCsv"
Write-Host "Resumen:  $(Join-Path $OutDir "summary.json")"