import constant from "../lib/constant";
import { Board, Comment, User } from "../models";

/**
 *  @댓글작성 댓글 작성
 *  @route POST /comment
 *  @access private
 *  @err 1. 요청 값이 잘못되었을 경우
 *       2. 댓글을 달고자 하는 게시글이 존재하지 않을 경우
 */
const postCommentService = async (
  userId: number,
  articleId: string,
  parent: string,
  level: string,
  rootIndex: string,
  content: string
) => {
  // 요청 값이 잘못되었을 경우. 단, parent값은 null일 수 있다.
  if (
    !userId ||
    !articleId ||
    level === undefined ||
    level === null ||
    rootIndex === undefined ||
    rootIndex === null ||
    content === undefined ||
    content === null
  ) {
    return constant.NULL_VALUE;
  }

  // 만약 parent(상위 글 번호)가 null이라면 0으로 초기화
  if (parent === null) {
    parent = "0";
  }

  const parentArticle = await Board.findOne({
    where: { board_id: articleId },
  });

  // 댓글을 달고자 하는 게시글이 존재하지 않을 경우
  if (!parentArticle) {
    return constant.VALUE_ALREADY_DELETED;
  }

  // 댓글 업로드
  const createdComment = await Comment.create({
    board_id: articleId,
    user_id: userId,
    parent,
    level,
    root_index: rootIndex,
    content,
  });

  return { createdCommentId: createdComment.comment_id };
};

/**
 *  @댓글수정
 *  @route /comment/:commentId
 *  @access private
 *  @err 1. 필요한 값이 없을 때
 *       2. 댓글이 존재하지 않을 경우
 *       3. 수정 권한이 없을 경우
 */
const patchCommentService = async (
  userId: number,
  commentId: string,
  content: string
) => {
  // 요청 값이 잘못 되었을 경우
  if (!userId || !commentId || content === undefined || content === null) {
    return constant.NULL_VALUE;
  }

  const originalComment = await Comment.findOne({
    where: { comment_id: commentId },
  });

  // 댓글이 존재하지 않을 경우
  if (!originalComment) {
    return constant.DB_NOT_FOUND;
  }

  // 수정 권한이 없을 경우
  if (userId !== originalComment.user_id) {
    return constant.WRONG_REQUEST_VALUE;
  }

  await Comment.update(
    {
      content,
    },
    { where: { comment_id: commentId } }
  );

  return constant.SUCCESS;
};

/**
 *  @댓글삭제
 *  @route DELETE /comment/:commentId
 *  @access private
 *  @err 1. 필요한 값이 없을 때
 *       2. 삭제될 댓글이 없을 때
 *       3. 삭제 권한이 없을 때
 */
const deleteCommentService = async (userId: number, commentId: string) => {
  // 1. 필요한 값이 없을 때
  if (!userId || !commentId) {
    return constant.NULL_VALUE;
  }

  const originalComment = await Comment.findOne({
    where: { comment_id: commentId },
  });

  // 2. 삭제될 댓글이 없을 때
  if (!originalComment) {
    return constant.DB_NOT_FOUND;
  }

  // 3. 삭제 권한이 없을 때
  if (userId !== originalComment.user_id) {
    return constant.WRONG_REQUEST_VALUE;
  }

  // 댓글 삭제
  await originalComment.update(
    {
      isDeleted: true,
    },
    {
      where: {
        comment_id: commentId,
        user_id: userId,
      },
    }
  );

  return { isDeleted: true };
};

const commentsService = {
  postCommentService,
  patchCommentService,
  deleteCommentService,
};

export default commentsService;
