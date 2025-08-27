# BEFUN - 맞춤형 가구 웹사이트

BEFUN은 사용자가 자신만의 특별한 공간을 만들 수 있도록 도와주는 맞춤형 가구 브랜드의 웹사이트입니다. Next.js 15와 TypeScript를 기반으로 구축되었으며, 현대적이고 접근 가능한 사용자 경험을 제공합니다.

## 🌟 주요 특징

### 🎨 사용자 경험
- **상품 구성기**: 실시간으로 가구를 커스터마이징할 수 있는 인터랙티브 도구
- **반응형 디자인**: 모바일부터 데스크톱까지 모든 디바이스에 최적화
- **접근성**: WCAG 2.1 AA 기준 준수, 스크린 리더 지원
- **다크모드**: 사용자 선호도에 따른 테마 지원 (개발 중)

### ⚡ 성능 최적화
- **이미지 최적화**: Next.js Image 컴포넌트와 WebP/AVIF 형식 지원
- **코드 분할**: 동적 import를 통한 번들 크기 최적화
- **메모화**: React.memo, useMemo, useCallback을 통한 렌더링 최적화
- **Lazy Loading**: 뷰포트 기반 컨텐츠 지연 로딩

### 🛠️ 기술 스택
- **Frontend**: Next.js 15, React 19, TypeScript 5
- **스타일링**: Tailwind CSS, CSS-in-JS
- **상태 관리**: React Hooks, Context API
- **테스팅**: Jest, React Testing Library, Playwright
- **분석**: Google Analytics 4
- **배포**: Vercel

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 루트 레이아웃
│   ├── page.tsx           # 홈페이지
│   ├── configurator/      # 구성기 페이지
│   └── not-found.tsx      # 404 페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # 기본 UI 컴포넌트
│   ├── cards/            # 카드 컴포넌트들
│   ├── sections/         # 페이지 섹션들
│   ├── layout/           # 레이아웃 컴포넌트들
│   └── icons/            # 아이콘 컴포넌트들
├── hooks/                # Custom React Hooks
├── lib/                  # 유틸리티 함수들
├── constants/            # 상수 정의
├── config/               # 설정 관리
└── types/                # TypeScript 타입 정의
```

## 🚀 시작하기

### 필수 조건

- Node.js 18.17 이상
- npm 또는 yarn 패키지 매니저

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone <repository-url>
   cd befunweb
   ```

2. **의존성 설치**
   ```bash
   npm install
   # 또는
   yarn install
   ```

3. **환경 변수 설정**
   ```bash
   cp .env.example .env.local
   ```
   
   `.env.local` 파일을 편집하여 필요한 환경 변수를 설정합니다:
   ```env
   # Analytics
   NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-id
   NEXT_PUBLIC_ENABLE_ANALYTICS=true
   
   # External Services
   NEXT_PUBLIC_CONFIGURATOR_URL=https://your-configurator-url.com
   NEXT_PUBLIC_COMPANY_WEBSITE=https://your-company-site.com
   
   # Feature Flags
   NEXT_PUBLIC_DEBUG_MODE=false
   ```

4. **개발 서버 실행**
   ```bash
   npm run dev
   # 또는
   yarn dev
   ```

   브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 🧪 테스팅

### 단위 테스트 실행
```bash
npm run test
# 또는
yarn test
```

### 커버리지 확인
```bash
npm run test:coverage
# 또는
yarn test:coverage
```

### E2E 테스트 실행 (Playwright)
```bash
npm run test:e2e
# 또는
yarn test:e2e
```

### 접근성 테스트
```bash
npm run test:accessibility
# 또는
yarn test:accessibility
```

## 📊 성능 분석

### Lighthouse 점수 확인
```bash
npm run lighthouse
# 또는
yarn lighthouse
```

### 번들 분석
```bash
npm run analyze
# 또는
yarn analyze
```

## 🎯 코드 품질

### 린팅
```bash
npm run lint
# 또는
yarn lint
```

### 타입 검사
```bash
npm run type-check
# 또는
yarn type-check
```

### 코드 포맷팅
```bash
npm run format
# 또는
yarn format
```

## 🏗️ 빌드 및 배포

### 프로덕션 빌드
```bash
npm run build
# 또는
yarn build
```

### 프로덕션 서버 실행
```bash
npm run start
# 또는
yarn start
```

## 📖 문서

### 추가 문서
- [Configuration Guide](./CONFIG.md) - 설정 시스템 가이드
- [Refactoring Strategy](./REFACTORING_STRATEGY.md) - 리팩토링 전략
- [Refactoring Stories](./REFACTORING_STORIES.md) - 상세 작업 내역

### 컴포넌트 사용법

#### Button 컴포넌트
```tsx
import { Button } from '@/components/ui/Button'

<Button variant="primary" size="lg" onClick={handleClick}>
  클릭하세요
</Button>
```

#### ProductCard 컴포넌트
```tsx
import { ProductCard } from '@/components/cards/ProductCard'

<ProductCard 
  product={{
    id: '1',
    name: '모던 책상',
    price: 299000,
    originalPrice: 399000,
    discount: 25,
    // ... 기타 속성들
  }}
/>
```

#### Custom Hooks
```tsx
import { useMenuToggle, useScrollDirection } from '@/hooks'

// 메뉴 토글 기능
const { isOpen, toggle, close } = useMenuToggle({
  closeOnOutsideClick: true,
  closeOnEscape: true
})

// 스크롤 방향 감지
const scrollDirection = useScrollDirection()
```

## ⚙️ 환경별 설정

### 개발 환경
- 디버그 모드 활성화
- 상세한 로깅
- 핫 리로딩

### 프로덕션 환경
- 분석 도구 활성화
- 최적화된 번들링
- 보안 헤더

### 테스트 환경
- 모킹된 외부 서비스
- 테스트용 데이터베이스
- 조용한 로그

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경 사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

### 커밋 메시지 규칙
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 변경
style: 코드 포맷팅 (기능 변경 없음)
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 프로세스나 보조 도구 변경
```

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.

## 📞 지원

문제가 발생하거나 질문이 있으시면:

1. [Issues](https://github.com/your-repo/issues)에서 기존 이슈를 확인하세요
2. 새로운 이슈를 생성하여 문제를 보고하세요
3. [Discussions](https://github.com/your-repo/discussions)에서 질문하세요

## 🏆 개발 팀

- **프론트엔드 개발**: 현대적인 React/Next.js 애플리케이션 구축
- **UX/UI 디자인**: 사용자 중심의 디자인 시스템 구축
- **성능 최적화**: Core Web Vitals 지표 개선
- **접근성**: 모든 사용자를 위한 포용적 디자인

---

**BEFUN으로 당신만의 특별한 공간을 만들어보세요! ✨**