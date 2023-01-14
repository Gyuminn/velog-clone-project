import { Request, Response } from "express";
import constant from "../lib/constant";
import response from "../lib/response";
import returnCode from "../lib/returnCode";
import userService from "../services/user";

/**
 *  @마이페이지조회
 *  @route GET /user/myinfo?cursor=
 *  @access private
 *  @err 1. 존재하지 않는 유저
 */
const getMyInfoController = async (req: Request, res: Response) => {
  try {
    const resData = await userService.getMyInfoService(
      req.user.user_id,
      req.query.cursor ? String(req.query.cursor) : undefined
    );

    if (resData === constant.NON_EXISTENT_USER) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "존재하지 않는 유저입니다."
      );
    }

    return response.dataResponse(
      res,
      returnCode.OK,
      true,
      "마이페이지 조회 성공",
      resData
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

const userController = {
  getMyInfoController,
};

export default userController;
