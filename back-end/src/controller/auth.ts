import { Request, Response } from "express";
import returnCode from "../lib/returnCode";
import response from "../lib/response";

import authService from "../services/auth";
import constant from "../lib/constant";

/**
 *  @회원가입
 *  @route POST /auth/signup
 *  @access public
 *  @err 1. 필요한 값이 없을 때
 *       2. 이메일 형식이 올바르지 않을 때
 *       3. 닉네임 형식이 올바르지 않을 때
 *       4. 패스워드 형식이 올바르지 않을 때
 *       5. 이메일이 이미 존재할 때
 *       6. 닉네임이 이미 존재할 때
 */
const postSignupController = async (req: Request, res: Response) => {
  try {
    const token = await authService.postSignupService(
      req.body.email,
      req.body.nickname,
      req.body.password
    );

    if (token == constant.NULL_VALUE) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 존재하지 않습니다."
      );
    }

    if (token == constant.WRONG_EMAIL_CONVENTION) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "올바르지 않은 이메일 형식입니다."
      );
    }

    if (token == constant.WRONG_NICKNAME_CONVENTION) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "올바르지 않은 닉네임 형식입니다."
      );
    }

    if (token == constant.WRONG_PASSWORD_CONVENTION) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "올바르지 않은 비밀번호 형식입니다."
      );
    }

    if (token == constant.EMAIL_ALREADY_EXIST) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "이미 존재하는 이메일 입니다."
      );
    }

    if (token == constant.NICKNAME_ALREADY_EXIST) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "이미 존재하는 닉네입 입니다"
      );
    }

    return response.tokenResponse(
      res,
      returnCode.CREATED,
      "회원가입이 완료되었습니다.",
      true,
      token
    );
  } catch (err) {
    return response.basicResponse(
      res,
      returnCode.INTERNAL_SERVER_ERROR,
      false,
      `서버 오류: ${err.message}`
    );
  }
};

const authoController = {
  postSignupController,
};

export default authoController;
