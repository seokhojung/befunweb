# Story 1.2: 모든 페이지에 Layout 적용

## 📋 Story 카드
**Title**: 모든 페이지에 Layout 적용  
**Epic**: Layout System Refactoring  
**Priority**: P0 (Critical)  
**Points**: 10점 (수정됨: 기존 3점)  
**Assignee**: TBD  
**Sprint**: TBD

## 📝 User Story
```
As a 사용자
I want 모든 페이지에서 일관된 Header/Footer를 보고
So that 통일된 사용자 경험을 가질 수 있다
```

## ✅ Acceptance Criteria
- [ ] 5개 페이지 모두 Layout 컴포넌트를 사용한다
- [ ] 기존 Header/Footer 중복 코드가 제거된다
- [ ] 상품 상세 페이지에 Footer가 새로 추가된다
- [ ] 구성기 페이지는 Footer가 숨김 처리된다
- [ ] 모든 페이지가 정상 동작한다
- [ ] 반응형 레이아웃이 모든 페이지에서 작동한다

## 🔧 세분화된 Technical Tasks (10점)

### Task 1: Page Migration Planning (1점)
- [ ] 각 페이지의 현재 구조 분석
  - 홈페이지: Header + main content
  - 상품 페이지: Header + ProductGrid
  - 상품 상세: Header + ProductDetail (Footer 없음)
  - 구성기: Header + Configurator (Footer 숨김 필요)
  - 404: Header + NotFound
- [ ] 마이그레이션 순서 및 전략 수립
- [ ] 각 페이지별 특수 요구사항 정리

### Task 2: Individual Page Migration (5점)

#### 2.1: 홈페이지 Layout 적용 (1점)
- [ ] `app/page.tsx` 수정
- [ ] 기존 Header import 제거
- [ ] Layout 컴포넌트로 감싸기
- [ ] 테스트 및 검증

#### 2.2: 상품 페이지 Layout 적용 (1점)  
- [ ] `app/products/page.tsx` 수정
- [ ] Header 중복 제거
- [ ] Layout 적용 및 테스트

#### 2.3: 상품 상세 페이지 Layout 적용 + Footer 추가 (1.5점)
- [ ] `app/products/[id]/page.tsx` 수정
- [ ] **새로운 요구사항**: Footer 추가 (기존에는 없었음)
- [ ] Layout 적용 및 Footer 활성화
- [ ] 스타일 충돌 해결

#### 2.4: 구성기 페이지 Layout 적용 (1점)
- [ ] `app/configurator/page.tsx` 수정
- [ ] Layout 적용 with `showFooter={false}`
- [ ] 전체 화면 레이아웃 유지 확인

#### 2.5: 404 페이지 Layout 적용 (0.5점)
- [ ] `app/not-found.tsx` 수정
- [ ] 에러 페이지 Layout 적용

### Task 3: Import Cleanup (2점)
- [ ] 중복된 Header/Footer import 제거
  - 5개 페이지에서 Header import 제거
  - 필요시 Footer import 제거
- [ ] 사용되지 않는 import 정리
  - 타입 정의 import 정리
  - CSS import 정리
- [ ] Import 경로 최적화
  - 상대경로 → 절대경로 변환 고려

### Task 4: Testing & Validation (1.5점)
- [ ] 각 페이지 정상 동작 확인
  - 페이지 로딩 테스트
  - Header/Footer 표시 확인
  - 기능 동작 테스트
- [ ] 라우팅 테스트
  - 페이지 간 이동 확인
  - Layout 상태 유지 확인
- [ ] 반응형 테스트
  - 모바일/태블릿/데스크톱 확인
  - 브레이크포인트별 레이아웃 검증

### Task 5: Edge Cases & Polish (0.5점)
- [ ] 특수한 레이아웃 요구사항 처리
  - 구성기 페이지 전체 화면 유지
  - 404 페이지 적절한 스타일링
- [ ] 조건부 Footer 표시 로직 검증
- [ ] 성능 영향 최소화 확인

## 🏗️ Implementation Details

### 페이지별 변경사항

#### Before & After 구조

**Before (현재)**:
```typescript
// app/page.tsx
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProductGrid />
        {/* ... */}
      </main>
      <Footer />
    </>
  )
}
```

