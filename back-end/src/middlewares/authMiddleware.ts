// // libraries
// import { Request, Response } from "express";
// import jwt from "jsonwebtoken";
// import config from "../config";

// import response from "../lib/response";
// import returnCode from "../lib/returnCode";

// import User from "../models/User";

// export const auth = async (req: Request, res: Response, next) => {
//   // 토큰 검사
//   if (
//     req.headers.authorization == null ||
//     req.headers.authorization == null ||
//     req.headers.authorization == undefined
//   ) {
//     response.basicResponse(
//       res,
//       returnCode.BAD_REQUEST,
//       false,
//       "토큰 값이 요청되지 않았습니다"
//     );
//   }

//   // Verify token
//   try {
//     const token: string = req.headers.authorization;
//     const decoded = jwt.verify(token, config.jwtSecret);

//     const user = await User.findOne({ where: decoded });

//     // user가 존재하지 않을 경우
//     if (!user) {
//       return response.basicResponse(
//         res,
//         returnCode.BAD_REQUEST,
//         false,
//         "유저가 존재하지 않습니다"
//       );
//     }

//     // req.user = user;
//     return next();
//   } catch (err) {
//     // 토큰이 만료되었을 경우
//     if (err.message === "jwt expired") {
//       return response.basicResponse(
//         res,
//         returnCode.UNAUTHORIZED,
//         false,
//         "만료된 토큰입니다"
//       );
//     }
//     return response.basicResponse(
//       res,
//       returnCode.UNAUTHORIZED,
//       false,
//       "적합하지 않은 토큰입니다"
//     );
//   }
// };
