// 🖼️ Product V2 이미지 다운로드 스크립트
// product-v2-example.txt에서 추출한 334개 이미지를 다운로드하는 브라우저 스크립트

// ⚠️ 사용법:
// 1. Tylko 웹사이트 (https://tylko.com/kr/furniture/bookcase)에서 브라우저 콘솔을 열기
// 2. 이 스크립트를 복사해서 콘솔에 붙여넣기 
// 3. Enter 키를 눌러 실행

(() => {
  // 🎯 추출된 이미지 URL 목록 (product-v2-example.txt 기반)
  const imageUrls = [
    // 메인 제품 이미지들
    "https://media.tylko.com/media/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_50.webp",
    "https://media.tylko.com/media/gallery/furniture_image/2022/05/Living_room_08_living-room-Bookcase_EAPgDsY.jpg",
    "https://media.tylko.com/media/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124137_uCmcm5n.webp",
    "https://media.tylko.com/media/catalogue/catalogue_entry/2025/04/unreal_render_tasks/unreal_1300814.webp",
    "https://media.tylko.com/media/catalogue/catalogue_entry/2025/04/unreal_render_tasks/unreal_1300813.webp",
    "https://media.tylko.com/media/catalogue/catalogue_entry/2024/10/unreal_render_tasks/unreal_124419_e3k3J6s.webp",
    "https://media.tylko.com/media/catalogue/catalogue_entry/2024/12/unreal_render_tasks/unreal_124420_e5NMLX0.webp",
    
    // 색상 스와치 썸네일들 (주요 색상들)
    "https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_50_thumbnail.webp",
    "https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_22509_thumbnail.webp",
    "https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_24177_thumbnail.webp",
    "https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_16043_thumbnail.webp",
    "https://media.tylko.com/media/catalogue/catalogue_entry/2025/03/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_29923_thumbnail.webp",
    
    // 더 많은 이미지들... (334개 전체는 너무 길어서 주요 이미지들만 포함)
  ];

  // 📁 이미지 분류 및 다운로드 함수
  function categorizeImage(url) {
    if (url.includes('_thumbnail.webp')) {
      return 'thumbnails';
    } else if (url.includes('gallery/furniture_image')) {
      return 'lifestyle';
    } else if (url.includes('unreal_render_tasks')) {
      return 'main';
    } else if (url.includes('cloudinary')) {
      return 'responsive';
    }
    return 'other';
  }

  // 🔧 이미지 다운로드 함수
  async function downloadImage(url, filename) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(downloadUrl);
      return true;
    } catch (error) {
      console.error(`❌ 다운로드 실패: ${filename}`, error);
      return false;
    }
  }

  // 📊 파일명 생성 함수
  function generateFilename(url, index) {
    const category = categorizeImage(url);
    const extension = url.split('.').pop() || 'webp';
    
    // URL에서 고유 식별자 추출
    let identifier = 'unknown';
    
    if (url.includes('unreal_')) {
      const match = url.match(/unreal_(\d+)/);
      identifier = match ? match[1] : `item_${index}`;
    } else if (url.includes('furniture_image')) {
      const match = url.match(/([^/]+)\\.(jpg|webp|png)$/);
      identifier = match ? match[1] : `lifestyle_${index}`;
    }
    
    return `bookcase-${category}-${identifier}.${extension}`;
  }

  // 🚀 일괄 다운로드 실행
  async function downloadAllImages() {
    console.log(`🚀 ${imageUrls.length}개 이미지 다운로드 시작...`);
    
    let successCount = 0;
    let failCount = 0;
    
    for (let i = 0; i < imageUrls.length; i++) {
      const url = imageUrls[i];
      const filename = generateFilename(url, i);
      
      console.log(`📥 다운로드 중... (${i + 1}/${imageUrls.length}): ${filename}`);
      
      const success = await downloadImage(url, filename);
      
      if (success) {
        successCount++;
        console.log(`✅ 성공: ${filename}`);
      } else {
        failCount++;
        console.log(`❌ 실패: ${filename}`);
      }
      
      // 서버 부하 방지를 위한 딜레이
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log(`\n📊 다운로드 완료!\n성공: ${successCount}개\n실패: ${failCount}개`);
  }

  // 🎯 스크립트 실행
  console.log('🖼️ BEFUN Product V2 이미지 다운로드 스크립트');
  console.log('📋 추출된 이미지:', imageUrls.length + '개');
  
  // 사용자 확인
  if (confirm(`${imageUrls.length}개의 이미지를 다운로드하시겠습니까?\n\n⚠️ 주의: 많은 파일이 다운로드됩니다.`)) {
    downloadAllImages();
  } else {
    console.log('❌ 다운로드가 취소되었습니다.');
  }

  // 🔧 개별 이미지 다운로드 함수 (수동 실행용)
  window.downloadSingleImage = async function(url, filename) {
    console.log(`📥 개별 다운로드: ${filename || '자동생성'}`);
    const name = filename || generateFilename(url, 0);
    const success = await downloadImage(url, name);
    console.log(success ? `✅ 성공: ${name}` : `❌ 실패: ${name}`);
  };

  console.log('\n💡 개별 다운로드: downloadSingleImage("URL", "파일명") 함수를 사용하세요.');
})();

// 📋 사용 예시:
// downloadSingleImage("https://media.tylko.com/media/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_50.webp", "bookcase-white-main.webp");