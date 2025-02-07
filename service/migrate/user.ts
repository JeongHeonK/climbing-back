import { NextFunction, Response } from 'express';
import { AUTH_ERROR_MESSAGES } from '../../constant';
import { CustomUserRequest } from '../type';
import { user } from 'data/prisma';

export const checkExistingMember = async (
  req: CustomUserRequest,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.query;

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
