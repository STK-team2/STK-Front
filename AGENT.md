# STK Project — Agent Guide

AI 에이전트가 이 프로젝트를 이해하고 작업하기 위한 가이드입니다.

---

## 기술 스택

| 항목 | 내용 |
|---|---|
| 프레임워크 | React 18 + TypeScript |
| 번들러 | Vite 8 |
| 스타일 | Emotion (`@emotion/react`) — CSS-in-JS |
| 라우터 | react-router-dom v7 |
| 차트 | chart.js + react-chartjs-2 |
| 패키지 매니저 | **pnpm** (npm 사용 금지 — `pnpm add`, `pnpm build`) |
| 상태관리 | Zustand |
| HTTP | Axios + TanStack Query |

---

## 아키텍처: FSD (Feature-Sliced Design)

```
src/
├── app/            # 진입점, 라우터(AppRouter.tsx), 글로벌 스타일
├── pages/          # 라우트 단위 페이지
├── features/       # 비즈니스 로직·API (UI 없음, services/ 세그먼트만)
├── widgets/        # 복합 재사용 블록 (ex. Layout)
├── entities/       # 도메인 엔티티
└── shared/         # 공통 UI, 훅, 유틸
```

---

## 라우트 구조

| 경로 | 페이지 | 파일 |
|---|---|---|
| `/dashboard` | 대시보드 | `pages/Dashboard/index.tsx` |
| `/incoming` | 입고 관리 | `pages/IncomingManagement/index.tsx` |
| `/outgoing` | 출고 관리 | `pages/OutgoingManagement/index.tsx` |
| `/inventory` | 재고 조회 | `pages/InventoryManagement/index.tsx` |
| `/closing` | 마감 처리 | `pages/ClosingManagement/index.tsx` |
| `/login` | 로그인 | `pages/Login/index.tsx` |
| `/register` | 회원가입 | `pages/Register/index.tsx` |
| `*` | → `/login` 리다이렉트 | |

---

## 레이아웃 구조

`widgets/Layout/index.tsx` — 사이드바 + 콘텐츠 영역 공통 레이아웃

- **사이드바 고정**: `wrapper`를 `height: 100vh; overflow: hidden`으로, `sidebar`를 `height: 100vh`로 설정해 사이드바가 스크롤 없이 고정됨
- **콘텐츠 스크롤**: `content`에 `height: 100vh; overflow-y: auto`로 내부만 스크롤
- 사이드바 nav 항목: 홈(`/dashboard`), 입고 관리, 출고 관리, 재고 조회, 마감 처리
- 활성 항목: 파란 좌측 보더 + 연한 파란 그라디언트 배경

---

## 코드 컨벤션

### CSS (Emotion)
- 스타일 파일명: `style.ts` (`.css.ts` 아님)
- import: `import * as s from './style'` → `css={s.styleName}`
- 인라인 스타일 쓰지 말 것 (단, 동적 색상처럼 불가피한 경우 `style={{ }}` 허용)
- TypeScript 타입 옵션 객체에는 `as const` 붙이기 (chart.js options 등)

### 페이지 파일 구조
```
pages/PageName/
├── index.tsx    # 페이지 컴포넌트 (default export)
└── style.ts     # Emotion 스타일
```

### TypeScript
- `import type { Foo }` — verbatimModuleSyntax 활성화되어 있으므로 타입은 반드시 type-only import 사용

---

## 대시보드 페이지 (`pages/Dashboard`)

피그마 디자인 기준으로 구현한 재고관리 대시보드.

### 섹션 구성 (위→아래 세로 스크롤)

1. **헤더** — 타이틀 + 날짜 + 유저 이메일
2. **요약 카드 4개** (grid 1fr×4) — 오늘 입고, 오늘 출고, 전체 품목 수, 이번 달 마감
3. **중간 행** (grid 370px + 1fr) — 이번 달 마감상태(도넛) + 주간 입출고 현황(막대)
4. **하단 행** (grid 1fr + 340px) — 재고 현황(테이블) + 최근 입출고(리스트)
5. **월별 재고 추이** — 전체 너비 area 라인 차트

### 차트 라이브러리 사용

```tsx
// 필요한 컴포넌트만 등록 (tree-shaking)
ChartJS.register(
  CategoryScale, LinearScale, BarElement,
  PointElement, LineElement, ArcElement,
  Filler, Tooltip,
);
```

- 차트 options 객체에 `as const` 필수 (TypeScript 추론 문제)
- 차트 래퍼에 `overflow: hidden; min-width: 0` 필수 — 브라우저 zoom 시 차트가 밖으로 나가는 현상 방지
- `midRow`, `bottomRow` 그리드에도 `min-width: 0` 적용

### 주요 디자인 토큰

| 항목 | 값 |
|---|---|
| 페이지 배경 | `#f4f6f9` |
| 카드 배경 | `#fff` |
| 카드 테두리 | `1px solid #e6e8ed` |
| 카드 radius | `12px` |
| 주 파란색 | `#0068e0` |
| 입고 차트색 | `#4C8BF5` |
| 출고 차트색 | `#F9A8C9` (막대) / `#F4A261` (라인) |
| 텍스트 primary | `#1a1c23` |
| 텍스트 secondary | `#9497a0` |

### 미마감 배지 스타일

```css
background: #FDE68A;
color: #92400E;
border-radius: 4px;
align-self: flex-start;   /* 부모 flex column에서 늘어나지 않도록 필수 */
```

### 아이콘 (SVG inline)

| 카드 | 아이콘 | 배경색 |
|---|---|---|
| 오늘 입고 | 시계방향 순환화살표 (stroke `#4C8BF5`) | `#EEF4FF` |
| 오늘 출고 | 반시계방향 순환화살표 (stroke `#F06292`) | `#FFF0F5` |
| 전체 품목 수 | 4방향 반짝이 별 (stroke `#48BB78`) | `#F0FFF4` |
| 이번 달 마감 | 봉투/메일 (stroke `#F6AD55`) | `#FFFBEB` |

아이콘 배경 border-radius: `50%` (완전 원형)

---

## 반응형 브레이크포인트

| 브레이크포인트 | 적용 |
|---|---|
| `max-width: 1440px` | MacBook — 주요 수치 0.75 비율 축소 |
| `max-width: 1280px` | 소형 노트북 — 그리드 단일 컬럼 전환 |
| `max-width: 768px` | 태블릿 |
| `max-width: 480px` | 모바일 |

---

## 알려진 이슈 및 해결책

### 차트 브라우저 zoom 이슈
브라우저 Cmd+/- 로 zoom 변경 시 chart.js 캔버스가 컨테이너 밖으로 벗어나는 현상.

**해결**: 차트 래퍼 + 부모 카드에 아래 스타일 적용
```css
overflow: hidden;
min-width: 0;
position: relative;
```

### TypeScript verbatimModuleSyntax
타입만 import할 때 `import type { Foo }` 형식 필수. `import { Foo }` 사용 시 빌드 오류 발생.

### pnpm 전용 프로젝트
`pnpm-lock.yaml` 사용. `npm install` 시 오류 발생하므로 반드시 `pnpm add`, `pnpm build` 사용.
