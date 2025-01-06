## **Team. 🍔 Foori**

### 🖥️ 배포 및 시연 영상

✔️ **[배포 싸이트]()**

---

## 📝 자료

#### ✔️ **[Figma](https://www.figma.com/file/RXDA1Zvfl7sjb7owNxb7VA/Sound-Oasis?type=design&node-id=0-1&mode=design&t=WUWxwmaabthRoGLn-0)**

#### ✔️ **[Git Repository](https://github.com/codestates-seb/seb45_main_005/tree/feDev)**

---

## ✔️ 주요 기능

### ✨

<br>

---

## **🖥️ Stack**

### **✔️ 프론트엔드**

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white" height="21"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white" height="21"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" height="21"> <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=Tailwind CSS&logoColor=white"/>

### **✔️ 백엔드**

<img src="https://img.shields.io/badge/java-007396?style=for-the-badge&logo=java&logoColor=white" height="22"> <img src="https://img.shields.io/badge/spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white" height="21"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white" height="21">

### **✔️ 공통**

<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white" height="21"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white" height="21">

---

## ✔️ Git Commit Message Convention

프로젝트의 커밋 메시지를 일관성 있고 명확하게 작성하기 위해 아래와 같은 구조로 커밋 메시지를 작성합니다. 이 Convention은 각각의 커밋이 어떤 작업을 수행하는지를 명확히 전달하여 협업과 버전 관리를 원활하게 합니다.

### 1. 구조

- `[타입]: 제목 (필수)`

- `[본문]: 변경 내용 (옵션)`

---

### 2. 기능 구현

1. 회원가입 및 로그인 / 2024. 12. 04
2. 배포 및 도커 설정 (github actions 배포 자동화) / 2024. 12. 04, 12. 09

   - Vite 마이그레이션 과정 발생 한 문제

   Tailwind CSS 호환이 안돼서, `tailwind.config.js` 파일을 ES모듈 형식으로 변경하였습니다. 또한, `postcss.config.js` 파일을 추가하여 `npm install -D tailwindcss postcss autoprefixer` 명령어를 통해 호환성을 해결하였습니다. (의존성 설치) 그 이후에 `vite.config.ts` 파일에서 `postcss` 플러그인을 추가하여 호환성을 해결하였습니다.

3. 카카오맵 마커 커스텀 오버레이 추가(예약하기), 검색 구현 / 2024. 12. 09
4. 카카오맵 데이터 및 크롤링 데이터 매칭, 소셜 로그인 구현 / 2024. 12. 10
5. 마이페이지 소셜 로그인 연동 구현 / 2024. 12. 11
6. 로그인, 소셜 로그인, 소셜 연동 예외 처리 / 2024. 12. 12

   - 소셜로그인 CORS 에러 수정 필요

7. 예외 처리에 따른 토스트 메시지 추가 / 2024. 12. 12
8. 예약 모달 구현 (예약 가능 시간, 예약 인원, 가게 메뉴 조회) / 2024. 12. 16
9. 카카오맵 및 크롤링 데이터 매칭 추가 / 2024. 12.
10. 비밀번호 변경, 이미지 업로드 기능 추가 / 2024. 12. 23
11. 결제 기능 추가 (토스 페이먼츠) / 2024. 12. 24
12. 메인 페이지 추가 / 2024. 12. 24
13. 배포 자동화 수정, 도메인 연결 / 2024. 01. 01

프로젝트의 자동 배포 과정에서 GitHub Actions의 워크플로우는 성공적으로 실행되었지만, EC2 서버의 실제 서비스에는 변경사항이 반영되지 않는 문제가 발생했습니다. 이는 단순히 코드를 서버로 전송하는 것만으로는 실행 환경과 필요한 설정들이 제대로 구성되지 않기 때문이었습니다. 이 문제를 해결하기 위해 Docker와 docker-compose를 도입하여 애플리케이션을 컨테이너화했고, Nginx 서버 설정과 함께 일관된 실행 환경을 구성했습니다. 특히 Git에 포함되지 않은 환경변수들(.env 파일)을 EC2 서버에 직접 생성하여 카카오맵 API 키, 리다이렉트 URL 등 필수적인 설정을 관리했습니다. 이 경험을 통해 배포 자동화에서는 코드 전송뿐만 아니라 실행 환경 구성, 환경변수 관리, 서버 설정 등 전체적인 인프라 구성의 자동화가 중요하다는 것을 배웠습니다.

14. 예약하기 추가 / 2025. 01. 02

- Date 타입 (bookingDate) 의사소통 오류

- menuId (post) 의사소통 오류

15. 홈화면 카테고리 및 메인 카테고리별 검색 추가, 마이페이지 UI 수정 / 2025. 01. 03

16. 예약 현황 캘린더 추가 / 2025. 01. 04

17. 리뷰 쓰기 및 조회 추가, 회원가입시 메일 인증코드 확인 추가 / 2025. 01. 05

#### 📝 변경사항

1. CRA -> Vite 로 마이그레이션 / 2024. 12. 04

   Why?

   - CRA는 빌드 속도가 느리고, 번들 크기가 크다는 단점이 있습니다.

   - Vite는 빌드 속도가 CRA보다 빠르고, 번들 크기가 작습니다.

---

**개발기간 : 2023.08.24 ~ 2023.09.22**
