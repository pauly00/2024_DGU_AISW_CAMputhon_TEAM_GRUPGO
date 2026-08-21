# GRUPGO

교내 해커톤에서 개발한 풀스택 웹 애플리케이션입니다.
대학생을 위한 **식사 주문**, **일정 관리**, **학과목 추적**, **다이어리** 기능을 하나의 플랫폼으로 통합합니다.

백엔드(`BACK/`)와 프론트엔드(`front/`)를 함께 관리하는 모노레포 구조입니다.

## 기술 스택

| 구분 | 기술 |
|------|------|
| Frontend | React 18.3.1 (TypeScript), React Router 6, MUI 5, Axios, Recharts |
| Backend | Spring Boot 3.3.2, Java 22, Spring Data JPA, Spring Security Crypto, Lombok |
| Database | H2 (로컬 기본), MySQL (`grupgo` schema, 운영 선택) |
| Build | Gradle 8.8, Create React App |
| 기타 | ZXing (QR 코드), Apache POI (Excel 내보내기) |

## 빠른 시작

별도 DB 설치 없이 로컬에서 즉시 실행할 수 있습니다.
백엔드는 기본 `local` 프로필에서 H2 인메모리 DB로 구동되며, 데모 계정과 샘플 메뉴가 자동 시드됩니다.

### Backend

```bash
cd BACK
./gradlew bootRun
# 서버 기동: http://localhost:8080
```

데모 계정 정보

| 항목 | 값 |
|------|------|
| 아이디 | demo |
| 비밀번호 | demo1234 |

### Frontend

```bash
cd front
npm install
npm start
# 브라우저: http://localhost:3000
```

프론트엔드는 `.env`의 `REACT_APP_API_BASE_URL` 값으로 백엔드 주소를 참조합니다.

## 프로젝트 구조

```
2024_DGU_AISW_CAMputhon_TEAM_GRUPGO/
├── BACK/                            # Spring Boot 백엔드
│   └── src/main/java/rofla/back/back/
│       ├── common/                  # 공통 응답, 전역 예외 처리
│       ├── config/                  # CORS, 비밀번호 인코더, 로컬 데이터 시드
│       ├── controller/              # REST API 컨트롤러
│       ├── dto/                     # 요청 응답 DTO
│       ├── model/                   # JPA 엔티티
│       ├── repository/              # JPA 레포지토리
│       ├── service/                 # 비즈니스 로직
│       └── BackApplication.java
│   └── src/main/resources/
│       ├── application.properties            # 기본 설정
│       ├── application-local.properties      # 로컬 H2 프로필
│       ├── application-mysql.properties      # MySQL 프로필
│       └── application.properties.example    # 설정 예시
└── front/                           # React 프론트엔드
    └── src/
        ├── api/                     # axios client 및 도메인 API 모듈
        ├── auth/                    # AuthContext, 라우트 가드
        ├── types/                   # 공용 타입 정의
        ├── components/              # 기능별 컴포넌트
        └── App.tsx                  # 라우팅
```

## Frontend

### 라우팅 구조 (`App.tsx`)

| 경로 | 컴포넌트 | 보호 | 설명 |
|------|----------|------|------|
| `/` | MainPage | 공개 | 메인 랜딩 페이지 |
| `/login` | Login | 공개 | 로그인 화면 |
| `/signup` | Signup | 공개 | 회원가입 화면 |
| `/afterlogin` | AfterLogin | 공개 | 로그인 후 프로필 모달 |
| `/logout` | LogoutPage | 공개 | 로그아웃 화면 |
| `/menu` | Menu | 인증 필요 | 식당 메뉴 및 장바구니 |
| `/paymentpage` | Payment | 인증 필요 | 결제 화면 |
| `/paymentcomplete` | PaymentComplete | 인증 필요 | 주문 완료 화면 |
| `/dailyschedule` | DailySchedule | 인증 필요 | 일일 일정 관리 |
| `/weeklyschedule` | WeeklySchedule | 인증 필요 | 주간 일정 관리 |

인증이 필요한 라우트는 `auth/ProtectedRoute`로 보호되며 비로그인 시 로그인 화면으로 이동합니다.

### API 연동 계층

컴포넌트 내부 하드코딩 방식 대신 API 모듈로 호출을 분리했습니다.

