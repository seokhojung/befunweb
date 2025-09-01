#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
올바른 제품-이미지 매핑으로 재분류하는 스크립트
HTML에서 추출한 정확한 매핑 정보 기반
"""

import os
import shutil
from pathlib import Path
import re

# 설정
SOURCE_DIR = r"C:\Users\apf_temp_admin\Desktop\Bookcases, Bookshelves - modern, large or small - Tylko_files"
TARGET_DIR = r"C:\Users\apf_temp_admin\Desktop\befunweb\public\images\products\v2"

# HTML에서 추출한 정확한 제품-이미지 매핑 정보
CORRECT_MAPPINGS = {
    "bookcase-white-doors": {
        "name": "Bookcase in White with Doors",
        "main_image": "Living_room_08_living-room-Bookcase_EAPgDsY.jpg",
        "hover_image": "unreal_50.webp",
        "color_thumbnails": [
            "unreal_50_thumbnail.webp",      # white (기본)
            "unreal_22509_thumbnail.webp",   # grey
            "unreal_24177_thumbnail.webp",   # brown
            "unreal_16043_thumbnail.webp",   # black
            "unreal_29923_thumbnail.webp",   # green
            "unreal_29922_thumbnail.webp",   # blue
            "unreal_29921_thumbnail.webp",   # red
            "unreal_15643_thumbnail.webp",   # light-wood
        ]
    },
    
    "bookcase-grey-external-drawers": {  # 원래는 sand였지만 우리 데이터에서는 grey-external-drawers
        "name": "Bookcase in Sand with External Drawers", 
        "main_image": "unreal_124138_JRYgGbm.webp",
        "hover_image": "unreal_124137_uCmcm5n.webp",
        "color_thumbnails": [
            "unreal_124137_uCmcm5n_thumbnail.webp",  # sand (기본)
            "unreal_124119_NNu2bN7_thumbnail.webp",  # grey
            "unreal_1300813_thumbnail.webp",         # white
            "unreal_124127_YH5cTHJ_thumbnail.webp",  # dark-grey
            "unreal_124129_ToHz64F_thumbnail.webp",  # light-grey
            "unreal_124133_shhCPyL_thumbnail.webp",  # beige
            "unreal_124135_4EsNmkR_thumbnail.webp",  # brown
            "unreal_124139_kCwgUax_thumbnail.webp",  # cream
        ]
    },

    "bookcase-brown": {
        "name": "Bookcase in Brown",
        "main_image": "unreal_124420_e5NMLX0.webp", 
        "hover_image": "unreal_124419_e3k3J6s.webp",
        "color_thumbnails": [
            "unreal_124419_e3k3J6s_thumbnail.webp",  # brown (기본)
            # 나머지는 소스에서 찾아서 추가
        ]
    }
}

COLORS = ["white", "grey", "brown", "black", "green", "blue", "red", "beige"]

def clear_existing_images():
    """기존 이미지들 정리"""
    print("🧹 기존 이미지 파일들 정리 중...")
    
    target_path = Path(TARGET_DIR)
    for product_folder in target_path.glob("*"):
        if product_folder.is_dir():
            for subfolder in ["main", "hover", "colors"]:
                subfolder_path = product_folder / subfolder
                if subfolder_path.exists():
                    for file in subfolder_path.glob("*"):
                        if file.is_file():
                            file.unlink()
                            print(f"  🗑️ 삭제: {file}")

def copy_correct_images():
    """정확한 매핑으로 이미지 복사"""
    print("📸 올바른 이미지 매핑으로 복사 중...")
    
    source_path = Path(SOURCE_DIR)
    copied_count = 0
    missing_count = 0
    
    for product_slug, mapping in CORRECT_MAPPINGS.items():
        print(f"\n📦 {mapping['name']} ({product_slug}) 처리 중...")
        product_path = Path(TARGET_DIR) / product_slug
        
        # 메인 이미지 복사
        main_src = source_path / mapping['main_image']
        if main_src.exists():
            # 확장자 유지
            ext = main_src.suffix.lower()
            main_dst = product_path / "main" / f"{product_slug}-main{ext}"
            shutil.copy2(main_src, main_dst)
            print(f"  📸 메인: {mapping['main_image']} → {main_dst.name}")
            copied_count += 1
        else:
            print(f"  ❌ 메인 이미지 없음: {mapping['main_image']}")
            missing_count += 1
        
        # 호버 이미지 복사
        hover_src = source_path / mapping['hover_image']
        if hover_src.exists():
            hover_dst = product_path / "hover" / f"{product_slug}-hover.webp"
            shutil.copy2(hover_src, hover_dst)
            print(f"  🎯 호버: {mapping['hover_image']} → {hover_dst.name}")
            copied_count += 1
        else:
            print(f"  ❌ 호버 이미지 없음: {mapping['hover_image']}")
            missing_count += 1
        
        # 색상 섬네일들 복사
        print(f"  🎨 색상 변형들:")
        for i, thumbnail in enumerate(mapping['color_thumbnails']):
            color_src = source_path / thumbnail
            if color_src.exists():
                color_name = COLORS[i % len(COLORS)]
                color_dst = product_path / "colors" / f"{product_slug}-{color_name}.webp"
                shutil.copy2(color_src, color_dst)
                print(f"    ✅ {color_name}: {thumbnail} → {color_dst.name}")
                copied_count += 1
            else:
                print(f"    ❌ {thumbnail} (파일 없음)")
                missing_count += 1
    
    return copied_count, missing_count

def main():
    """메인 실행 함수"""
    print("🚀 올바른 이미지 매핑으로 재분류 시작!")
    print("=" * 60)
    
    print(f"📂 소스 폴더: {SOURCE_DIR}")
    print(f"📂 타겟 폴더: {TARGET_DIR}")
    
    # 소스 폴더 확인
    if not Path(SOURCE_DIR).exists():
        print(f"❌ 오류: 소스 폴더가 존재하지 않습니다: {SOURCE_DIR}")
        return
    
    try:
        # 1. 기존 이미지 정리
        clear_existing_images()
        
        # 2. 올바른 이미지 복사
        copied, missing = copy_correct_images()
        
        # 3. 결과 요약
        print("\n" + "=" * 60)
        print("🎉 올바른 이미지 매핑 완료!")
        print(f"✅ 복사된 파일: {copied}개")
        print(f"❌ 누락된 파일: {missing}개")
        
        print("\n🎯 다음 단계:")
        print("1. 나머지 제품들의 HTML 매핑 정보 추가")
        print("2. 개발 서버에서 이미지 확인")
        print("3. 제품-이미지 매칭 정확성 검증")
        
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()