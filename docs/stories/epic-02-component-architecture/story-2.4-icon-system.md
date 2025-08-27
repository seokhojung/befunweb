# Story 2.4: 아이콘 시스템 통합

## 📋 Story 카드
**Title**: 아이콘 시스템 통합  
**Epic**: Component Architecture Restructuring  
**Priority**: P1 (High)  
**Points**: 3점  
**Assignee**: TBD  
**Sprint**: TBD

## 📝 User Story
```
As a 개발자
I want 프로젝트의 모든 아이콘이 일관된 시스템으로 관리되어
So that 아이콘 사용과 유지보수가 쉬워진다
```

## ✅ Acceptance Criteria
- [ ] 기존 StorageIcon이 새로운 아이콘 시스템에 포함된다
- [ ] 누락된 MenuIcon, SearchIcon 등 필수 아이콘들이 추가된다
- [ ] 모든 아이콘이 일관된 Props 인터페이스를 가진다
- [ ] 아이콘 크기, 색상이 통일된 방식으로 제어된다
- [ ] 아이콘 컴포넌트들이 접근성 기준을 만족한다
- [ ] Tree-shaking이 가능한 구조로 구성된다

## 🔧 세분화된 Technical Tasks (3점)

### Task 1: 현재 아이콘 사용 현황 분석 (0.5점)
- [ ] 기존 StorageIcon 사용처 파악
- [ ] Header/Footer에서 필요한 아이콘 목록 정리
  - MenuIcon (햄버거 메뉴)
  - SearchIcon (검색)
  - CartIcon (장바구니)
  - UserIcon (사용자)
  - CloseIcon (닫기)
- [ ] 각 섹션에서 필요한 아이콘들 조사
- [ ] 아이콘 크기/색상 패턴 분석

### Task 2: 아이콘 컴포넌트 표준화 (1점)
- [ ] 기본 아이콘 Props 인터페이스 정의
  ```typescript
  interface IconProps {
    size?: number | 'sm' | 'md' | 'lg' | 'xl';
    color?: string;
    className?: string;
    'aria-label'?: string;
  }
  ```
- [ ] StorageIcon을 새 인터페이스로 리팩토링
- [ ] 아이콘 기본 스타일 및 크기 정의
- [ ] 접근성 속성 (aria-label, role) 추가

### Task 3: 필수 아이콘 컴포넌트 생성 (1점)
- [ ] MenuIcon 생성 (Header 햄버거 메뉴용)
- [ ] SearchIcon 생성 (검색 기능용)
- [ ] CartIcon 생성 (장바구니용)
- [ ] UserIcon 생성 (사용자 프로필용)
- [ ] CloseIcon 생성 (모달/메뉴 닫기용)
- [ ] ArrowIcon 생성 (방향 표시용)

### Task 4: 아이콘 시스템 통합 및 최적화 (0.5점)
- [ ] `icons/index.ts` 파일 업데이트
- [ ] Tree-shaking 최적화 (개별 export)
- [ ] 아이콘 사용 가이드라인 문서 작성
- [ ] TypeScript 타입 정의 완성

## 🏗️ Implementation Details

### 아이콘 컴포넌트 구조

#### 기본 Props 인터페이스
```typescript
// src/components/icons/types.ts
export interface BaseIconProps {
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

// 크기 매핑
export const ICON_SIZES = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;
```

#### 아이콘 컴포넌트 템플릿
```typescript
// src/components/icons/MenuIcon.tsx
import React from 'react';
import { BaseIconProps, ICON_SIZES } from './types';

export interface MenuIconProps extends BaseIconProps {}

export default function MenuIcon({ 
  size = 'md', 
  color = 'currentColor',
  className = '',
  'aria-label': ariaLabel = 'Menu',
  'aria-hidden': ariaHidden,
  ...props 
}: MenuIconProps) {
  const iconSize = typeof size === 'string' ? ICON_SIZES[size] : size;
  
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
      role={ariaHidden ? undefined : 'img'}
      {...props}
    >
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );
}
```

### 생성할 아이콘 목록

| 아이콘명 | 용도 | 우선순위 | SVG 소스 |
|----------|------|----------|----------|
| **MenuIcon** | Header 햄버거 메뉴 | Critical | Lucide/Heroicons |
| **SearchIcon** | 검색 기능 | High | Lucide/Heroicons |
| **CartIcon** | 장바구니 | High | Lucide/Heroicons |
| **UserIcon** | 사용자 프로필 | Medium | Lucide/Heroicons |
| **CloseIcon** | 닫기/취소 | High | Lucide/Heroicons |
| **ArrowIcon** | 방향 표시 | Medium | Lucide/Heroicons |
| **StorageIcon** | 기존 아이콘 | Low | 이미 존재 |

### Index 파일 구조
```typescript
// src/components/icons/index.ts
export { default as StorageIcon } from './StorageIcon';
export { default as MenuIcon } from './MenuIcon';
export { default as SearchIcon } from './SearchIcon';
export { default as CartIcon } from './CartIcon';
export { default as UserIcon } from './UserIcon';
export { default as CloseIcon } from './CloseIcon';
export { default as ArrowIcon } from './ArrowIcon';

// 타입들도 함께 export
export type { BaseIconProps } from './types';
export type { MenuIconProps } from './MenuIcon';
export type { SearchIconProps } from './SearchIcon';
export type { CartIconProps } from './CartIcon';
export type { UserIconProps } from './UserIcon';
export type { CloseIconProps } from './CloseIcon';
export type { ArrowIconProps } from './ArrowIcon';

// 상수 export
export { ICON_SIZES } from './types';
```

