import { NextFunction, Response } from 'express';
import { AUTH_ERROR_MESSAGES } from '../../constant';
import { CustomUserRequest } from '../type';
import { user } from '../../data/prisma';
import { hashPassword, checkHashedPassword } from '../../util/util';

// 로그인시 사용
export const checkUserMail = async (
  req: CustomUserRequest,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.body;

  const member = await user.findUnique({
    where: { email: String(email) },
  });

  if (!member) {
    res.status(401).send({ message: AUTH_ERROR_MESSAGES.user });
    return;
  }

  req.member = member;

  next();
};

export const checkUserPassword = (req: CustomUserRequest, res: Response) => {
  let isValidPassword;

  if (req.member?.password) {
    isValidPassword = checkHashedPassword(
      req.body.password,
      req.member?.password,
    );
  }

  if (!isValidPassword) {
    res.status(401).send({ message: AUTH_ERROR_MESSAGES.pw });
    return;
  }

  res.status(200).send('login success');
};

// 회원가입
export const checkValidEmail = async (
  req: CustomUserRequest,
  res: Response,
  next: NextFunction,
) => {
  const { newMemberData } = req.body;
  const existingEmail = await user.findUnique({
    where: { email: newMemberData.email },
  });

  if (existingEmail) {
    res.status(422).send({ message: AUTH_ERROR_MESSAGES.existingEmail });
    return;
  }

  next();
};

export const createUser = async (
  req: CustomUserRequest,
  res: Response,
  next: NextFunction,
) => {
  const { newMemberData } = req.body;
  const hashedPassword = hashPassword(newMemberData.password);
  const storingUser = { ...newMemberData, password: hashedPassword };

  try {
    await user.create({ data: storingUser });
  } catch (e) {
    next(e);
  }

  res.status(200).send({ message: 'success' });
};
