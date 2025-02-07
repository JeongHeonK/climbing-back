import { NextFunction, Response } from 'express';
import { AUTH_ERROR_MESSAGES } from '../../constant';
import { CustomUserRequest } from '../type';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const checkExistingMember = async (
  req: CustomUserRequest,
  res: Response,
  next: NextFunction,
) => {
  const { email } = req.query;

  const member = await prisma.user.findUnique({
    where: { email: String(email) },
  });

  if (!member) {
    res.status(401).send({ message: AUTH_ERROR_MESSAGES.user });
    return;
  }

  req.member = member;

  next();
};
