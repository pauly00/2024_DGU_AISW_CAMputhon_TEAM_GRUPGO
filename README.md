# GRUPGO

2024 동국대학교 AISW CAMputhon - Team GRUPGO의 풀스택 웹 애플리케이션입니다.
대학생을 위한 **식사 주문**, **일정 관리**, **학과목 추적**, **다이어리** 기능을 하나의 플랫폼으로 통합합니다.

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | React 18.3.1 (TypeScript), React Router 6, MUI 5, Axios, Recharts |
| Backend | Spring Boot 3.3.2, Java 22, Spring Data JPA, Lombok |
| Database | MySQL (`grupgo` schema) |
| Build | Gradle 8.8, Create React App |
| 기타 | ZXing (QR 코드), Apache POI (Excel 내보내기) |

---

## 프로젝트 구조

```
2024_DGU_AISW_CAMputhon_TEAM_GRUPGO/
├── BACK/                            # Spring Boot 백엔드
│   └── src/main/java/rofla/back/back/
│       ├── config/                  # CORS 설정
│       ├── controller/              # REST API 컨트롤러 (10개)
│       ├── dto/                     # 요청 DTO (4개)
│       ├── model/                   # JPA 엔티티 (8개)
│       ├── repository/              # JPA 레포지토리 (7개)
│       ├── service/                 # 비즈니스 로직 (10개)
│       └── BackApplication.java
└── front/                           # React 프론트엔드
    └── src/
        ├── auth/                    # AuthContext (로그인 상태 관리)
        ├── components/              # 기능별 컴포넌트 (35개+)
        ├── App.tsx                  # 라우팅
        └── index.tsx
```

---

## Frontend

### 라우팅 구조 (`App.tsx`)

| 경로 | 컴포넌트 | 설명 |
|------|----------|------|
| `/` | MainPage | 메인 랜딩 페이지 (섹션 스크롤) |
| `/login` | Login | 로그인 폼 |
| `/signup` | Signup | 회원가입 폼 |
| `/afterlogin` | AfterLogin | 로그인 후 프로필 모달 |
| `/logout` | LogoutPage | 로그아웃 페이지 |
| `/dailyschedule` | DailySchedule | 일일 일정 관리 |
| `/weeklyschedule` | WeeklySchedule | 주간 일정 관리 |
| `/menu` | Menu | 식당 메뉴 |
| `/paymentpage` | Payment | 결제 페이지 |
| `/paymentcomplete` | PaymentComplete | 주문 완료 페이지 |

### 주요 컴포넌트

**인증**
- `auth/authcontext.tsx` — React Context 기반 로그인 상태 관리
- `login/login.tsx` — 사용자명/비밀번호 로그인 (`POST /User/login`)
- `signup/signup.tsx` — 회원가입 + 실시간 입력 유효성 검사 (이름 30자, 사용자명 10자, 비밀번호 15자, 전화번호 10자, 전공 30자)

**메인 레이아웃**
- `mainpage/mainpage.tsx` — 섹션 스크롤 메인 페이지 (Home / 주문 / 일정 / 팀)
- `topbar/topbar.tsx` — 상단 네비게이션 바 (메뉴 토글, 섹션 이동, 프로필)
- `sidebar/sidebar.tsx` — 접이식 사이드 메뉴
- `modal/modal.tsx` — 프로필 모달 오버레이

**식사 주문**
- `menu/menu.tsx` — 식당 메뉴 목록 (`GET /Food/getAll`)
- `cartt.tsx` — 장바구니 (로컬 상태 관리)
- `payment/payment.tsx` — 주문 결제 폼
- `payment/paymentcomplete.tsx` — 주문 완료 확인

**일정 관리**
- `dailyschedule/dailyschedule.tsx` — 일일 일정 뷰, 공강 시간 자동 계산, 활동 기록 (`POST /Behavior/add`)
  - 활동 유형: 휴식, 식사, 공부, 운동, 취미
- `weeklyschedule/weeklyschedule.tsx` — 주간 일정 뷰
- `animations/lineanimation.tsx` — 타임라인 시각화

