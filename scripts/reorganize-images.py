#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
추출된 매핑 정보를 바탕으로 이미지를 단순화된 폴더 구조로 재배치
/images/products/v2/main/, /images/products/v2/hover/, /images/products/v2/colors/
"""

import json
import shutil
from pathlib import Path

# 경로 설정
MAPPING_JSON = r"C:\Users\apf_temp_admin\Desktop\befunweb\extracted-mappings.json"
SOURCE_DIR = r"C:\Users\apf_temp_admin\Desktop\Bookcases, Bookshelves - modern, large or small - Tylko_files"
TARGET_DIR = r"C:\Users\apf_temp_admin\Desktop\befunweb\public\images\products\v2"

def create_simplified_structure():
    """단순화된 폴더 구조 생성"""
    print("📁 단순화된 폴더 구조 생성 중...")
    
    target_path = Path(TARGET_DIR)
    
    # 기존 제품별 폴더들 삭제
    for folder in target_path.glob("bookcase-*"):
        if folder.is_dir():
            print(f"  🗑️ 삭제: {folder.name}")
            shutil.rmtree(folder)
    
    # 새로운 단순 구조 생성
    (target_path / "main").mkdir(exist_ok=True)
    (target_path / "hover").mkdir(exist_ok=True) 
    (target_path / "colors").mkdir(exist_ok=True)
    
    print("  ✅ /main/ 폴더 생성")
    print("  ✅ /hover/ 폴더 생성")
    print("  ✅ /colors/ 폴더 생성")

def load_mapping_data():
    """JSON에서 매핑 데이터 로드"""
    print("📄 매핑 데이터 로드 중...")
    
    with open(MAPPING_JSON, 'r', encoding='utf-8') as f:
        mappings = json.load(f)
    
    print(f"  📦 로드된 제품: {len(mappings)}개")
    return mappings

def copy_images_to_new_structure(mappings):
    """새로운 구조로 이미지 복사"""
    print("📸 새로운 구조로 이미지 복사 중...")
    
    source_path = Path(SOURCE_DIR)
    target_path = Path(TARGET_DIR)
    
    copied_main = 0
    copied_hover = 0
    copied_colors = 0
    missing_files = []
    
    for i, mapping in enumerate(mappings):
        product_name = mapping['name']
        print(f"\n📦 {i+1}/32: {product_name}")
        
        # 메인 이미지 복사
        if mapping['main_image']:
            main_src = source_path / mapping['main_image']
            if main_src.exists():
                main_dst = target_path / "main" / mapping['main_image']
                shutil.copy2(main_src, main_dst)
                print(f"  📸 메인: {mapping['main_image']}")
                copied_main += 1
            else:
                print(f"  ❌ 메인 없음: {mapping['main_image']}")
                missing_files.append(mapping['main_image'])
        
        # 호버 이미지 복사
        if mapping['hover_image']:
            hover_src = source_path / mapping['hover_image']
            if hover_src.exists():
                hover_dst = target_path / "hover" / mapping['hover_image']
                shutil.copy2(hover_src, hover_dst)
                print(f"  🎯 호버: {mapping['hover_image']}")
                copied_hover += 1
            else:
                print(f"  ❌ 호버 없음: {mapping['hover_image']}")
                missing_files.append(mapping['hover_image'])
        
        # 색상 섬네일들 복사
        colors_count = 0
        for thumbnail in mapping['color_thumbnails']:
            color_src = source_path / thumbnail
            if color_src.exists():
                color_dst = target_path / "colors" / thumbnail
                shutil.copy2(color_src, color_dst)
                colors_count += 1
                copied_colors += 1
            else:
                missing_files.append(thumbnail)
        
        print(f"  🎨 색상: {colors_count}/{len(mapping['color_thumbnails'])}개")
    
    return copied_main, copied_hover, copied_colors, missing_files

def generate_final_report(copied_main, copied_hover, copied_colors, missing_files):
    """최종 결과 리포트"""
    print("\n" + "=" * 70)
    print("📊 이미지 재배치 최종 리포트")
    print("=" * 70)
    
    target_path = Path(TARGET_DIR)
    
    # 실제 파일 개수 확인
    main_files = list((target_path / "main").glob("*"))
    hover_files = list((target_path / "hover").glob("*"))
    color_files = list((target_path / "colors").glob("*"))
    
    print(f"📁 /main/ 폴더: {len(main_files)}개 파일")
    print(f"📁 /hover/ 폴더: {len(hover_files)}개 파일")
    print(f"📁 /colors/ 폴더: {len(color_files)}개 파일")
    print(f"📊 총 복사된 파일: {len(main_files) + len(hover_files) + len(color_files)}개")
    
    if missing_files:
        print(f"\n❌ 누락된 파일: {len(missing_files)}개")
        for file in missing_files[:10]:  # 처음 10개만 표시
            print(f"  - {file}")
        if len(missing_files) > 10:
            print(f"  ... 및 {len(missing_files) - 10}개 더")
    
    print(f"\n🎉 이미지 재배치 완료!")
    print(f"✅ 메인 이미지: {copied_main}개")
    print(f"✅ 호버 이미지: {copied_hover}개") 
    print(f"✅ 색상 섬네일: {copied_colors}개")
    
    return len(main_files), len(hover_files), len(color_files)

def main():
    """메인 실행 함수"""
    print("🚀 이미지 재배치 시작!")
    print("=" * 70)
    print("🎯 목표: 단순화된 폴더 구조로 전환")
    print("  📁 기존: /bookcase-name/main|hover|colors/")
    print("  📁 새로운: /main|hover|colors/ (모든 파일 통합)")
    
    try:
        # 1. 새로운 폴더 구조 생성
        create_simplified_structure()
        
        # 2. 매핑 데이터 로드
        mappings = load_mapping_data()
        
        # 3. 이미지 복사
        copied_main, copied_hover, copied_colors, missing = copy_images_to_new_structure(mappings)
        
        # 4. 최종 리포트
        main_count, hover_count, color_count = generate_final_report(
            copied_main, copied_hover, copied_colors, missing
        )
        
        print("\n🎯 다음 단계:")
        print("1. ProductV2 데이터 파일 업데이트")
        print("2. 이미지 경로를 단순화된 구조로 변경")
        print("3. 개발 서버에서 테스트")
        
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()