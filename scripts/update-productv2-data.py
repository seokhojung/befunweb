#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
추출된 매핑 정보를 바탕으로 ProductV2 데이터를 실제 파일명으로 업데이트
단순화된 폴더 구조 (/main/, /hover/, /colors/) 사용
"""

import json
import re
from pathlib import Path

# 경로 설정
MAPPING_JSON = r"C:\Users\apf_temp_admin\Desktop\befunweb\extracted-mappings.json"
PRODUCTS_V2_FILE = r"C:\Users\apf_temp_admin\Desktop\befunweb\src\data\productsV2.ts"

# 우리 ProductV2 데이터의 16개 제품 (기존)
OUR_PRODUCTS_SLUGS = [
    "bookcase-white-doors",
    "bookcase-grey-external-drawers", 
    "bookcase-brown",
    "bookcase-grey-doors-storage",
    "bookcase-moss-green",
    "bookcase-black",
    "bookcase-white-large",
    "bookcase-light-wood",
    "bookcase-burgundy-doors-drawers",
    "bookcase-grey-compact",
    "bookcase-light-wood-drawers",
    "bookcase-green-xl",
    "bookcase-white-external-drawers",
    "bookcase-moss-green-doors",
    "bookcase-premium-black",
    "bookcase-beige-drawers-backpanels"
]

def load_mapping_data():
    """JSON에서 매핑 데이터 로드"""
    print("📄 매핑 데이터 로드 중...")
    
    with open(MAPPING_JSON, 'r', encoding='utf-8') as f:
        mappings = json.load(f)
    
    print(f"  📦 HTML에서 추출된 제품: {len(mappings)}개")
    return mappings

def create_name_to_mapping_dict(mappings):
    """제품명을 키로 하는 매핑 딕셔너리 생성"""
    print("🔗 제품명 매핑 딕셔너리 생성 중...")
    
    name_mapping = {}
    for mapping in mappings:
        # 제품명을 정규화 (공백, 특수문자 제거)
        normalized_name = mapping['name'].lower().replace(' ', '').replace('in', '').replace('with', '').replace('and', '')
        name_mapping[normalized_name] = mapping
    
    print(f"  🔗 생성된 매핑: {len(name_mapping)}개")
    return name_mapping

def find_best_match(our_slug, name_mapping):
    """우리 제품 슬러그에 가장 잘 맞는 매핑 찾기"""
    slug_keywords = our_slug.replace('bookcase-', '').split('-')
    
    best_match = None
    best_score = 0
    
    for normalized_name, mapping in name_mapping.items():
        score = 0
        
        # 키워드별 점수 계산
        for keyword in slug_keywords:
            if keyword == 'grey' and 'gray' in normalized_name:
                score += 1
            elif keyword == 'gray' and 'grey' in normalized_name:
                score += 1
            elif keyword in normalized_name:
                score += 1
            elif keyword == 'doors' and 'door' in normalized_name:
                score += 0.8
            elif keyword == 'drawers' and 'drawer' in normalized_name:
                score += 0.8
            elif keyword == 'external' and 'external' in normalized_name:
                score += 1.5
            elif keyword == 'burgundy' and 'burgund' in normalized_name:
                score += 1
        
        if score > best_score:
            best_score = score
            best_match = mapping
    
    return best_match, best_score

def generate_color_variants_code(mapping, product_slug):
    """색상 변형들을 위한 TypeScript 코드 생성"""
    colors = ['White', 'Grey', 'Brown', 'Black', 'Green', 'Blue', 'Red', 'Beige']
    
    variants = []
    for i, color in enumerate(colors):
        color_id = f"{color.lower()}-{len(variants) + 1}"
        
        # 색상별 섬네일 이미지 찾기 (가능한 경우)
        thumbnail_file = None
        if i < len(mapping['color_thumbnails']):
            thumbnail_file = mapping['color_thumbnails'][i]
        else:
            # 기본 섬네일 사용
            thumbnail_file = mapping['color_thumbnails'][0] if mapping['color_thumbnails'] else 'placeholder.webp'
        
        is_default = i == 0
        variant = f"      createColorVariant('{product_slug}', '{color_id}', '{color}', '{thumbnail_file}'{', true' if is_default else ''})"
        variants.append(variant)
    
    return ',\n'.join(variants)

def update_products_v2_file(mappings):
    """ProductV2 파일 업데이트"""
    print("📝 ProductV2 파일 업데이트 중...")
    
    with open(PRODUCTS_V2_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 이름 매핑 딕셔너리 생성
    name_mapping = create_name_to_mapping_dict(mappings)
    
    updated_count = 0
    
    for our_slug in OUR_PRODUCTS_SLUGS:
        print(f"\n🔍 {our_slug} 업데이트 중...")
        
        # 최적 매칭 찾기
        best_match, score = find_best_match(our_slug, name_mapping)
        
        if not best_match or score < 1:
            print(f"  ❌ 매칭 실패 (점수: {score})")
            continue
        
        print(f"  ✅ 매칭: {best_match['name']} (점수: {score})")
        print(f"    📸 메인: {best_match['main_image']}")
        print(f"    🎯 호버: {best_match['hover_image']}")
        print(f"    🎨 섬네일: {len(best_match['color_thumbnails'])}개")
        
        # 메인 이미지 경로 업데이트
        if best_match['main_image']:
            old_main_pattern = rf"(mainImage: '/images/products/v2/{our_slug}/main/{our_slug}-main\.(jpg|webp)')"
            new_main_path = f"mainImage: '/images/products/v2/main/{best_match['main_image']}'"
            content = re.sub(old_main_pattern, new_main_path, content)
            
            # 대안 패턴도 시도
            old_main_alt = rf"(mainImage: '/images/products/v2/main/[^']*')"
            if our_slug in content:
                # 해당 제품 섹션에서만 교체
                product_section_pattern = rf"(slug: '{our_slug}'.*?)(mainImage: '/images/products/v2/[^']*')([^}}]*?colorVariants)"
                def replace_main_in_section(match):
                    before = match.group(1)
                    after = match.group(3)
                    return f"{before}{new_main_path}{after}"
                content = re.sub(product_section_pattern, replace_main_in_section, content, flags=re.DOTALL)
        
        # 호버 이미지 경로 업데이트
        if best_match['hover_image']:
            new_hover_path = f"hoverImage: '/images/products/v2/hover/{best_match['hover_image']}'"
            product_section_pattern = rf"(slug: '{our_slug}'.*?)(hoverImage: '/images/products/v2/[^']*')([^}}]*?colorVariants)"
            def replace_hover_in_section(match):
                before = match.group(1)
                after = match.group(3)
                return f"{before}{new_hover_path}{after}"
            content = re.sub(product_section_pattern, replace_hover_in_section, content, flags=re.DOTALL)
        
        updated_count += 1
    
    # createColorVariant 함수 업데이트
    print("\n🔄 createColorVariant 함수 업데이트 중...")
    
    old_color_variant = r"""const createColorVariant = \(
  productSlug: string,
  colorId: string,
  name: string,
  isDefault: boolean = false
\): ColorVariantV2 => \{
  const colorName = name\.toLowerCase\(\)\.replace\(/\\s\+/g, '-'\);
  return \{
    id: colorId,
    name,
    thumbnail: `/images/products/v2/\$\{productSlug\}/colors/\$\{productSlug\}-\$\{colorName\}\.webp`,
    mainImage: `/images/products/v2/\$\{productSlug\}/main/\$\{productSlug\}-main\.jpg`,
    hoverImage: `/images/products/v2/\$\{productSlug\}/hover/\$\{productSlug\}-hover\.webp`,
    isDefault,
    sku: `BKC-\$\{colorId\}`,
    availability: 'in_stock'
  \};
\};"""
    
    new_color_variant = """const createColorVariant = (
  productSlug: string,
  colorId: string,
  name: string,
  thumbnailFile: string,
  isDefault: boolean = false
): ColorVariantV2 => {
  return {
    id: colorId,
    name,
    thumbnail: `/images/products/v2/colors/${thumbnailFile}`,
    mainImage: `/images/products/v2/main/${productSlug}-main.jpg`, // 기본값, 실제로는 제품별로 다름
    hoverImage: `/images/products/v2/hover/${productSlug}-hover.webp`, // 기본값, 실제로는 제품별로 다름
    isDefault,
    sku: `BKC-${colorId}`,
    availability: 'in_stock'
  };
};"""
    
    content = re.sub(old_color_variant, new_color_variant, content, flags=re.DOTALL)
    
    # 파일 저장
    with open(PRODUCTS_V2_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"\n✅ ProductV2 파일 업데이트 완료!")
    print(f"📦 업데이트된 제품: {updated_count}개")
    return updated_count

def main():
    """메인 실행 함수"""
    print("🚀 ProductV2 데이터 파일 업데이트 시작!")
    print("=" * 70)
    print("🎯 목표: HTML 매핑 데이터로 실제 파일명 사용")
    print("  📁 새로운 구조: /main/, /hover/, /colors/")
    print("  📄 대상 파일: src/data/productsV2.ts")
    
    try:
        # 1. 매핑 데이터 로드
        mappings = load_mapping_data()
        
        # 2. ProductV2 파일 업데이트
        updated = update_products_v2_file(mappings)
        
        print("\n" + "=" * 70)
        print("🎉 ProductV2 데이터 업데이트 완료!")
        print(f"✅ 업데이트된 제품: {updated}/16개")
        
        print("\n🎯 다음 단계:")
        print("1. 개발 서버 실행: npm run dev")
        print("2. Products 페이지 테스트: http://localhost:3000/products")
        print("3. 이미지 로딩 상태 확인")
        print("4. 색상 변형 기능 테스트")
        
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()