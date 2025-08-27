# Story 3.3: Strict TypeScript 설정 적용

## 📋 Story 카드
**Title**: Strict TypeScript 설정 적용  
**Epic**: Type System Enhancement  
**Priority**: P1 (High)  
**Points**: 5점  
**Assignee**: TBD  
**Sprint**: TBD

## 📝 User Story
```
As a 개발자
I want TypeScript의 strict 모드를 활성화하여
So that 런타임 에러를 사전에 방지하고 코드 품질을 향상시킬 수 있다
```

## ✅ Acceptance Criteria
- [ ] tsconfig.json에 strict 옵션들이 활성화된다
- [ ] 모든 TypeScript 에러가 수정된다
- [ ] 암묵적 any 타입이 제거된다
- [ ] Null/undefined 체크가 강화된다
- [ ] 타입 가드와 옵셔널 체이닝이 적용된다
- [ ] 빌드와 개발 환경에서 에러 없이 실행된다

## 🔧 세분화된 Technical Tasks (5점)

### Task 1: TypeScript 설정 강화 (1점)
- [ ] `tsconfig.json` strict 옵션 활성화
  ```json
  {
    "compilerOptions": {
      "strict": true,
      "noImplicitAny": true,
      "strictNullChecks": true,
      "strictFunctionTypes": true,
      "strictBindCallApply": true,
      "strictPropertyInitialization": true,
      "noImplicitReturns": true,
      "noImplicitThis": true,
      "noUncheckedIndexedAccess": true
    }
  }
  ```
- [ ] ESLint TypeScript 규칙 강화
- [ ] 개발 환경 설정 업데이트

### Task 2: 암묵적 Any 타입 제거 (1.5점)
- [ ] 컴포넌트 Props 타입 명시
  ```typescript
  // Before
  function Component(props: any) { }
  
  // After  
  interface ComponentProps {
    title: string;
    data?: Product[];
  }
  function Component({ title, data }: ComponentProps) { }
  ```
- [ ] 이벤트 핸들러 타입 정의
- [ ] 외부 라이브러리 타입 정의
- [ ] 유틸리티 함수 타입 정의

### Task 3: Null/Undefined 안전성 강화 (1.5점)
- [ ] Optional chaining 적용
  ```typescript
  // Before
  const name = user && user.profile && user.profile.name;
  
  // After
  const name = user?.profile?.name;
  ```
- [ ] Nullish coalescing 적용
- [ ] 타입 가드 함수 구현
- [ ] Non-null assertion 최소화

### Task 4: 함수 및 클래스 타입 안전성 (1점)
- [ ] 함수 반환 타입 명시
- [ ] 함수 파라미터 타입 강화
- [ ] 클래스 멤버 초기화 보장
- [ ] 메서드 바인딩 타입 안전성

## 🏗️ Implementation Details

### tsconfig.json 설정 변경

#### Before (현재)
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### After (목표)
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 예상 수정 사항

#### 1. 컴포넌트 Props 타입화
```typescript
// Before
export default function ProductCard(props) {
  const { product, onClick } = props;
  return <div onClick={onClick}>{product.name}</div>;
}

// After
interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  className?: string;
}

export default function ProductCard({ 
  product, 
  onClick, 
  className 
}: ProductCardProps) {
  const handleClick = () => {
    onClick?.(product);
  };
  
  return (
    <div 
      onClick={handleClick} 
      className={className}
    >
      {product.name}
    </div>
  );
}
```

#### 2. 이벤트 핸들러 타입화
```typescript
// Before
const handleClick = (e) => {
  e.preventDefault();
  // ...
};

// After
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  // ...
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  // ...
};
```

#### 3. API 데이터 타입화
```typescript
// Before
const fetchProducts = async () => {
  const response = await fetch('/api/products');
  return response.json();
};

// After
const fetchProducts = async (): Promise<ApiResponse<Product[]>> => {
  const response = await fetch('/api/products');
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};
```

#### 4. Null/Undefined 안전성
```typescript
// Before
function getUserName(user) {
  return user.profile.name;
}

// After
function getUserName(user: User | null | undefined): string {
  return user?.profile?.name ?? 'Anonymous';
}

// 타입 가드
function isValidUser(user: unknown): user is User {
  return typeof user === 'object' && 
         user !== null && 
         'id' in user && 
         typeof user.id === 'string';
}
```

#### 5. Hook 타입화
```typescript
// Before
const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  return { products, loading, setProducts };
};

// After
const useProducts = (): {
  products: Product[];
  loading: boolean;
  setProducts: (products: Product[]) => void;
} => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  return { products, loading, setProducts };
};
```

### 타입 가드 유틸리티

