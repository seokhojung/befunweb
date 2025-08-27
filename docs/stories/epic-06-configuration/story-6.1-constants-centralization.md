# Story 6.1: 상수 중앙화

## 📝 Story 정보
- **Epic**: Epic 6 - Configuration & Constants Management
- **포인트**: 3점
- **상태**: 📝 To Do
- **예상 소요시간**: 1일
- **우선순위**: Medium (유지보수성 향상)

## 🎯 Story 목표
분산된 매직 넘버와 하드코딩된 상수들을 중앙의 constants 폴더로 통합하여 유지보수성 향상

## 👤 사용자 스토리
**As a** 개발자  
**I want** 모든 상수가 중앙에서 관리되어  
**So that** 디자인 변경이나 설정 수정 시 한 곳에서만 변경할 수 있다

## 🔍 현재 상황 분석

### 분산된 매직 넘버들

#### Header.tsx의 하드코딩된 값들
```typescript
// src/components/Header.tsx
const SCROLL_THRESHOLD = 100; // 헤더 숨김/표시 임계값
const Z_INDEX = 50; // 헤더 z-index
```

#### ColorChangeableProductCard.tsx의 매직 넘버들
```typescript
// src/components/ColorChangeableProductCard.tsx
const IMAGE_SIZES = "(max-width: 768px) 244px, 300px"; // 이미지 반응형 크기
```

#### ProductColorSection.tsx의 브레이크포인트
```typescript
// src/components/ProductColorSection.tsx
const MOBILE_BREAKPOINT = 768; // 모바일 브레이크포인트
```

#### CSS에서의 하드코딩된 값들
```css
/* globals.css */
.h-20 { height: 5rem; }  /* 80px - 헤더 높이 */
.lg:h-24 { height: 6rem; } /* 96px - 데스크톱 헤더 높이 */
```

#### 기타 하드코딩된 URL들
```typescript
// 여러 컴포넌트에서 발견되는 하드코딩된 값들
const CONFIGURATOR_URL = "https://befun241204.netlify.app/";
const COMPANY_WEBSITE = "https://uable.co.kr";
```

### 문제점 분석
1. **중복 정의**: 같은 값이 여러 곳에서 반복 정의됨
2. **유지보수 어려움**: 값 변경 시 모든 파일을 수정해야 함
3. **일관성 부족**: 비슷한 용도의 값들이 서로 다름
4. **의미 파악 어려움**: 매직 넘버로 인해 의도 파악 어려움

## 🏗️ 중앙화된 상수 구조 설계

### 상수 폴더 구조
```
src/constants/
├── index.ts              # 메인 export
├── breakpoints.ts         # 반응형 브레이크포인트
├── colors.ts             # 컬러 팔레트
├── dimensions.ts         # 크기, 간격 관련
├── zIndex.ts             # Z-index 계층
├── components.ts         # 컴포넌트별 상수
├── urls.ts              # URL 관련 상수
└── animations.ts        # 애니메이션 관련 상수
```

### 상수 분류 및 정의

#### `src/constants/breakpoints.ts`
```typescript
// 반응형 브레이크포인트 상수
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
  large: 1536,
} as const;

// CSS에서 사용하기 위한 문자열 버전
export const BREAKPOINTS_PX = {
  mobile: '768px',
  tablet: '1024px', 
  desktop: '1280px',
  large: '1536px',
} as const;

// 미디어 쿼리 문자열
export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS_PX.mobile})`,
  tablet: `(max-width: ${BREAKPOINTS_PX.tablet})`,
  desktop: `(min-width: ${BREAKPOINTS_PX.desktop})`,
  large: `(min-width: ${BREAKPOINTS_PX.large})`,
} as const;
```

#### `src/constants/dimensions.ts`
```typescript
// 간격 및 크기 상수
export const SPACING = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px  
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem',    // 48px
  '3xl': '4rem',    // 64px
} as const;

export const HEADER_HEIGHT = {
  mobile: '5rem',      // 80px
  desktop: '6rem',     // 96px
} as const;

