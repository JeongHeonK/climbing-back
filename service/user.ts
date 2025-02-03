import { NextFunction, Response } from "express";
import User from "../model/User";
import { AUTH_ERROR_MESSAGES } from "../constant";
import { CustomRequest } from "./type";

export const checkExistingMember = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const member = await User.findOne({ email });

  if (!member) {
    res.status(401).send({ message: AUTH_ERROR_MESSAGES.user });
    return;
  }

  req.member = { email: member?.email, password: member?.password };
  next();
};

export const login = (req: CustomRequest, res: Response) => {
  if (req.member?.password !== req.body.password) {
    res.status(401).send({ message: AUTH_ERROR_MESSAGES.pw });
    return;
  }

  res.status(200).send("login success");
};

export const checkValidEmail = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const existingEmail = await User.findOne({ email });

  if (existingEmail) {
    res.send(401).send({ message: AUTH_ERROR_MESSAGES.existingEmail });
    return;
  }

  next();
};

export const signup = async (req: CustomRequest, res: Response) => {
  const { newMemberData } = req.body;

  const newMember = await User.create(newMemberData);

  res.send(200).send({ message: "success" });
};
