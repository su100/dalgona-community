# DALGONA

## 프로젝트 개요


엔터테인먼트 플랫폼 **'달고나'** 커뮤니티 프론트엔드      

      
## 서비스 주소

### Front End Link

https://wonderful-northcutt-c15dd2.netlify.app/
     
     
## 프로젝트 설명
#### 주요 기능
```
- 메인
- 게시글 검색
- 로그인
    - 아이디 찾기
    - 비밀번호 찾기
- 회원가입
- 이슈
    - 기사
    - 투표
- 루나
    - 연예인 관련 게시판
        - 게시글 CRUD
        - 댓글 및 대댓글 CRUD
- 자유
    - 자유 게시판
        - 게시글 CRUD
        - 댓글 및 대댓글 CRUD
- 달고나
    - 공지사항
    - 이벤트
```


## Project Duration


2021-08-21 ~

## 기술 스택

#### Frontend Stack

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

## 배포 툴

#### Frontend

![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

## 팀 정보 및 역할

### [Frontend Developer]

##### 👩 김수연 Team Main Leader :

어느 파트 무엇을 했는지

- Github : https://github.com/su100

##### 👩 최은지 :

로그인, 회원가입, 비밀번호 찾기, 활동 내역, 투표, 게시판 CRUD, 댓글 CRUD 등 구현

- Github : https://github.com/choieunii

## 프로젝트 구조
```
📦dalgona-community
 ┣ 📂.git
 ┣ 📂build
 ┣ 📂public
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂Activity
 ┃ ┃ ┣ 📂Article
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📂ActivityList
 ┃ ┃ ┃ ┣ 📂ArticleList
 ┃ ┃ ┃ ┣ 📂BoardHotList
 ┃ ┃ ┃ ┣ 📂comment
 ┃ ┃ ┃ ┃ ┣ 📂CommentInput
 ┃ ┃ ┃ ┃ ┗ 📂CommentList
 ┃ ┃ ┃ ┣ 📂Editor
 ┃ ┃ ┃ ┣ 📂FindIdPw
 ┃ ┃ ┃ ┣ 📂Footer
 ┃ ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┣ 📂HotPostCard
 ┃ ┃ ┃ ┣ 📂Nav
 ┃ ┃ ┃ ┣ 📂PageTemplate
 ┃ ┃ ┃ ┣ 📂Pagination
 ┃ ┃ ┃ ┣ 📂PointList
 ┃ ┃ ┃ ┣ 📂PostList
 ┃ ┃ ┃ ┣ 📂ProgressCircle
 ┃ ┃ ┃ ┣ 📂SearchBox
 ┃ ┃ ┃ ┣ 📂SearchInput
 ┃ ┃ ┃ ┣ 📂Sidebar
 ┃ ┃ ┃ ┣ 📂slider
 ┃ ┃ ┃ ┃ ┣ 📂BasicSlider
 ┃ ┃ ┃ ┃ ┗ 📂VoteItem
 ┃ ┃ ┃ ┣ 📂View
 ┃ ┃ ┃ ┗ 📂VoteModal
 ┃ ┃ ┣ 📂EventBoard
 ┃ ┃ ┣ 📂FindId
 ┃ ┃ ┣ 📂FindPw
 ┃ ┃ ┣ 📂FreeBoard
 ┃ ┃ ┣ 📂Home
 ┃ ┃ ┣ 📂Login
 ┃ ┃ ┣ 📂LunaBoard
 ┃ ┃ ┣ 📂NoticeBoard
 ┃ ┃ ┣ 📂Point
 ┃ ┃ ┣ 📂Policy
 ┃ ┃ ┣ 📂Post
 ┃ ┃ ┣ 📂Profile
 ┃ ┃ ┣ 📂Search
 ┃ ┃ ┣ 📂SignUp
 ┃ ┃ ┣ 📂signup-process
 ┃ ┃ ┃ ┣ 📂SignUpAgree
 ┃ ┃ ┃ ┣ 📂SignUpConfirm
 ┃ ┃ ┃ ┣ 📂SignUpFinish
 ┃ ┃ ┃ ┗ 📂SignUpInfo
 ┃ ┃ ┣ 📂Vote
 ┃ ┃ ┣ 📂VoteBoard
 ┃ ┃ ┣ 📂Write
 ┃ ┃ ┣ 📜App.js
 ┃ ┃ ┗ 📜App.scss
 ┃ ┣ 📂constants
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂containers
 ┃ ┃ ┣ 📜ActivityContainer.js
 ┃ ┃ ┣ 📜ArticleContainer.js
 ┃ ┃ ┣ 📜EventBoardContainer.js
 ┃ ┃ ┣ 📜EventPostContainer.js
 ┃ ┃ ┣ 📜FindIdContainer.js
 ┃ ┃ ┣ 📜FindPwContainer.js
 ┃ ┃ ┣ 📜FreeBoardContainer.js
 ┃ ┃ ┣ 📜FreePostContainer.js
 ┃ ┃ ┣ 📜HomeContainer.js
 ┃ ┃ ┣ 📜LoginContainer.js
 ┃ ┃ ┣ 📜LunaBoardContainer.js
 ┃ ┃ ┣ 📜LunaPostContainer.js
 ┃ ┃ ┣ 📜NavContainer.js
 ┃ ┃ ┣ 📜NoticeBoardContainer.js
 ┃ ┃ ┣ 📜NoticePostContainer.js
 ┃ ┃ ┣ 📜PointContainer.js
 ┃ ┃ ┣ 📜ProfileContainer.js
 ┃ ┃ ┣ 📜SearchContainer.js
 ┃ ┃ ┣ 📜SignUpContainer.js
 ┃ ┃ ┣ 📜VoteBoardContainer.js
 ┃ ┃ ┣ 📜VoteContainer.js
 ┃ ┃ ┗ 📜WriteContainer.js
 ┃ ┣ 📂images
 ┃ ┣ 📂lib
 ┃ ┃ ┣ 📜api.js
 ┃ ┃ ┗ 📜storage.js
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜ActivityPage.js
 ┃ ┃ ┣ 📜ArticlePage.js
 ┃ ┃ ┣ 📜EventBoardPage.js
 ┃ ┃ ┣ 📜EventPostPage.js
 ┃ ┃ ┣ 📜FindIdPage.js
 ┃ ┃ ┣ 📜FindPwPage.js
 ┃ ┃ ┣ 📜FreeBoardPage.js
 ┃ ┃ ┣ 📜FreePostPage.js
 ┃ ┃ ┣ 📜HomePage.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜LoginPage.js
 ┃ ┃ ┣ 📜LunaBoardPage.js
 ┃ ┃ ┣ 📜LunaPostPage.js
 ┃ ┃ ┣ 📜NotFoundPage.js
 ┃ ┃ ┣ 📜NoticeBoardPage.js
 ┃ ┃ ┣ 📜NoticePostPage.js
 ┃ ┃ ┣ 📜PointPage.js
 ┃ ┃ ┣ 📜PolicyPage.js
 ┃ ┃ ┣ 📜ProfilePage.js
 ┃ ┃ ┣ 📜SearchPage.js
 ┃ ┃ ┣ 📜SignUpPage.js
 ┃ ┃ ┣ 📜VoteBoardPage.js
 ┃ ┃ ┣ 📜VotePage.js
 ┃ ┃ ┗ 📜WritePage.js
 ┃ ┣ 📂store
 ┃ ┃ ┣ 📂modules
 ┃ ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┃ ┣ 📜dalgona.js
 ┃ ┃ ┃ ┣ 📜free.js
 ┃ ┃ ┃ ┣ 📜home.js
 ┃ ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┃ ┣ 📜issue.js
 ┃ ┃ ┃ ┣ 📜luna.js
 ┃ ┃ ┃ ┣ 📜nav.js
 ┃ ┃ ┃ ┣ 📜search.js
 ┃ ┃ ┃ ┗ 📜write.js
 ┃ ┃ ┗ 📜configure.js
 ┃ ┣ 📂styles
 ┃ ┃ ┗ 📜base.scss
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.js
 ┃ ┗ 📜Root.js
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.prettierrc.json
 ┣ 📜jsconfig.json
 ┗ 📜package.json
```

## 추가 정보

- 백엔드 설명 주소

https://github.com/cwadven/Dalgona-Backend
