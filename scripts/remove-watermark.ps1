# Remove Kling-style corner watermark or crop bottom strip from hero loop.
# Requires ffmpeg in PATH: https://www.gyan.dev/ffmpeg/builds/ (release full) or chocolatey: choco install ffmpeg
#
# Examples (PowerShell, from repo pitch-site folder):
#   .\scripts\remove-watermark.ps1 -CropBottom 96
#   .\scripts\remove-watermark.ps1 -DelogoX 880 -DelogoY 980 -DelogoW 200 -DelogoH 72
#
# 1) Try -CropBottom first if the watermark is a full bottom bar.
# 2) If it is a corner logo, use -Delogo* (rectangle covering ONLY the watermark). Preview in VLC by screenshot.

param(
  [string] $InputVideo = "$PSScriptRoot\..\assets\echo-hero-loop.mp4",
  [string] $OutputVideo = "",
  [int] $CropBottom = 0,
  [int] $CropTop = 0,
  [int] $CropLeft = 0,
  [int] $CropRight = 0,
  [int] $DelogoX = -1,
  [int] $DelogoY = -1,
  [int] $DelogoW = -1,
  [int] $DelogoH = -1
)

$ErrorActionPreference = "Stop"
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  Write-Error "ffmpeg not found. Install from https://www.gyan.dev/ffmpeg/builds/ and add ffmpeg.exe to PATH, then re-run."
}

if (-not (Test-Path -LiteralPath $InputVideo)) {
  Write-Error "Input not found: $InputVideo"
}

if (-not $OutputVideo) {
  $dir = Split-Path -Parent $InputVideo
  $base = [System.IO.Path]::GetFileNameWithoutExtension($InputVideo)
  $OutputVideo = Join-Path $dir ($base + "-clean.mp4")
}

$vf = $null
if ($DelogoX -ge 0 -and $DelogoY -ge 0 -and $DelogoW -gt 0 -and $DelogoH -gt 0) {
  $vf = "delogo=x={0}:y={1}:w={2}:h={3}" -f $DelogoX, $DelogoY, $DelogoW, $DelogoH
  Write-Host "Using delogo filter: $vf"
}
elseif ($CropBottom -gt 0 -or $CropTop -gt 0 -or $CropLeft -gt 0 -or $CropRight -gt 0) {
  $sw = "iw-$CropLeft-$CropRight"
  $sh = "ih-$CropTop-$CropBottom"
  $vf = "crop=$sw`:$sh`:$CropLeft`:$CropTop"
  Write-Host "Using crop filter: $vf"
}
else {
  Write-Error "Specify either -CropBottom (etc.) or all four -DelogoX -DelogoY -DelogoW -DelogoH. Example: .\remove-watermark.ps1 -CropBottom 96"
}

Write-Host "Writing -> $OutputVideo"
& ffmpeg -y -hide_banner -loglevel warning -i $InputVideo -vf $vf -c:v libx264 -pix_fmt yuv420p -an -movflags +faststart $OutputVideo

Write-Host "Done. Replace assets/echo-hero-loop.mp4 with the -clean file after you preview it:"
Write-Host "  Copy-Item -Force `"$OutputVideo`" `"$InputVideo`""
