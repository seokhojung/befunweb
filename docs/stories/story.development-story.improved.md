# Development Story / User Journey (Improved)

> 업데이트: 2025-08-21 06:22

## 1. 사용자 시나리오
1) 사용자는 홈에 진입하여 핵심 가치 제안을 본다.
2) 상품 리스트에서 필터/정렬로 후보를 좁힌다.
3) 상품 상세에서 이미지를 확인하고 구성기로 이동한다.
4) 구성기에서 옵션을 바꿔 실시간 미리보기를 확인한다.

## 2. 단계별 KPI & 계측 포인트(GA4)
| 단계 | KPI | 이벤트/파라미터 |
|---|---|---|
| 홈 | 이탈률↓, LCP | `page_view`, `hero_viewed` |
| 리스트 | 클릭률 | `view_item_list`, `select_item` |
| 상세 | 전환율 | `view_item`, `add_to_cart`(모의) |
| 구성기 | 상호작용 시간(INP) | `config_change`(item_id, variant, price) |

## 3. 접근성/성능 체크포인트
- 키보드 네비, 포커스 이동, 명도 대비 확인
- LCP/INP/CLS 모니터링 대시보드

## 4. 변경 이력(Changelog)
- v1.1: KPI/이벤트 정의 및 시나리오 구체화


---
### 원문(참고용)

```
# 개발 스토리 (Development Story)

## 서론
이 스토리는 project-plan.md와 architecture.md를 기반으로 한 Befun Web 프로젝트의 개발 과정을 단계별로 서술합니다. task-breakdown.md의 태스크 목록을 따라 진행하며, 각 단계에서 무엇을 하는지, 왜 중요한지, 어떻게 구현하는지 자세히 설명합니다. 목표는 tylko.com 스타일의 반응형 사이트를 MVP로 구축하는 것입니다. Next.js와 Tailwind CSS를 사용해 프론트엔드 중심으로 개발하며, Configurator 페이지에 외부 사이트를 iframe으로 임베드합니다. 전체 흐름은 architecture.md의 다이어그램을 따릅니다.

## 단계별 스토리

### 1. 기획 (2-3일)
프로젝트를 시작하기 전에, Figma 디자인(https://www.figma.com/design/mUdxnCauAqnQZ2SSMUl3O6/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=2-48&m=dev)을 분석합니다. 이 단계에서 홈페이지의 비디오 섹션, 제품 목록, Configurator 페이지의 iframe 임베드를 주요 기능으로 우선순위화합니다. 왜 중요한가? 플랜에 따라 불필요한 기능(3D, 결제)을 제외해 비용과 시간을 절감하기 위함입니다. Notion에 와이어프레임을 그려 architecture.md의 디렉토리 구조(app/, components/)를 미리 계획합니다. 예: "홈페이지에 VideoSection 컴포넌트를 넣고, 제품 카드에서 /configurator로 링크."

### 2. 셋업 (1일)
기획이 끝나면 실제 개발 환경을 세팅합니다. 터미널에서 `npx create-next-app@latest befunweb` 명령어로 Next.js 프로젝트를 초기화합니다. Tailwind CSS를 설치(`npm install -D tailwindcss postcss autoprefixer`)하고 tailwind.config.js를 설정합니다. ReactPlayer도 설치(`npm install react-player`). GitHub 저장소 생성 후 초기 커밋. 왜? project-plan.md의 기술 스택을 바탕으로 빠른 개발 기반을 마련하기 위함. architecture.md의 디렉토리(app/, components/, public/)를 미리 만들어 자산을 준비합니다. 예: public/videos에 sample-video.mp4 업로드.

### 3. 컴포넌트 개발 (1-2일)
재사용 가능한 컴포넌트를 먼저 만듭니다. components/VideoSection.tsx에서 ReactPlayer로 비디오를 로드하고, picture 태그로 플레이스홀더 이미지를 추가합니다. Tailwind CSS로 반응형 스타일링 (aspect-ratio 클래스 사용). 그 다음, components/ProductCard.tsx를 만들어 제품 이름/가격/이미지를 표시하는 카드를 구현합니다. 왜? architecture.md의 컴포넌트 분리 원칙에 따라 코드 재사용성을 높이고, 데이터 흐름(하드코딩 배열)을 단순화하기 위함. 예시 코드: useState로 상태 관리, public/images에서 이미지 불러오기. 의존성: 셋업 후 public/ 자산 추가.

### 4. 페이지 개발 (1-2일)
컴포넌트를 조합해 페이지를 만듭니다. app/page.tsx에서 헤더(네비게이션: Home, Configurator), VideoSection, 제품 목록(여러 ProductCard 사용)을 렌더링합니다. app/configurator/page.tsx에서 iframe(src="https://befun241204.netlify.app/")을 전체 화면으로 임베드하고, 에러 fallback (e.g., "로드 실패 시 메시지") 추가. 왜? project-plan.md의 기능 목록을 구현하며, architecture.md의 흐름(홈 → Configurator)을 따르기 위함. Link 컴포넌트로 라우팅. 예: 제품 카드의 Customize 버튼에 `<Link href="/configurator">`.

### 5. 테스트 및 최적화 (2-3일)
`npm run dev`로 로컬 서버를 실행해 http://localhost:3000에서 확인합니다. 브라우저(Chrome, Safari)와 모바일 에뮬레이터로 반응형 테스트 (Tailwind의 md: 클래스 확인). 성능 최적화: Next.js Image로 이미지 lazy loading, 비디오 압축. 접근성: ARIA 속성 추가. 왜? project-plan.md의 테스트 단계에 따라 버그를 잡고, architecture.md의 고려사항(성능, 보안)을 만족하기 위함. 예: iframe에 sandbox 속성 추가, 콘솔 에러 체크.

### 6. 배포 (0.5일)
GitHub에 푸시 후 Vercel 대시보드에서 프로젝트 연결. 자동 배포 확인 (befunweb.vercel.app). 도메인 설정 (필요 시). 왜? project-plan.md의 배포 섹션에 따라 실제 운영 환경을 구축하기 위함. 모니터링: Vercel Analytics 활성화.

## 결론
이 스토리를 따라 개발하면 architecture.md의 구조와 project-plan.md의 목표를 달성할 수 있습니다. 총 1-3주 소요. 개발 중 Git 커밋과 Notion으로 진행 상황 추적. 추가 기능(AR 등)은 확장 섹션 참조. 만약 변경이 필요하면 task-breakdown.md를 업데이트하세요.

```