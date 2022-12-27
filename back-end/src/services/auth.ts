import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config";
import constant from "../lib/constant";
import User from "../models/User";

/**
 *  @회원가입
 *  @route POST /auth/signup
 *  @access public
 *  @err 1. 필요한 값이 없을 때
 *       2. 이메일 형식이 올바르지 않을 때
 *       3. 닉네임 형식이 올바르지 않을 때
 *       4. 패스워드 형식이 올바르지 않을 때
 *       5. 이메일이 이미 존재할 때
 *       6. 닉네임이 이미 존재할 때
 */
const postSignupService = async (
  email: string,
  nickname: string,
  password: string
) => {
  // 필요한 값이 존재하지 않는 경우
  if (!email || !nickname || !password) {
    return constant.NULL_VALUE;
  }
  /*
  유효성 검사가 들어가야 할 부분.
  */

  // 새로운 유저 생성 & 토큰 발급
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await User.create({
    email,
    password: hashedPassword,
    nickname,
  });

  const payload = {
    id: newUser.email,
    nickname: newUser.nickname,
  };

  const token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: "14d",
  });
  return token;
};

const authService = {
  postSignupService,
};

export default authService;
