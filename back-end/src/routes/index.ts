import express, { Request, Response } from "express";

// libraries
import response from "../lib/response";
import returnCode from "../lib/returnCode";

const router = express.Router();

router.get("", async (req: Request, res: Response) => {
  try {
    response.basicResponse(res, returnCode.OK, "velog-clone-project-api");
  } catch (err) {
    response.basicResponse(res, returnCode.INTERNAL_SERVER_ERROR, "서버 오류");
  }
});

router.use("/test", require("./test"));

export default router;
