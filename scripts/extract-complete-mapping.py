#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HTML에서 모든 제품의 완전한 이미지 매핑 정보를 추출하는 스크립트
Tylko.com HTML 데이터에서 34개 제품의 정확한 이미지 파일명 추출
"""

import re
import json
from pathlib import Path

# HTML 파일 경로
HTML_FILE = r"C:\Users\apf_temp_admin\Desktop\befunweb\product-v2-example.txt"
SOURCE_DIR = r"C:\Users\apf_temp_admin\Desktop\Bookcases, Bookshelves - modern, large or small - Tylko_files"
TARGET_DIR = r"C:\Users\apf_temp_admin\Desktop\befunweb\public\images\products\v2"

def extract_filename_from_url(url):
    """URL에서 파일명만 추출"""
    return url.split('/')[-1]

def extract_all_products_from_html():
    """HTML에서 모든 제품의 이미지 매핑 정보 추출"""
    print("🔍 HTML에서 제품 정보 추출 중...")
    
    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    # 제품 카드별로 분리하기 위한 패턴
    product_pattern = r'<li data-testid="product-card">.*?</li>'
    products = re.findall(product_pattern, html_content, re.DOTALL)
    
    print(f"📦 발견된 제품 카드: {len(products)}개")
    
    extracted_mappings = []
    
    for i, product_html in enumerate(products):
        print(f"\n🔍 제품 {i+1} 분석 중...")
        
        # 제품 이름 추출
        name_match = re.search(r'alt="([^"]*Bookcase[^"]*)"', product_html)
        if not name_match:
            print(f"  ❌ 제품 이름을 찾을 수 없습니다.")
            continue
            
        product_name = name_match.group(1)
        print(f"  📝 제품명: {product_name}")
        
        # 메인 이미지 (data-testid="product-card-image-instagrid") - 순서를 바꿔서 더 정확하게
        main_match = re.search(r'<img src="([^"]*)"[^>]*data-testid="product-card-image-instagrid"', product_html)
        main_image = extract_filename_from_url(main_match.group(1)) if main_match else None
        
        # 호버 이미지 (data-testid="product-card-image") - 순서를 바꿔서 더 정확하게  
        hover_match = re.search(r'<img src="([^"]*)"[^>]*data-testid="product-card-image"', product_html)
        hover_image = extract_filename_from_url(hover_match.group(1)) if hover_match else None
        
        # 색상 섬네일들
        thumbnail_pattern = r'src="[^"]*thumbnail[^"]*"'
        thumbnail_matches = re.findall(thumbnail_pattern, product_html)
        color_thumbnails = []
        
        for match in thumbnail_matches:
            url = match.replace('src="', '').replace('"', '')
            filename = extract_filename_from_url(url)
            color_thumbnails.append(filename)
        
        # 가격 정보 추출
        price_match = re.search(r'data-testid="product-card-price-discount">€(\d+)</span>', product_html)
        original_price_match = re.search(r'data-testid="product-card-price">€(\d+)</span>', product_html)
        
        price = int(price_match.group(1)) if price_match else None
        original_price = int(original_price_match.group(1)) if original_price_match else None
        
        # 크기 정보 추출
        size_match = re.search(r'data-testid="product-card-furniture-size">([^<]*)</h3>', product_html)
        dimensions = size_match.group(1).strip() if size_match else None
        
        # 가구 타입 추출
        type_match = re.search(r'data-testid="product-card-furniture-type">([^<]*)</p>', product_html)
        furniture_type = type_match.group(1).strip() if type_match else None
        
        # 배지/라벨 정보
        has_top_seller = "Top seller" in product_html
        has_discount = "data-testid=\"product-card-badge\"" in product_html
        
        # 결과 저장
        mapping = {
            "name": product_name,
            "main_image": main_image,
            "hover_image": hover_image,
            "color_thumbnails": color_thumbnails,
            "price": price,
            "original_price": original_price,
            "dimensions": dimensions,
            "furniture_type": furniture_type,
            "has_top_seller": has_top_seller,
            "has_discount": has_discount
        }
        
        extracted_mappings.append(mapping)
        
        print(f"  📸 메인: {main_image}")
        print(f"  🎯 호버: {hover_image}")
        print(f"  🎨 섬네일: {len(color_thumbnails)}개")
        print(f"  💰 가격: €{price} (원가: €{original_price})")
        print(f"  📏 크기: {dimensions}")
    
    return extracted_mappings

def save_mappings_to_json(mappings):
    """추출된 매핑 정보를 JSON 파일로 저장"""
    output_file = Path("C:\\Users\\apf_temp_admin\\Desktop\\befunweb\\extracted-mappings.json")
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(mappings, f, indent=2, ensure_ascii=False)
    
    print(f"\n💾 매핑 정보를 저장했습니다: {output_file}")
    return output_file

def check_available_files(mappings):
    """다운로드 폴더에서 사용 가능한 파일 확인"""
    print("\n📂 다운로드된 파일 가용성 확인...")
    
    source_path = Path(SOURCE_DIR)
    available_files = set(f.name.lower() for f in source_path.glob("*") if f.is_file())
    
    total_needed = 0
    total_available = 0
    
    for i, mapping in enumerate(mappings):
        print(f"\n📦 {mapping['name']}")
        
        # 메인 이미지 확인
        if mapping['main_image']:
            total_needed += 1
            if mapping['main_image'].lower() in available_files:
                print(f"  ✅ 메인: {mapping['main_image']}")
                total_available += 1
            else:
                print(f"  ❌ 메인: {mapping['main_image']} (없음)")
        
        # 호버 이미지 확인
        if mapping['hover_image']:
            total_needed += 1
            if mapping['hover_image'].lower() in available_files:
                print(f"  ✅ 호버: {mapping['hover_image']}")
                total_available += 1
            else:
                print(f"  ❌ 호버: {mapping['hover_image']} (없음)")
        
        # 색상 섬네일들 확인
        available_thumbnails = 0
        for thumbnail in mapping['color_thumbnails']:
            if thumbnail.lower() in available_files:
                available_thumbnails += 1
                total_available += 1
            total_needed += 1
        
        print(f"  🎨 섬네일: {available_thumbnails}/{len(mapping['color_thumbnails'])}개 사용 가능")
    
    print(f"\n📊 전체 요약:")
    print(f"  필요한 파일: {total_needed}개")
    print(f"  사용 가능: {total_available}개")
    print(f"  가용률: {total_available/total_needed*100:.1f}%")
    
    return total_available, total_needed

def main():
    """메인 실행 함수"""
    print("🚀 HTML에서 완전한 제품-이미지 매핑 추출 시작!")
    print("=" * 70)
    
    try:
        # 1. HTML에서 모든 제품 정보 추출
        mappings = extract_all_products_from_html()
        
        if not mappings:
            print("❌ 추출된 제품 정보가 없습니다.")
            return
        
        # 2. JSON 파일로 저장
        json_file = save_mappings_to_json(mappings)
        
        # 3. 파일 가용성 확인
        available, needed = check_available_files(mappings)
        
        # 4. 결과 요약
        print("\n" + "=" * 70)
        print("🎉 HTML 매핑 추출 완료!")
        print(f"📦 추출된 제품: {len(mappings)}개")
        print(f"📁 저장 위치: {json_file}")
        print(f"📊 파일 가용성: {available}/{needed}개 ({available/needed*100:.1f}%)")
        
        print("\n🎯 다음 단계:")
        print("1. 추출된 매핑 정보로 이미지 재분류")
        print("2. ProductV2 데이터 실제 파일명으로 업데이트") 
        print("3. 새로운 폴더 구조로 이미지 재배치")
        
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()