**After (목표)**:
```typescript
// app/page.tsx
import { Layout } from '@/components/layout'

export default function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <ProductGrid />
      {/* ... */}
    </Layout>
  )
}
```

### 페이지별 Layout 설정

```typescript
// 홈페이지
<Layout>  // 기본값: Header ✅, Footer ✅

// 상품 페이지  
<Layout>  // Header ✅, Footer ✅

// 상품 상세 (Footer 새로 추가)
<Layout>  // Header ✅, Footer ✅ (NEW!)

// 구성기 (Footer 숨김)
<Layout showFooter={false}>  // Header ✅, Footer ❌

// 404 페이지
<Layout>  // Header ✅, Footer ✅
```

## 🧪 Testing Strategy

### 페이지별 테스트 체크리스트

```typescript
describe('Layout Migration Tests', () => {
  test('홈페이지 Layout 적용', () => {
    render(<HomePage />)
    expect(screen.getByRole('banner')).toBeInTheDocument() // Header
    expect(screen.getByRole('contentinfo')).toBeInTheDocument() // Footer
    expect(screen.getByText('Hero Section')).toBeInTheDocument()
  })

  test('상품 상세 페이지 Footer 추가', () => {
    render(<ProductDetailPage />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument() // 새로 추가된 Footer
  })

  test('구성기 페이지 Footer 숨김', () => {
    render(<ConfiguratorPage />)
    expect(screen.getByRole('banner')).toBeInTheDocument() // Header
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument() // Footer 숨김
  })
})
```

### 통합 테스트
- [ ] 페이지 간 네비게이션 테스트
- [ ] Layout 상태 유지 테스트 (Header 스크롤 상태 등)
- [ ] 브라우저 뒤로가기/앞으로가기 테스트

### 성능 테스트
- [ ] Layout 컴포넌트 리렌더링 최소화 확인
- [ ] 페이지 로딩 속도 회귀 없음 확인
- [ ] Bundle 크기 변화 측정

## 📊 Definition of Done Checklist
- [ ] 5개 페이지 모두 Layout 컴포넌트 사용
- [ ] 기존 Header/Footer 중복 코드 완전 제거
- [ ] 상품 상세 페이지에 Footer 성공적으로 추가
- [ ] 구성기 페이지 Footer 숨김 정상 작동
- [ ] 모든 페이지 기능 정상 동작
- [ ] TypeScript 컴파일 에러 없음
- [ ] 모든 테스트 통과
- [ ] ESLint/Prettier 규칙 준수
- [ ] 반응형 레이아웃 모든 페이지 정상 작동
- [ ] 성능 회귀 없음

## 🚨 Potential Blockers & Mitigations

### Blocker 1: 상품 상세 페이지 Footer 추가 시 레이아웃 깨짐
**Risk**: 기존에 Footer가 없던 상품 상세 페이지에 Footer 추가 시 예상치 못한 스타일 충돌  
**Mitigation**: Footer 추가 전 현재 페이지 스타일 분석, CSS 격리 적용

### Blocker 2: 구성기 페이지 전체 화면 레이아웃 유지
**Risk**: Layout 적용으로 구성기의 전체 화면 경험이 깨질 수 있음  
**Mitigation**: 구성기 페이지만을 위한 특수 Layout Props 추가 고려

### Blocker 3: Import 경로 대량 변경으로 인한 빌드 에러
**Risk**: 5개 페이지의 import 구조 변경으로 타입 에러 발생 가능  
**Mitigation**: 단계별 마이그레이션, 각 페이지마다 개별 테스트

## 🔗 Related Stories
- **Depends on**: Story 1.1 (Layout 컴포넌트 생성) ✅ 필수
- **Blocks**: Story 2.2 (컴포넌트 마이그레이션)
- **Related**: Epic 2 전체 (폴더 구조 변경 후 import 경로 재정리 예정)

## 📝 Notes
- 상품 상세 페이지에 Footer 추가는 **새로운 요구사항**으로 디자인 검토 필요
- 구성기 페이지의 `showFooter={false}` 설정은 사용자 경험 유지를 위해 필수
- Layout 컴포넌트 적용 후 페이지별 로딩 성능 모니터링 중요

---

*작성일: 2025-01-28*  
*최종 수정일: 2025-01-28*