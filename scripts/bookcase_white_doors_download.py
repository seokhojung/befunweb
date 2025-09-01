#!/usr/bin/env python3
# 🖼️ Bookcase in White with Doors 이미지 다운로드 테스트

import requests
import os
from pathlib import Path
import time

def download_image(url, filepath):
    try:
        print(f"📥 다운로드 시작: {filepath}")
        
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Referer': 'https://tylko.com/'
        }
        
        response = requests.get(url, headers=headers, stream=True, timeout=30)
        response.raise_for_status()
        
        # 디렉토리 생성
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
        
        file_size = os.path.getsize(filepath)
        print(f"✅ 완료: {filepath} ({file_size:,} bytes)")
        return True
        
    except Exception as e:
        print(f"❌ 실패 {filepath}: {e}")
        return False

def main():
    print("🚀 ProductV2 이미지 다운로드 테스트")
    print("📦 제품: Bookcase in White with Doors")
    print()
    
    # 기본 경로 설정
    base_path = Path("public/images/products/v2")
    
    # 디렉토리 생성
    (base_path / "main").mkdir(parents=True, exist_ok=True)
    (base_path / "hover").mkdir(parents=True, exist_ok=True)
    
    success_count = 0
    total_count = 2
    
    # 메인 이미지 (Instagram 이미지)
    main_url = "https://media.tylko.com/media/gallery/furniture_image/2022/05/Living_room_08_living-room-Bookcase_EAPgDsY.jpg"
    main_path = base_path / "main" / "bookcase-white-doors-main.jpg"
    
    if download_image(main_url, main_path):
        success_count += 1
    time.sleep(1)  # 서버 부하 방지
    
    # 호버 이미지 (제품 이미지)
    hover_url = "https://media.tylko.com/media/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_50.webp"
    hover_path = base_path / "hover" / "bookcase-white-doors-hover.webp"
    
    if download_image(hover_url, hover_path):
        success_count += 1
    
    print()
    print("📊 다운로드 완료!")
    print(f"✅ 성공: {success_count}/{total_count}")
    print(f"❌ 실패: {total_count - success_count}")
    
    if success_count > 0:
        print()
        print("🎯 다운로드된 파일:")
        if main_path.exists():
            print(f"  📁 {main_path}")
        if hover_path.exists():
            print(f"  📁 {hover_path}")
        
        print()
        print("🔄 다음 단계:")
        print("1. 파일이 올바르게 다운로드되었는지 확인")
        print("2. 이미지 뷰어로 파일 열어보기")
        print("3. ProductV2 컴포넌트에서 테스트")

if __name__ == "__main__":
    main()