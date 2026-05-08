# Build square 1080p hero loop clips for echo-globe-frame (needs ffmpeg in PATH).
# Usage: .\build-hero-loop.ps1 -InputVideo "D:\raw\echo_take1.mov"

param(
  [Parameter(Mandatory = $true)]
  [string] $InputVideo,
  [string] $OutDir = "$PSScriptRoot\..\assets",
  [int] $Size = 1080
)

$ErrorActionPreference = "Stop"
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
  Write-Error "ffmpeg not found in PATH. Install ffmpeg or use full path."
}

$vf = "scale=${Size}:${Size}:force_original_aspect_ratio=decrease,pad=${Size}:${Size}:(ow-iw)/2:(oh-ih)/2"

$mp4 = Join-Path $OutDir "echo-hero-loop.mp4"
$webm = Join-Path $OutDir "echo-hero-loop.webm"

New-Item -ItemType Directory -Force -Path $OutDir | Out-Null

Write-Host "Writing $mp4"
& ffmpeg -y -i $InputVideo -vf $vf -an -c:v libx264 -pix_fmt yuv420p -movflags +faststart $mp4

Write-Host "Writing $webm"
& ffmpeg -y -i $InputVideo -vf $vf -an -c:v libvpx-vp9 -b:v 0 -crf 32 $webm

Write-Host "Done. Set data-video-webm / data-video-mp4 in index.html to assets/echo-hero-loop.webm and .mp4"
