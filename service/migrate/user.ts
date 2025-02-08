import { NextFunction, Response } from 'express';
import { AUTH_ERROR_MESSAGES } from '../../constant';
import { CustomUserRequest } from '../type';
import { user } from '../../data/prisma';

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
  if (req.member?.password !== req.body.password) {
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
    res.status(401).send({ message: AUTH_ERROR_MESSAGES.existingEmail });
    return;
  }

  next();
};

export const createUser = async (req: CustomUserRequest, res: Response) => {
  const { newMemberData } = req.body;
  console.log(newMemberData);
  try {
    await user.create({ data: newMemberData });
  } catch (e) {
    console.log(e);
  }

  res.status(200).send({ message: 'success' });
};
