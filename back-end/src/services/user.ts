import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import constant from "../lib/constant";
import { Board, Likes, User } from "../models";

/**
 *  @마이페이지조회
 *  @route GET /user/myinfo
 *  @access private
 *  @err
 */
const getMyInfoService = async (userId: number, cursor: string | undefined) => {
  const user = await User.findOne({
    attributes: [
      "email",
      "nickname",
      "introSummary",
      "introContent",
      "profileImageUrl",
    ],
    where: { user_id: userId },
  });

  // 존재하지 않는 유저일 경우
  if (!user) {
    return constant.NON_EXISTENT_USER;
  }

  const limit = 5;
  let FIRST_CURSOR = false;
  if (cursor === undefined) {
    FIRST_CURSOR = true;
    cursor = await Board.max("updatedAt", {
      where: {
        user_id: userId,
      },
    });
  }

  // 수정 시간을 커서로 하는 페이지네이션
  const articlesToShow = await Board.findAll({
    attributes: [
      "board_id",
      "title",
      "thumbnailContent",
      "thumbnailImageUrl",
      "createdAt",
      "updatedAt",
      [
        Sequelize.literal(
          `(SELECT COUNT(*) FROM Likes as likes WHERE Board.board_id = likes.board_id AND isDeleted = false)`
        ),
        "likeCounts",
      ],
    ],
    where: {
      user_id: userId,
      updatedAt: FIRST_CURSOR
        ? {
            [Op.lte]: cursor,
          }
        : { [Op.lt]: cursor },
    },
    order: [["updatedAt", "DESC"]],
    limit,
  });

  const nextCursor =
    articlesToShow.length === limit
      ? articlesToShow[articlesToShow.length - 1].updatedAt
      : null;

  return { user, articlesToShow, nextCursor };
};

/**
 *  @마이페이지수정
 *  @route PATCH /user/myinfo
 *  @access private
 *  @err 1. 존재하지 않는 유저
 *
 */
const patchMyInfoService = async (
  userId: number,
  introSummary: string,
  introContent: string,
  profileImageUrl: string
) => {
  const user = await User.findOne({
    attributes: ["user_id"],
    where: {
      user_id: userId,
    },
  });

  if (!user) {
    return constant.NON_EXISTENT_USER;
  }

  await User.update(
    {
      introSummary,
      introContent,
      profileImageUrl,
    },
    {
      where: {
        user_id: userId,
      },
    }
  );

  return constant.SUCCESS;
};

/**
 *  @좋아한포스트조회
 *  @route GET /user/myinfo/like
 *  @access private
 *  @err 1. 존재하지 않는 유저
 */
const getLikePostService = async (
  userId: number,
  cursor: string | undefined
) => {
  const user = await User.findOne({
    attributes: ["user_id"],
    where: {
      user_id: userId,
    },
  });

  if (!user) {
    return constant.NON_EXISTENT_USER;
  }

  const limit = 5;
  let FIRST_CURSOR = false;
  if (cursor === undefined) {
    FIRST_CURSOR = true;
    cursor = await Likes.max("updatedAt", {
      where: {
        user_id: userId,
      },
    });
  }

  const likePostArticles = await Likes.findAll({
    attributes: ["updatedAt"],
    include: [
      {
        model: Board,
        as: "board",
        attributes: [
          "board_id",
          "user_id",
          "title",
          "thumbnailContent",
          "thumbnailImageUrl",
        ],
      },
    ],
    where: {
      user_id: userId,
      isDeleted: false,
      updatedAt: FIRST_CURSOR
        ? {
            [Op.lte]: cursor,
          }
        : { [Op.lt]: cursor },
    },
    order: [["updatedAt", "DESC"]],
    limit,
  });

  const nextCursor =
    likePostArticles.length === limit
      ? likePostArticles[likePostArticles.length - 1].updatedAt
      : null;

  return { likePostArticles, nextCursor };
};

const userService = {
  getMyInfoService,
  patchMyInfoService,
  getLikePostService,
};

export default userService;
