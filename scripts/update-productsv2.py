#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ProductsV2.ts 파일의 이미지 경로를 실제 경로로 업데이트하는 스크립트
"""

import re

# 제품 매핑 정보 (16개 제품)
PRODUCT_MAPPINGS = [
    {"id": "bookcase-006", "slug": "bookcase-black"},
    {"id": "bookcase-007", "slug": "bookcase-white-large"}, 
    {"id": "bookcase-008", "slug": "bookcase-light-wood"},
    {"id": "bookcase-009", "slug": "bookcase-burgundy-doors-drawers"},
    {"id": "bookcase-010", "slug": "bookcase-grey-compact"},
    {"id": "bookcase-011", "slug": "bookcase-light-wood-drawers"},
    {"id": "bookcase-012", "slug": "bookcase-green-xl"},
    {"id": "bookcase-013", "slug": "bookcase-white-external-drawers"},
    {"id": "bookcase-014", "slug": "bookcase-moss-green-doors"},
    {"id": "bookcase-015", "slug": "bookcase-premium-black"},
    {"id": "bookcase-034", "slug": "bookcase-beige-drawers-backpanels"}
]

def update_products_v2_file():
    """ProductV2.ts 파일 업데이트"""
    file_path = r"C:\Users\apf_temp_admin\Desktop\befunweb\src\data\productsV2.ts"
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        print("🔄 ProductV2 데이터 파일 업데이트 중...")
        
        # 각 제품별로 이미지 경로 업데이트
        for mapping in PRODUCT_MAPPINGS:
            product_id = mapping["id"]
            slug = mapping["slug"]
            
            print(f"  🔄 {product_id} ({slug}) 업데이트 중...")
            
            # 메인 이미지 경로 패턴 찾기 및 교체
            old_main_pattern = rf"(mainImage: '/images/products/v2/main/bookcase-\d+-main\.svg')"
            new_main_path = f"mainImage: '/images/products/v2/{slug}/main/{slug}-main.jpg'"
            
            # 호버 이미지 경로 패턴 찾기 및 교체  
            old_hover_pattern = rf"(hoverImage: '/images/products/v2/hover/bookcase-\d+-hover\.svg')"
            new_hover_path = f"hoverImage: '/images/products/v2/{slug}/hover/{slug}-hover.webp'"
            
            # 제품별 섹션을 찾아서 교체 (각 제품은 id로 구분됨)
            product_section_pattern = rf"(id: '{product_id}',.*?)(\n    mainImage:.*?)(\n    hoverImage:.*?)(\n    \n    colorVariants:)"
            
            def replace_product_section(match):
                before_main = match.group(1)
                before_hover = match.group(4)
                return f"{before_main}\n    {new_main_path},\n    {new_hover_path},{before_hover}"
            
            content = re.sub(product_section_pattern, replace_product_section, content, flags=re.DOTALL)
            
            # ColorVariant 호출 패턴을 실제 경로 사용하도록 수정
            color_variants_pattern = rf"(\s+createColorVariant\('[^']+',\s*'[^']+'\))"
            
            def replace_color_variants(section_content):
                # 기본 색상들로 교체
                colors = ["White", "Grey", "Brown", "Black", "Green", "Blue", "Red", "Beige"]
                new_variants = []
                
                for i, color in enumerate(colors):
                    color_id = f"{color.lower()}-{product_id.split('-')[1]}"
                    is_default = i == 0
                    new_variant = f"      createColorVariant('{slug}', '{color_id}', '{color}'{', true' if is_default else ''})"
                    new_variants.append(new_variant)
                
                return ",\n".join(new_variants)
            
            # colorVariants 섹션 교체를 위한 더 정확한 패턴
            color_section_pattern = rf"(id: '{product_id}',.*?colorVariants: \[\n)(.*?)(\n    \],)"
            
            def replace_color_section(match):
                before_colors = match.group(1)
                after_colors = match.group(3)
                
                # 새로운 색상 변형들 생성
                colors = ["White", "Grey", "Brown", "Black", "Green", "Blue", "Red", "Beige"]
                new_variants = []
                
                for i, color in enumerate(colors):
                    color_id = f"{color.lower()}-{product_id.split('-')[1]}"
                    is_default = ", true" if i == 0 else ""
                    new_variant = f"      createColorVariant('{slug}', '{color_id}', '{color}'{is_default})"
                    new_variants.append(new_variant)
                
                new_color_content = ",\n".join(new_variants)
                return f"{before_colors}{new_color_content}{after_colors}"
            
            content = re.sub(color_section_pattern, replace_color_section, content, flags=re.DOTALL)
        
        # 파일에 쓰기
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print("✅ ProductV2 데이터 파일 업데이트 완료!")
        return True
        
    except Exception as e:
        print(f"❌ 오류 발생: {e}")
        return False

def main():
    """메인 실행 함수"""
    print("🚀 ProductV2 데이터 파일 이미지 경로 업데이트 시작!")
    print("=" * 60)
    
    success = update_products_v2_file()
    
    if success:
        print("\n🎉 모든 제품의 이미지 경로 업데이트 완료!")
        print("🎯 다음 단계:")
        print("1. 개발 서버 실행: npm run dev")
        print("2. Products 페이지 확인: http://localhost:3000/products")  
        print("3. 이미지 로딩 상태 확인")
    else:
        print("\n❌ 업데이트 실패!")

if __name__ == "__main__":
    main()