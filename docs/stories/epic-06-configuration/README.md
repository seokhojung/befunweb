# Epic 6: Configuration & Constants Management

## 🎯 Epic 목표
상수와 환경 설정을 중앙에서 관리하여 유지보수성과 배포 효율성을 향상시키고 환경별 설정 관리 체계화

## 📊 Epic 정보
- **포인트**: 7점 (수정됨: 기존 4점)
- **예상 기간**: 1주
- **우선순위**: P3 (Low)
- **의존성**: 다른 Epic들과 독립적 실행 가능

## 📋 Story 목록

### Story 6.1: 상수 중앙화
- **포인트**: 3점
- **상태**: 📝 To Do
- **담당자**: TBD
- **파일**: `story-6.1-constants-centralization.md`

### Story 6.2: 환경 설정 시스템
- **포인트**: 2점
- **상태**: 📝 To Do
- **담당자**: TBD
- **파일**: `story-6.2-environment-config.md`

### Story 6.3: 빌드 최적화 설정
- **포인트**: 2점
- **상태**: 📝 To Do
- **담당자**: TBD
- **파일**: `story-6.3-build-optimization.md`

## 🔗 의존성 관계
```
독립 실행 가능 (다른 Epic과 병렬 진행)
    ↓
Story 6.1 (상수 중앙화)
    ↓
Story 6.2 (환경 설정) ← Story 6.3 (빌드 최적화)
    ↓
전체 리팩토링 완료 🎉
```

## 📊 현재 설정 현황 분석

### 분산된 상수들
```typescript
// 현재: 각 파일에 하드코딩된 상수들
// Header.tsx
const SCROLL_THRESHOLD = 100;
const Z_INDEX = 50;

// ColorChangeableProductCard.tsx  
const IMAGE_SIZES = "(max-width: 768px) 244px, 300px";

// ProductColorSection.tsx
const MOBILE_BREAKPOINT = 768;

// globals.css
.h-20 { height: 5rem; }  /* 80px */
.lg:h-24 { height: 6rem; }  /* 96px */
```

### 환경 설정 이슈
```typescript
// 현재: 하드코딩된 URL들
const CONFIGURATOR_URL = "https://befun241204.netlify.app/";
const COMPANY_WEBSITE = "https://uable.co.kr";

// 환경별 설정 없음
// 개발/스테이징/프로덕션 구분 없이 동일한 값 사용
```

## 🏗️ 중앙화된 설정 아키텍처

### After (목표 구조)
```
src/
├── constants/
│   ├── index.ts          # 메인 export
│   ├── breakpoints.ts    # 반응형 브레이크포인트
│   ├── colors.ts         # 컬러 팔레트
│   ├── dimensions.ts     # 크기, 간격 상수
│   └── zIndex.ts         # Z-index 계층
├── config/
│   ├── index.ts          # 환경별 설정
│   ├── development.ts    # 개발 환경
│   ├── staging.ts        # 스테이징 환경
│   ├── production.ts     # 프로덕션 환경
│   └── types.ts          # 설정 타입 정의
└── utils/
    ├── env.ts           # 환경 변수 헬퍼
    └── config.ts        # 설정 유틸리티
```

### 상수 분류 체계

#### 1. 디자인 시스템 상수
```typescript
// constants/design.ts
export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,  
  desktop: 1280,
  large: 1536,
} as const;

export const SPACING = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
} as const;

export const Z_INDEX = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  banner: 30,
  overlay: 40,
  modal: 50,
  popover: 60,
  skipNav: 70,
  toast: 80,
  tooltip: 90,
} as const;
```

#### 2. 컴포넌트별 상수
```typescript
// constants/components.ts
export const HEADER = {
  HEIGHT: {
    mobile: '5rem',      // 80px
    desktop: '6rem',     // 96px
  },
  SCROLL_THRESHOLD: 100,
  Z_INDEX: Z_INDEX.sticky,
} as const;

export const IMAGE = {
  SIZES: {
    card: "(max-width: 768px) 244px, (max-width: 1024px) 300px, 350px",
    hero: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  },
  QUALITY: 85,
  FORMAT: ['avif', 'webp', 'jpg'] as const,
} as const;
```

#### 3. 애플리케이션 설정
```typescript
// config/index.ts
interface AppConfig {
  app: {
    name: string;
    version: string;
    description: string;
  };
  api: {
    baseUrl: string;
    timeout: number;
  };
  external: {
    configurator: string;
    company: string;
  };
  features: {
    analytics: boolean;
    sentry: boolean;
    hotjar: boolean;
  };
}

export const config: AppConfig = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || 'BEFUN',
    version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    description: 'Customizable furniture platform',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '5000'),
  },
  external: {
    configurator: process.env.NEXT_PUBLIC_CONFIGURATOR_URL || 'https://befun241204.netlify.app/',
    company: process.env.NEXT_PUBLIC_COMPANY_URL || 'https://uable.co.kr',
  },
  features: {
    analytics: process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
    sentry: process.env.NEXT_PUBLIC_SENTRY_ENABLED === 'true',
    hotjar: process.env.NEXT_PUBLIC_HOTJAR_ENABLED === 'true',
  },
};
```

