# 리팩토링 버전 관리 가이드

## 📋 목차
1. [브랜치 전략](#브랜치-전략)
2. [커밋 규칙](#커밋-규칙)
3. [작업 흐름](#작업-흐름)
4. [롤백 전략](#롤백-전략)
5. [PR 및 머지 전략](#pr-및-머지-전략)
6. [명령어 레퍼런스](#명령어-레퍼런스)

---

## 🌲 브랜치 전략

### 단일 브랜치 방식
모든 리팩토링 작업을 하나의 브랜치에서 진행하며, 각 Story는 개별 커밋으로 관리합니다.

```
main (or master)
└── refactoring/2025-q1  ← 전체 리팩토링을 위한 단일 브랜치
    ├── commit: [Story 1.1] Layout 컴포넌트 생성
    ├── commit: [Story 1.2] 모든 페이지에 Layout 적용
    ├── commit: [Story 2.1] 폴더 구조 재정리
    ├── commit: [Story 2.2] 컴포넌트 파일 이동
    └── ... (각 Story = 하나의 커밋)
```

### 브랜치 네이밍 규칙
- **리팩토링 브랜치**: `refactoring/YYYY-QN` (예: `refactoring/2025-q1`)
- **핫픽스 필요 시**: `hotfix/story-X.X-issue-description`

---

## 📝 커밋 규칙

### 커밋 메시지 포맷
```
[Story X.X] 한글 제목
- 주요 변경사항 1
- 주요 변경사항 2
- 주요 변경사항 3
- Points: 완료/전체 (예: 8/95)
```

### 실제 예시
```bash
git commit -m "[Story 1.1] Layout 컴포넌트 생성
- Layout.tsx 생성 (Header/Footer 통합)
- TypeScript 인터페이스 정의
- Props 기반 조건부 렌더링 구현
- 접근성 속성 추가
- Points: 8/95"
```

### 커밋 단위 원칙
- **1 Story = 1 Commit** 원칙 준수
- Story가 크면 임시 커밋 후 squash
- 빌드가 깨지지 않는 단위로 커밋

---

## 🔄 작업 흐름

### 1. 초기 설정
```bash
# 메인 브랜치에서 시작
git checkout main

# 최신 상태 동기화
git pull origin main

# 리팩토링 브랜치 생성
git checkout -b refactoring/2025-q1
```

### 2. Story 작업
```bash
# Story 작업 시작 전 현재 상태 확인
git status
npm run build  # 빌드 정상 확인
npm run lint   # 린트 확인

# 코드 작업 진행
# ... Story 구현 ...

# 작업 완료 후 테스트
npm run build
npm run dev  # 로컬에서 확인

# 커밋
git add .
git commit -m "[Story X.X] 작업 제목
- 변경사항 1
- 변경사항 2
- Points: N/95"
```

### 3. 백업 및 동기화
```bash
# 주기적으로 원격 저장소에 푸시 (하루 최소 1회)
git push origin refactoring/2025-q1

# 다른 작업자와 협업 시
git pull origin refactoring/2025-q1 --rebase
```

### 4. Epic 완료 시
```bash
# Epic 단위로 PR 생성 가능
# GitHub/GitLab에서 PR 생성
# Title: [Epic N] Epic 제목
# Description: 완료된 Story 목록 및 주요 변경사항
```

---

## ⏮️ 롤백 전략

### Story 단위 롤백
```bash
# 특정 Story 커밋만 되돌리기
git log --oneline  # 커밋 히스토리 확인
git revert <commit-hash>  # 특정 Story 되돌리기

# 예시
git revert abc1234  # [Story 2.1] 커밋 되돌리기
```

### 특정 시점으로 리셋
```bash
# 특정 Story 이전으로 되돌아가기 (신중하게 사용)
git reset --hard <commit-hash>

# 원격에 강제 푸시 (팀 협의 필수)
git push origin refactoring/2025-q1 --force-with-lease
```

### 안전한 작업 저장
```bash
# 현재 작업 임시 저장
git stash save "Story X.X WIP"

# 임시 저장 목록 확인
git stash list

# 복구
git stash pop
```

---

## 🔀 PR 및 머지 전략

### PR 생성 시점
1. **Epic 완료 시**: Epic 1 (Layout System) 완료 → PR
2. **주간 단위**: 매주 금요일 완료된 Story들 → PR
3. **마일스톤 달성 시**: Phase 1 완료 → PR

### PR 템플릿
```markdown
## 📋 변경 사항
### 완료된 Story
- [x] [Story 1.1] Layout 컴포넌트 생성 (8점)
- [x] [Story 1.2] 모든 페이지에 Layout 적용 (5점)

### 주요 변경사항
- Header/Footer 중복 코드 제거
- Layout 컴포넌트로 통합 관리
- TypeScript 타입 안전성 강화

### 테스트
- [x] 빌드 성공
- [x] 린트 통과
- [x] 로컬 테스트 완료
- [x] 배포 환경 테스트

### 스크린샷
(변경 전/후 스크린샷 첨부)

### Story Points
완료: 13/95
```

### 머지 전략
```bash
# Squash merge (Epic 단위로 정리)
git checkout main
git merge --squash refactoring/2025-q1
git commit -m "[Epic 1] Layout System Refactoring
- Story 1.1: Layout 컴포넌트 생성
- Story 1.2: 모든 페이지 적용
- Total Points: 13/95"

# 또는 Rebase merge (히스토리 보존)
git checkout refactoring/2025-q1
git rebase main
git checkout main
git merge refactoring/2025-q1 --ff-only
```

---

## 📚 명령어 레퍼런스

### 자주 사용하는 명령어
```bash
# 브랜치 생성 및 이동
git checkout -b refactoring/2025-q1

# 현재 상태 확인
git status
git log --oneline -10  # 최근 10개 커밋
git diff  # 변경사항 확인

# 커밋 관련
git add .
git commit -m "[Story X.X] 제목"
git commit --amend  # 마지막 커밋 수정

# 푸시/풀
git push origin refactoring/2025-q1
git pull origin refactoring/2025-q1 --rebase

# 되돌리기
git revert <commit-hash>  # 특정 커밋 되돌리기
git reset --soft HEAD~1  # 마지막 커밋 취소 (변경사항 유지)
git reset --hard HEAD~1  # 마지막 커밋 취소 (변경사항 삭제)

# 임시 저장
git stash save "메시지"
git stash list
git stash pop

# 히스토리 정리
git rebase -i HEAD~3  # 최근 3개 커밋 정리
```

### Story 진행 상황 확인
```bash
# Story별 커밋 확인
git log --grep="Story" --oneline

# 특정 Epic의 Story들만 확인
git log --grep="Story 1\." --oneline  # Epic 1의 모든 Story

# Points 진행 상황 확인
git log --grep="Points:" --oneline | tail -1
```

---

## 📊 진행 상황 추적

### 커밋 히스토리로 진행도 확인
```bash
# 완료된 Story 카운트
git log --grep="\[Story" --oneline | wc -l

# Epic별 진행도
git log --grep="\[Story 1\." --oneline | wc -l  # Epic 1
git log --grep="\[Story 2\." --oneline | wc -l  # Epic 2

# Story Point 추적
git log --grep="Points:" --format="%s" | grep -oP "Points: \K\d+"
```

### 진행 상황 시각화
```bash
# 그래프 형태로 브랜치 히스토리 확인
git log --graph --oneline --all

# 특정 기간 작업 확인
git log --since="1 week ago" --oneline
```

---

## ⚠️ 주의사항

1. **빌드 상태 유지**: 각 커밋은 빌드 가능한 상태여야 함
2. **커밋 크기**: 1 Story = 1 Commit 원칙 준수
3. **테스트 우선**: 커밋 전 반드시 로컬 테스트 실행
4. **백업 주기**: 최소 하루 1회 원격 저장소 푸시
5. **팀 소통**: force push나 rebase 전 팀원과 협의
6. **문서 업데이트**: Story 완료 시 관련 문서 함께 업데이트

---

## 🚀 Quick Start

```bash
# 1. 브랜치 생성
git checkout -b refactoring/2025-q1

# 2. 첫 Story 시작
npm run build  # 현재 상태 확인
# ... Story 1.1 작업 ...

# 3. 커밋
git add .
git commit -m "[Story 1.1] Layout 컴포넌트 생성
- Layout.tsx 파일 생성
- Header/Footer 통합
- Points: 8/95"

# 4. 푸시
git push origin refactoring/2025-q1
```

---

*작성일: 2025-01-28*  
*프로젝트: BEFUN 리팩토링*  
*버전: 1.0*