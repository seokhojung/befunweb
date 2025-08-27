# 리팩토링 문서 폴더 관리 전략

## 🎯 폴더 관리 목표
1. **일관성**: 모든 Epic이 동일한 구조
2. **확장성**: 새로운 Epic/Story 추가 용이
3. **검색성**: 빠른 문서 탐색 가능
4. **유지보수**: 문서 업데이트 편의성

## 📁 완전한 폴더 구조

```
docs/
├── README.md                           # 전체 가이드
├── ORGANIZATION_GUIDE.md               # 문서 사용법
├── FOLDER_MANAGEMENT_STRATEGY.md       # 현재 파일
├── PROJECT_OVERVIEW.md                 # 프로젝트 개요
│
├── 📋 strategy/                        # 전략 문서 (5개)
│   ├── REFACTORING_OVERVIEW.md
│   ├── TECHNICAL_DEBT_ANALYSIS.md
│   ├── SUCCESS_METRICS.md
│   ├── RISK_ASSESSMENT.md
│   └── ARCHITECTURE_DECISION_RECORDS.md
│
├── 📖 stories/                         # Epic & Story 모음 (6개 Epic)
│   ├── STORY_POINTS_REVISION.md        # 포인트 재평가
│   ├── STORY_DEPENDENCY_MAP.md         # 의존성 관계
│   │
│   ├── epic-01-layout-system/          # Epic 1 (완료)
│   │   ├── README.md
│   │   ├── story-1.1-layout-component.md
│   │   └── story-1.2-page-migration.md
│   │
│   ├── epic-02-component-architecture/  # Epic 2 (예정)
│   │   ├── README.md
│   │   ├── story-2.1-folder-restructure.md
│   │   ├── story-2.2-component-migration.md
│   │   ├── story-2.3-import-path-update.md
│   │   └── story-2.4-icon-system.md
│   │
│   ├── epic-03-type-system/            # Epic 3
│   │   ├── README.md
│   │   ├── story-3.1-type-centralization.md
│   │   ├── story-3.2-generic-types.md
│   │   └── story-3.3-strict-typescript.md
│   │
│   ├── epic-04-custom-hooks/           # Epic 4
│   │   ├── README.md
│   │   ├── story-4.1-menu-toggle-hook.md
│   │   ├── story-4.2-scroll-direction-hook.md
│   │   └── story-4.3-common-hooks.md
│   │
│   ├── epic-05-performance/            # Epic 5
│   │   ├── README.md
│   │   ├── story-5.1-component-memoization.md
│   │   ├── story-5.2-image-optimization.md
│   │   ├── story-5.3-bundle-optimization.md
│   │   └── story-5.4-loading-performance.md
│   │
│   └── epic-06-configuration/          # Epic 6
│       ├── README.md
│       ├── story-6.1-constants-centralization.md
│       ├── story-6.2-environment-config.md
│       └── story-6.3-build-optimization.md
│
├── 🚀 implementation/                  # 구현 가이드 (Phase별)
│   ├── PHASE_01_FOUNDATION.md
│   ├── PHASE_02_QUALITY.md
│   ├── PHASE_03_OPTIMIZATION.md
│   ├── CODE_EXAMPLES.md
│   ├── MIGRATION_CHECKLIST.md
│   ├── TESTING_STRATEGY.md
│   └── DEPLOYMENT_GUIDE.md
│
├── 📊 tracking/                        # 진행 추적
│   ├── SPRINT_PLANNING_TEMPLATE.md     # 템플릿 (완료)
│   ├── VELOCITY_TRACKING.md
│   ├── DAILY_STANDUP_LOG.md
│   ├── WEEKLY_PROGRESS.md
│   ├── RETROSPECTIVES.md
│   ├── ISSUES_LOG.md
│   └── sprints/                        # 실제 스프린트 기록
│       ├── sprint-01/
│       ├── sprint-02/
│       └── ...
│
├── 📚 reference/                       # 참고 자료
│   ├── COMPONENT_INVENTORY.md          # 컴포넌트 현황 (완료)
│   ├── TYPE_DEFINITIONS.md
│   ├── API_REFERENCE.md
│   ├── BROWSER_COMPATIBILITY.md
│   ├── PERFORMANCE_BENCHMARKS.md
│   ├── ACCESSIBILITY_GUIDELINES.md
│   └── TROUBLESHOOTING.md
│
└── 📦 templates/                       # 문서 템플릿
    ├── EPIC_TEMPLATE.md
    ├── STORY_TEMPLATE.md
    ├── SPRINT_TEMPLATE.md
    └── RETROSPECTIVE_TEMPLATE.md
```

## 📋 Epic별 상세 분할 전략

### Epic 2: Component Architecture (22점 → 4개 Story)
```
story-2.1-folder-restructure.md     (8점)  - 폴더 구조 재설계
story-2.2-component-migration.md    (6점)  - 컴포넌트 파일 이동
story-2.3-import-path-update.md     (5점)  - Import 경로 대량 업데이트
story-2.4-icon-system.md           (3점)  - 아이콘 시스템 통합
```

### Epic 3: Type System (16점 → 3개 Story)
```
story-3.1-type-centralization.md    (7점)  - 타입 정의 중앙화
story-3.2-generic-types.md         (4점)  - Generic 타입 시스템
story-3.3-strict-typescript.md     (5점)  - Strict 모드 적용
```

