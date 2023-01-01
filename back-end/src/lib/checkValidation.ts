export const isValidNickname = (nickname: string): boolean => {
  const regexForNickname = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
  if (!regexForNickname.test(nickname)) {
    return false;
  }

  if (nickname.length < 2) {
    return false;
  }

  if (nickname.length > 10) {
    return false;
  }

  return true;
};

export const isValidPassword = (password: string): boolean => {
  const regexForPassword = /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,64}$/;
  if (!regexForPassword.test(password)) {
    return false;
  }

  // 공백이 있으면 유효하지 않다.
  if (/\s/.test(password)) {
    return false;
  }

  return true;
};
