import multer from "multer";
import fs from "fs";
import path from "path";
import { Request } from "express";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const uploadThumbnail = () => {
  // 디렉토리가 없다면 생성
  try {
    fs.readdirSync("public/thumbnail_img");
  } catch (err) {
    fs.mkdirSync("public/thumbnail_img");
  }
  multer({
    storage: multer.diskStorage({
      destination(
        req: Request,
        file: Express.Multer.File,
        callback: DestinationCallback
      ) {
        callback(null, "public/thumbnail_img");
      },
      filename(
        req: Request,
        file: Express.Multer.File,
        callback: FileNameCallback
      ) {
        file.originalname = Buffer.from(file.originalname, "latin1").toString(
          "utf-8"
        );

        const ext = path.extname(file.originalname);
        callback(
          null,
          // 확장자 제거 + 날짜 + 확장자
          path.basename(file.originalname, ext) + Date.now() + ext
        );
      },
    }),
    limits: { fileSize: 1024 * 1024 * 10 },
  });
};
