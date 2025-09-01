#!/usr/bin/env python3
# 테스트용 간단 다운로드 스크립트

import requests
import os
from pathlib import Path

def test_download():
    print("🧪 다운로드 테스트 시작...")
    
    # 테스트 URL (단순한 이미지)
    test_url = "https://media.tylko.com/media/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_50.webp"
    
    try:
        print(f"📥 테스트 다운로드: {test_url}")
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://tylko.com/'
        }
        
        response = requests.get(test_url, headers=headers, timeout=30)
        print(f"응답 상태: {response.status_code}")
        print(f"응답 헤더: {dict(response.headers)}")
        
        if response.status_code == 200:
            # downloads 폴더 생성
            downloads_path = Path("downloads/test")
            downloads_path.mkdir(parents=True, exist_ok=True)
            
            # 파일 저장
            filepath = downloads_path / "test-image.webp"
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            print(f"✅ 성공! 저장됨: {filepath}")
            print(f"파일 크기: {filepath.stat().st_size} bytes")
        else:
            print(f"❌ 실패: HTTP {response.status_code}")
            print(f"응답 내용: {response.text[:200]}")
            
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    test_download()