export const FOOTER_HEIGHT = {
  mobile: '12rem',     // 192px
  desktop: '10rem',    // 160px
} as const;

// 숫자 버전 (계산에 사용)
export const HEADER_HEIGHT_PX = {
  mobile: 80,
  desktop: 96,
} as const;
```

#### `src/constants/zIndex.ts`
```typescript
// Z-index 계층 관리
export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,        // Header sticky
  banner: 30,
  overlay: 40,       // 모달 배경
  modal: 50,         // 모달 컨텐츠
  popover: 60,
  skipNav: 70,
  toast: 80,
  tooltip: 90,
} as const;

// 컴포넌트별 Z-index 매핑
export const COMPONENT_Z_INDEX = {
  header: Z_INDEX.sticky,
  mobileMenu: Z_INDEX.overlay,
  modal: Z_INDEX.modal,
  toast: Z_INDEX.toast,
} as const;
```

#### `src/constants/components.ts`
```typescript
import { HEADER_HEIGHT, HEADER_HEIGHT_PX } from './dimensions';
import { COMPONENT_Z_INDEX } from './zIndex';
import { BREAKPOINTS } from './breakpoints';

// Header 관련 상수
export const HEADER = {
  HEIGHT: HEADER_HEIGHT,
  HEIGHT_PX: HEADER_HEIGHT_PX,
  SCROLL_THRESHOLD: 100, // 스크롤 시 헤더 숨김 임계값
  Z_INDEX: COMPONENT_Z_INDEX.header,
} as const;

// 이미지 관련 상수
export const IMAGE = {
  SIZES: {
    card: `(max-width: ${BREAKPOINTS.mobile}px) 244px, 300px`,
    hero: `(max-width: ${BREAKPOINTS.mobile}px) 100vw, (max-width: ${BREAKPOINTS.desktop}px) 50vw, 33vw`,
    thumbnail: '150px',
  },
  QUALITY: {
    low: 60,
    medium: 75,
    high: 85,
    maximum: 95,
  },
  FORMATS: ['avif', 'webp', 'jpg'] as const,
} as const;

// 애니메이션 상수
export const ANIMATION = {
  DURATION: {
    fast: '200ms',
    normal: '300ms', 
    slow: '500ms',
  },
  EASING: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;
```

#### `src/constants/colors.ts`
```typescript
// 컬러 팔레트 (디자인 시스템과 연동)
export const COLORS = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe', 
    500: '#0ea5e9',
    600: '#0284c7',
    900: '#0c4a6e',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    500: '#6b7280',
    900: '#111827',
  },
  semantic: {
    success: '#10b981',
    warning: '#f59e0b', 
    error: '#ef4444',
    info: '#3b82f6',
  },
} as const;

// CSS 변수로 사용할 컬러 매핑
export const CSS_COLORS = {
  '--color-primary': COLORS.primary[500],
  '--color-primary-dark': COLORS.primary[600],
  '--color-text': COLORS.gray[900],
  '--color-text-light': COLORS.gray[500],
  '--color-background': COLORS.gray[50],
} as const;
```

#### `src/constants/urls.ts`
```typescript
// 외부 URL 상수 (환경변수 없이 기본값)
export const EXTERNAL_URLS = {
  configurator: 'https://befun241204.netlify.app/',
  company: 'https://uable.co.kr',
  support: 'mailto:support@uable.co.kr',
  social: {
    instagram: 'https://instagram.com/uable_official',
    facebook: 'https://facebook.com/uable', 
    youtube: 'https://youtube.com/@uable',
  },
} as const;

// API 엔드포인트 (개발용)
export const API_ENDPOINTS = {
  products: '/api/products',
  categories: '/api/categories',
  search: '/api/search',
} as const;
```

#### `src/constants/index.ts`
```typescript
// 메인 export 파일
export * from './breakpoints';
export * from './dimensions';
export * from './zIndex';
export * from './components';
export * from './colors';
export * from './urls';

// 자주 사용되는 상수들의 직접 export
export {
  HEADER,
  IMAGE,
  ANIMATION,
} from './components';

