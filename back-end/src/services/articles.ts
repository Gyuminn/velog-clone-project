import constant from "../lib/constant";
import { Board, Tag, User } from "../models";
import { Op } from "sequelize";

/**
 *  @게시글작성 게시글 작성
 *  @route POST articles
 *  @access public
 *  @err 1. 요청 값이 잘못되었을 경우
 *       2. 존재하지 않는 유저
 */
const postArticleService = async (
  email: string,
  title: string,
  /**
   * TODO
   * 프론트엔드에서 에디터 라이브러리를 이용했을 때 content에 이미지 첨부파일이 어떻게 리턴되는지 확인이 필요합니다.
   * 우선은 string으로 처리하고 추후 이미지 업로드 기능을 구현할 예정입니다.
   */
  content: string,
  thumbnailContent: string,
  thumbnailImageUrl: string,
  tags: string[]
) => {
  // 요청 값이 잘못되었을 경우
  if (
    !email ||
    title === undefined ||
    title === null ||
    content === undefined ||
    content === null
  ) {
    return constant.NULL_VALUE;
  }

  const user = await User.findOne({ where: { email } });

  // 존재하지 않는 유저일 경우
  if (!user) {
    return constant.NON_EXISTENT_USER;
  }

  // 게시글 업로드
  const createdArticle = await Board.create({
    user_id: user.user_id,
    title,
    content,
    thumbnailContent,
    thumbnailImageUrl,
  });

  return { createdArticleId: createdArticle.board_id };
};

/**
 *  @게시글리스트조회
 *  @route GET articles
 *  @access public
 *  @err
 */
const getAllArticlesService = async (cursor: string) => {
  // 커서 기반 페이지네이션 구현
  /**
   * TODO
   * 추후 매개변수로 sortingMethod를 추가적으로 받아
   * 1. 게시글의 좋아요가 많은 순
   * 2. 새롭게 생성된 게시글 순서
   * 우선 2번으로 페이지네이션 구현
   */

  const limit = 5;
  if (+cursor === 0) cursor = await Board.max("board_id");

  const articlesToShow = await Board.findAll({
    limit,
    attributes: [
      "user_id",
      "board_id",
      "title",
      "thumbnailContent",
      "thumbnailImageUrl",
    ],
    where: {
      board_id: {
        [Op.lte]: cursor,
      },
    },
    order: [["board_id", "DESC"]],
  });

  const nextCursor =
    articlesToShow.length === limit
      ? articlesToShow[articlesToShow.length - 1].board_id - 1
      : null;

  return { ...articlesToShow, nextCursor };
};

/**
 *  @게시글단일조회
 *  @route GET articles/:articleId
 *  @access public
 *  @err 1. 필요한 값이 없을 경우
 *       2. 존재하지 않는 article일 경우
 *       3. 게시물 작성자가 존재하지 않는 경우
 */
const getOneArticleService = async (articleId: string) => {
  // 필요한 값이 없을 경우
  if (!articleId) {
    return constant.NULL_VALUE;
  }

  const articleToShow = await Board.findOne({
    where: { board_id: articleId },
  });

  // 존재하지 않는 article일 경우
  if (!articleToShow) {
    return constant.DB_NOT_FOUND;
  }

  const userEmailToShow = await User.findOne({
    attributes: ["email"],
    where: { user_id: articleToShow.user_id },
  });

  if (!userEmailToShow) {
    return constant.NON_EXISTENT_USER;
  }

  return {
    userId: userEmailToShow.email,
    title: articleToShow.title,
    content: articleToShow.content,
    // 게시글 단일 조회에서 thumbnailContent는 보여지지 않는다.
    thumbnailImageUrl: articleToShow.thumbnailImageUrl,
  };
};

const articlesService = {
  postArticleService,
  getOneArticleService,
  getAllArticlesService,
};

export default articlesService;
