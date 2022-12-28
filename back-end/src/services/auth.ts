import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import config from "../config";
import { isValidNickname, isValidPassword } from "../lib/checkValidation";
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

  // email 형식이 잘못되었을 때
  if (!isEmail(email)) {
    return constant.WRONG_EMAIL_CONVENTION;
  }

  // nickname 형식이 잘못되었을 때
  if (!isValidNickname(nickname)) {
    return constant.WRONG_NICKNAME_CONVENTION;
  }

  // password 형식이 잘못되었을 때
  if (!isValidPassword(password)) {
    return constant.WRONG_PASSWORD_CONVENTION;
  }

  // email이 이미 존재할 때
  let existedUser = await User.findOne({ where: { email } });
  if (existedUser) {
    return constant.EMAIL_ALREADY_EXIST;
  }

  // nickname이 이미 존재할 때
  existedUser = await User.findOne({ where: { nickname } });
  if (existedUser) {
    return constant.NICKNAME_ALREADY_EXIST;
  }

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
