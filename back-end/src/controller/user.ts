import { Request, Response } from "express";
import constant from "../lib/constant";
import response from "../lib/response";
import returnCode from "../lib/returnCode";
import userService from "../services/user";

/**
 *  @마이페이지조회
 *  @route GET /user/myinfo
 *  @access private
 *  @err 1. 존재하지 않는 유저
 */
const getMyInfoController = async (req: Request, res: Response) => {
  try {
    const resData = await userService.getMyInfoService(
      req.user.user_id,
      req.body.cursor ? String(req.body.cursor) : undefined
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

/**
 *  @마이페이지수정
 *  @route PATCH /user/myinfo
 *  @access private
 *  @err
 */
const patchMyInfoController = async (req: Request, res: Response) => {
  try {
    const resData = await userService.patchMyInfoService(
      req.user.user_id,
      req.body.introSummary,
      req.body.introContent,
      req.body.profileImageUrl
    );

    if (resData === constant.NON_EXISTENT_USER) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        `존재하지 않는 유저입니다.`
      );
    }

    return response.basicResponse(
      res,
      returnCode.OK,
      true,
      "마이페이지 수정이 완료되었습니다."
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

/**
 *  @좋아한포스트조회
 *  @route GET /user/myinfo/like
 *  @access private
 *  @err 1. 존재하지 않는 유저
 */
const getLikePostController = async (req: Request, res: Response) => {
  try {
    const resData = await userService.getLikePostService(
      req.user.user_id,
      req.body.cursor ? String(req.body.cursor) : undefined
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
      "좋아한 게시글 조회 성공",
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
  patchMyInfoController,
  getLikePostController,
};

export default userController;
