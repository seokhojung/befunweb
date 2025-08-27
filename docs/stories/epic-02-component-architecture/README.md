# Epic 2: Component Architecture Restructuring

## 🎯 Epic 목표
컴포넌트를 기능별/도메인별로 체계적으로 정리하여 개발 생산성과 유지보수성 향상

## 📊 Epic 정보
- **포인트**: 22점 (수정됨: 기존 7점)
- **예상 기간**: 3주
- **우선순위**: P1 (High)
- **의존성**: Epic 1 (Layout System) 완료 필요

## 📋 Story 목록

### Story 2.1: 폴더 구조 재설계 및 생성
- **포인트**: 8점
- **상태**: 📝 To Do
- **담당자**: TBD
- **파일**: `story-2.1-folder-restructure.md`

### Story 2.2: 컴포넌트 파일 이동
- **포인트**: 6점
- **상태**: 📝 To Do
- **담당자**: TBD
- **파일**: `story-2.2-component-migration.md`

### Story 2.3: Import 경로 대량 업데이트
- **포인트**: 5점
- **상태**: 📝 To Do
- **담당자**: TBD
- **파일**: `story-2.3-import-path-update.md`

### Story 2.4: 아이콘 시스템 통합
- **포인트**: 3점
- **상태**: 📝 To Do
- **담당자**: TBD
- **파일**: `story-2.4-icon-system.md`

## 🔗 의존성 관계
```
Epic 1 (Layout System) ✅
    ↓
Story 2.1 (폴더 구조 설계)
    ↓
Story 2.2 (컴포넌트 이동) ← Story 2.4 (아이콘 통합)
    ↓
Story 2.3 (Import 경로 업데이트)
    ↓
Epic 3 (Type System) 📝
```

## 🏗️ 아키텍처 변화

### Before (현재)
```
src/components/
├── Header.tsx
├── Footer.tsx
├── ProductCard.tsx
├── ColorChangeableProductCard.tsx
├── CategoryCard.tsx
├── HeroSection.tsx
├── ProductGrid.tsx
├── BrandHighlights.tsx
├── Sustainability.tsx
├── PromoBanner.tsx
├── ui/
│   ├── button.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   └── animated-card.tsx
└── icons/
    └── StorageIcon.tsx
```

### After (목표)
```
src/components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   └── index.ts
├── sections/
│   ├── HeroSection.tsx
│   ├── ProductColorSection.tsx
│   ├── ProductGrid.tsx
│   ├── BrandHighlights.tsx
│   ├── Sustainability.tsx
│   └── index.ts
├── cards/
│   ├── ProductCard.tsx
│   ├── ColorChangeableProductCard.tsx
│   ├── CategoryCard.tsx
│   └── index.ts
├── ui/
│   ├── Button.tsx (renamed)
│   ├── Card.tsx (renamed)
│   ├── Badge.tsx (renamed)
│   ├── AnimatedCard.tsx (renamed)
│   └── index.ts
└── icons/
    ├── StorageIcon.tsx
    ├── MenuIcon.tsx (new)
    ├── SearchIcon.tsx (new)
    └── index.ts
```

## 📊 영향도 분석

### 변경될 파일 수
- **컴포넌트 파일**: 20개 이동
- **Import 구문**: 100+ 개 업데이트
- **Index 파일**: 6개 새로 생성

### 영향받는 페이지
- [ ] 홈페이지 (5개 import 변경)
- [ ] 상품 페이지 (3개 import 변경)
- [ ] 상품 상세 페이지 (2개 import 변경)
- [ ] 구성기 페이지 (1개 import 변경)
- [ ] 404 페이지 (1개 import 변경)

## 🎯 완료 조건 (Epic Definition of Done)
- [ ] 모든 컴포넌트가 적절한 카테고리 폴더에 위치
- [ ] 각 폴더에 index.ts 파일로 깔끔한 export 구조
- [ ] 모든 import 경로가 새로운 구조에 맞게 업데이트
- [ ] 빌드 및 타입 체크 오류 없음
- [ ] 모든 페이지 정상 동작 확인
- [ ] IDE에서 파일 탐색 시간 50% 단축
- [ ] 새로운 폴더 구조 문서화 완료

## 🚨 리스크 요소

### High Risk
- **대량 Import 변경**: 100+ 파일 수정 시 실수 가능성
- **Mitigation**: IDE 자동 리팩토링 + 단계별 확인

### Medium Risk  
- **의존성 순환**: 잘못된 import로 인한 circular dependency
- **Mitigation**: Import 순서 체크리스트 + 린터 규칙

### Low Risk
- **Git 히스토리**: 파일 이동으로 인한 히스토리 손실
- **Mitigation**: `git mv` 명령어 사용

## 📈 성공 지표
- **파일 탐색 시간**: 50% 단축 (평균 30초 → 15초)
- **새 컴포넌트 생성**: 적절한 위치 파악 시간 70% 단축
- **코드 리뷰**: 컴포넌트 위치 관련 피드백 80% 감소
- **개발자 만족도**: 폴더 구조 만족도 4.5/5 이상

## 🔧 도구 및 방법론

### IDE 활용
- **VSCode**: TypeScript rename 기능
- **WebStorm**: 자동 리팩토링 기능
- **Find & Replace**: 패턴 기반 대량 변경

### 검증 방법
- **TypeScript 컴파일**: `tsc --noEmit`
- **ESLint**: Import 순서 및 사용되지 않는 import 체크
- **테스트 실행**: 모든 기능 정상 동작 확인

## 🔄 롤백 계획
만약 문제 발생 시:
1. **Git 브랜치**: 각 Story별로 별도 브랜치
2. **단계별 커밋**: 각 폴더별로 개별 커밋
3. **빠른 롤백**: `git revert` 또는 브랜치 전환

## 📝 다음 Epic 준비사항
Epic 3 (Type System)을 위한 사전 준비:
- [ ] 분산된 타입 정의 위치 파악
- [ ] 중복 타입 식별
- [ ] Generic 타입 설계 검토

---

*마지막 업데이트: 2025-01-28*  
*다음 리뷰: Epic 1 완료 후*