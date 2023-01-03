import constant from "../lib/constant";

/**
 *  @게시글작성 게시글 작성
 *  @route POST user/login
 *  @access public
 *  @err 1. 요청 값이 잘못되었을 경우
 *
 */
const postArticleService = async (
  userId: string,
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
    !userId ||
    title === undefined ||
    title === null ||
    content === undefined ||
    content === null
  ) {
    return constant.NULL_VALUE;
  }
};

const articlesService = {
  postArticleService,
};

export default articlesService;