## 🎯 완료 조건 (Epic Definition of Done)
- [ ] 모든 매직 넘버가 상수로 정의됨
- [ ] 환경별 설정이 체계적으로 관리됨
- [ ] TypeScript 타입 안전성 100% 보장
- [ ] 환경 변수 검증 시스템 구축
- [ ] 설정 변경 시 자동 타입 체크
- [ ] 개발자 친화적인 설정 인터페이스
- [ ] 빌드 시 설정 최적화 적용
- [ ] 설정 문서화 완료

## 📊 마이그레이션 현황

### 상수화할 항목들 (30+ 개)
```typescript
// 하드코딩된 값들 목록
- 브레이크포인트: 768, 1024, 1280 (3곳)
- Z-index: 40, 50, 60 (5곳)  
- 헤더 높이: 80px, 96px (4곳)
- 이미지 크기: 244px, 300px, 350px (8곳)
- 스크롤 임계값: 100px (2곳)
- 애니메이션 시간: 200ms, 300ms (6곳)
- API 타임아웃: 5000ms (3곳)
```

### 환경 변수화할 항목들
```bash
# 현재 하드코딩된 URL들
NEXT_PUBLIC_CONFIGURATOR_URL=https://befun241204.netlify.app/
NEXT_PUBLIC_COMPANY_URL=https://uable.co.kr
NEXT_PUBLIC_API_BASE_URL=/api

# 기능 플래그
NEXT_PUBLIC_ANALYTICS_ENABLED=false
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_HOTJAR_ID=
```

## 🚨 리스크 요소

### Medium Risk
- **타입 안전성**: 잘못된 상수 참조로 인한 런타임 에러
- **Mitigation**: const assertion + TypeScript strict 모드

### Low Risk
- **빌드 크기**: 상수 파일로 인한 번들 크기 증가
- **Mitigation**: Tree shaking + 필요한 상수만 import

### Low Risk
- **환경 변수 누락**: 배포 시 필수 환경 변수 누락
- **Mitigation**: 환경 변수 검증 스크립트

## 📈 성공 지표
- **매직 넘버 제거**: 하드코딩된 값 95% 제거
- **환경 설정**: 환경별 다른 설정 100% 적용
- **유지보수성**: 설정 변경 시간 80% 단축
- **타입 안전성**: 설정 관련 타입 에러 100% 방지

## 🔧 설정 관리 도구

### 환경 변수 검증
```typescript
// utils/validateEnv.ts
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1),
  NEXT_PUBLIC_CONFIGURATOR_URL: z.string().url(),
  NEXT_PUBLIC_COMPANY_URL: z.string().url(),
  NEXT_PUBLIC_ANALYTICS_ENABLED: z.enum(['true', 'false']).optional(),
});

export function validateEnv() {
  try {
    envSchema.parse(process.env);
  } catch (error) {
    console.error('❌ Invalid environment variables:', error.errors);
    process.exit(1);
  }
}
```

### 설정 타입 생성기
```typescript
// scripts/generateConfigTypes.ts
// 환경 변수에서 TypeScript 타입 자동 생성
export type ConfigKeys = keyof typeof config;
export type ConfigValue<K extends ConfigKeys> = typeof config[K];
```

## 🎯 사용법 예제

### Before vs After
```typescript
// Before: 하드코딩
function Header() {
  return (
    <header 
      className="fixed top-0 z-50 h-20 md:h-24"
      style={{ zIndex: 50 }}
    >
      {/* 100px 스크롤 시 헤더 숨김 */}
      {scrollY > 100 && '...'}
    </header>
  );
}

// After: 상수 활용
import { HEADER, Z_INDEX } from '@/constants';

function Header() {
  return (
    <header 
      className={`fixed top-0 ${HEADER.HEIGHT.mobile} ${HEADER.HEIGHT.desktop}`}
      style={{ zIndex: Z_INDEX.sticky }}
    >
      {scrollY > HEADER.SCROLL_THRESHOLD && '...'}
    </header>
  );
}
```

### 환경별 설정 사용
```typescript
// 환경별 다른 동작
import { config } from '@/config';

function Analytics() {
  if (!config.features.analytics) {
    return null;
  }
  
  return <AnalyticsProvider />;
}
```

## 🔄 다른 Epic과의 연관성

### 모든 Epic에 도움
- **Epic 1**: Layout 관련 상수 제공
- **Epic 2**: 폴더 구조와 일관된 상수 구조
- **Epic 3**: 타입 안전한 상수 정의
- **Epic 4**: Hook에서 사용할 상수 제공
- **Epic 5**: 성능 최적화 관련 설정

## 📚 설정 관리 Best Practices
1. **환경 변수는 최소한으로**: 필요한 것만 노출
2. **타입 안전성 우선**: 모든 설정에 타입 정의
3. **기본값 제공**: 환경 변수 누락 시 fallback
4. **검증 로직**: 잘못된 설정 조기 감지
5. **문서화**: 모든 설정 옵션 문서화

---

*마지막 업데이트: 2025-01-28*  
*다음 리뷰: 다른 Epic과 병렬 진행 가능*