**사용자 프로필**
- `user/User.tsx`, `user/Profile.tsx`, `user/userData.tsx` — 프로필 페이지
- `loginProfile/beforeLogin.tsx` — 비로그인 상태 모달
- `loginProfile/afterLogin.tsx` — 로그인 상태 모달

**기타**
- `qr/qr.tsx` — QR 코드 표시
- `func2/PieChart.tsx` — 활동 분석 파이 차트 (Recharts)

---

## Backend

### API 엔드포인트

#### 사용자 (`/User`)
| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | `/User/join` | 회원가입 (중복 사용자명 검사) |
| GET | `/User/login` | 로그인 인증 |
| GET | `/User/getAll` | 전체 사용자 조회 |
| GET | `/User/search/{name}` | 사용자명으로 검색 |
| PUT | `/User/update` | 사용자 정보 수정 |
| DELETE | `/User/delete/{name}` | 사용자 삭제 |

#### 음식 (`/Food`)
| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | `/Food/add` | 메뉴 추가 |
| GET | `/Food/getAll` | 전체 메뉴 조회 |
| GET | `/Food/search/{foodname}` | 음식 이름으로 검색 |
| PUT | `/Food/update` | 메뉴 수정 |
| DELETE | `/Food/delete/{name}` | 메뉴 삭제 |

#### 주문 (`/Order`, `/OrderedFood`)
| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | `/Order/add` | 주문 생성 |
| GET | `/Order/getAll` | 전체 주문 조회 |
| GET | `/Order/search/OrderRequest` | 사용자명+날짜로 주문 검색 |
| PUT | `/Order/update` | 주문 수정 |
| DELETE | `/Order/delete/OrderRequest` | 주문 삭제 |
| (OrderedFood) | — | 주문 항목 CRUD |

#### 행동 기록 (`/Behavior`)
| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | `/Behavior/add` | 활동 기록 추가 |
| GET/PUT/DELETE | — | 활동 기록 CRUD |

#### 다이어리 (`/Diary`)
| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | `/Diary/add` | 일기 작성 |
| GET | `/Diary/getAll` | 전체 일기 조회 |
| GET | `/Diary/search/DiaryRequest` | 사용자명+날짜+번호로 검색 |
| PUT/DELETE | — | 일기 수정/삭제 |

#### 수강 과목 (`/Subject`, `/SubjectInfo`)
| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | `/Subject/add` | 수강 과목 등록 |
| GET | `/Subject/search/SubjectRequest` | 과목번호+사용자명으로 검색 |
| PUT/DELETE | — | 수강 정보 수정/삭제 |
| (SubjectInfo) | — | 과목 메타데이터 CRUD |

#### 기타
- `/Bcd` — QR 코드 관련 처리
- `/Excel` — Excel 파일 내보내기 (Apache POI)

### 엔티티 관계

```
User (1) ──< Order (1) ──< OrderedFood >── Food
User (1) ──< Diary
User (1) ──< Subject >── SubjectInfo
User (1) ──< Behavior
```

### 요청 DTO

| DTO | 필드 |
|-----|------|
| `loginRequest` | username, password |
| `OrderRequest` | username, date |
| `DiaryRequest` | username, date, empty_num |
| `SubjectRequest` | subjectNum, userName |

### 설정

- **CORS**: `http://localhost:3000` 허용, `Authorization` 헤더 노출
- **DB**: MySQL, schema `grupgo`, JPA ddl-auto 사용
- **Security**: 현재 비활성화 (JWT 미구현)

---

## 실행 방법

### Backend

```bash
cd BACK
./gradlew bootRun
# 서버 기동: http://localhost:8080
```

> `application.properties`에 MySQL 접속 정보 설정 필요
> ```properties
> spring.datasource.url=jdbc:mysql://localhost:3306/grupgo
> spring.datasource.username=YOUR_USERNAME
> spring.datasource.password=YOUR_PASSWORD
> spring.jpa.hibernate.ddl-auto=update
> ```

### Frontend

```bash
cd front
npm install
npm start
# 브라우저: http://localhost:3000
```

---

## 팀 GRUPGO

2024 동국대학교 AISW CAMputhon 참가작
