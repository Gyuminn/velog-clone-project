import constant from "../lib/constant";
import { Board, Tag, User } from "../models";

/**
 *  @게시글작성 게시글 작성
 *  @route POST user/login
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

  if (!user) {
    return constant.NON_EXISTENT_USER;
  }

  let createdArticleId: string;
  // 게시글 업로드
  await Board.create({
    user_id: user.user_id,
    title,
    content,
    thumbnailContent,
    thumbnailImageUrl,
  }).then((newArticle) => {
    createdArticleId = newArticle.id;
  });

  return createdArticleId;
};

const articlesService = {
  postArticleService,
};

export default articlesService;
