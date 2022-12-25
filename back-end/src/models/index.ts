import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  dialect: "mysql",
});

export default sequelize;
