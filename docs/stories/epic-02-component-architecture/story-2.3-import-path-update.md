# Story 2.3: Import 경로 대량 업데이트

## 📋 Story 카드
**Title**: Import 경로 대량 업데이트  
**Epic**: Component Architecture Restructuring  
**Priority**: P0 (Critical)  
**Points**: 5점  
**Assignee**: TBD  
**Sprint**: TBD

## 📝 User Story
```
As a 개발자
I want 새로운 폴더 구조에 맞게 모든 import 경로가 업데이트되어
So that 빌드 에러 없이 모든 컴포넌트를 사용할 수 있다
```

## ✅ Acceptance Criteria
- [ ] 모든 페이지의 import 경로가 새 구조로 업데이트된다
- [ ] 컴포넌트 간 import 경로가 새 구조로 업데이트된다
- [ ] TypeScript 컴파일 에러가 없다
- [ ] 모든 페이지와 컴포넌트가 정상 작동한다
- [ ] import 경로가 일관된 패턴을 따른다

## 🔧 세분화된 Technical Tasks (5점)

### Task 1: App Router 페이지 Import 업데이트 (2점)

#### 1.1: 메인 페이지들 업데이트 (1점)
- [ ] `app/page.tsx` (홈페이지)
  ```typescript
  // Before
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'
  import HeroSection from '@/components/HeroSection'
  import ProductGrid from '@/components/ProductGrid'
  
  // After
  import { Header, Footer } from '@/components/layout'
  import { HeroSection, ProductGrid } from '@/components/sections'
  ```

- [ ] `app/products/page.tsx` (상품 페이지)
  ```typescript
  // Before
  import Header from '@/components/Header'
  import ProductGrid from '@/components/ProductGrid'
  
  // After  
  import { Header } from '@/components/layout'
  import { ProductGrid } from '@/components/sections'
  ```

#### 1.2: 상품 상세 및 기타 페이지 (1점)
- [ ] `app/products/[id]/page.tsx` (상품 상세)
- [ ] `app/products/[id]/ProductDetailClient.tsx`
- [ ] `app/configurator/page.tsx` (구성기)
- [ ] `app/not-found.tsx` (404 페이지)

### Task 2: 컴포넌트 간 Import 업데이트 (2점)

#### 2.1: Section 컴포넌트 내부 Import (1점)
- [ ] `sections/ProductGrid.tsx` 내의 card 컴포넌트 import
  ```typescript
  // Before
  import ProductCard from '../ProductCard'
  import CategoryCard from '../CategoryCard'
  
  // After
  import { ProductCard, CategoryCard } from '../cards'
  ```

- [ ] `sections/HeroSection.tsx` 내의 UI 컴포넌트 import
- [ ] `sections/BrandHighlights.tsx` 내의 관련 import
- [ ] `sections/Sustainability.tsx` 내의 관련 import

#### 2.2: Card 컴포넌트 내부 Import (1점)
- [ ] `cards/ProductCard.tsx` 내의 UI 컴포넌트 import
  ```typescript
  // Before
  import { Button } from '../ui/button'
  import { Badge } from '../ui/badge'
  
  // After
  import { Button, Badge } from '../ui'
  ```

- [ ] `cards/ColorChangeableProductCard.tsx` 내의 관련 import
- [ ] `cards/CategoryCard.tsx` 내의 관련 import

### Task 3: Layout 컴포넌트 Import 정리 (0.5점)
- [ ] `layout/Header.tsx` 내부 import 정리
- [ ] `layout/Footer.tsx` 내부 import 정리  
- [ ] `layout/Layout.tsx` 내부 import 정리 (Story 1.1에서 생성)

### Task 4: 전체 Import Path 검증 및 최적화 (0.5점)
- [ ] 절대 경로 vs 상대 경로 일관성 확보
- [ ] 사용하지 않는 import 제거
- [ ] Import 순서 정리 (외부 라이브러리 → 내부 컴포넌트)
- [ ] TypeScript path mapping 활용 검토

## 🏗️ Implementation Details

