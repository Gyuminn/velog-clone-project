import { Request, Response } from "express";
import articlesService from "../services/articles";

import response from "../lib/response";
import returnCode from "../lib/returnCode";
import constant from "../lib/constant";

/**
 *  @게시글작성 게시글 작성
 *  @route POST user/login
 *  @access public
 *  @err 1. 요청 값이 잘못되었을 경우
 *       2. 존재하지 않는 유저
 */
const postArticleController = async (req: Request, res: Response) => {
  try {
    const resData = await articlesService.postArticleService(
      req.user.email,
      req.body.title,
      req.body.content,
      req.body.thumbnailContent,
      req.body.thumbnailImageUrl,
      req.body.tags
    );

    if (resData === constant.NULL_VALUE) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "요청 값이 잘못되었습니다."
      );
    }

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
      "게시글 작성이 완료되었습니다.",
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

const articlesController = {
  postArticleController,
};

export default articlesController;
