import constant from "../lib/constant";
import { Comment } from "../models";

/**
 *  @댓글작성 댓글 작성
 *  @route POST /comments
 *  @access private
 *  @err 1. 요청 값이 잘못되었을 경우
 */
const postCommentService = async (
  userId: string,
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

const commentService = {
  postCommentService,
};

export default commentService;
