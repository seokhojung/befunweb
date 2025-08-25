# CI/CD 파이프라인 설정 가이드

## 개요
이 문서는 Befun Web 프로젝트의 CI/CD 파이프라인 설정 방법을 설명합니다.

## 1. GitHub Secrets 설정

GitHub 저장소의 Settings > Secrets and variables > Actions에서 다음 시크릿을 설정해야 합니다:

### Vercel 배포용
- `VERCEL_TOKEN`: Vercel API 토큰
- `VERCEL_ORG_ID`: Vercel 조직 ID
- `VERCEL_PROJECT_ID`: Vercel 프로젝트 ID

### Vercel 토큰 생성 방법
1. [Vercel Dashboard](https://vercel.com/account/tokens)에서 새 토큰 생성
2. 토큰 이름: `Befun Web CI/CD`
3. 토큰 권한: Full Account
4. 생성된 토큰을 `VERCEL_TOKEN`으로 설정

### Vercel 프로젝트 정보 확인 방법
1. Vercel 프로젝트 설정에서 Project ID 확인
2. 팀 설정에서 Organization ID 확인

## 2. 워크플로우 동작

### 자동 실행 조건
- **Push**: `main`, `develop` 브랜치에 푸시 시
- **Pull Request**: `main`, `develop` 브랜치로 PR 생성 시

### 실행 순서
1. **코드 품질 검사** (lint-and-test)
   - ESLint 검사
   - TypeScript 타입 검사
   - Jest 테스트 실행

2. **빌드 및 성능 검사** (build-and-audit)
   - Next.js 빌드
   - Lighthouse CI 성능 검사

3. **접근성 검사** (accessibility-check)
   - Playwright 접근성 테스트
   - WCAG 2.2 AA 준수 확인

4. **보안 검사** (security-audit)
   - npm audit 보안 취약점 검사

5. **자동 배포** (deploy)
   - `main` 브랜치 푸시 시에만 실행
   - Vercel에 자동 배포

6. **PR 요약** (pr-summary)
   - PR에 검사 결과 요약 표시

## 3. 로컬 테스트

### Jest 테스트 실행
```bash
npm test
```

### Playwright 접근성 테스트 실행
```bash
npm run test:accessibility
```

### Lighthouse CI 실행
```bash
npm run lighthouse
```

### 코드 포맷팅
```bash
npm run format
npm run format:check
```

## 4. 성능 목표

### Core Web Vitals
- **LCP**: ≤ 2.5초
- **INP**: ≤ 200ms
- **CLS**: ≤ 0.1

### Lighthouse 점수
- **Performance**: ≥ 80
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 80
- **SEO**: ≥ 80

## 5. 접근성 검사 항목

### 필수 준수 항목 (Error)
- 색상 대비
- 문서 제목
- HTML lang 속성
- 이미지 alt 텍스트
- 폼 라벨
- 링크 이름
- 리스트 구조
- 메인 랜드마크
- 지역 랜드마크
- tabindex 사용

### 권장 준수 항목 (Warning)
- 구조화된 데이터
- 메타 설명
- robots.txt

## 6. 문제 해결

### 빌드 실패 시
1. 로컬에서 `npm run build` 실행하여 오류 확인
2. TypeScript 오류 수정
3. 의존성 문제 시 `npm ci` 실행

### 테스트 실패 시
1. 로컬에서 `npm test` 실행
2. 테스트 코드 수정
3. Mock 설정 확인

### 접근성 검사 실패 시
1. Axe DevTools로 수동 검사
2. ARIA 속성 및 역할 확인
3. 키보드 네비게이션 테스트

## 7. 모니터링

### GitHub Actions 대시보드
- Actions 탭에서 워크플로우 실행 상태 확인
- 실패한 작업의 로그 확인
- 실행 시간 및 성능 모니터링

### Vercel 대시보드
- 배포 상태 및 성능 확인
- 실시간 사용자 메트릭
- 오류 로그 및 알림

## 8. 확장 가능성

### 추가 검사 항목
- Bundle 분석 (`npm run analyze`)
- E2E 테스트 (`npm run test:e2e`)
- 보안 스캔 (Snyk, CodeQL)
- 코드 커버리지 리포트

### 알림 설정
- Slack 웹훅 연동
- 이메일 알림
- GitHub Issues 자동 생성

## 9. 참고 자료

- [GitHub Actions 공식 문서](https://docs.github.com/en/actions)
- [Playwright 테스트 가이드](https://playwright.dev/docs/intro)
- [Lighthouse CI 설정](https://github.com/GoogleChrome/lighthouse-ci)
- [WCAG 2.2 가이드라인](https://www.w3.org/WAI/WCAG22/quickref/)

