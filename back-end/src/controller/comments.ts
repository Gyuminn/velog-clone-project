import { Request, Response } from "express";
import commentService from "../services/comments";

import response from "../lib/response";
import returnCode from "../lib/returnCode";
import constant from "../lib/constant";

/**
 *  @댓글작성 댓글 작성
 *  @route POST /comments
 *  @access private
 *  @err 1. 요청 값이 잘못되었을 경우
 */
const postCommentController = async (req: Request, res: Response) => {
  try {
    const resData = await commentService.postCommentService(
      req.user.user_id,
      req.body.articleId,
      req.body.parent,
      req.body.level,
      req.body.rootIndex,
      req.body.content
    );

    if (resData === constant.NULL_VALUE) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "요청 값이 잘못되었습니다."
      );
    }

    return response.dataResponse(
      res,
      returnCode.OK,
      true,
      "댓글 작성이 완료되었습니다.",
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

const commentsController = {
  postCommentController,
};

export default commentsController;