export {
  BREAKPOINTS,
  MEDIA_QUERIES,
} from './breakpoints';

export {
  Z_INDEX,
  COMPONENT_Z_INDEX,
} from './zIndex';
```

## ✅ 수행 작업 (Acceptance Criteria)

### 1. 상수 수집 및 분류
- [ ] 모든 매직 넘버와 하드코딩된 값 수집
- [ ] 카테고리별로 상수 분류
- [ ] 중복된 값들 식별 및 통합

### 2. Constants 폴더 구조 생성
- [ ] `src/constants/` 폴더 생성
- [ ] 카테고리별 파일 생성
- [ ] 메인 index.ts 파일 생성

### 3. 상수 정의 및 타입 안전성 확보
- [ ] TypeScript const assertion 적용
- [ ] 적절한 타입 정의
- [ ] JSDoc 주석으로 문서화

### 4. 기존 코드 리팩토링
- [ ] Header 컴포넌트에서 중앙 상수 사용
- [ ] ProductCard 관련 컴포넌트들 업데이트
- [ ] CSS 값들을 JavaScript 상수와 연동

### 5. Import 경로 최적화
- [ ] 배럴 export로 깔끔한 import 구조
- [ ] Tree shaking 최적화
- [ ] IDE 자동완성 지원

## 🔧 구현 상세사항

### 사용법 예시

#### Before: 하드코딩
```typescript
// Header.tsx (Before)
function Header() {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) { // 매직 넘버
        setIsVisible(false);
      }
    };
  }, []);

  return (
    <header 
      className="fixed top-0 z-50 h-20 md:h-24" // 하드코딩된 클래스
      style={{ zIndex: 50 }} // 매직 넘버
    >
      {/* ... */}
    </header>
  );
}
```

#### After: 중앙 상수 사용
```typescript
// Header.tsx (After)
import { HEADER } from '@/constants';

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > HEADER.SCROLL_THRESHOLD) {
        setIsVisible(false);
      }
    };
  }, []);

  return (
    <header 
      className="fixed top-0"
      style={{ 
        zIndex: HEADER.Z_INDEX,
        height: HEADER.HEIGHT.mobile,
      }}
    >
      {/* ... */}
    </header>
  );
}
```

### CSS와 JavaScript 상수 연동

#### CSS 변수 생성
```typescript
// utils/generateCssVariables.ts
import { COLORS, SPACING, HEADER_HEIGHT } from '@/constants';

export function generateCssVariables() {
  const cssVariables: Record<string, string> = {
    // 컬러
    ...Object.entries(COLORS.primary).reduce((acc, [key, value]) => ({
      ...acc,
      [`--color-primary-${key}`]: value,
    }), {}),
    
    // 간격
    ...Object.entries(SPACING).reduce((acc, [key, value]) => ({
      ...acc,
      [`--spacing-${key}`]: value,
    }), {}),
    
    // 헤더 높이
    '--header-height-mobile': HEADER_HEIGHT.mobile,
    '--header-height-desktop': HEADER_HEIGHT.desktop,
  };
  
  return cssVariables;
}
```

#### Tailwind CSS 연동
```javascript
// tailwind.config.js
const { BREAKPOINTS, COLORS, SPACING } = require('./src/constants');

module.exports = {
  theme: {
    screens: {
      sm: `${BREAKPOINTS.mobile}px`,
      md: `${BREAKPOINTS.tablet}px`,
      lg: `${BREAKPOINTS.desktop}px`,
      xl: `${BREAKPOINTS.large}px`,
    },
    colors: {
      primary: COLORS.primary,
      gray: COLORS.gray,
    },
    spacing: SPACING,
    extend: {
      height: {
        'header-mobile': 'var(--header-height-mobile)',
        'header-desktop': 'var(--header-height-desktop)',
      },
    },
  },
};
```

## 🧪 검증 방법

### 상수 사용 검증
```typescript
// constants/__tests__/constants.test.ts
import { HEADER, BREAKPOINTS, Z_INDEX } from '../index';

