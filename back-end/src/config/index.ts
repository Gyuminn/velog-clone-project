import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  /**
   * my favorite port
   */
  port: parseInt(process.env.PORT, 10),

  /**
   * my secret sauce
   */
  jwtSecret: process.env.JWT_SECRET,
  jwtAlgorithm: process.env.JWT_ALOG,
};
