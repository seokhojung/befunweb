# Epic 3: Type System Enhancement

## 🎯 Epic 목표
TypeScript 타입 시스템을 중앙 집중화하고 타입 안전성을 극대화하여 런타임 오류 방지

## 📊 Epic 정보
- **포인트**: 16점 (수정됨: 기존 7점)
- **예상 기간**: 2주
- **우선순위**: P1 (High)
- **의존성**: Epic 2 (Component Architecture) 완료 권장

## 📋 Story 목록

### Story 3.1: 타입 정의 중앙화
- **포인트**: 7점
- **상태**: 📝 To Do
- **담당자**: TBD
- **파일**: `story-3.1-type-centralization.md`

### Story 3.2: Generic 타입 시스템 구축
- **포인트**: 4점
- **상태**: 📝 To Do
- **담당자**: TBD
- **파일**: `story-3.2-generic-types.md`

### Story 3.3: Strict TypeScript 설정 적용
- **포인트**: 5점
- **상태**: 📝 To Do
- **담당자**: TBD
- **파일**: `story-3.3-strict-typescript.md`

## 🔗 의존성 관계
```
Epic 2 (Component Architecture) ✅
    ↓
Story 3.1 (타입 중앙화)
    ↓
Story 3.2 (Generic 타입) ← Story 3.3 (Strict 모드)
    ↓
Epic 4 (Custom Hooks) 📝
```

## 🏗️ 타입 시스템 아키텍처

### Before (현재)
```typescript
// 각 컴포넌트에 분산된 타입 정의
// ProductCard.tsx
interface Product {
  id: string;
  name: string;
  // ...
}

// ColorChangeableProductCard.tsx  
interface ColorChangeableProduct {
  id: string;
  name: string;
  colors: ColorOption[];
  // ...
}

// 중복된 타입들...
```

### After (목표)
```typescript
// types/index.ts - 중앙 집중화
export interface BaseProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
}

export interface ColorChangeableProduct extends BaseProduct {
  colors: ColorOption[];
  defaultColorId: string;
}

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Generic 타입 활용
export type CardProps<T> = ComponentProps & {
  data: T;
  onSelect?: (item: T) => void;
};
```

## 📊 현재 타입 현황 분석

### 분산된 타입 위치
- **Product 관련**: 5개 파일에 중복 정의
- **Component Props**: 10개 컴포넌트에 개별 정의  
- **Color 관련**: 3개 파일에 유사한 타입
- **Event Handler**: 각 컴포넌트마다 다른 시그니처

### 예상 타입 에러 (Strict 모드 적용 시)
- **Implicit any**: 50+ 개소
- **Missing return types**: 30+ 개 함수
- **Unused parameters**: 20+ 개소
- **Optional property access**: 40+ 개소

## 🎯 완료 조건 (Epic Definition of Done)
- [ ] 모든 타입 정의가 types/ 폴더에 중앙 집중화
- [ ] 중복된 타입 정의 100% 제거
- [ ] Generic 타입 시스템으로 재사용성 극대화
- [ ] TypeScript strict 모드 적용 및 모든 에러 해결
- [ ] 타입 커버리지 95% 이상
- [ ] 모든 컴포넌트에서 중앙 타입 사용
- [ ] 런타임 타입 에러 0건

## 🚨 리스크 요소

### High Risk
- **대규모 타입 변경**: 기존 코드와의 호환성 문제
- **Mitigation**: 점진적 마이그레이션 + 하위 호환성 보장

### Medium Risk
- **Generic 타입 복잡도**: 너무 복잡한 타입으로 인한 가독성 저하
- **Mitigation**: 적절한 추상화 레벨 유지 + 문서화

### Low Risk
- **빌드 시간 증가**: Strict 모드로 인한 컴파일 시간 증가
- **Mitigation**: 타입 체크 최적화 + 증분 컴파일

## 📈 성공 지표
- **타입 안전성**: 런타임 타입 에러 100% 제거
- **개발 생산성**: IDE 자동완성 정확도 90% 이상
- **코드 품질**: 타입 관련 코드 리뷰 피드백 70% 감소
- **유지보수성**: 새로운 타입 추가 시 일관성 100%

## 🔧 타입 설계 원칙

### 1. 기본 원칙
- **Single Source of Truth**: 하나의 타입은 한 곳에서만 정의
- **Composition over Inheritance**: 상속보다는 합성 활용
- **Generic First**: 재사용 가능한 Generic 타입 우선

### 2. 네이밍 컨벤션
```typescript
// Interface: PascalCase
interface UserProfile { }

// Type Alias: PascalCase  
type ButtonVariant = 'primary' | 'secondary';

// Generic Parameter: T, U, V... 또는 의미있는 이름
type ApiResponse<TData> = { }
```

### 3. 파일 구조
```
types/
├── index.ts          # 메인 export
├── common.ts         # 공통 타입
├── components.ts     # 컴포넌트 Props
├── products.ts       # 제품 관련 타입
├── api.ts           # API 응답 타입
└── utils.ts         # 유틸리티 타입
```

## 🧪 타입 테스트 전략

### 타입 레벨 테스트
```typescript
// types/__tests__/type-tests.ts
import { expectType } from 'tsd';
import { ProductCard, ColorChangeableProduct } from '../index';

// 타입이 올바르게 추론되는지 테스트
expectType<ColorChangeableProduct>({
  id: '1',
  name: 'Test',
  colors: [],
  defaultColorId: 'default'
});
```

### 런타임 테스트
```typescript
// 타입 가드 함수 테스트
describe('Type Guards', () => {
  it('isColorChangeableProduct correctly identifies product type', () => {
    expect(isColorChangeableProduct(colorProduct)).toBe(true);
    expect(isColorChangeableProduct(regularProduct)).toBe(false);
  });
});
```

## 🔄 마이그레이션 전략

### Phase 1: 중앙 타입 생성
1. 기존 타입들 수집 및 분석
2. 공통 인터페이스 추출
3. types/ 폴더에 중앙 타입 정의

### Phase 2: 점진적 적용
1. 핵심 컴포넌트부터 중앙 타입 적용
2. 기존 로컬 타입과 병행 사용
3. 충돌 없음 확인 후 로컬 타입 제거

### Phase 3: Strict 모드 적용
1. 타입 에러 목록 작성
2. 우선순위별로 순차 해결
3. 모든 에러 해결 후 strict 모드 활성화

## 📚 참고 자료 및 도구

### TypeScript 유틸리티 타입 활용
```typescript
// 기본 유틸리티 타입
Partial<T>          // 모든 프로퍼티를 optional로
Required<T>         // 모든 프로퍼티를 required로  
Pick<T, K>         // 특정 프로퍼티만 선택
Omit<T, K>         // 특정 프로퍼티 제외

// 커스텀 유틸리티 타입
type WithRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;
```

### 추천 도구
- **tsd**: 타입 레벨 테스트
- **typescript-json-schema**: 타입에서 JSON 스키마 생성
- **quicktype**: JSON에서 타입 생성

---

*마지막 업데이트: 2025-01-28*  
*다음 리뷰: Epic 2 완료 후*