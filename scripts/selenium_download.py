#!/usr/bin/env python3
# Selenium을 사용한 우회 다운로드

import time
import os
from pathlib import Path
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

def setup_browser():
    """브라우저 설정"""
    chrome_options = Options()
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    chrome_options.add_argument('--disable-blink-features=AutomationControlled')
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('useAutomationExtension', False)
    
    driver = webdriver.Chrome(options=chrome_options)
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    return driver

def download_with_selenium():
    """Selenium으로 우회 다운로드"""
    print("🤖 Selenium 브라우저 시작...")
    
    try:
        driver = setup_browser()
        
        # Tylko.com 페이지 먼저 방문 (쿠키/세션 설정)
        print("🌐 Tylko.com 방문 중...")
        driver.get("https://tylko.com")
        time.sleep(3)
        
        # 이미지 URL로 직접 이동
        test_url = "https://media.tylko.com/media/catalogue/catalogue_entry/2024/02/unreal_render_tasks/unreal_50.webp"
        print(f"📷 이미지 URL 접근: {test_url}")
        driver.get(test_url)
        time.sleep(2)
        
        # 페이지 소스 확인
        if "Just a moment" in driver.page_source:
            print("⏳ Cloudflare 챌린지 대기 중...")
            time.sleep(10)
        
        # 쿠키 가져오기
        cookies = driver.get_cookies()
        session = requests.Session()
        for cookie in cookies:
            session.cookies.set(cookie['name'], cookie['value'])
        
        # 세션으로 다운로드 시도
        headers = {
            'User-Agent': driver.execute_script("return navigator.userAgent;"),
            'Referer': 'https://tylko.com/'
        }
        
        print("📥 세션으로 다운로드 시도...")
        response = session.get(test_url, headers=headers)
        print(f"응답 상태: {response.status_code}")
        
        if response.status_code == 200:
            downloads_path = Path("downloads/test")
            downloads_path.mkdir(parents=True, exist_ok=True)
            
            filepath = downloads_path / "selenium-test.webp"
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            print(f"✅ 성공! {filepath} ({len(response.content)} bytes)")
        else:
            print(f"❌ 여전히 실패: {response.status_code}")
            
        driver.quit()
        
    except Exception as e:
        print(f"❌ 오류: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    download_with_selenium()