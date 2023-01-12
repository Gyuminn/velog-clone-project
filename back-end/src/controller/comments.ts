import { Request, Response } from "express";
import commentsService from "../services/comments";

import response from "../lib/response";
import returnCode from "../lib/returnCode";
import constant from "../lib/constant";

/**
 *  @댓글작성 댓글 작성
 *  @route POST /comment
 *  @access private
 *  @err 1. 요청 값이 잘못되었을 경우
 */
const postCommentController = async (req: Request, res: Response) => {
  try {
    const resData = await commentsService.postCommentService(
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

/**
 *  @댓글수정
 *  @route /comment/:commentId
 *  @access private
 *  @err 1. 필요한 값이 없을 때
 *       2. 댓글이 존재하지 않을 경우
 *       3. 수정 권한이 없을 경우
 */
const patchCommentController = async (req: Request, res: Response) => {
  try {
    const resData = await commentsService.patchCommentService(
      req.user.user_id,
      req.params.commentId,
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

    if (resData === constant.DB_NOT_FOUND) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "존재하지 않는 댓글입니다."
      );
    }

    if (resData === constant.WRONG_REQUEST_VALUE) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "댓글 수정 권한이 없습니다."
      );
    }

    return response.basicResponse(
      res,
      returnCode.OK,
      true,
      "댓글 수정이 완료되었습니다."
    );
  } catch (err) {
    return response.basicResponse(
      res,
      returnCode.BAD_REQUEST,
      false,
      `서버 오류: ${err.message}`
    );
  }
};

/**
 *  @댓글삭제
 *  @route DELETE /comment/:commentId
 *  @access private
 *  @err 1. 필요한 값이 없을 때
 *       2. 삭제될 댓글이 없을 때
 */
const deleteCommentController = async (req: Request, res: Response) => {
  try {
    const resData = await commentsService.deleteCommentService(
      req.user.user_id,
      req.params.commentId
    );

    if (resData === constant.NULL_VALUE) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 존재하지 않습니다."
      );
    }

    if (resData === constant.DB_NOT_FOUND) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "존재하지 않거나 삭제된 댓글입니다."
      );
    }

    if (resData === constant.WRONG_REQUEST_VALUE) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "삭제 권한이 존재하지 않습니다."
      );
    }

    return response.basicResponse(
      res,
      returnCode.OK,
      true,
      "댓글 삭제가 완료되었습니다."
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
  patchCommentController,
  deleteCommentController,
};

export default commentsController;
