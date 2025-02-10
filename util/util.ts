import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
export const hashPassword = (password: string) =>
  bcrypt.hashSync(password, salt);

export const checkHashedPassword = (password: string, hash: string) =>
  bcrypt.compareSync(password, hash);
