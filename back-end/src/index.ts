import express from "express";
import cors from "cors";
// import {sequelize} from "./modes";
import router from "./routes";
import path from "path";

const app = express();

// 시퀄라이즈 부분
// sequelize.sync({force: false}).catch((error) => {
//   console.error(error);
// })

// Port Host
const PORT: number = parseInt(process.env.PORT as string, 10) || 3001;

const HOST: string = process.env.HOST || "localhost";

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

// route
app.use("/", router);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "production" ? err : {};

  // render the error page
  res.stats(err.stats || 500);
  res.render("error");
});

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
    // sequelize
    //   .sync({ alter: true })
    //   .authenticate()
    //   .then(async () => {
    //     console.log("mariaDB Connected ...");
    //   })
    //   .catch((err) => {
    //     console.log("TT : ", err);
    //   });
  })
  .on("error", (err) => {
    console.log(err);
    process.exit(1);
  });

server.timeout = 1000000;
