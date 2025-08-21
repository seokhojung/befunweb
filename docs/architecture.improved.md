# Architecture Specification (Improved)

> 업데이트: 2025-08-21 06:22

## 0. 문서 목적
- 본 문서는 아키텍처의 **렌더링 전략(SSG/ISR/SSR/Edge)**, **데이터 모델 계약**, **성능/보안/관측** 기준을 단일 출처로 정의합니다.

## 1. 시스템 개요
- 프레임워크: Next.js(App Router)
- UI: Tailwind, shadcn/ui
- 배포: Vercel(가정)
- 핵심 플로우: 사용자 → 라우트 → 서버 액션/데이터소스 → 캐시 → 컴포넌트 렌더

## 2. 렌더링 & 캐시 전략
| 라우트 | 전략 | ISR/TTL | Edge 사용 | 근거 |
|---|---|---:|:---:|---|
| `/` 홈 | SSG | 600s | △ | LCP 안정/변경 빈도 낮음 |
| `/products` 리스트 | SSG(+CSR 필터) | 600s | △ | 초기 표시 후 클라이언트 필터 |
| `/products/[id]` 상세 | ISR | 300s | △ | 가격/재고 갱신 |
| `/configurator` | SSR | - | ○ | 사용자 조합/세션 의존 |

- 캐시 계층: 브라우저(Cache-Control), CDN, ISR(서버)
- 무효화: 상품 데이터 변경 시 `/products/*` 대상 ISR on-demand 재생성

## 3. 데이터 모델(요약)
- 단일 타입 소스: `src/types/`에서 공유

```ts
export type Product = {
  id: string; name: string; slug: string; images: string[];
  variants: Variant[]; price: Money; materials?: MaterialRef[];
};
export type Variant = { id: string; options: Record<string, string>; sku?: string };
export type Money = { currency: 'KRW'|'USD'; amount: number };
export type Configuration = { productId: string; selections: Record<string,string>; price: Money };
```

## 4. 성능 목표(Core Web Vitals)
| 지표 | 목표(모바일 75pctl) |
|---|---|
| LCP | ≤ 2.5s |
| INP | ≤ 200ms |
| CLS | ≤ 0.1 |

- 이미지: `next/image` 사용, 고정 크기 제공, 프리로드 히어로 1개
- JS: 라우트 단위 code-splitting, 동적 임포트(위젯/구성기)

## 5. 접근성(WCAG 2.2 AA) 체크
- 키보드 전 경로 탐색 가능
- 포커스 링 시각화 및 포커스 순서 문서화
- 명도 대비 충족(텍스트/아이콘)
- 라이브 영역(구성 변경) ARIA 알림

## 6. SEO/구조화데이터
- sitemap/robots
- 각 상품 상세: Product JSON-LD(가격/재고)
- Canonical/OG/Twitter

## 7. 보안/비밀정보
- Security Header: CSP, Referrer-Policy, X-Content-Type-Options, X-Frame-Options
- 환경변수 스키마 검증(zod), 공개/비공개 분리

## 8. 관측/로깅/알림
- 로깅: 서버 액션 오류/지연 측정
- 성능: Lighthouse CI, Web Vitals 수집
- 알림: 빌드 실패/Vitals 악화 슬랙 알림(가정)

## 9. ADR 목록(요약)
- ADR-001: 라우트별 렌더링 전략 선택 근거
- ADR-002: 이미지 처리(next/image) 채택
- ADR-003: 분석 스키마(GA4) 채택

## 10. 변경 이력
- v1.1(본 문서): 렌더링/성능/접근성/보안/관측 기준 추가


---
### 원문(참고용)

```
# Befun Web 아키텍처

## 개요
이 프로젝트는 Next.js를 기반으로 한 프론트엔드 중심 아키텍처입니다. App Router를 사용해 페이지별 라우팅을 처리하며, 컴포넌트는 재사용성을 위해 분리합니다. 백엔드 없음 (정적 사이트 생성). 주요 흐름: 홈페이지 → Configurator (iframe 임베드). 기능 분할은 docs/architecture/task-breakdown.md 참조.

## 디렉토리 구조
```
befunweb/
├── app/                  # 페이지와 라우팅
│   ├── page.tsx          # 홈페이지 (비디오 섹션, 제품 목록)
│   └── configurator/     # Configurator 페이지
│       └── page.tsx      # iframe 임베드
├── components/           # 재사용 컴포넌트
│   └── VideoSection.tsx  # 비디오 섹션 컴포넌트 (ReactPlayer 사용)
├── public/               # 정적 자산
│   ├── images/           # 제품 이미지, 플레이스홀더
│   │   └── video-placeholder/  # 비디오 플레이스홀더 이미지 (XLD.avif 등)
│   └── videos/           # 비디오 파일 (sample-video.mp4)
├── data/                 # 데이터 파일 (예: products.json)
├── docs/                 # 문서
│   ├── project-plan.md   # 프로젝트 계획서
│   └── architecture.md   # 이 파일 (아키텍처)
├── tailwind.config.js    # Tailwind CSS 설정
├── next.config.js        # Next.js 설정 (필요 시)
├── package.json          # 의존성 (next, react-player, tailwindcss 등)
└── README.md             # 프로젝트 설명
```

## 주요 컴포넌트와 흐름
- **홈페이지 (app/page.tsx)**: 헤더, VideoSection, 제품 목록 렌더링. 제품 카드에서 Link로 /configurator로 이동.
- **Configurator (app/configurator/page.tsx)**: iframe으로 외부 사이트 로드. 상단 헤더 포함.
- **VideoSection (components/VideoSection.tsx)**: ReactPlayer로 비디오 재생, picture 태그로 플레이스홀더, Tailwind로 오버레이 텍스트/버튼 스타일링.

## 데이터 흐름
- 제품 데이터: 하드코딩 (배열) 또는 JSON 파일 (data/products.json)로 관리.
- 상태: 페이지 내 useState (예: 옵션 선택 시 업데이트). 글로벌 상태 필요 시 Context API.

## 다이어그램 (텍스트 기반)
```
[브라우저] --> [홈페이지] --> [VideoSection] (비디오 재생)
              |
              --> [제품 목록] --> Link to [Configurator]
                                |
                                --> [iframe] (외부 사이트 로드)
```

## 고려사항
- **보안**: iframe에 sandbox="allow-scripts allow-same-origin" 추가 (스크립트 허용 but 제한).
- **성능**: Next.js의 자동 최적화 활용 (SSG for 홈페이지).
- **테스트**: `npm run dev`로 로컬 서버 실행 (http://localhost:3000).
- **확장**: 나중에 api/ 디렉토리로 서버리스 API 추가 가능.

이 아키텍처는 플랜에 맞춰 유연하게 조정하세요.

```