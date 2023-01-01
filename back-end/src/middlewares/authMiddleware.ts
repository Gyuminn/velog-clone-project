import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";
import { IToken } from "../interface/IToken";
import { User } from "../models";

export const isLogin = async (req: Request, res: Response, next) => {
  // 로그인 변수
  // 토큰이 없을 경우
  if (
    req.headers.authorization === "" ||
    req.headers.authorization === undefined ||
    req.headers.authorization === null
  ) {
    return next();
  }

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

    return next();
  } catch (err) {
    return next();
  }
};