### Import 패턴 변경 매트릭스

| 파일 위치 | 변경 전 | 변경 후 | 변경 이유 |
|-----------|---------|---------|-----------|
| `app/page.tsx` | `import Header from '@/components/Header'` | `import { Header } from '@/components/layout'` | Named export로 통일 |
| `sections/ProductGrid.tsx` | `import ProductCard from '../ProductCard'` | `import { ProductCard } from '../cards'` | 새 폴더 구조 반영 |
| `cards/ProductCard.tsx` | `import { Button } from '../ui/button'` | `import { Button } from '../ui'` | Index 파일 활용 |

### 예상 Import 변경사항 (총 30+ 위치)

#### App Router 페이지 (6개 파일)
```typescript
// app/page.tsx
- import Header from '@/components/Header'
- import Footer from '@/components/Footer'  
- import HeroSection from '@/components/HeroSection'
- import ProductGrid from '@/components/ProductGrid'
- import BrandHighlights from '@/components/BrandHighlights'
- import Sustainability from '@/components/Sustainability'
- import PromoBanner from '@/components/PromoBanner'
+ import { Header, Footer } from '@/components/layout'
+ import { HeroSection, ProductGrid, BrandHighlights, Sustainability, PromoBanner } from '@/components/sections'

// app/products/page.tsx
- import Header from '@/components/Header'
- import ProductGrid from '@/components/ProductGrid'
+ import { Header } from '@/components/layout'
+ import { ProductGrid } from '@/components/sections'

// app/products/[id]/ProductDetailClient.tsx
- import Header from '@/components/Header'
- import ProductCard from '@/components/ProductCard'
+ import { Header } from '@/components/layout'
+ import { ProductCard } from '@/components/cards'

// app/configurator/page.tsx
- import Header from '@/components/Header'
+ import { Header } from '@/components/layout'

// app/not-found.tsx  
- import Header from '@/components/Header'
- import Footer from '@/components/Footer'
+ import { Header, Footer } from '@/components/layout'
```

#### Section 컴포넌트 내부 (6개 파일)
```typescript
// sections/ProductGrid.tsx
- import ProductCard from '../ProductCard'
- import ColorChangeableProductCard from '../ColorChangeableProductCard'  
- import CategoryCard from '../CategoryCard'
+ import { ProductCard, ColorChangeableProductCard, CategoryCard } from '../cards'

// sections/HeroSection.tsx
- import { Button } from '../ui/button'
- import { Card } from '../ui/card'
+ import { Button, Card } from '../ui'

// 기타 sections 컴포넌트들도 유사한 패턴
```

#### Card 컴포넌트 내부 (3개 파일)
```typescript
// cards/ProductCard.tsx
- import { Button } from '../ui/button'
- import { Badge } from '../ui/badge'
- import { Card } from '../ui/card'
+ import { Button, Badge, Card } from '../ui'

// cards/ColorChangeableProductCard.tsx
- import { Button } from '../ui/button'
- import { AnimatedCard } from '../ui/animated-card'
+ import { Button, AnimatedCard } from '../ui'

// cards/CategoryCard.tsx
- import { Card } from '../ui/card'
+ import { Card } from '../ui'
```

## 🧪 Testing Strategy

### 자동화된 Import 검증
```bash
# 1. TypeScript 컴파일 검증
npx tsc --noEmit

# 2. 사용되지 않는 import 찾기
npx eslint src/ --ext .ts,.tsx --fix

# 3. Import 순서 정리
npx prettier --write "src/**/*.{ts,tsx}"

# 4. 모든 컴포넌트 import 테스트
node -e "
const components = require('./src/components');
console.log('Successfully imported:', Object.keys(components).length, 'components');
"
```

