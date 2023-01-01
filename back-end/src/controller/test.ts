import { Request, Response } from "express";

// libraries
import response from "../lib/response";
import returnCode from "../lib/returnCode";

// services
import testService from "../services/test";

/**
 *  @Test
 *  @route get test/
 *  @access public
 *  @err
 */

const getTestController = async (req: Request, res: Response) => {
  try {
    // service 로직 처리
    const resData = await testService.getTestService();

    // 테스트 실패
    if (resData === -1) {
      response.basicResponse(res, returnCode.NOT_FOUND, false, "테스트 실패");
    } else {
      response.dataResponse(res, returnCode.OK, true, "테스트 성공", resData);
    }
  } catch (err) {
    console.log(err.message);
    response.basicResponse(
      res,
      returnCode.INTERNAL_SERVER_ERROR,
      false,
      "서버 오류"
    );
  }
};

const testController = {
  getTestController,
};

export default testController;
