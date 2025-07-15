
<!-- ![Image](https://github.com/user-attachments/assets/398f9b96-c2ab-4967-ac5f-819f9c52668f)-->
<!-- ![Image](https://github.com/user-attachments/assets/a467f2b0-2d2c-45fc-b56c-b3a2bd830343)-->
![Image](https://github.com/user-attachments/assets/91c27f13-dec4-40b2-8f82-425733d1caf3)


## ✨ 소개
소소한 일상을 채워주는 디자인 문구와 아이템을 소개하는 SPA 웹사이트, <b>"Ripo"</b> 입니다.

자신만의 일상과 감정을 감성적으로 기록하고 꾸밀 수 있는 공간을 제공하여, <br>
소소한 순간들을 소중하게 남길 수 있도록 합니다. <br>
또한, 일상을 기록하는 습관이 주는 즐거움과 그 의미를 널리 알리고자 기획하였습니다. <br>

480px(모바일) 해상도에 최적화된 디자인을 적용하여, <br>
언제 어디서나 편리하게 사용할 수 있도록 구현하였습니다.

## 🔗 배포 URL
https://ripo-tau.vercel.app

## 📑 프로젝트 요약

### 1. 주제

* 매일 기록하는 습관과 소소한 취향을 반영해, 자연스럽게 소비로 이어지는 감성적이고 귀여운 쇼핑 공간 제공

### 2. 목표

* 타겟층의 취향을 고려한 제품 구성
* 검색, 장바구니 기능 등 쇼핑 경험 개선을 통해 사용자 만족도 향상

### 3. 주요 기능

* 카테고리별 상품 리스트 및 상세 정보 제공
* 사용자 맞춤 검색 기능
* 장바구니를 통한 상품 보관 및 선택 결제 기능
* 자주 묻는 질문 페이지 제공
* 회원가입 및 로그인 기능
* 마이페이지 주문 내역 관리
* 모바일 480px

### 4. 주요 기술 스택

* Front-End : React, React Router
* Back-End : Node.js, PHP, XAMPP
* Data-Base : MySQL

## 📆 기간 및 인원

  * 총 작업 기간 : 7일
    * 기초 데이터 수집 및 화면 설계 기간 : 2일
    * 개발 및 테스트 기간 : 5일
   
  * 팀원 : 2명

## 👩🏻‍🤝‍🧑🏻 팀원 소개

| 이름 | 주요 페이지 컴포넌트 | 해당 |
| :---: | :---: | :---: |
| 소연희 | Splash.jsx, 장바구니(cart 폴더), 결제(pay 폴더), 마이페이지(mypage 폴더), 로그인 및 회원가입(login 폴더) |  |
| 천지호 | Home.jsx, 검색(search 폴더), 카테고리(category 폴더), 상품 정보(product 폴더), Faq.jsx | ✔ |

## 💡 기능 구현 상세

### 1. 회원가입 및 로그인
* **React Hook Form**을 활용하여 사용자 기본 정보 입력 및 유효성 검사를 포함한 회원가입 기능
* **PHP**를 통한 사용자 인증 로직 구축, 로그인 성공 시 **Axios**를 통해 받아온 정보를 기반으로 마이페이지, 장바구니 등 개인화된 서비스 이용 가능
* 사용자 정보는 **MySQL 데이터베이스**에 안전하게 저장 및 관리

### 2. 검색
* 키워드 기반 상품 검색 기능을 구현하여 사용자가 원하는 상품을 빠르게 찾을 수 있도록 지원
* 버튼 클릭 시 **Axios**를 통해 **PHP 백엔드**로부터 검색 결과를 가져와 상품 리스트 렌더링
* 관리자가 지정한 추천 키워드 기능으로 쉽게 검색 가능
* 로컬 스토리지에 저장된 최근 본 상품 데이터를 이용하여 편리함 향상

### 3. 상품 정보 제공 및 카테고리 관리
* **React Router Dom**을 활용하여 SPA(Single Page Application) 형태로 카테고리별 상품 리스트 및 상세페이지 구현
* 각 상품 클릭 시 상세페이지에서 상품 정보 확인 가능
* **Axios와 백엔드(PHP) 연동**을 통해 **MySQL 데이터베이스**에서 최신 상품 정보를 실시간으로 반영

### 3-1. 상품 상세 페이지
* 선택 상품의 상세 정보를 제공하며, 장바구니 추가 및 구매 기능을 이용 가능
* 상품 정보, 수량 조절 UI, 장바구니/구매 버튼을 포함한 하단 구매 바는 클릭 시 확장
* `React.memo`를 적용해 상세 설명 탭의 렌더링을 최적화했으며, 로딩 및 예외 처리로 사용자 경험 개선
* 페이지 진입 시 해당 상품 정보를 **localStorage에 저장**하여 '최근 본 상품' 기능 구현

### 4. 장바구니 기능
* 사용자가 원하는 상품을 장바구니에 담아두고 한 번에 결제 가능
* **Axios**를 통해 백엔드로부터 장바구니 목록을 불러오고, 이 데이터는 **sessionStorage 기반의 사용자 ID**를 통해 관리
* 불러온 장바구니 목록은 **localStorage**에도 저장하여 페이지 새로고침 시에도 상태가 유지되며, 상품 추가/삭제 시 바로 반영
* **MySQL**에서는 POST 요청으로 새 상품을 추가하고, PUT 요청으로 수량 등 기존 상품 정보를 업데이트하며, DELETE 요청으로 상품을 삭제하는 CRUD 로직을 처리

### 5. 마이페이지
* 주문 내역 확인, FAQ 등 다양한 마이페이지 기능을 구현
* **Axios**를 통해 **PHP**에서 사용자별 주문 내역을 안전하게 조회하고 표시
* **session Storage**에 저장된 **사용자 ID**를 기반으로 개인화된 서비스 제공

## 🗂️ 폴더 구조

```
📂Ripo-Project
┣ 📂ripo                      # 리포 ( Front-End_React 프로젝트 )
┃ ┣ 📂public
┃ ┃ ┣ 📂imgs                  # 로고, 아이콘 등 정적 이미지 폴더
┃ ┃ ┃ ┗ 📂_icons              # 아이콘 이미지 폴더
┃ ┣ 📂src
┃ ┃ ┣ 📂component             # 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂_common             # 공통 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂00-login            # 로그인 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂01-home             # 홈 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂02-search           # 검색 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂03-category         # 카테고리 컴포넌트 폴더               
┃ ┃ ┃ ┣ 📂04-product          # 상품 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂05-cart             # 장바구니 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂06-pay              # 결제 컴포넌트 폴더
┃ ┃ ┃ ┗ 📂icons               # 아이콘 컴포넌트 폴더
┃ ┃ ┣ 📂pages                 # 각 페이지 컴포넌트 폴더
┃ ┃ ┃ ┣ 📂00-login
┃ ┃ ┃ ┣ 📂01-home
┃ ┃ ┃ ┣ 📂02-search
┃ ┃ ┃ ┣ 📂03-category
┃ ┃ ┃ ┣ 📂04-product 
┃ ┃ ┃ ┣ 📂05-cart
┃ ┃ ┃ ┣ 📂06-pay
┃ ┃ ┃ ┣ 📂07-mypage
┃ ┃ ┃ ┗ 📜Splash.jsx          # 온보딩 페이지
┃ ┃ ┗ 📂styles                # scss
┃ ┃ ┗ 📜App.js                # 프로젝트의 전체 라우팅 및 최상위 컴포넌트
┃ ┣ ⚙️.env
┃ ┗ README.md
┣ 📂admin                     # 리포 ( Back-End_PHP 프로젝트 )
┃ ┣ 📂api                     # 데이터 가공 및 반환을 담당하는 API 파일들이 위치한 폴더
┃ ┣ 📂member                  # 회원가입, 탈퇴 등 회원 관련 데이터를 저장하고 관리하는 폴더
┃ ┣ 📂product                 # 카테고리 및 상품을 생성, 수정, 삭제하는 기능 폴더
┃ ┣ 📜auth.php
┃ ┣ 📜common.php
┃ ┣ 📜config.php
┃ ┣ 📜header.php
┃ ┣ 📜index.php
┃ ┣ 📜login.php
┃ ┣ 📜logout.php
┃ ┣ 📜table.php
┗ ┗ 📜style.css
```

## 💻 개발 환경

### 1. Frond-End

| 사용기술 | 설명 |Badge |
| :---:| :---: | :---: |
| **React** | **SPA기반 프레임워크** |![react](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)|
| **React Router Dom** | **페이지 라우팅 관리** |![reactrouter](https://img.shields.io/badge/ReactRouter-CA4245?style=flat-square&logo=reactrouter&logoColor=white)|
| **React Hook Form** | **폼 상태 및 데이터 관리** |![reacthookform](https://img.shields.io/badge/ReactHookForm-F24E1E?style=flat-square&logo=reacthookform&logoColor=white)|
| **Axios** | **클라이언트에서 서버로 API 요청 처리** |![axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)|

### 2. UI/UX 라이브러리

| 사용기술 | 설명 | Badge |
| :---:| :---: | :---: |
| **MUI** | **UI 프레임워크** |![mui](https://img.shields.io/badge/MUI-007FFF?style=flat-square&logo=mui&logoColor=white) |
| **Swiper** | **슬라이더** |![Swiper](https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=axios&logoColor=white)|
| **react-swipeable** | **스와이프 제스처** |![npm](https://img.shields.io/badge/react--swipeable-00e6a4?style=flat-square&logo=npm&logoColor=white)|
| **Framer Motion** | **애니메이션** |![motion](https://img.shields.io/badge/motion-fff312?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMjQgOSI+CiAgPHBhdGggZD0iTSA5LjA2MiAwIEwgNC4zMiA4Ljk5MiBMIDAgOC45OTIgTCAzLjcwMyAxLjk3MSBDIDQuMjc3IDAuODgyIDUuNzA5IDAgNi45MDIgMCBaIE0gMTkuNjU2IDIuMjQ4IEMgMTkuNjU2IDEuMDA2IDIwLjYyMyAwIDIxLjgxNiAwIEMgMjMuMDA5IDAgMjMuOTc2IDEuMDA2IDIzLjk3NiAyLjI0OCBDIDIzLjk3NiAzLjQ5IDIzLjAwOSA0LjQ5NiAyMS44MTYgNC40OTYgQyAyMC42MjMgNC40OTYgMTkuNjU2IDMuNDkgMTkuNjU2IDIuMjQ4IFogTSA5Ljg3MiAwIEwgMTQuMTkyIDAgTCA5LjQ1IDguOTkyIEwgNS4xMyA4Ljk5MiBaIE0gMTQuOTc0IDAgTCAxOS4yOTQgMCBMIDE1LjU5MiA3LjAyMSBDIDE1LjAxOCA4LjExIDEzLjU4NSA4Ljk5MiAxMi4zOTIgOC45OTIgTCAxMC4yMzIgOC45OTIgWiIgZmlsbD0icmdiKDAsIDAsIDApIj48L3BhdGg+Cjwvc3ZnPgo=&logoColor=white)|
| **Sass** | **스타일링** |![Sass](https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white)|
| **sweetalert2** | **커스텀 팝업 알림 UI** |![sweetalert2](https://img.shields.io/badge/sweetalert2-F27474?style=flat-square&logo=datefns&logoColor=white)|

### 3. Back-End

| 사용기술 | 설명 | Badge |
| :---:| :---: | :---: |
| **Node.js** | **서버 사이드 JavaScript 런타임 환경** |![nodedotjs](https://img.shields.io/badge/Node.js-5FA04E?style=flat-square&logo=nodedotjs&logoColor=white)|
| **PHP** | **회원 및 상품 관리, 관리자 페이지 구현 등 서버 측 로직 처리** |![PHP](https://img.shields.io/badge/PHP-8892BE?style=flat-square&logo=npm&logoColor=white)|
| **MySQL** | **데이터베이스 관리**  |![MySQL](https://img.shields.io/badge/MySQL-00758F?style=flat-square&logo=JSON&logoColor=white)|
| **Axios** | **서버에서 API 요청 처리** |![axios](https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)|

### 4. 개발 도구

|사용기술 | 설명 | Badge | 
| :---:| :---: | :---: |
| **XAMPP** | **Apache, MySQL, PHP를 통합 제공하는 로컬 서버 개발 도구** |![XAMPP](https://img.shields.io/badge/XAMPP-FB7A24?style=flat-square&logo=nodemon&logoColor=white)|
| **Dothome** | **웹 호스팅 서비스** |![Dothome](https://img.shields.io/badge/Dothome-24ABE3?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1LjYgMC44ODc5NzhDOS4wNDggMS44OTU5OCAzLjY5NiA2LjI4Nzk4IDEuNjU2IDEyLjM2QzAuODE1OTk4IDE0LjgwOCAwLjQzMTk5OCAxNy43NiAwLjcxOTk5OCAxOS43NTJDMS4yMjQgMjMuMjA4IDIuMDQgMjUuNDE2IDMuNjQ4IDI3Ljc5MkM0LjI0OCAyOC42OCA0LjMyIDI4Ljg3MiA0LjAzMiAyOS4yMzJDMy4xMiAzMC4zODQgMi42ODggMzAuOTEyIDEuODcyIDMxLjgyNEMxLjM2OCAzMi4zNTIgMC45NTk5OTggMzIuODggMC45NTk5OTggMzIuOTc2QzAuOTU5OTk4IDMzLjA0OCAxLjM2OCAzMy4wNzIgMS44NzIgMzNDMi4zNTIgMzIuOTUyIDMuOTYgMzIuNzYgNS40IDMyLjYxNkM4LjA0IDMyLjMyOCA4LjA2NCAzMi4zMjggOSAzMi45MjhDMTEuODA4IDM0LjY1NiAxNC40NzIgMzUuMzc2IDE4LjEyIDM1LjM3NkMyMS4yNCAzNS4zNzYgMjMuMzUyIDM0Ljg5NiAyNS44IDMzLjY3MkMzMC40NTYgMzEuMzIgMzMuNTUyIDI3LjYgMzQuOTkyIDIyLjU2QzM1LjU0NCAyMC42MTYgMzUuNTIgMTUuMjQgMzQuOTQ0IDEzLjMyQzM0LjQ2NCAxMS43ODQgMzMuMzg0IDkuNTAzOTggMzIuNTY4IDguMzAzOThDMzEuMzIgNi41MDM5OCAyNy42MjQgMy4xMTk5OCAyNi45MDQgMy4xMTk5OEMyNi43MzYgMy4xMTk5OCAyNi42NCA2LjIxNTk4IDI2LjU5MiAxMS45MjhMMjYuNTIgMjAuNzZMMjUuODk2IDIyLjA4QzI0LjI0IDI1LjYzMiAxOS45NjggMjcuODY0IDE2LjI3MiAyNy4xMkMxMy4yIDI2LjUyIDEwLjg0OCAyNC43MiA5LjU1MiAyMS45MzZDOC44OCAyMC40OTYgOC44MzIgMjAuMjU2IDguOTI4IDE4LjA3MkM5IDE2LjA4IDkuMDk2IDE1LjUyOCA5LjY3MiAxNC40QzEwLjU4NCAxMi42MjQgMTIuMDQ4IDExLjEzNiAxMy44IDEwLjI3MkMxNS4wNDggOS42NDc5OCAxNS41NzYgOS41Mjc5OCAxNy43MTIgOS40MzE5OEwyMC4xNiA5LjI4Nzk4VjEyLjMzNlYxNS4zNkgxOC4zNkMxNi42MzIgMTUuMzYgMTYuNTM2IDE1LjM4NCAxNS43NDQgMTYuMkMxNS4yODggMTYuNjU2IDE0Ljg4IDE3LjMyOCAxNC44MzIgMTcuNjg4QzE0LjQ3MiAyMC42NCAxNy45MjggMjIuNDY0IDE5Ljg0OCAyMC4zMjhDMjAuODA4IDE5LjI3MiAyMC44OCAxOC41MDQgMjAuODggOS41OTk5OFYxLjAwNzk4TDIwLjM1MiAwLjg2Mzk3NkMxOS43NzYgMC43MTk5NzUgMTYuNjA4IDAuNzE5OTc1IDE1LjYgMC44ODc5NzhaIiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo=)
| **FileZilla** | **FTP 클라이언트 (서버로 파일 전송 및 관리)** |![FileZilla](https://img.shields.io/badge/FileZilla-BF0000?style=flat-square&logo=filezilla&logoColor=white)|
| **Visual Studio Code (VS Code)** | **코드 편집기( 에디터 )** |![VSCode](https://img.shields.io/badge/VSCode-007ACC?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0LjAwMyAyTDEyIDEzLjMwM0w0Ljg0IDhMMiAxMEw4Ljc3MiAxNkwyIDIyTDQuODQgMjRMMTIgMTguNzAyTDI0LjAwMyAzMEwzMCAyNy4wODdWNC45MTNMMjQuMDAzIDJaTTI0IDkuNDM0VjIyLjU2NkwxNS4yODkgMTZMMjQgOS40MzRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K&logoColor=white) |
| **GitHub** | **버전 관리** |![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white)| 
| **Vercel** | **서버리스 플랫폼** |![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)|
| **Figma** | **디자인 & UI/UX**|![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=Figma&logoColor=white) |

## 📚 참고 URL
- 기획 및 화면 설계 :
[Ripo 기획서](https://github.com/user-attachments/files/20674811/semi._B._01.pdf)
- 발표 자료 : 
[Ripo Canva](https://www.canva.com/design/DAGoOq0Z7nU/etYhlLd8aQjNPVqUMuKzng/view?utm_content=DAGoOq0Z7nU&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h40fc2d6421)
- 프로젝트 완료 보고서
[Ripo Final Report](https://github.com/user-attachments/files/20674930/semi._B._.pdf)

<hr>

# 천지호의 개발 상세

## 📑 요약

### 담당 컴포넌트
1. Home
  - `CategoryLink.jsx`: 소카테고리 바로가기 메뉴
  - `HomeSlide.jsx`: 랜덤으로 4개의 상품을 보여줄 메인 슬라이드 (하루 지나면 리셋)
2. Search
  - `SearchBar.jsx`: 검색창
  - `SearchKeyword.jsx`: 추천 키워드
3. Category
  - `CategorySub.jsx`: 중카테고리
4. Product
  - `BottomBar.jsx`: 상세 페이지에 사용되는 하단 구매 바
  - `BottomBarExpanded.jsx`: 클릭을 통해 확장된 하단 구매 바 (수량 조절 및 버튼 포함)
  - `Detailcontent.jsx`: 상세 내용 렌더링을 위한 별도 컴포넌트
  - `ProductSlide.jsx`: 상품 썸네일 이미지 슬라이드
  - `SnackBar.jsx`: 장바구니 알림을 위한 스낵바
  - `TabMenu.jsx`: 상세 페이지에 사용되는 탭메뉴 (상세 내용 / 문의)

### 담당 페이지 목록
- [홈](https://ripo-tau.vercel.app/)
- [검색](https://ripo-tau.vercel.app/search)
- [카테고리](https://ripo-tau.vercel.app/category)
- [상품 리스트 페이지] /product/[type] *(type 필수. 홈이나 카테고리 페이지를 통해 접근 가능.)*
- [상품 디테일 페이지] /product/[type]/[id] *(type, id 필수)*

## 🧩 공통 컴포넌트

1. **Card (CardItem.jsx, CardList.jsx)**
   - 상품 정보를 카드 형태로 보여주는 컴포넌트들
   - CardItem: 개별 상품 카드
   - CardList: 카드 아이템 리스트 렌더링

2. **Layout (MenuBar.jsx, Header.jsx)**
   - 앱 전반에 걸쳐 고정 사용되는 레이아웃 컴포넌트
   - MenuBar: 하단 고정 메뉴 바
   - Header: 상단 로고 및 버튼 포함 헤더
     
3. **Accordion (Accordion.jsx)**
   - FAQ, 공지사항 등에 쓰이는 아코디언 UI 컴포넌트

## 💥 이슈 및 해결

### 1-1. ProductList.jsx
- 아이템 개수가 홀수일 경우, 마지막 아이템이 화면 전체를 차지해 레이아웃이 깨지는 현상
- **해결**: 전체 아이템 개수를 확인한 뒤(items.length % 2 !== 0), 홀수인 경우 빈 <div>를 하나 추가하여 짝수를 맞춤. 이 빈 <div>는 시각적으로 보이지 않도록 처리하여 레이아웃 유지

### 1-2. ProductDetail.jsx
- 하단 구매 바(BottomBar) 애니메이션 실행 중 상세 내용이 리렌더링되어 스크롤이 이동하고 화면이 깜빡이는 현상
- **해결**: 상세 내용을 별도 컴포넌트(DetailContent)로 분리하고 React.memo를 적용하여 불필요한 리렌더링을 방지

### 2. MenuBar.jsx
1. 새로고침 시 현재 경로와 관계없이 기본값인 '홈' 메뉴가 선택된 것처럼 표시되는 현상
- **해결**: 기존 useState로 탭 상태를 관리하던 부분을 useLocation을 활용하여 현재 경로 기준으로 동기화하도록 변경

2. 하위 경로 접속 시 메뉴 선택 상태가 표시되지 않음
- 예: '/my/qna' 접속 시 마이페이지 탭 선택 표시가 되지 않음
- **해결**: value 값이 정확히 일치해야 selected 스타일이 적용되므로 value를 path에 따라 유동적으로 값을 설정하도록 개선
   ```js
  if (location.pathname.includes('/my')) {
    navValue = '/my';
  }
 
### 3. SearchPage.jsx
- 페이지 재진입 또는 새로고침 시, 최근 본 상품이 잠깐 나타났다 사라지는 현상
- **해결**: 데이터 로딩 여부를 관리하는 isReady 상태 변수를 추가하여, 데이터가 완전히 준비된 이후에만 컴포넌트를 렌더링하도록 처리함. isReady가 true일 때만 데이터를 화면에 출력함으로써 깜빡임 방지.