### 페이지별 렌더링 테스트
```typescript
describe('Import Path Update Tests', () => {
  test('홈페이지 컴포넌트들이 정상 import된다', () => {
    const HomePage = require('@/app/page');
    expect(() => render(<HomePage />)).not.toThrow();
  });

  test('상품 페이지 컴포넌트들이 정상 import된다', () => {
    const ProductsPage = require('@/app/products/page');
    expect(() => render(<ProductsPage />)).not.toThrow();
  });

  test('모든 section 컴포넌트가 개별적으로 import 가능하다', () => {
    const { HeroSection, ProductGrid, BrandHighlights } = require('@/components/sections');
    expect(HeroSection).toBeDefined();
    expect(ProductGrid).toBeDefined();
    expect(BrandHighlights).toBeDefined();
  });
});
```

## 📊 Definition of Done Checklist
- [ ] 모든 App Router 페이지의 import 경로 업데이트 완료
- [ ] 모든 컴포넌트 간 import 경로 업데이트 완료
- [ ] TypeScript 컴파일 에러 없음
- [ ] ESLint import 관련 에러 없음
- [ ] 모든 페이지 정상 렌더링 확인
- [ ] 사용하지 않는 import 제거 완료
- [ ] Import 순서 일관성 확보
- [ ] 성능 회귀 없음 (빌드 시간, 런타임 성능)

## 🚨 Potential Blockers & Mitigations

### Blocker 1: 순환 참조 (Circular Dependency) 발생
**Risk**: 새로운 import 구조로 인한 순환 참조 에러  
**Mitigation**: Import 의존성 그래프 분석, 단계적 업데이트로 순환 참조 방지

### Blocker 2: TypeScript Path Mapping 충돌  
**Risk**: `@/components` alias와 새 구조 간 충돌 가능성  
**Mitigation**: tsconfig.json의 paths 설정 검토, 필요시 조정

### Blocker 3: 동적 Import 누락
**Risk**: Next.js dynamic import나 lazy loading에서 경로 업데이트 누락  
**Mitigation**: 코드베이스 전체에서 dynamic import 패턴 검색 및 업데이트

## 🔗 Related Stories
- **Depends on**: Story 2.2 (컴포넌트 파일 이동) ✅ 필수
- **Blocks**: Epic 3 (타입 시스템 개선)
- **Related**: Story 2.4 (아이콘 시스템 통합)

## 📝 Update Commands & Tools

### 대량 찾기 및 바꾸기
```bash
# Header import 업데이트
find src/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/Header|@/components/layout|g'

# Section components import 업데이트  
find src/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|@/components/HeroSection|@/components/sections|g'

# UI components import 업데이트
find src/ -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|../ui/button|../ui|g'
```

### VS Code 정규식 찾기 및 바꾸기
```regex
# 찾기 패턴
import\s+(\w+)\s+from\s+['"]@/components/(\w+)['"]

# 바꾸기 패턴 (섹션 컴포넌트의 경우)
import { $1 } from '@/components/sections'
```

## 📈 Progress Tracking

### Import 업데이트 진행률
- [ ] **App Router 페이지 (0/6)**
  - [ ] `app/page.tsx`
  - [ ] `app/products/page.tsx` 
  - [ ] `app/products/[id]/page.tsx`
  - [ ] `app/products/[id]/ProductDetailClient.tsx`
  - [ ] `app/configurator/page.tsx`
  - [ ] `app/not-found.tsx`

- [ ] **Section 컴포넌트 (0/6)**
  - [ ] `sections/HeroSection.tsx`
  - [ ] `sections/ProductGrid.tsx`
  - [ ] `sections/BrandHighlights.tsx`
  - [ ] `sections/Sustainability.tsx`
  - [ ] `sections/ProductColorSection.tsx`
  - [ ] `sections/PromoBanner.tsx`

- [ ] **Card 컴포넌트 (0/3)**
  - [ ] `cards/ProductCard.tsx`
  - [ ] `cards/ColorChangeableProductCard.tsx`
  - [ ] `cards/CategoryCard.tsx`

- [ ] **Layout 컴포넌트 (0/3)**
  - [ ] `layout/Header.tsx`
  - [ ] `layout/Footer.tsx`
  - [ ] `layout/Layout.tsx`

---

*작성일: 2025-01-28*  
*최종 수정일: 2025-01-28*