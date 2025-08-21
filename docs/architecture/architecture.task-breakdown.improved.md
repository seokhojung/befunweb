# Architecture Task Breakdown (Improved)

> 업데이트: 2025-08-21 06:22

## 1. 규칙
- 모든 태스크는 **Exit Criteria(출구조건)**, **선행관계**, **오너**, **추정(일)**을 가진다.
- PR에는 Lighthouse 리포트/스크린샷을 첨부한다.

## 2. 태스크 표
| ID | 태스크 | 선행 | 추정(d) | 오너 | Exit Criteria |
|---:|---|---|---:|---|---|
| T-01 | 타입/스키마 정의 | - | 2 | FE | 타입 오류 0, 샘플 5종 렌더 |
| T-02 | 홈 라우트(SSG) | T-01 | 2 | FE | LCP ≤ 2.5s, CLS ≤ 0.1 |
| T-03 | 리스트 라우트(SSG) | T-01 | 2 | FE | 200개 목록 스크롤 60fps |
| T-04 | 상세 라우트(ISR) | T-01 | 2 | FE | JSON-LD 검증 통과 |
| T-05 | 구성기(SSR) | T-04 | 3 | FE | INP ≤ 200ms |
| T-06 | GA4 이벤트 | T-02~T-05 | 1 | FE | 표준 이벤트 흐름 수집 |
| T-07 | 접근성 개선 | 병행 | 1 | FE | Axe 경고 0 |
| T-08 | CI/CD 파이프라인 | 병행 | 1 | DevOps | 실패 시 PR 차단 동작 |


---
### 원문(참고용)

```
# 기능 분할 (Task Breakdown)

## 개요
이 문서는 프로젝트의 기능을 세부 태스크로 분할한 내용입니다. MVP 중심으로 페이지/컴포넌트별로 나눠 개발 효율성을 높입니다. 각 태스크에 예상 시간과 의존성을 명시합니다. 총 기간: 1-3주 (project-plan.md 참조).

## 태스크 목록
1. **기획 (2-3일)**: Figma 디자인 분석, 기능 우선순위 설정, 와이어프레임 작성 (Notion 사용).
   - 의존성: 없음.
   
2. **셋업 (1일)**: Next.js 프로젝트 초기화 (`npx create-next-app`), Tailwind 설치 및 설정 (tailwind.config.js), ReactPlayer npm install, GitHub 저장소 생성.
   - 의존성: 기획 완료.

3. **컴포넌트 개발 (1-2일)**:
   - VideoSection.tsx: 비디오 재생 (ReactPlayer) + 플레이스홀더 + 오버레이 구현 (1일).
   - 제품 카드 컴포넌트: components/ProductCard.tsx로 분리 (하드코딩 데이터 사용, 0.5일).
   - 의존성: 셋업 완료, public/에 자산 추가.

4. **페이지 개발 (1-2일)**:
   - app/page.tsx: 헤더 + 비디오 섹션 + 제품 목록 통합 (1일).
   - app/configurator/page.tsx: iframe 임베드 + 에러 fallback 추가 (0.5일).
   - 의존성: 컴포넌트 개발 완료.

5. **테스트 및 최적화 (2-3일)**: 로컬 서버 실행 (`npm run dev`), 브라우저/모바일 테스트, 성능 최적화 (lazy loading, Image 컴포넌트), 접근성 확인.
   - 의존성: 페이지 개발 완료.

6. **배포 (0.5일)**: GitHub 푸시, Vercel 연결 및 배포, 도메인 설정.
   - 의존성: 테스트 완료.

## 의존성 및 주의점
- 모든 태스크는 Git 커밋으로 관리.
- 확장 시: 새 컴포넌트 추가 시 components/에, API 필요 시 api/ 디렉토리 생성.
- 도구: Notion (태스크 관리), GitHub Issues (이슈 트래킹).

이 분할은 유연하게 조정하세요. 개발 중 업데이트.

```