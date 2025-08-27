# Sprint Planning Template

## 📅 Sprint 정보
- **Sprint 번호**: #
- **기간**: YYYY-MM-DD ~ YYYY-MM-DD (2주)
- **목표**: 
- **참여자**: 

## 🎯 Sprint 목표
<!-- 이번 Sprint에서 달성하고자 하는 주요 목표 -->

## 📋 Sprint Backlog

### 선택된 Stories
| Story ID | Title | Epic | Points | Assignee | Priority |
|----------|--------|------|---------|----------|----------|
| 1.1 | Layout 컴포넌트 생성 | Layout System | 8 | TBD | P0 |
| 1.2 | 모든 페이지 Layout 적용 | Layout System | 10 | TBD | P0 |

**Total Points**: 18점

### Capacity Planning
- **팀 Capacity**: XX점 (개발자 수 × 경험치 × 가용 시간)
- **선택한 Points**: 18점
- **여유도**: XX%

## 🔗 Sprint 의존성
<!-- Stories 간 의존성 관계 -->
```
Story 1.1 → Story 1.2
```

## 📊 Daily Tasks 분배

### Week 1
| Day | Task | Story | Assignee | Status |
|-----|------|-------|----------|---------|
| Mon | Research & Design | 1.1 | TBD | 📝 |
| Tue | Core Implementation (1/3) | 1.1 | TBD | 📝 |
| Wed | Core Implementation (2/3) | 1.1 | TBD | 📝 |
| Thu | Core Implementation (3/3) | 1.1 | TBD | 📝 |
| Fri | Testing & Documentation | 1.1 | TBD | 📝 |

### Week 2  
| Day | Task | Story | Assignee | Status |
|-----|------|-------|----------|---------|
| Mon | Page Migration Planning | 1.2 | TBD | 📝 |
| Tue | Homepage & Products Migration | 1.2 | TBD | 📝 |
| Wed | ProductDetail & Configurator | 1.2 | TBD | 📝 |
| Thu | Import Cleanup & Testing | 1.2 | TBD | 📝 |
| Fri | Final Testing & Documentation | 1.2 | TBD | 📝 |

## 🧪 Definition of Done
- [ ] 모든 코드 구현 완료
- [ ] 유닛 테스트 작성 및 통과 (90% 커버리지)
- [ ] 통합 테스트 통과  
- [ ] 코드 리뷰 완료
- [ ] TypeScript 컴파일 에러 없음
- [ ] ESLint/Prettier 통과
- [ ] 문서 업데이트
- [ ] 접근성 체크 통과
- [ ] 성능 회귀 없음
- [ ] 기존 기능 회귀 테스트 통과

## 🚨 Risk Assessment

### High Risk
- **Header 로직 복잡도**: 기존 스크롤 로직이 복잡할 수 있음
- **Mitigation**: 단계적 접근, Hook으로 분리

### Medium Risk  
- **Import 경로 대량 변경**: 100+ 파일 수정 필요
- **Mitigation**: IDE 자동 리팩토링, 단계별 확인

### Low Risk
- **스타일 충돌**: 새로운 구조로 인한 CSS 이슈
- **Mitigation**: 점진적 적용, 회귀 테스트

## 📈 Success Metrics
- **개발 속도**: 새 페이지 생성 시간 50% 감소
- **코드 중복**: Header/Footer import 100% 제거  
- **유지보수성**: Layout 관련 수정 시 1곳만 변경
- **개발자 만족도**: 설문조사 4.5/5 이상

## 🔄 Daily Standup Questions
1. **어제 한 일**: 완료된 태스크
2. **오늘 할 일**: 예정된 태스크  
3. **블로커**: 도움이 필요한 부분
4. **Sprint 목표 진행률**: %

## 📝 Sprint Notes
<!-- 특별한 고려사항이나 결정사항 기록 -->

---

*Sprint 생성일: YYYY-MM-DD*  
*마지막 업데이트: YYYY-MM-DD*