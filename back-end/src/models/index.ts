import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import User from "./User";
import Board from "./Board";

dotenv.config();

export const sequelize = new Sequelize({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  dialect: "mysql",
});

sequelize.addModels([User, Board]);

export { User, Board };
export default sequelize;
