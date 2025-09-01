// 🖼️ Product V2 이미지 다운로드 스크립트 (Node.js 버전)
// product-v2-example.txt에서 추출한 실제 이미지들을 다운로드

import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 📁 다운로드할 디렉토리 설정
const DOWNLOAD_DIR = path.join(__dirname, '..', 'public', 'images', 'products');

// 🎯 추출된 주요 이미지 URL들 (전체 334개 중 핵심 이미지들)
const imageUrls = [
  // 📸 메인 제품 이미지들 (각 제품당 2개씩 - 메인/호버)
  {
    url: "https://media.tylko.com/media/gallery/furniture_image/2022/05/Living_room_08_living-room-Bookcase_EAPgDsY.jpg",
    filename: "bookcase-01-main.jpg",
    type: "main"
  },
  {
    url: "https://media.tylko.com/media/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_50.webp",
    filename: "bookcase-01-hover.webp", 
    type: "hover"
  },
  {
    url: "https://media.tylko.com/media/catalogue/catalogue_entry/2025/04/unreal_render_tasks/unreal_1300814.webp",
    filename: "bookcase-02-main.webp",
    type: "main"
  },
  {
    url: "https://media.tylko.com/media/catalogue/catalogue_entry/2025/04/unreal_render_tasks/unreal_1300813.webp",
    filename: "bookcase-02-hover.webp",
    type: "hover"
  },
  {
    url: "https://media.tylko.com/media/catalogue/catalogue_entry/2024/12/unreal_render_tasks/unreal_124420_e5NMLX0.webp",
    filename: "bookcase-03-main.webp",
    type: "main"
  },
  {
    url: "https://media.tylko.com/media/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124419_e3k3J6s.webp",
    filename: "bookcase-03-hover.webp",
    type: "hover"
  },
  
  // 🎨 색상 스와치 썸네일들 (주요 색상)
  {
    url: "https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_50_thumbnail.webp",
    filename: "swatch-white.webp",
    type: "thumbnail"
  },
  {
    url: "https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_22509_thumbnail.webp",
    filename: "swatch-grey.webp",
    type: "thumbnail"
  },
  {
    url: "https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_24177_thumbnail.webp",
    filename: "swatch-brown.webp",
    type: "thumbnail"
  },
  {
    url: "https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_16043_thumbnail.webp",
    filename: "swatch-black.webp",
    type: "thumbnail"
  },
  {
    url: "https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_29923_thumbnail.webp",
    filename: "swatch-green.webp",
    type: "thumbnail"
  }
];

// 📁 디렉토리 생성 함수
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(\`📁 디렉토리 생성: \${dirPath}\`);
  }
}

// 🔧 이미지 다운로드 함수
function downloadImage(imageData) {
  return new Promise((resolve) => {
    const { url, filename, type } = imageData;
    const filePath = path.join(DOWNLOAD_DIR, type, filename);
    
    // 타입별 하위 디렉토리 생성
    ensureDirectoryExists(path.dirname(filePath));
    
    console.log(\`📥 다운로드 시작: \${filename}\`);
    
    https.get(url, (response) => {
      // 리다이렉트 처리
      if (response.statusCode === 301 || response.statusCode === 302) {
        console.log(\`🔄 리다이렉트: \${response.headers.location}\`);
        https.get(response.headers.location, handleResponse);
        return;
      }
      
      handleResponse(response);
      
      function handleResponse(res) {
        if (res.statusCode !== 200) {
          console.error(\`❌ 실패 (\${res.statusCode}): \${filename}\`);
          resolve({ success: false, filename, error: \`HTTP \${res.statusCode}\` });
          return;
        }
        
        const fileStream = fs.createWriteStream(filePath);
        let downloadedBytes = 0;
        
        res.on('data', (chunk) => {
          downloadedBytes += chunk.length;
          fileStream.write(chunk);
        });
        
        res.on('end', () => {
          fileStream.end();
          console.log(\`✅ 완료 (\${formatBytes(downloadedBytes)}): \${filename}\`);
          resolve({ success: true, filename, size: downloadedBytes });
        });
        
        res.on('error', (error) => {
          console.error(\`❌ 스트림 에러: \${filename}\`, error);
          fileStream.destroy();
          resolve({ success: false, filename, error: error.message });
        });
      }
    }).on('error', (error) => {
      console.error(\`❌ 네트워크 에러: \${filename}\`, error);
      resolve({ success: false, filename, error: error.message });
    });
  });
}

// 📊 바이트를 사람이 읽기 쉬운 형태로 변환
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 🚀 메인 다운로드 함수
async function downloadAllImages() {
  console.log('🖼️ BEFUN Product V2 이미지 다운로드 시작');
  console.log(\`📊 총 이미지 수: \${imageUrls.length}개\`);
  console.log(\`📁 저장 경로: \${DOWNLOAD_DIR}\`);
  console.log('\\n' + '='.repeat(50) + '\\n');
  
  // 기본 디렉토리 생성
  ensureDirectoryExists(DOWNLOAD_DIR);
  ['main', 'hover', 'thumbnail'].forEach(type => {
    ensureDirectoryExists(path.join(DOWNLOAD_DIR, type));
  });
  
  const results = [];
  let successCount = 0;
  let totalBytes = 0;
  
  // 순차적 다운로드 (서버 부하 방지)
  for (let i = 0; i < imageUrls.length; i++) {
    const imageData = imageUrls[i];
    const result = await downloadImage(imageData);
    results.push(result);
    
    if (result.success) {
      successCount++;
      totalBytes += result.size || 0;
    }
    
    // 서버 부하 방지를 위한 딜레이
    if (i < imageUrls.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  
  // 📊 결과 요약
  console.log('\\n' + '='.repeat(50));
  console.log('📊 다운로드 완료 요약:');
  console.log(\`✅ 성공: \${successCount}/\${imageUrls.length}개\`);
  console.log(\`❌ 실패: \${imageUrls.length - successCount}개\`);
  console.log(\`📦 총 용량: \${formatBytes(totalBytes)}\`);
  
  // 실패한 항목들 출력
  const failed = results.filter(r => !r.success);
  if (failed.length > 0) {
    console.log('\\n❌ 실패한 이미지들:');
    failed.forEach(f => {
      console.log(\`  - \${f.filename}: \${f.error}\`);
    });
  }
  
  // 📋 다운로드 결과를 JSON으로 저장
  const reportPath = path.join(__dirname, 'download-report.json');
  const report = {
    timestamp: new Date().toISOString(),
    total: imageUrls.length,
    success: successCount,
    failed: failed.length,
    totalBytes,
    results: results
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(\`\\n📄 상세 보고서 저장: \${reportPath}\`);
}

// 🎯 스크립트 실행
if (import.meta.url === \`file://\${process.argv[1]}\`) {
  downloadAllImages().catch(error => {
    console.error('💥 스크립트 실행 중 오류:', error);
    process.exit(1);
  });
}

export { downloadImage, downloadAllImages };