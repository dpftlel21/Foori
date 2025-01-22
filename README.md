🍔 Foori - 맛집 예약 서비스

## 📝 프로젝트 소개

Foori는 맛집 예약과 결제를 원스톱으로 처리할 수 있는 플랫폼입니다. 사용자 경험을 최우선으로 고려하여 직관적인 UI/UX를 구현했습니다.

## 👥 팀 구성

| 분야     | 이름   | GitHub                                                      |
| -------- | ------ | ----------------------------------------------------------- |
| Frontend | 이인우 | [@dpftlel21](https://github.com/dpftlel21?tab=repositories) |
| Backend  | 서재곤 | [@Jgone2](https://github.com/Jgone2)                        |

### 🔗 프로젝트 링크

- **[서비스 링크](http://www-foori.com)**
- **[백엔드 Repository](https://github.com/Jgone2/foori)**
- **[노드 Repository (Oauth)](https://github.com/dpftlel21/Foori_Node)**

### 📚 프로젝트 기획 및 설계 자료

- **[피그마](https://www.figma.com/design/K2RbAMXOjnQUoztBqQdVze/Foori?node-id=0-1&p=f&t=AnulHALlyHtMn0jj-0)**
- **[포스트맨](https://winter-escape-178167.postman.co/workspace/41c40088-cce2-46df-86e3-5e94800f91a4/overview)**
  ..

---

## 🛠 Technical Stack

### Frontend

<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=Tailwind CSS&logoColor=white"/> <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=react query&logoColor=white"> <img src="https://img.shields.io/badge/Framer Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white">

### DevOps

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">

## 💡 주요 기능 및 기술적 도전

### 1. 카카오맵 기반 맛집 검색 및 예약 시스템

- 카카오맵 API를 활용한 위치 기반 서비스 구현
  - autoload=false 옵션을 통한 초기 로딩 최적화
  - 커스텀 오버레이를 통한 매장 정보 표시
  - 카테고리별 필터링 및 검색 기능
  - 크롤링 데이터와 카카오맵 데이터 매칭 로직 구현
- 실시간 예약 시스템
  - 날짜/시간별 예약 가능 여부 확인
  - 메뉴 선택 및 인원 설정 기능
  - 중복 예약 방지 및 휴무일 처리
  - 24시간 이내 예약 차단 로직

### 2. 토스페이먼츠 결제 시스템 연동

- 결제 프로세스 안정성 확보
  - 결제 위젯 동적 렌더링 및 cleanup 처리
  - 결제 실패/취소 시나리오 처리
  - 결제 상태에 따른 예약 상태 관리
- 결제-예약 연동 시스템
  - 결제 완료 시 자동 예약 확정
  - 결제 취소 시 예약 상태 롤백
  - 결제 대기 상태 관리

### 3. 사용자 인증 시스템

- 다중 소셜 로그인 구현
  - 카카오/네이버/구글 로그인 연동
  - 소셜 계정 연동 및 해제 기능
  - JWT 기반 인증 처리
- 보안 강화
  - 이메일 인증 코드 확인 프로세스
  - Protected Routes를 통한 접근 제어
  - 로그인 상태 유지 및 토큰 관리

---

## 🎯 트러블슈팅

### 1. 백엔드와의 데이터 타입 불일치 문제

- 문제 1: 리뷰 작성 시 FormData와 백엔드 타입 불일치
  - FormData는 모든 값을 문자열로 전송하나, 백엔드는 bookingId를 number 타입으로만 처리
  - 이미지 파일과 함께 전송되어야 하는 데이터의 타입 불일치
- 해결:
  - 백엔드 팀과 협의하여 문자열로 받은 후 서버에서 타입 변환하는 방식으로 수정
  - FormData 전송 전 데이터 구조 검증 로직 추가

### 2. 토스페이먼츠 결제 위젯 관리

- 문제: 결제 위젯 재렌더링 시 메모리 누수 발생
- 해결:
  - useEffect cleanup에서 위젯 인스턴스 제거
  - 결제 상태에 따른 조건부 렌더링 적용
  ```typescript
  useEffect(() => {
    const paymentWidget = /* 위젯 초기화 */
    return () => {
      // cleanup 로직
      paymentMethodEl.innerHTML = '';
    };
  }, []);
  ```

### 3. 배포 자동화 구축

- 문제: GitHub Actions 실행 후 변경사항 미반영
- 해결:

  - Docker를 활용한 컨테이너화
  - EC2 환경변수 관리 체계화
  - Nginx 설정 최적화

- 문제2: SSH 연결 타임아웃으로 인한 배포 실패
- 원인:
  - t2.micro 인스턴스의 CPU 크레딧 고갈
  - 지속적인 배포와 서비스 운영으로 인한 리소스 부족
- 해결:
  - 인스턴스 스펙 개선
    - t2.micro → t3.micro 인스턴스 유형 변경
    - CPU 성능 및 네트워크 처리량 향상
  - 배포 환경 재구성
    - 새로운 퍼블릭 IP에 대한 GitHub Secrets 업데이트
    - DNS A 레코드 설정 변경
    - Docker 컨테이너 재시작 및 상태 확인
  - 모니터링 및 검증
    - GitHub Actions 워크플로우 로그 확인
    - Docker 컨테이너 상태 모니터링
    - 배포 후 서비스 정상 작동 확인

### 4. 페이지 이동 시 유저 정보 손실 문제

- 문제 1: 상세 페이지 진입 시 유저 정보 조회 실패
  - 메인 페이지에서는 정상 작동하나 상세 페이지에서 유저 정보 조회 실패
  - HTML 응답으로 인한 JSON 파싱 에러 발생
  - 토큰은 유효한 상태에서 불필요한 로그아웃 발생
- 해결:
  - React Query의 캐시 전략 최적화
  ```typescript
  const { data: userInfo } = useQuery(
    ['userInfo'],
    async () => {
      try {
        const response = await getUserProfile();
        return response;
      } catch (err) {
        const previousData = queryClient.getQueryData(['userInfo']);
        if (previousData) return previousData;
        throw err;
      }
    },
    {
      enabled: !!token,
      staleTime: Infinity,
      cacheTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      keepPreviousData: true,
    },
  );
  ```
  - 에러 발생 시 이전 캐시된 데이터 활용
  - 불필요한 API 호출 최소화
  - 페이지 이동 및 새로고침 시에도 유저 정보 유지

---

## 🔒 예외 처리

### 1. 인증 및 인가

- 휴무일 예약 불가 처리
- 중복 예약 방지 로직
- 사용자 피드백
  - 커스텀 Toast 메시지 시스템
  - 상황별 에러 메시지 분기 처리

### 1. 인증 및 인가

- 비로그인 사용자 접근 제어
  - Protected Routes 구현
  - 로그인 후 이전 페이지 리다이렉션
- 토큰 갱신 처리
  - 토큰 만료 시 자동 토큰 갱신
- 회원가입 보안 강화
  - 이메일 인증 코드 확인 프로세스
  - 비밀번호 유효성 검증

### 2. 예약 시스템 안정성

- 예약 제한 조건 구현
  - 24시간 이내 예약 차단
  - 휴무일 예약 불가 처리
  - 중복 예약 방지 로직
- 결제 연동 안정성
  - 결제 시도 중복 방지
  - 결제 실패 시 예약 상태 롤백
  - 네트워크 오류 대응

### 3. UI/UX 개선

- 사용자 피드백 강화
  - 커스텀 Toast 메시지 시스템
  - 로딩 상태 표시
  - 에러 메시지 상황별 분기
- 반응형 디자인
  - 모바일 최적화
  - 브레이크포인트별 레이아웃 조정

---

## ⏰ 개발 기간

**2024.12 ~**
