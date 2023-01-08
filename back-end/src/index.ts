import express, { urlencoded } from "express";
import cors from "cors";
import router from "./routes";
import path from "path";
import sequelize from "./models";

const app = express();

// Port Host
const PORT: number = parseInt(process.env.PORT as string, 10) || 3001;

// allow cors
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3001",
      // "velog-clone-project 도메인"
    ],
  })
);

// POST 방식의 파라미터를 읽을 수 있도록 설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// route
app.use("/", router);

// 에러 발생시 처리
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.status(err.stats || 500);
  res.render("error");
});

// 서버 구동
const server = app
  .listen(PORT, () => {
    console.log(
      `
    ################################################
    🛡️  Server listening on port: ${PORT} 🛡️
    ################################################
  `
    );

    // 시퀄라이즈 연결 부
    sequelize
      .sync({ force: false })
      .then(() => {
        console.log("mariaDB Connected SUCCESS");
      })
      .catch((err) => {
        console.log("mariaDB Connected Fail: ", err);
      });
  })
  .on("error", (err) => {
    console.log(err);
    process.exit(1);
  });

server.timeout = 1000000;
