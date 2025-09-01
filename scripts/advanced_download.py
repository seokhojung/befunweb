#!/usr/bin/env python3
# 🖼️ 고급 이미지 다운로드 (403 우회 시도)

import requests
import os
from pathlib import Path
import time
import random

def download_image_advanced(url, filepath):
    """다양한 방법으로 403 에러 우회 시도"""
    
    # User-Agent 목록 (실제 브라우저들)
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0'
    ]
    
    methods = [
        # 방법 1: 기본 헤더
        {
            'headers': {
                'User-Agent': random.choice(user_agents),
                'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9,ko;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'image',
                'Sec-Fetch-Mode': 'no-cors',
                'Sec-Fetch-Site': 'cross-site'
            }
        },
        # 방법 2: Referer 포함
        {
            'headers': {
                'User-Agent': random.choice(user_agents),
                'Referer': 'https://tylko.com/',
                'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cache-Control': 'no-cache'
            }
        },
        # 방법 3: 쿠키 및 세션
        {
            'headers': {
                'User-Agent': random.choice(user_agents),
                'Referer': 'https://tylko.com/kr/furniture/bookcase',
                'Accept': '*/*',
                'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                'Origin': 'https://tylko.com'
            }
        }
    ]
    
    for i, method in enumerate(methods, 1):
        try:
            print(f"  🔄 방법 {i} 시도...")
            
            session = requests.Session()
            response = session.get(url, timeout=30, stream=True, **method)
            
            print(f"    📊 상태 코드: {response.status_code}")
            
            if response.status_code == 200:
                # 성공!
                os.makedirs(os.path.dirname(filepath), exist_ok=True)
                
                with open(filepath, 'wb') as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        if chunk:
                            f.write(chunk)
                
                file_size = os.path.getsize(filepath)
                print(f"  ✅ 성공: {filepath} ({file_size:,} bytes)")
                return True
                
            elif response.status_code == 403:
                print(f"    ❌ 403 Forbidden (방법 {i})")
            elif response.status_code == 404:
                print(f"    ❌ 404 Not Found")
                break  # 404면 다른 방법도 소용없음
            else:
                print(f"    ❌ {response.status_code}: {response.reason}")
                
        except requests.exceptions.RequestException as e:
            print(f"    ❌ 네트워크 오류 (방법 {i}): {e}")
        
        # 다음 방법 시도 전 잠깐 대기
        if i < len(methods):
            time.sleep(1)
    
    print(f"  💥 모든 방법 실패: {filepath}")
    return False

def try_alternative_sources():
    """대체 이미지 소스 시도"""
    print("\n🔍 대체 이미지 소스 탐색...")
    
    # Tylko의 다른 도메인들 시도
    alternative_domains = [
        'media.tylko.com',
        'cdn.tylko.com', 
        'assets.tylko.com'
    ]
    
    # 간단한 테스트 이미지
    test_urls = [
        'https://media.tylko.com/favicon.ico',
        'https://tylko.com/favicon.ico'
    ]
    
    for url in test_urls:
        try:
            response = requests.head(url, timeout=10)
            print(f"  📡 {url}: {response.status_code}")
        except Exception as e:
            print(f"  ❌ {url}: {e}")

def main():
    print("🚀 고급 이미지 다운로드 테스트")
    print("📦 제품: Bookcase in White with Doors")
    print("🛡️ 403 Forbidden 우회 시도")
    print()
    
    base_path = Path("public/images/products/v2")
    (base_path / "main").mkdir(parents=True, exist_ok=True)
    (base_path / "hover").mkdir(parents=True, exist_ok=True)
    
    images_to_download = [
        {
            'url': 'https://media.tylko.com/media/gallery/furniture_image/2022/05/Living_room_08_living-room-Bookcase_EAPgDsY.jpg',
            'path': base_path / "main" / "bookcase-white-doors-main.jpg",
            'type': '메인 이미지'
        },
        {
            'url': 'https://media.tylko.com/media/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_50.webp',
            'path': base_path / "hover" / "bookcase-white-doors-hover.webp", 
            'type': '호버 이미지'
        }
    ]
    
    success_count = 0
    
    for img in images_to_download:
        print(f"📥 {img['type']} 다운로드 시도...")
        print(f"    🌐 URL: {img['url']}")
        
        if download_image_advanced(img['url'], img['path']):
            success_count += 1
        
        time.sleep(2)  # 요청 간 딜레이
        print()
    
    print("=" * 50)
    print(f"📊 최종 결과: {success_count}/{len(images_to_download)} 성공")
    
    if success_count == 0:
        print("\n💡 대안:")
        print("1. 브라우저에서 직접 이미지 다운로드")
        print("2. 개발자 도구에서 이미지 URL 우클릭 → 새 탭에서 열기")
        print("3. Selenium 웹드라이버 사용")
        print("4. 프록시 서버 사용")
        
        try_alternative_sources()
    else:
        print(f"\n🎉 {success_count}개 이미지 다운로드 성공!")

if __name__ == "__main__":
    main()