#### `src/lib/type-guards.ts`
```typescript
export function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

export function isNotUndefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

export function isNotNullish<T>(value: T | null | undefined): value is T {
  return value != null;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function hasProperty<T extends string>(
  obj: object,
  prop: T
): obj is Record<T, unknown> {
  return prop in obj;
}
```

## 🧪 Testing Strategy

### TypeScript 컴파일 검증
```bash
# 1. Strict 모드에서 컴파일 검증
npx tsc --noEmit --strict

# 2. 개별 옵션별 검증
npx tsc --noEmit --noImplicitAny --strictNullChecks

# 3. 빌드 검증
npm run build

# 4. 타입 검사 스크립트
npm run type-check
```

### 런타임 타입 검증 테스트
```typescript
// src/__tests__/type-safety.test.ts
describe('Type Safety Tests', () => {
  test('타입 가드가 올바르게 작동한다', () => {
    const nullableValue: string | null = null;
    
    if (isNotNull(nullableValue)) {
      // 이 블록에서는 TypeScript가 nullableValue를 string으로 추론
      expect(nullableValue.length).toBeGreaterThan(0);
    }
  });

  test('옵셔널 체이닝이 안전하게 작동한다', () => {
    const user: { profile?: { name?: string } } | null = null;
    
    const name = user?.profile?.name ?? 'Anonymous';
    expect(name).toBe('Anonymous');
  });

  test('이벤트 핸들러 타입이 올바르다', () => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      expect(e.currentTarget).toBeInstanceOf(HTMLButtonElement);
    };

    // 테스트 실행
    const mockEvent = {
      currentTarget: document.createElement('button')
    } as React.MouseEvent<HTMLButtonElement>;
    
    handleClick(mockEvent);
  });
});
```

## 📊 Definition of Done Checklist
- [ ] tsconfig.json strict 설정 모두 활성화
- [ ] TypeScript 컴파일 에러 0개
- [ ] ESLint TypeScript 규칙 위반 0개
- [ ] 모든 컴포넌트 Props 타입 정의 완료
- [ ] 이벤트 핸들러 타입 정의 완료
- [ ] API 함수 반환 타입 정의 완료
- [ ] Null/undefined 안전성 검증 완료
- [ ] 타입 가드 유틸리티 구현 완료
- [ ] 개발 환경에서 정상 실행 확인
- [ ] 프로덕션 빌드 성공 확인

## 🚨 Potential Blockers & Mitigations

### Blocker 1: 대량의 TypeScript 에러 발생
**Risk**: Strict 모드 활성화로 50+ 개의 타입 에러 예상  
**Mitigation**: 단계별 적용 (한 번에 하나의 strict 옵션씩), 우선순위별 수정

### Blocker 2: 외부 라이브러리 타입 정의 부족
**Risk**: 써드파티 라이브러리의 타입 정의 누락으로 컴파일 에러  
**Mitigation**: @types 패키지 설치, 필요시 타입 선언 파일 직접 작성

### Blocker 3: 레거시 코드와의 호환성
**Risk**: 기존 JavaScript 스타일 코드가 strict 모드와 충돌  
**Mitigation**: 점진적 마이그레이션, 필요시 @ts-ignore 임시 사용

### Blocker 4: 성능 영향
**Risk**: 엄격한 타입 체크로 인한 개발 서버 성능 저하  
**Mitigation**: incremental 빌드 활용, skipLibCheck 옵션 유지

## 🔗 Related Stories
- **Depends on**: Story 3.2 (Generic 타입 시스템) ✅ 권장
- **Blocks**: Epic 4 (Custom Hooks 타입 안전성 확보)
- **Related**: Epic 5 (성능 최적화 시 타입 안전성 유지)

## 📝 Strict Mode 적용 가이드

### 단계별 적용 순서
1. **noImplicitAny**: 가장 기본적인 타입 명시
2. **strictNullChecks**: null/undefined 안전성
3. **strictFunctionTypes**: 함수 타입 안전성  
4. **나머지 strict 옵션들**: 세부 타입 안전성

### 일반적인 수정 패턴
```typescript
// 1. Props 타입화
- function Component(props: any)
+ function Component(props: ComponentProps)

// 2. State 타입화  
- const [data, setData] = useState()
+ const [data, setData] = useState<DataType | null>(null)

// 3. 이벤트 핸들러
- const handleClick = (e) => {}
+ const handleClick = (e: React.MouseEvent) => {}

// 4. 옵셔널 체이닝
- obj.prop.value
+ obj.prop?.value

// 5. Nullish coalescing
- value || defaultValue
+ value ?? defaultValue
```

---

*작성일: 2025-01-28*  
*최종 수정일: 2025-01-28*