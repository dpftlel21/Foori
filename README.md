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
2. 배포 및 도커 설정 / 2024. 12. 04

    - Vite 마이그레이션 과정 발생 한 문제

    Tailwind CSS 호환이 안돼서, `tailwind.config.js` 파일을 ES모듈 형식으로 변경하였습니다. 또한, `postcss.config.js` 파일을 추가하여 `npm install -D tailwindcss postcss autoprefixer` 명령어를 통해 호환성을 해결하였습니다. (의존성 설치) 그 이후에 `vite.config.ts` 파일에서 `postcss` 플러그인을 추가하여 호환성을 해결하였습니다.
3. 카카오맵 마커 커스텀 오버레이 추가, 검색 구현 / 2024. 12. 09

#### 📝 변경사항

1. CRA -> Vite 로 마이그레이션 / 2024. 12. 04

    Why?

    - CRA는 빌드 속도가 느리고, 번들 크기가 크다는 단점이 있습니다.

    - Vite는 빌드 속도가 CRA보다 빠르고, 번들 크기가 작습니다.

---

**개발기간 : 2023.08.24 ~ 2023.09.22**