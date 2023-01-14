import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import constant from "../lib/constant";
import { Board, User } from "../models";

/**
 *  @마이페이지조회
 *  @route GET /user/myinfo?cursor=
 *  @access private
 *  @err 1. 존재하지 않는 유저
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
  if (cursor === undefined) cursor = await Board.max("board_id");

  /**
   * TO DO
   * user 정보와 보여줄 아티클 정보들을 join하는 방법에 대해서도 생각해봐야 할 듯 싶다.
   */
  const articlesToShow = await Board.findAll({
    attributes: [
      "board_id",
      "title",
      "thumbnailContent",
      "thumbnailImageUrl",
      [
        Sequelize.literal(
          `(SELECT COUNT(*) FROM Likes as likes WHERE Board.board_id = likes.board_id AND isDeleted = false)`
        ),
        "likeCounts",
      ],
    ],
    where: {
      user_id: userId,
      // board_id: {
      //   [Op.lte]: cursor,
      // },
    },
    order: [["updatedAt", "DESC"]],
    limit,
  });

  const nextCursor =
    articlesToShow.length === limit
      ? articlesToShow[articlesToShow.length - 1].board_id - 1
      : null;

  return { user, articlesToShow, nextCursor };
};

const userService = {
  getMyInfoService,
};

export default userService;