| 파일 | 역할 |
|------|------|
| `api/client.ts` | env 기반 baseURL의 공용 axios 인스턴스 |
| `api/authApi.ts` | 로그인, 회원가입 요청 |
| `api/foodApi.ts` | 메뉴 조회 요청 |
| `types/` | user, food, api 응답 타입 정의 |

### 인증 상태 관리

`auth/authcontext.tsx`는 로그인 사용자 정보를 `localStorage`에 저장하여 새로고침 후에도 상태를 유지합니다.
로그아웃 시 저장 정보를 제거합니다.

## Backend

### 공통 응답 형식

모든 인증 관련 응답은 다음 형식을 따릅니다.

```json
{
  "success": true,
  "data": {},
  "message": "요청이 성공했습니다."
}
```

예외는 `common/GlobalExceptionHandler`에서 중앙 처리하며 상황에 따라 상태 코드를 구분합니다.

| 예외 | 상태 코드 |
|------|----------|
| 입력 중복, 잘못된 인자 | 409 |
| 인증 실패 | 401 |
| 검증 실패, 잘못된 요청 본문 | 400 |
| 그 외 서버 오류 | 500 |

### 사용자 API (`/User`)

| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | `/User/join` | 회원가입 (아이디 중복 검사, 비밀번호 BCrypt 해시) |
| POST | `/User/login` | 로그인 인증 (아이디 및 비밀번호 검증) |
| GET | `/User/getAll` | 전체 사용자 조회 |
| GET | `/User/search/{name}` | 아이디로 사용자 검색 |
| PUT | `/User/update` | 사용자 정보 수정 |
| DELETE | `/User/delete/{name}` | 사용자 삭제 |

응답은 비밀번호를 제외한 `UserResponse` 형태로 반환합니다.

### 음식 API (`/Food`)

| 메서드 | 경로 | 설명 |
|--------|------|------|
| POST | `/Food/add` | 메뉴 추가 (중복 검사 후 저장) |
| GET | `/Food/getAll` | 전체 메뉴 조회 |
| GET | `/Food/search/{foodname}` | 이름으로 메뉴 검색 |
| PUT | `/Food/update` | 메뉴 수정 |
| DELETE | `/Food/delete/{name}` | 메뉴 삭제 |

### 그 외 도메인

주문(`/Order`, `/OrderedFood`), 활동 기록(`/Behavior`), 다이어리(`/Diary`), 수강 과목(`/Subject`, `/SubjectInfo`), QR(`/Bcd`), Excel(`/Excel`) 도메인이 CRUD 형태로 구성되어 있습니다.

### 엔티티 관계

```
User (1) ──< Order (1) ──< OrderedFood >── Food
User (1) ──< Diary
User (1) ──< Subject >── SubjectInfo
User (1) ──< Behavior
```

## 인증 설계

| 항목 | 내용 |
|------|------|
| 비밀번호 저장 | BCrypt 해시 (`config/PasswordConfig`) |
| 로그인 검증 | 아이디 존재 및 비밀번호 일치 확인 |
| 상태 유지 | 프론트엔드 localStorage 영속화 |
| 라우트 보호 | React 라우트 가드 적용 |

## 테스트

### Backend

```bash
cd BACK
./gradlew test
```

`UserServiceTest`에서 비밀번호 해시 저장, 아이디 중복, 로그인 성공 및 실패를 검증합니다.

### Frontend

```bash
cd front
npm test
```

`api/authApi.test.ts`에서 로그인 성공 응답 처리와 실패 응답 예외 처리를 검증합니다.

## MySQL 사용

운영 환경에서 MySQL을 사용하려면 `mysql` 프로필로 실행합니다.

```bash
cd BACK
./gradlew bootRun --args='--spring.profiles.active=mysql'
```

접속 정보는 환경 변수로 주입할 수 있습니다.

| 환경 변수 | 기본값 |
|-----------|--------|
| DB_HOST | localhost |
| DB_PORT | 3306 |
| DB_NAME | grupgo |
| DB_USERNAME | root |
| DB_PASSWORD | root |

## 프로젝트 배경

교내 해커톤에서 개발한 뒤 기능과 구조를 고도화한 프로젝트입니다.
