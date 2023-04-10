### Velog API 15개를 클론 코딩한 개인 토이 프로젝트입니다.
---

### API Spec
> https://q-bit.notion.site/API-80b10b984da04c99a98cd2fb1a448b9d

---

### 구현 요소
- 로컬 회원가입, 로그인, 게시글 CRUD, 해시태그, Like
- cursor기반 페이지네이션
- 대댓글

### ERD
![velog-clone-erd (1)](https://user-images.githubusercontent.com/87220517/230960232-d140a531-3e64-4847-948c-533894846f66.png)

*테이블 연관관계*
- User(1): Board(N)
- Board(1): Comment(N)
- User(1): Comment(N)
- User(1): Likes(N)
- Board(1): Likes(N)
- Board(1): Tags(N)
- Board(1): Files(N)

---
### 기술 스택 및 라이브러리 (Express, Typescript)
```json
{
    "axios": "^1.2.1",
    "bcryptjs": "^2.4.3",
    "compression": "^1.7.4",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-mysql-session": "^2.1.8",
    "express-session": "^1.17.3",
    "express-validator": "^6.14.2",
    "file-stream-rotator": "^1.0.0",
    "jsonwebtoken": "^9.0.0",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "mysql2": "^2.3.3",
    "passport": "^0.6.0",
    "passport-local": "^1.0.0",
    "sequelize": "^6.28.0",
    "sequelize-cli": "^6.5.2",
    "sequelize-cli-typescript": "^3.2.0-c",
    "sequelize-typescript": "^2.1.5",
  }
```
---

### 브랜치 및 커밋 컨벤션
| 제목     | 내용                                   |
| -------- | -------------------------------------- |
| chore    | 작업 세팅 커밋 (패키지 설치 등)        |
| docs     | 기능 추가 및 변경 (화면 영향 o)        |
| feat     | only css 변경                          |
| fix      | 기존의 버그 수정                       |
| hotfix   | 더 좋은 코드 개선        |
| refactor | 문서 작성 or 그 외 커밋(주석, 개행 등) |