## 🧪 Testing Strategy

### 아이콘 컴포넌트 테스트
```typescript
// src/components/icons/__tests__/MenuIcon.test.tsx
describe('MenuIcon Component', () => {
  test('기본 props로 렌더링된다', () => {
    render(<MenuIcon />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('aria-label', 'Menu');
    expect(icon).toHaveAttribute('width', '20');
    expect(icon).toHaveAttribute('height', '20');
  });

  test('사이즈 prop이 올바르게 적용된다', () => {
    render(<MenuIcon size="lg" />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
  });

  test('색상 prop이 올바르게 적용된다', () => {
    render(<MenuIcon color="#ff0000" />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('stroke', '#ff0000');
  });

  test('접근성 속성이 올바르게 설정된다', () => {
    render(<MenuIcon aria-label="Open menu" />);
    const icon = screen.getByRole('img');
    expect(icon).toHaveAttribute('aria-label', 'Open menu');
  });

  test('aria-hidden이 설정되면 role이 제거된다', () => {
    render(<MenuIcon aria-hidden={true} />);
    const icon = screen.getByLabelText('Menu'); // role="img"가 없으므로 svg 요소로 찾아야 함
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });
});
```

### 아이콘 시스템 통합 테스트
```typescript
describe('Icon System Integration', () => {
  test('모든 아이콘을 import할 수 있다', () => {
    const icons = require('@/components/icons');
    expect(icons.MenuIcon).toBeDefined();
    expect(icons.SearchIcon).toBeDefined();
    expect(icons.CartIcon).toBeDefined();
    expect(icons.UserIcon).toBeDefined();
    expect(icons.CloseIcon).toBeDefined();
    expect(icons.ArrowIcon).toBeDefined();
    expect(icons.StorageIcon).toBeDefined();
  });

  test('아이콘 크기 상수가 올바르다', () => {
    const { ICON_SIZES } = require('@/components/icons');
    expect(ICON_SIZES.sm).toBe(16);
    expect(ICON_SIZES.md).toBe(20);
    expect(ICON_SIZES.lg).toBe(24);
    expect(ICON_SIZES.xl).toBe(32);
  });
});
```

## 📊 Definition of Done Checklist
- [ ] 기존 StorageIcon이 새 인터페이스로 리팩토링 완료
- [ ] 6개 필수 아이콘 컴포넌트 생성 완료
- [ ] 모든 아이콘이 일관된 Props 인터페이스 사용
- [ ] 아이콘 크기/색상 시스템 구축 완료
- [ ] 접근성 속성 (aria-label, role) 모든 아이콘에 적용
- [ ] `icons/index.ts` 파일 업데이트 완료
- [ ] TypeScript 컴파일 에러 없음
- [ ] 모든 아이콘 테스트 통과
- [ ] Tree-shaking 최적화 구조 완성

## 🚨 Potential Blockers & Mitigations

### Blocker 1: SVG 아이콘 소스 라이선스 이슈
**Risk**: 사용할 아이콘의 라이선스 문제 발생 가능  
**Mitigation**: MIT 라이선스의 Lucide React 아이콘 사용, 또는 자체 제작

### Blocker 2: 아이콘 크기/색상 시스템 복잡도
**Risk**: 다양한 사용처에서 요구하는 크기/색상 조합의 복잡성  
**Mitigation**: CSS 변수 활용, Tailwind CSS 클래스와 호환되는 구조 설계

### Blocker 3: 기존 StorageIcon 사용처 영향
**Risk**: 기존 아이콘 리팩토링으로 인한 UI 깨짐  
**Mitigation**: 기존 Props와 호환되는 방식으로 점진적 마이그레이션

## 🔗 Related Stories
- **Depends on**: Story 2.2 (컴포넌트 파일 이동) ✅ 
- **Blocks**: 없음 (독립적 실행 가능)
- **Related**: Story 1.1 (Header 컴포넌트에서 아이콘 사용)

## 📝 아이콘 사용 가이드라인

### 기본 사용법
```typescript
import { MenuIcon, SearchIcon } from '@/components/icons';

// 기본 사용
<MenuIcon />

// 크기 지정
<SearchIcon size="lg" />
<CartIcon size={32} />

// 색상 지정
<UserIcon color="#0066cc" />
<CloseIcon className="text-red-500" />

// 접근성
<MenuIcon aria-label="메뉴 열기" />
<CloseIcon aria-hidden={true} />
```

### 권장 사항
- 동일한 기능의 아이콘은 같은 크기 사용
- 색상은 CSS 변수 또는 Tailwind 클래스 활용
- 장식용 아이콘은 `aria-hidden={true}` 설정
- 기능적 아이콘은 명확한 `aria-label` 제공

---

*작성일: 2025-01-28*  
*최종 수정일: 2025-01-28*