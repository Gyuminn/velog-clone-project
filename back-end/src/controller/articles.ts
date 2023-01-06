import { Request, Response } from "express";
import articlesService from "../services/articles";

import response from "../lib/response";
import returnCode from "../lib/returnCode";
import constant from "../lib/constant";
/**
 *  @게시글작성 게시글 작성
 *  @route POST articles
 *  @access private
 *  @err 1. 요청 값이 잘못되었을 경우
 *       2. 존재하지 않는 유저일 경우
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

/**
 *  @게시글수정
 *  @route PATCH /articles/:articleId
 *  @access private
 *  @err 1. 필요한 값이 없을 때
 *       2. 게시글이 존재하지 않을 경우
 *       3. 수정 권한이 없을 경우
 */
const patchArticleController = async (req: Request, res: Response) => {
  try {
    const resData = await articlesService.patchArticleService(
      req.user.email,
      req.params.articleId,
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

    if (resData === constant.DB_NOT_FOUND) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "존재하지 않는 article 입니다."
      );
    }

    if (resData === constant.WRONG_REQUEST_VALUE) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "게시물 수정 권한이 없습니다"
      );
    }

    return response.basicResponse(
      res,
      returnCode.OK,
      true,
      "게시물 수정이 완료되었습니다."
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
 *  @게시글리스트조회
 *  @route GET articles
 *  @access public
 *  @err 1. 필요한 값이 없을 경우
 */
const getAllArticlesController = async (req: Request, res: Response) => {
  try {
    const resData = await articlesService.getAllArticlesService(
      req.params.cursor
    );

    return response.dataResponse(
      res,
      returnCode.OK,
      true,
      "게시물 리스트 조회 성공",
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
 *  @게시글단일조회
 *  @route GET articles/:articleId
 *  @access public
 *  @err 1. 필요한 값이 없을 경우
 *       2. 존재하지 않는 article일 경우
 *       3. 게시물 작성자가 존재하지 않는 경우
 */
const getOneArticleController = async (req: Request, res: Response) => {
  try {
    const resData = await articlesService.getOneArticleService(
      req.params.articleId
    );

    if (resData === constant.NULL_VALUE) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "필요한 값이 없습니다."
      );
    }

    if (resData === constant.DB_NOT_FOUND) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "존재하지 않는 article 입니다."
      );
    }

    if (resData === constant.NON_EXISTENT_USER) {
      return response.basicResponse(
        res,
        returnCode.BAD_REQUEST,
        false,
        "게시물 작성자가 존재하지 않습니다"
      );
    }

    return response.dataResponse(
      res,
      returnCode.OK,
      true,
      "게시물 단일 조회 성공",
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
  getOneArticleController,
  getAllArticlesController,
  patchArticleController,
};

export default articlesController;
