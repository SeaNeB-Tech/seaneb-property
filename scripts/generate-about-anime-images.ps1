$ErrorActionPreference = "Stop"

if (-not $env:OPENAI_API_KEY) {
  throw "OPENAI_API_KEY is missing. Set it and rerun: `$env:OPENAI_API_KEY='your_key'"
}

$root = Split-Path -Parent $PSScriptRoot
$outputDir = Join-Path $root "public/assets/about"
New-Item -ItemType Directory -Force -Path $outputDir | Out-Null

$sharedStyle = @"
anime-style illustration, clean lineart, soft cel shading, modern studio lighting,
large expressive eyes with realistic proportions, professional clothing, minimal clutter,
soft gradients, tech-inspired environment, SaaS illustration style, blue-white corporate palette,
depth of field, centered composition, rounded-card framing, website UI friendly, high detail
"@ -replace "\r?\n", " "

$negative = "Avoid photorealism, cartoonish exaggeration, messy backgrounds, distorted anatomy, extra limbs, text overlays, watermark."

$images = @(
  @{
    File = "about-team.jpg"
    Prompt = "Professionals collaborating in a modern office with dashboards and laptops (team and operations). $sharedStyle $negative"
  },
  @{
    File = "about-trust.jpg"
    Prompt = "Digital verification workflow with UI screens, property data, approval checkmarks, and secure interface elements (trust and quality). $sharedStyle $negative"
  },
  @{
    File = "about-hero.jpg"
    Prompt = "User exploring property listings, maps, and buildings in a modern cityscape (property discovery). $sharedStyle $negative"
  }
)

foreach ($item in $images) {
  $payload = @{
    model = "gpt-image-1"
    prompt = $item.Prompt
    size = "1536x1024"
    quality = "high"
    output_format = "jpeg"
  } | ConvertTo-Json -Depth 6

  $response = Invoke-RestMethod `
    -Method Post `
    -Uri "https://api.openai.com/v1/images" `
    -Headers @{ Authorization = "Bearer $($env:OPENAI_API_KEY)" } `
    -ContentType "application/json" `
    -Body $payload

  if (-not $response.data -or -not $response.data[0].b64_json) {
    throw "No image data returned for $($item.File)"
  }

  $bytes = [Convert]::FromBase64String($response.data[0].b64_json)
  $path = Join-Path $outputDir $item.File
  [System.IO.File]::WriteAllBytes($path, $bytes)
  Write-Host "Generated: $path"
}

Write-Host "Done. About page images updated in public/assets/about."
