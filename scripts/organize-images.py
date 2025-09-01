#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ProductV2 이미지 자동 분류 스크립트
브라우저가 다운로드한 이미지들을 제품별 폴더 구조로 정리
"""

import os
import shutil
from pathlib import Path
import re

# 설정
SOURCE_DIR = r"C:\Users\apf_temp_admin\Desktop\Bookcases, Bookshelves - modern, large or small - Tylko_files"
TARGET_DIR = r"C:\Users\apf_temp_admin\Desktop\befunweb\public\images\products\v2"

# HTML에서 추출한 제품-이미지 매핑 정보
PRODUCT_MAPPINGS = {
    # 제품 1: Bookcase in White with Doors
    "bookcase-white-doors": {
        "name": "Bookcase in White with Doors",
        "main_image": "Living_room_08_living-room-Bookcase_EAPgDsY.jpg",
        "hover_image": "unreal_50.webp", 
        "colors": [
            {"name": "white", "file": "unreal_50_thumbnail.webp"},
            {"name": "grey", "file": "unreal_22509_thumbnail.webp"},
            {"name": "brown", "file": "unreal_24177_thumbnail.webp"},
            {"name": "black", "file": "unreal_16043_thumbnail.webp"},
            {"name": "green", "file": "unreal_29923_thumbnail.webp"},
            {"name": "blue", "file": "unreal_29922_thumbnail.webp"},
            {"name": "red", "file": "unreal_29921_thumbnail.webp"},
            {"name": "light-wood", "file": "unreal_15643_thumbnail.webp"},
            {"name": "beige", "file": "unreal_29920_thumbnail.webp"},
            {"name": "pink", "file": "unreal_7935_thumbnail.webp"},
            {"name": "yellow", "file": "unreal_7934_thumbnail.webp"},
            {"name": "dark-wood", "file": "unreal_7933_thumbnail.webp"},
            {"name": "sage", "file": "unreal_2176944_thumbnail.webp"}
        ]
    },
    
    # 제품 2: Bookcase in Sand with External Drawers  
    "bookcase-sand-external-drawers": {
        "name": "Bookcase in Sand with External Drawers",
        "main_image": "unreal_124138_JRYgGbm.webp",
        "hover_image": "unreal_124137_uCmcm5n.webp",
        "colors": [
            {"name": "sand", "file": "unreal_124137_uCmcm5n_thumbnail.webp"},
            {"name": "grey", "file": "unreal_124119_NNu2bN7_thumbnail.webp"},
            {"name": "white", "file": "unreal_1300813_thumbnail.webp"},
            {"name": "dark-grey", "file": "unreal_124127_YH5cTHJ_thumbnail.webp"},
            {"name": "light-grey", "file": "unreal_124129_ToHz64F_thumbnail.webp"},
            {"name": "beige", "file": "unreal_124133_shhCPyL_thumbnail.webp"},
            {"name": "brown", "file": "unreal_124135_4EsNmkR_thumbnail.webp"},
            {"name": "cream", "file": "unreal_124139_kCwgUax_thumbnail.webp"}
        ]
    }
}

def create_folder_structure():
    """타겟 폴더 구조 생성"""
    print("📁 폴더 구조 생성 중...")
    
    for product_id in PRODUCT_MAPPINGS:
        product_path = Path(TARGET_DIR) / product_id
        
        # 폴더 생성
        (product_path / "main").mkdir(parents=True, exist_ok=True)
        (product_path / "hover").mkdir(parents=True, exist_ok=True)
        (product_path / "colors").mkdir(parents=True, exist_ok=True)
        
        print(f"  ✅ {product_id} 폴더 생성")

def copy_images():
    """이미지 파일들을 적절한 폴더로 복사"""
    print("🖼️ 이미지 파일 복사 중...")
    
    source_path = Path(SOURCE_DIR)
    copied_count = 0
    missing_count = 0
    
    for product_id, product_info in PRODUCT_MAPPINGS.items():
        print(f"\n📦 {product_info['name']} 처리 중...")
        product_path = Path(TARGET_DIR) / product_id
        
        # 메인 이미지 복사
        main_src = source_path / product_info['main_image']
        if main_src.exists():
            main_dst = product_path / "main" / f"{product_id}-main.jpg"
            shutil.copy2(main_src, main_dst)
            print(f"  📸 메인 이미지: {product_info['main_image']} → {main_dst.name}")
            copied_count += 1
        else:
            print(f"  ❌ 메인 이미지 없음: {product_info['main_image']}")
            missing_count += 1
        
        # 호버 이미지 복사  
        hover_src = source_path / product_info['hover_image']
        if hover_src.exists():
            hover_dst = product_path / "hover" / f"{product_id}-hover.webp"
            shutil.copy2(hover_src, hover_dst)
            print(f"  🎯 호버 이미지: {product_info['hover_image']} → {hover_dst.name}")
            copied_count += 1
        else:
            print(f"  ❌ 호버 이미지 없음: {product_info['hover_image']}")
            missing_count += 1
        
        # 색상 변형 이미지들 복사
        print(f"  🎨 색상 변형들:")
        for color in product_info['colors']:
            color_src = source_path / color['file']
            if color_src.exists():
                color_dst = product_path / "colors" / f"{product_id}-{color['name']}.webp"
                shutil.copy2(color_src, color_dst)
                print(f"    ✅ {color['name']}: {color['file']} → {color_dst.name}")
                copied_count += 1
            else:
                print(f"    ❌ {color['name']}: {color['file']} (파일 없음)")
                missing_count += 1
    
    return copied_count, missing_count

def generate_usage_report():
    """사용 현황 리포트 생성"""
    print("\n📊 사용 현황 리포트:")
    
    target_path = Path(TARGET_DIR)
    
    for product_id, product_info in PRODUCT_MAPPINGS.items():
        print(f"\n📦 {product_info['name']} ({product_id}):")
        product_path = target_path / product_id
        
        # 메인 이미지
        main_files = list((product_path / "main").glob("*"))
        print(f"  📸 메인: {len(main_files)}개")
        
        # 호버 이미지
        hover_files = list((product_path / "hover").glob("*"))
        print(f"  🎯 호버: {len(hover_files)}개")
        
        # 색상 변형
        color_files = list((product_path / "colors").glob("*"))
        print(f"  🎨 색상: {len(color_files)}개")
        
        # 파일 목록
        for folder, files in [("main", main_files), ("hover", hover_files), ("colors", color_files)]:
            if files:
                for file in files:
                    print(f"    - {folder}/{file.name}")

def main():
    """메인 실행 함수"""
    print("🚀 ProductV2 이미지 자동 분류 시작!")
    print("=" * 60)
    
    print(f"📂 소스 폴더: {SOURCE_DIR}")
    print(f"📂 타겟 폴더: {TARGET_DIR}")
    print(f"📦 제품 개수: {len(PRODUCT_MAPPINGS)}개")
    
    # 소스 폴더 확인
    if not Path(SOURCE_DIR).exists():
        print(f"❌ 오류: 소스 폴더가 존재하지 않습니다: {SOURCE_DIR}")
        return
    
    try:
        # 1. 폴더 구조 생성
        create_folder_structure()
        
        # 2. 이미지 복사
        copied, missing = copy_images()
        
        # 3. 결과 요약
        print("\n" + "=" * 60)
        print("🎉 이미지 분류 완료!")
        print(f"✅ 복사된 파일: {copied}개")
        print(f"❌ 누락된 파일: {missing}개")
        
        # 4. 사용 현황 리포트
        generate_usage_report()
        
        # 5. 다음 단계 안내
        print("\n🎯 다음 단계:")
        print("1. src/data/migration/imageMapping.ts 파일 업데이트")
        print("2. ProductV2 컴포넌트에서 이미지 경로 확인")
        print("3. 개발 서버에서 이미지 로딩 테스트")
        print(f"4. 생성된 폴더 확인: {TARGET_DIR}")
        
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()