### Epic 4: Custom Hooks (12점 → 3개 Story)
```
story-4.1-menu-toggle-hook.md      (5점)  - useMenuToggle Hook
story-4.2-scroll-direction-hook.md  (4점)  - useScrollDirection Hook  
story-4.3-common-hooks.md          (3점)  - 기타 공통 Hook들
```

### Epic 5: Performance (20점 → 4개 Story)
```
story-5.1-component-memoization.md  (6점)  - React.memo 적용
story-5.2-image-optimization.md     (5점)  - 이미지 최적화
story-5.3-bundle-optimization.md    (5점)  - 번들 크기 최적화
story-5.4-loading-performance.md    (4점)  - 로딩 성능 개선
```

### Epic 6: Configuration (7점 → 3개 Story)
```
story-6.1-constants-centralization.md (3점) - 상수 중앙화
story-6.2-environment-config.md      (2점) - 환경 설정
story-6.3-build-optimization.md      (2점) - 빌드 최적화
```

## 🔧 문서 생성 자동화 전략

### 1. 템플릿 기반 생성
```bash
# Epic 템플릿으로 새 Epic 생성
cp templates/EPIC_TEMPLATE.md stories/epic-XX-name/README.md

# Story 템플릿으로 새 Story 생성  
cp templates/STORY_TEMPLATE.md stories/epic-XX/story-X.X-name.md
```

### 2. 일괄 생성 스크립트 (향후)
```bash
#!/bin/bash
# generate-epic-structure.sh
EPIC_NUM=$1
EPIC_NAME=$2
STORIES=("${@:3}")

mkdir -p "docs/stories/epic-$(printf "%02d" $EPIC_NUM)-$EPIC_NAME"
# Epic README 생성
# Story 파일들 생성
```

## 📊 문서 네이밍 컨벤션

### Epic 폴더
```
epic-[XX]-[키워드]
예: epic-01-layout-system
    epic-02-component-architecture
```

### Story 파일
```
story-[X.X]-[키워드].md
예: story-1.1-layout-component.md
    story-2.1-folder-restructure.md
```

### 일반 문서
```
[대문자_단어].md
예: TECHNICAL_DEBT_ANALYSIS.md
    SPRINT_PLANNING_TEMPLATE.md
```

### 날짜 기반 문서
```
[YYYY-MM-DD]-[설명].md
예: 2025-01-28-sprint-01-retrospective.md
    2025-02-04-weekly-progress.md
```

## 🔄 문서 라이프사이클 관리

### 1. 문서 상태 표시
```markdown
# 문서 헤더에 상태 표시
**상태**: 📝 Draft | 🚧 In Progress | ✅ Complete | 📄 Archived

**마지막 업데이트**: 2025-01-28
**다음 리뷰**: 2025-02-04
```

### 2. 버전 관리
```markdown
## 📋 변경 이력
- v1.2 (2025-01-28): Story 포인트 재평가
- v1.1 (2025-01-27): 초기 작성
- v1.0 (2025-01-26): 템플릿 생성
```

### 3. 아카이빙 전략
```
docs/archived/
├── completed-epics/
├── old-versions/
└── deprecated-docs/
```

## 🚀 다음 단계 실행 순서

### Step 1: Epic별 README 생성 (30분)
```bash
# Epic 2-6의 README.md 생성
docs/stories/epic-02-component-architecture/README.md
docs/stories/epic-03-type-system/README.md
docs/stories/epic-04-custom-hooks/README.md
docs/stories/epic-05-performance/README.md
docs/stories/epic-06-configuration/README.md
```

### Step 2: 핵심 Story 파일 생성 (2시간)
```bash
# Epic 2의 가장 복잡한 Story부터
story-2.1-folder-restructure.md (8점)
story-3.1-type-centralization.md (7점)
story-5.1-component-memoization.md (6점)
```

### Step 3: 나머지 Story 완성 (3시간)
```bash
# 남은 13개 Story 파일 생성
# 각 Story당 평균 15분
```

### Step 4: 템플릿 및 참고 문서 (1시간)
```bash
templates/EPIC_TEMPLATE.md
templates/STORY_TEMPLATE.md
reference/TYPE_DEFINITIONS.md
```

## 🎯 품질 관리 체크리스트

### Epic README 필수 포함 사항
- [ ] Epic 목표 및 범위
- [ ] 포인트 분배 및 Story 목록
- [ ] 의존성 관계 다이어그램
- [ ] 완료 조건 (Epic DoD)
- [ ] 리스크 요소 및 대응책

### Story 문서 필수 포함 사항
- [ ] User Story (As a, I want, So that)
- [ ] Acceptance Criteria (체크리스트)
- [ ] Technical Tasks (세분화된 작업)
- [ ] Definition of Done
- [ ] Risk Assessment

### 문서 품질 기준
- [ ] 모든 링크가 유효함
- [ ] 코드 예제가 정확함
- [ ] 체크리스트가 실행 가능함
- [ ] 의존성이 명확히 정의됨

---

## 💡 추천 작업 순서

**지금 즉시 할 일**:
1. Epic 2-6의 README.md 생성 (가장 중요)
2. Epic 2의 story-2.1-folder-restructure.md 작성 (가장 복잡)
3. 템플릿 파일들 생성

**이번 주 내 완료**:
- 모든 Epic README
- 핵심 Story 파일들 (8점 이상)

**다음 주 완료**:
- 나머지 모든 Story 파일
- 참고 문서 및 템플릿

이렇게 체계적으로 접근하면 **일관성 있고 관리하기 쉬운** 문서 구조가 완성됩니다!

*문서 작성일: 2025-01-28*