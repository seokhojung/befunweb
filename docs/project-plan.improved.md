# Project Plan (Improved)

> 업데이트: 2025-08-21 06:22

## 1. 목표 & 범위
- MVP: 홈/상품리스트/상품상세/구성기(장바구니 제외)
- 비기능: Web Vitals 목표, WCAG 2.2 준수, 배포 자동화

## 2. 마일스톤
| 마일스톤 | 기간 | 출구조건 |
|---|---|---|
| M1 스키마/타입 고정 | 1주 | 타입 오류 0, 샘플 5종 렌더 |
| M2 라우트 구현(홈/리스트/상세) | 2주 | Lighthouse 모바일 ≥ 90 |
| M3 구성기/성능튜닝 | 2주 | LCP ≤ 2.5s, INP ≤ 200ms |
| M4 분석/SEO/a11y | 1주 | GA4 이벤트 흐름 연결, Axe 위반 0 |

## 3. 수용기준(AC) & 완료정의(DoD)
| 기능 | AC(수용기준) | DoD(완료정의) |
|---|---|---|
| 홈 히어로 | 3G Fast LCP ≤ 2.5s, CLS ≤ 0.1 | Lighthouse 모바일 ≥ 90, 스냅샷 테스트 통과 |
| 상품리스트 | 200개까지 60fps 스크롤, 키보드 필터 작동 | E2E 목록/필터 테스트, Axe 경고 0 |
| 상품상세 | Product JSON-LD 노출 | 구조화데이터 테스트 통과 |
| 구성기 | 옵션 변경 INP ≤ 200ms | E2E: add_to_cart 모의 성공 |

## 4. 일정(주차)
- 총 6주: 1→2→3→4 순, 주간 데모/리뷰

## 5. RACI
| 영역 | R | A | C | I |
|---|---|---|---|---|
| 타입/스키마 | FE | PO | BE | QA |
| UI/접근성 | FE | FE Lead | Design | QA |
| 성능/분석 | FE | FE Lead | DevOps | PO |

## 6. 위험/대응
| 위험 | 영향 | 완화 |
|---|---|---|
| 이미지 용량 과다 | LCP 악화 | WebP/AVIF, 사이즈 가드, 프리로드 제한 |
| 구성기 연산량 | INP 악화 | 메모이제이션/워커, 지연계산 |
| 데이터 변경 빈번 | ISR 누락 | on-demand ISR 훅, 캐시 무효화 정책 |

## 7. 릴리즈 기준
- Web Vitals 목표 충족, Axe 경고 0, 핵심 흐름 E2E 통과, 오류 로깅 경고 없음


---
### 원문(참고용)

```
# Befun Web 프로젝트 계획서

## 프로젝트 개요
이 프로젝트는 tylko.com과 유사한 웹사이트를 구축하는 것을 목표로 합니다. 사용자가 제품을 커스터마이징할 수 있는 간단한 MVP(Minimum Viable Product)를 개발합니다. Figma 디자인(https://www.figma.com/design/mUdxnCauAqnQZ2SSMUl3O6/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=2-48&m=dev)을 기반으로 UI를 구현하며, 3D 모델링, 결제, 문의 기능은 제외합니다. Next.js를 사용해 빠르게 개발하고 Vercel에 배포합니다.

## 목표
- tylko.com 스타일의 반응형 홈페이지 구현 (비디오 배경, 제품 목록, 커스터마이징 링크).
- Configurator 페이지에서 외부 사이트(https://befun241204.netlify.app/)를 iframe으로 임베드.
- 비용 최소화: 백엔드 없이 프론트엔드 중심.
- 예상 기간: 1-3주 (기획 2-3일, 개발 1주, 테스트 2-3일).

## 기술 스택
- **프론트엔드**: Next.js (React 기반), Tailwind CSS (스타일링), ReactPlayer (비디오 재생).
- **호스팅**: Vercel (무료 티어 사용).
- **기타**: GitHub (버전 관리), iframe (외부 사이트 임베드).
- **왜 이 스택?**: 빠른 개발, 반응형 지원, 비용 0원으로 MVP 구축 가능.

## 기능 목록
- **홈페이지 (/)**: 헤더 (네비게이션: Home, Configurator), 비디오 섹션 (자동 재생 비디오 + 텍스트 오버레이 + 버튼), 제품 목록 (카드 형태, Customize 버튼으로 /configurator 링크), 푸터.
- **Configurator 페이지 (/configurator)**: 외부 사이트 임베드 (iframe 전체 화면), 상단 헤더.
- **기타**: 반응형 디자인 (모바일/데스크톱), SEO 기본 최적화 (Next.js 메타태그).

## 개발 단계
1. **기획 (2-3일)**: Figma 디자인 분석, 기능 우선순위 설정, 와이어프레임 작성 (Notion 사용).
2. **셋업 (1일)**: Next.js 프로젝트 초기화 (`npx create-next-app`), Tailwind 설치, GitHub 저장소 생성.
3. **개발 (1주)**:
   - public 폴더에 자산 (비디오, 이미지) 추가.
   - 컴포넌트 구현: VideoSection.tsx (비디오 + 오버레이).
   - 페이지 구현: app/page.tsx (홈), app/configurator/page.tsx (iframe).
   - 상태 관리: useState/useContext (필요 시).
4. **테스트 (2-3일)**: 로컬 테스트 (npm run dev 명령어로 개발 서버 실행, http://localhost:3000에서 확인), 브라우저 호환성 확인, 모바일 반응형 테스트.
5. **베스트 프랙티스**: 코드 모듈화, 성능 최적화 (이미지 lazy loading), 접근성 (ARIA 속성).

## 배포 및 테스트
- **배포**: GitHub 푸시 후 Vercel 연결 (자동 CI/CD). 도메인 연결 (필요 시 무료 subdomain).
- **테스트**: 단위 테스트 (Jest), E2E 테스트 (Cypress 옵션), 실제 브라우저에서 기능 확인 (비디오 로딩, iframe 임베드).
- **모니터링**: 콘솔 로그, Google Analytics (옵션).

## 잠재적 확장
- AR 보기나 공유 기능 추가 (외부 사이트 통합 강화).
- Figma 디자인 1:1 재현 (색상/폰트 세부 조정).
- 마케팅: SEO 강화, 소셜 공유 버튼.
- 예산: 초기 0원, 확장 시 $10-50/월 (호스팅/도메인).

## 기능 분할
기능을 세부 태스크로 분할하여 개발을 체계화합니다. 자세한 내용은 docs/architecture/task-breakdown.md를 참조하세요. 주요 분할: 기획, 셋업, 컴포넌트/페이지 개발, 테스트, 배포.

## 추가 고려사항
- **보안**: HTTPS 사용 (Vercel 자동 지원), iframe 보안 (sandbox 속성 추가로 제한).
- **성능 최적화**: 캐싱 (Next.js 빌트인), 이미지 최적화 (Next.js Image 컴포넌트), 비디오 압축.
- **에러 핸들링**: iframe 로딩 실패 시 fallback 메시지 (예: "사이트를 로드할 수 없습니다. 직접 방문해주세요.").
- **접근성**: 키보드 네비게이션, 스크린 리더 지원 (ARIA 라벨 추가).
- **모바일 우선 디자인**: Tailwind의 responsive 클래스 활용, 모바일 테스트 강화.

이 계획서는 유연하게 조정 가능합니다. 개발 중 변경 시 업데이트하세요.

```