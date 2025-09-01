#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ProductV2 전체 16개 제품 이미지 자동 분류 스크립트
다운로드된 모든 이미지를 16개 제품에 자동 매칭하여 분류
"""

import os
import shutil
import random
from pathlib import Path
import re

# 설정
SOURCE_DIR = r"C:\Users\apf_temp_admin\Desktop\Bookcases, Bookshelves - modern, large or small - Tylko_files"
TARGET_DIR = r"C:\Users\apf_temp_admin\Desktop\befunweb\public\images\products\v2"

# ProductV2 데이터의 16개 제품 정보
PRODUCTS_V2 = [
    {"id": "bookcase-001", "name": "Bookcase in White with Doors", "slug": "bookcase-white-doors"},
    {"id": "bookcase-002", "name": "Bookcase in Grey with External Drawers", "slug": "bookcase-grey-external-drawers"}, 
    {"id": "bookcase-003", "name": "Bookcase in Brown", "slug": "bookcase-brown"},
    {"id": "bookcase-004", "name": "Bookcase in Grey with Doors and Bottom Storage", "slug": "bookcase-grey-doors-storage"},
    {"id": "bookcase-005", "name": "Bookcase in Moss Green", "slug": "bookcase-moss-green"},
    {"id": "bookcase-006", "name": "Bookcase in Black", "slug": "bookcase-black"},
    {"id": "bookcase-007", "name": "Bookcase in White", "slug": "bookcase-white-large"},
    {"id": "bookcase-008", "name": "Bookcase in Light Wood Effect", "slug": "bookcase-light-wood"},
    {"id": "bookcase-009", "name": "Bookcase in Burgundy with Doors and Drawers", "slug": "bookcase-burgundy-doors-drawers"},
    {"id": "bookcase-010", "name": "Bookcase in Grey", "slug": "bookcase-grey-compact"},
    {"id": "bookcase-011", "name": "Bookcase in Light Wood Effect with External Drawers", "slug": "bookcase-light-wood-drawers"},
    {"id": "bookcase-012", "name": "Bookcase in Green", "slug": "bookcase-green-xl"},
    {"id": "bookcase-013", "name": "Bookcase in White with External Drawers", "slug": "bookcase-white-external-drawers"},
    {"id": "bookcase-014", "name": "Bookcase in Moss Green with Doors", "slug": "bookcase-moss-green-doors"},
    {"id": "bookcase-015", "name": "Bookcase in Premium Black with Doors and Drawers", "slug": "bookcase-premium-black"},
    {"id": "bookcase-034", "name": "Bookcase in Beige with Drawers and Backpanels", "slug": "bookcase-beige-drawers-backpanels"}
]

# 색상 매칭 정보
COLORS = ["white", "grey", "brown", "black", "green", "blue", "red", "beige", "sand", "moss-green", "light-wood", "dark-wood", "pink", "yellow", "sage", "burgundy", "cream", "light-grey", "dark-grey"]

def get_all_images():
    """다운로드 폴더에서 모든 이미지 파일 수집"""
    print("🖼️ 다운로드된 이미지 파일 수집 중...")
    
    source_path = Path(SOURCE_DIR)
    if not source_path.exists():
        print(f"❌ 소스 폴더가 존재하지 않습니다: {SOURCE_DIR}")
        return [], [], []
    
    # 파일 분류
    main_images = []  # jpg 파일들 (메인 이미지용)
    hover_images = []  # webp 파일들 중 thumbnail이 아닌 것 (호버 이미지용)
    color_images = []  # thumbnail.webp 파일들 (색상 변형용)
    
    for file in source_path.glob("*"):
        if file.is_file() and file.suffix.lower() in ['.jpg', '.webp']:
            filename = file.name.lower()
            
            if file.suffix.lower() == '.jpg':
                # JPG는 메인 이미지로 분류
                if not any(skip in filename for skip in ['icon', 'logo', 'banner']):
                    main_images.append(file)
            elif file.suffix.lower() == '.webp':
                if 'thumbnail' in filename:
                    # thumbnail.webp는 색상 변형으로 분류
                    color_images.append(file)
                else:
                    # 일반 webp는 호버 이미지로 분류
                    if not any(skip in filename for skip in ['icon', 'logo', 'banner']):
                        hover_images.append(file)
    
    print(f"  📸 메인 이미지 (JPG): {len(main_images)}개")
    print(f"  🎯 호버 이미지 (WebP): {len(hover_images)}개") 
    print(f"  🎨 색상 변형 (Thumbnail): {len(color_images)}개")
    
    return main_images, hover_images, color_images

def create_all_folders():
    """16개 제품 모두에 대한 폴더 구조 생성"""
    print("📁 전체 제품 폴더 구조 생성 중...")
    
    for product in PRODUCTS_V2:
        product_path = Path(TARGET_DIR) / product["slug"]
        
        # 폴더 생성
        (product_path / "main").mkdir(parents=True, exist_ok=True)
        (product_path / "hover").mkdir(parents=True, exist_ok=True)
        (product_path / "colors").mkdir(parents=True, exist_ok=True)
        
        print(f"  ✅ {product['slug']} 폴더 생성")

def distribute_images():
    """이미지를 16개 제품에 균등하게 배분"""
    print("🎯 이미지를 16개 제품에 배분 중...")
    
    main_images, hover_images, color_images = get_all_images()
    
    if not main_images and not hover_images and not color_images:
        print("❌ 사용 가능한 이미지가 없습니다!")
        return 0, 0
    
    copied_count = 0
    
    # 특별히 매칭되는 이미지들 먼저 처리
    special_mappings = {
        "bookcase-001": {  # Bookcase in White with Doors
            "main_pattern": "Living_room_08_living-room-Bookcase",
            "hover_pattern": "unreal_50.webp",
            "color_patterns": ["unreal_50_thumbnail", "unreal_22509_thumbnail", "unreal_24177_thumbnail"]
        },
        "bookcase-002": {  # Bookcase in Grey with External Drawers  
            "main_pattern": "unreal_124138_JRYgGbm",
            "hover_pattern": "unreal_124137_uCmcm5n",
            "color_patterns": ["unreal_124137_uCmcm5n_thumbnail", "unreal_124119_NNu2bN7_thumbnail"]
        }
    }
    
    used_images = set()
    
    # 특별 매칭 먼저 처리
    for product in PRODUCTS_V2:
        product_path = Path(TARGET_DIR) / product["slug"]
        print(f"\n📦 {product['name']} 처리 중...")
        
        if product["slug"] in special_mappings:
            mapping = special_mappings[product["slug"]]
            
            # 메인 이미지 특별 매칭
            main_file = None
            for img in main_images + hover_images:  # JPG와 WebP 모두에서 찾기
                if mapping["main_pattern"] in img.name and img not in used_images:
                    main_file = img
                    break
            
            if main_file:
                ext = main_file.suffix.lower()
                dest = product_path / "main" / f"{product['slug']}-main{ext}"
                shutil.copy2(main_file, dest)
                used_images.add(main_file)
                print(f"  📸 메인 이미지: {main_file.name} → {dest.name}")
                copied_count += 1
            
            # 호버 이미지 특별 매칭
            hover_file = None
            for img in hover_images:
                if mapping["hover_pattern"] in img.name and img not in used_images:
                    hover_file = img
                    break
            
            if hover_file:
                dest = product_path / "hover" / f"{product['slug']}-hover.webp"
                shutil.copy2(hover_file, dest)
                used_images.add(hover_file)
                print(f"  🎯 호버 이미지: {hover_file.name} → {dest.name}")
                copied_count += 1
            
            # 색상 변형 특별 매칭
            color_count = 0
            for pattern in mapping.get("color_patterns", []):
                color_file = None
                for img in color_images:
                    if pattern in img.name and img not in used_images:
                        color_file = img
                        break
                
                if color_file:
                    color_name = COLORS[color_count % len(COLORS)]
                    dest = product_path / "colors" / f"{product['slug']}-{color_name}.webp"
                    shutil.copy2(color_file, dest)
                    used_images.add(color_file)
                    print(f"    🎨 {color_name}: {color_file.name} → {dest.name}")
                    copied_count += 1
                    color_count += 1
    
    # 나머지 제품들에 남은 이미지 배분
    remaining_main = [img for img in main_images if img not in used_images]
    remaining_hover = [img for img in hover_images if img not in used_images]  
    remaining_colors = [img for img in color_images if img not in used_images]
    
    # 랜덤 셔플로 균등 배분
    random.shuffle(remaining_main)
    random.shuffle(remaining_hover)
    random.shuffle(remaining_colors)
    
    main_idx = 0
    hover_idx = 0
    color_idx = 0
    
    for product in PRODUCTS_V2:
        if product["slug"] in special_mappings:
            continue  # 이미 처리됨
            
        product_path = Path(TARGET_DIR) / product["slug"]
        print(f"\n📦 {product['name']} 처리 중...")
        
        # 메인 이미지 배분
        if main_idx < len(remaining_main):
            main_file = remaining_main[main_idx]
            ext = main_file.suffix.lower()
            dest = product_path / "main" / f"{product['slug']}-main{ext}"
            shutil.copy2(main_file, dest)
            print(f"  📸 메인 이미지: {main_file.name} → {dest.name}")
            copied_count += 1
            main_idx += 1
        
        # 호버 이미지 배분
        if hover_idx < len(remaining_hover):
            hover_file = remaining_hover[hover_idx]
            dest = product_path / "hover" / f"{product['slug']}-hover.webp"
            shutil.copy2(hover_file, dest)
            print(f"  🎯 호버 이미지: {hover_file.name} → {dest.name}")
            copied_count += 1
            hover_idx += 1
        
        # 색상 변형 배분 (제품당 5-8개)
        colors_per_product = min(8, (len(remaining_colors) - color_idx) // max(1, (len(PRODUCTS_V2) - len(special_mappings))))
        colors_per_product = max(5, colors_per_product)  # 최소 5개
        
        print(f"  🎨 색상 변형들:")
        for i in range(min(colors_per_product, len(remaining_colors) - color_idx)):
            color_file = remaining_colors[color_idx + i]
            color_name = COLORS[i % len(COLORS)]
            dest = product_path / "colors" / f"{product['slug']}-{color_name}.webp"
            shutil.copy2(color_file, dest)
            print(f"    ✅ {color_name}: {color_file.name} → {dest.name}")
            copied_count += 1
        
        color_idx += colors_per_product
    
    return copied_count, len(main_images) + len(hover_images) + len(color_images)

def generate_full_report():
    """전체 분류 결과 리포트 생성"""
    print("\n📊 전체 분류 결과 리포트:")
    print("=" * 80)
    
    target_path = Path(TARGET_DIR)
    total_files = 0
    
    for product in PRODUCTS_V2:
        product_path = target_path / product["slug"]
        print(f"\n📦 {product['name']} ({product['slug']}):")
        
        # 각 폴더별 파일 개수 
        main_files = list((product_path / "main").glob("*"))
        hover_files = list((product_path / "hover").glob("*"))
        color_files = list((product_path / "colors").glob("*"))
        
        product_total = len(main_files) + len(hover_files) + len(color_files)
        total_files += product_total
        
        print(f"  📸 메인: {len(main_files)}개")
        print(f"  🎯 호버: {len(hover_files)}개") 
        print(f"  🎨 색상: {len(color_files)}개")
        print(f"  📊 합계: {product_total}개")
    
    print(f"\n🎉 전체 정리 완료!")
    print(f"📊 총 {len(PRODUCTS_V2)}개 제품, {total_files}개 이미지 파일")
    
    return total_files

def main():
    """메인 실행 함수"""
    print("🚀 ProductV2 전체 16개 제품 이미지 자동 분류 시작!")
    print("=" * 80)
    
    print(f"📂 소스 폴더: {SOURCE_DIR}")
    print(f"📂 타겟 폴더: {TARGET_DIR}")
    print(f"📦 제품 개수: {len(PRODUCTS_V2)}개")
    
    # 소스 폴더 확인
    if not Path(SOURCE_DIR).exists():
        print(f"❌ 오류: 소스 폴더가 존재하지 않습니다: {SOURCE_DIR}")
        return
    
    try:
        # 1. 전체 폴더 구조 생성
        create_all_folders()
        
        # 2. 이미지 분류 및 배분
        copied, total_available = distribute_images()
        
        # 3. 결과 리포트
        total_organized = generate_full_report()
        
        # 4. 최종 요약
        print("\n" + "=" * 80)
        print("🎉 16개 제품 이미지 분류 완료!")
        print(f"✅ 사용된 이미지: {copied}개")
        print(f"📁 총 정리된 파일: {total_organized}개")
        print(f"📦 처리된 제품: {len(PRODUCTS_V2)}개")
        
        # 5. 다음 단계 안내
        print("\n🎯 다음 단계:")
        print("1. productsV2.ts 파일의 이미지 경로 업데이트")
        print("2. 개발 서버 실행하여 이미지 로딩 테스트")
        print("3. ProductV2 컴포넌트에서 이미지 표시 확인")
        print(f"4. 생성된 폴더 확인: {TARGET_DIR}")
        
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()