export const PORT = 8080;

export const URL = process.env.MONGO_DB_URL!;

export const AUTH_ERROR_MESSAGES = {
  email: "유효하지 않은 이메일입니다.",
  reg: "특수문자와 영문이 포함되어야 합니다.",
  min: "비밀번호는 8자리 이상이어야 합니다.",
  max: "비밀번호는 12자리 이하여야 합니다.",
  mismatch: "비밀번호가 일치하지 않습니다.",
  existingEmail: "이미 등록된 이메일입니다.",
  user: "일치하는 계정을 찾을 수 없습니다.",
  pw: "비밀번호가 일치하지 않습니다.",
};
