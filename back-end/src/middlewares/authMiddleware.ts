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

    /**
     * TO DO
     * 현재는 JWT를 이용하는데 결국에는 DB에 접근을 하고 있다.
     * 그렇다면 session이 아닌 JWT를 사용하는 장점이 없는 것이 아닌가?
     * DB를 접근하지 않고도 decoded된 정보를 user에 담아주면 되는데,
     * 이 때 문제점은 jwt를 무력화할 방법이 없다는 것이다.
     * 따라서 accessToken과 refreshToken을 구별해야 한다.
     * 현재는 Sliding Sessions 방법을 이용해서 갱신시켜주고 있지만,
     *
     */
    const user = await User.findOne({
      where: { email: (decoded as IToken).user.email },
    });

    if (!user) return next();

    req.user = user;

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
