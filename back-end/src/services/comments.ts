import constant from "../lib/constant";
import { Comment } from "../models";

/**
 *  @댓글작성 댓글 작성
 *  @route POST /comments
 *  @access private
 *  @err 1. 요청 값이 잘못되었을 경우
 */
const postCommentService = async (
  userId: number,
  articleId: string,
  parent: string,
  level: string,
  rootIndex: string,
  content: string
) => {
  // 요청 값이 잘못되었을 경우
  // parent값은 null일 수 있다.
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

  // 만약 상위 글 번호가 null이라면
  if (parent === null) {
    parent = "0";
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
 *  @route /comments/:commentId
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

const commentsService = {
  postCommentService,
  patchCommentService,
};

export default commentsService;
