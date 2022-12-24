// sequelize
import sequelize, { Op } from "sequelize";
// library
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 *  @test
 *  @route GET test
 *  @access public
 */

const getTestService = async () => {
  // DB 접근
  // 오류 처리
  const resData = 1;
  return resData;
};

const testService = {
  getTestService,
};

export default testService;
