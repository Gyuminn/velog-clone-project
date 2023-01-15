import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import constant from "../lib/constant";
import { Board, User } from "../models";

/**
 *  @마이페이지조회
 *  @route GET /user/myinfo
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
  let FIRST_CURSOR = false;
  if (cursor === undefined) {
    FIRST_CURSOR = true;
    cursor = await Board.max("updatedAt", {
      where: {
        user_id: userId,
      },
    });
  }

  /**
   * TO DO
   * user 정보와 보여줄 아티클 정보들을 join하는 방법에 대해서도 생각해봐야 할 듯 싶다.
   */
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

const userService = {
  getMyInfoService,
};

export default userService;
