import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { IToken } from "../interface/IToken";
import { User } from "../models";
import response from "../lib/response";
import returnCode from "../lib/returnCode";

export const isLogin = async (req: Request, res: Response, next) => {
  // 토큰이 없을 경우
  if (
    req.headers.authorization === "" ||
    req.headers.authorization === undefined ||
    req.headers.authorization === null
  ) {
    return response.basicResponse(
      res,
      returnCode.BAD_REQUEST,
      false,
      "토큰 값이 요청되지 않았습니다."
    );
  }

  // Verify token
  try {
    // 적합한 토큰이 있을 경우
    // 로그인 상태
    const token: string = req.headers.authorization;
    const decoded = jwt.verify(token, config.jwtSecret);

    const user = await User.findOne({
      where: { email: (decoded as IToken).user.email },
    });

    if (!user) return next();

    req.user = user;
    console.log(`req.user를 로그인했을때 확인`, req.user, typeof req.user);

    return next();
  } catch (err) {
    // 토큰이 만료되었을 경우
    if (err.message == "jwt expired") {
      return response.basicResponse(
        res,
        returnCode.UNAUTHORIZED,
        false,
        "만료된 토큰입니다"
      );
    }
    // 잘못된 토큰일 경우
    return response.basicResponse(
      res,
      returnCode.UNAUTHORIZED,
      false,
      "적합하지 않은 토큰입니다"
    );
  }
};
