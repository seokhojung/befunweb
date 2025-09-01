# 📝 Story 4.2: 상세 페이지 연동 구현

## 📊 스토리 정보
- **Epic**: Integration & Testing
- **Priority**: P2 (High)
- **예상 소요시간**: 4-5시간
- **담당**: Frontend Developer
- **상태**: ❌ 미구현

## 🎯 사용자 스토리
**As a** 사용자  
**I want** 제품 카드에서 상세 페이지로 이동할 때  
**So that** 선택한 색상 정보가 유지된다

## 📋 Acceptance Criteria
- [ ] `/products-v2/[id]?color=white` URL 형태로 이동한다
- [ ] 상세 페이지에서 선택된 색상이 유지된다
- [ ] 뒤로가기 시 이전 상태가 복원된다
- [ ] SEO 친화적 URL 구조를 가진다
- [ ] 404 처리가 정상 작동한다
- [ ] 메타데이터가 동적으로 생성된다

## ⚙️ Technical Tasks
- [ ] `app/products-v2/[id]/` 폴더 생성
- [ ] `app/products-v2/[id]/page.tsx` 생성
  ```typescript
  interface PageProps {
    params: { id: string };
    searchParams: { color?: string };
  }
  
  export default async function ProductDetailV2Page({ params, searchParams }: PageProps) {
    const product = await getProductById(params.id);
    const selectedColor = searchParams.color || product.defaultVariant;
  }
  ```
- [ ] `app/products-v2/[id]/ProductDetailV2Client.tsx` 생성
- [ ] URL 파라미터 처리 로직
  ```typescript
  const selectedVariant = product.colorVariants.find(
    v => v.id === searchParams.color
  ) || getDefaultVariant(product);
  ```
- [ ] 상태 동기화 시스템 구현
  - URL → 컴포넌트 상태
  - 컴포넌트 상태 → URL
- [ ] SEO 메타데이터 동적 생성
  ```typescript
  export async function generateMetadata({ params }: PageProps) {
    const product = await getProductById(params.id);
    return {
      title: product.name,
      description: product.description,
      openGraph: {
        images: [product.mainImage]
      }
    };
  }
  ```
- [ ] 브라우저 히스토리 관리
- [ ] 404/에러 페이지 구현

## 🎯 Definition of Done
- [ ] 색상 상태 완벽 동기화
- [ ] SEO 메타데이터 정상 생성
- [ ] 브라우저 네비게이션 정상 동작
- [ ] 404 페이지 정상 표시
- [ ] 로딩 상태 처리
- [ ] 에러 상태 처리

## 📝 구현 노트
- Server Component + Client Component 혼합
- Dynamic Routes 활용
- generateStaticParams 고려
- ISR 또는 SSG 적용 가능

## 🔗 관련 파일
- `app/products/[id]/page.tsx` - V1 참조
- `components/ui/ColorSwatchGrid.tsx` - 색상 선택기
- `src/data/productsV2.ts` - 데이터 소스

## 📅 예상 완료일
- 2025-09-02 (Day 6)