describe('Constants', () => {
  it('should have consistent header configuration', () => {
    expect(HEADER.HEIGHT.mobile).toBeDefined();
    expect(HEADER.HEIGHT.desktop).toBeDefined();
    expect(HEADER.SCROLL_THRESHOLD).toBeGreaterThan(0);
    expect(HEADER.Z_INDEX).toBe(Z_INDEX.sticky);
  });

  it('should have valid breakpoints', () => {
    expect(BREAKPOINTS.mobile).toBeLessThan(BREAKPOINTS.tablet);
    expect(BREAKPOINTS.tablet).toBeLessThan(BREAKPOINTS.desktop);
    expect(BREAKPOINTS.desktop).toBeLessThan(BREAKPOINTS.large);
  });

  it('should have proper z-index hierarchy', () => {
    expect(Z_INDEX.base).toBe(0);
    expect(Z_INDEX.dropdown).toBeGreaterThan(Z_INDEX.base);
    expect(Z_INDEX.modal).toBeGreaterThan(Z_INDEX.overlay);
  });
});
```

### 타입 안전성 검증
```typescript
// 타입 레벨 테스트
import { expectType } from 'tsd';
import { HEADER, BREAKPOINTS } from '../constants';

// 상수가 읽기 전용인지 확인
expectType<readonly number>(BREAKPOINTS.mobile);
expectType<readonly string>(HEADER.HEIGHT.mobile);

// 객체 전체가 읽기 전용인지 확인
expectType<Readonly<typeof BREAKPOINTS>>(BREAKPOINTS);
```

## 📊 마이그레이션 계획

### Phase 1: 상수 수집 및 정의 (0.5일)
1. 모든 하드코딩된 값들 조사
2. 카테고리별 분류 및 중복 제거
3. Constants 폴더 구조 및 기본 파일 생성

### Phase 2: 핵심 컴포넌트 적용 (0.3일)
1. Header 컴포넌트 우선 적용
2. 카드 컴포넌트들 업데이트
3. 섹션 컴포넌트들 업데이트

### Phase 3: 검증 및 최적화 (0.2일)
1. 모든 매직 넘버가 제거되었는지 확인
2. 타입 안전성 검증
3. 빌드 및 테스트 검증

## 🚨 리스크 및 주의사항

### Low Risk: 상수 값 실수
- **문제**: 상수 정의 시 잘못된 값 설정
- **대응**: 기존 값과 비교 검증 + 테스트

### Low Risk: Tree Shaking 문제
- **문제**: 모든 상수를 import 시 번들 크기 증가
- **대응**: 필요한 상수만 named import 사용

## 📋 체크리스트

### 사전 준비
- [ ] 모든 매직 넘버 및 하드코딩된 값 수집
- [ ] 상수 분류 체계 설계
- [ ] 네이밍 컨벤션 확립

### 구현
- [ ] Constants 폴더 구조 생성
- [ ] 카테고리별 상수 파일 작성
- [ ] TypeScript 타입 안전성 확보
- [ ] Export 구조 최적화

### 적용
- [ ] 기존 컴포넌트들 리팩토링
- [ ] CSS 변수와 연동
- [ ] Tailwind 설정 업데이트

### 검증
- [ ] 모든 매직 넘버 제거 확인
- [ ] 기능 회귀 테스트
- [ ] 빌드 성공 확인
- [ ] 타입 체크 통과

## 🎯 완료 기준 (Definition of Done)

- [ ] 모든 매직 넘버가 중앙 상수로 대체됨
- [ ] 상수들이 의미있는 카테고리로 분류됨
- [ ] TypeScript 타입 안전성 100% 보장
- [ ] 기존 기능이 모두 정상 동작함
- [ ] 빌드 오류 없음
- [ ] 상수 사용법 문서화 완료

## 🔗 다음 Story 연결점

이 Story 완료 후:
- **Story 6.2**: 환경 설정 시스템 구축
- **Story 6.3**: 빌드 최적화 설정

---

**담당자**: TBD  
**생성일**: 2025-01-28  
**마지막 업데이트**: 2025-01-28