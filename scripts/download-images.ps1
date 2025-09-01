# PowerShell 이미지 다운로드 스크립트
# Cloudflare 우회 + 폴더 구조 자동 생성

# 다운로드 함수
function Download-Image {
    param(
        [string]$url,
        [string]$outputPath
    )
    
    try {
        # 폴더 생성
        $folder = Split-Path $outputPath -Parent
        if (!(Test-Path $folder)) {
            New-Item -ItemType Directory -Path $folder -Force | Out-Null
        }
        
        # 다운로드
        $headers = @{
            "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            "Referer" = "https://tylko.com/"
            "Accept" = "image/webp,image/apng,image/*,*/*;q=0.8"
        }
        
        Write-Host "📥 다운로드 중: $outputPath" -ForegroundColor Yellow
        Invoke-WebRequest -Uri $url -OutFile $outputPath -Headers $headers -UseBasicParsing
        Write-Host "✅ 완료: $outputPath" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "❌ 실패: $outputPath - $_" -ForegroundColor Red
        return $false
    }
}

# 메인 스크립트
Write-Host "🚀 ProductV2 이미지 다운로드 시작" -ForegroundColor Cyan
Write-Host "=" * 50

$baseFolder = "downloads"
$successCount = 0
$totalCount = 0

# 제품 1: Bookcase in White with Doors
Write-Host "`n📦 제품 1: Bookcase in White with Doors" -ForegroundColor Magenta
$product1 = "bookcase-white-doors"

$totalCount++
if (Download-Image "https://media.tylko.com/media/gallery/furniture_image/2022/05/Living_room_08_living-room-Bookcase_EAPgDsY.jpg" "$baseFolder\$product1\main\$product1-main.jpg") {
    $successCount++
}
Start-Sleep -Milliseconds 500

$totalCount++
if (Download-Image "https://media.tylko.com/media/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_50.webp" "$baseFolder\$product1\hover\$product1-hover.webp") {
    $successCount++
}
Start-Sleep -Milliseconds 500

# 색상 변형들
$colors1 = @(
    @{name="white"; url="https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_50_thumbnail.webp"},
    @{name="grey"; url="https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_22509_thumbnail.webp"},
    @{name="brown"; url="https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_24177_thumbnail.webp"}
)

foreach ($color in $colors1) {
    $totalCount++
    if (Download-Image $color.url "$baseFolder\$product1\colors\$product1-$($color.name).webp") {
        $successCount++
    }
    Start-Sleep -Milliseconds 300
}

# 제품 2: Bookcase in Sand with External Drawers
Write-Host "`n📦 제품 2: Bookcase in Sand with External Drawers" -ForegroundColor Magenta
$product2 = "bookcase-sand-external-drawers"

$totalCount++
if (Download-Image "https://media.tylko.com/media/catalogue/catalogue_entry/2024/12/unreal_render_tasks/unreal_124138_JRYgGbm.webp" "$baseFolder\$product2\main\$product2-main.webp") {
    $successCount++
}
Start-Sleep -Milliseconds 500

$totalCount++
if (Download-Image "https://media.tylko.com/media/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124137_uCmcm5n.webp" "$baseFolder\$product2\hover\$product2-hover.webp") {
    $successCount++
}

# 더 많은 제품 추가...

Write-Host "`n" 
Write-Host "=" * 50
Write-Host "🎉 다운로드 완료!" -ForegroundColor Green
Write-Host "📊 성공: $successCount/$totalCount" -ForegroundColor Cyan
Write-Host "📁 저장 위치: $(Get-Location)\$baseFolder" -ForegroundColor Yellow

# 폴더 구조 표시
Write-Host "`n📂 생성된 폴더 구조:" -ForegroundColor Magenta
Get-ChildItem -Path $baseFolder -Recurse -Directory | ForEach-Object {
    $indent = "  " * ($_.FullName.Split('\').Count - (Get-Location).Path.Split('\').Count - 1)
    Write-Host "$indent📁 $($_.Name)"
}

Write-Host "`n✅ 완료! 다음 단계:" -ForegroundColor Green
Write-Host "1. downloads 폴더를 public/images/products/v2/로 복사"
Write-Host "2. src/data/migration/imageMapping.ts 업데이트"
Write-Host "3. ProductV2 컴포넌트에서 테스트"