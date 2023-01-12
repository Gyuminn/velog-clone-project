import express, { Request, Response } from "express";

// libraries
import response from "../lib/response";
import returnCode from "../lib/returnCode";

const router = express.Router();

router.get("", async (req: Request, res: Response) => {
  try {
    response.basicResponse(res, returnCode.OK, true, "velog-clone-project-api");
  } catch (err) {
    response.basicResponse(
      res,
      returnCode.INTERNAL_SERVER_ERROR,
      false,
      "서버 오류"
    );
  }
});

router.use("/auth", require("./auth"));
router.use("/articles", require("./articles"));
router.use("/comments", require("./comments"));

export default router;
