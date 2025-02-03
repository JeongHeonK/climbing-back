import { Request } from "express";

interface Member {
  email?: string;
  password?: string;
}

export interface CustomRequest extends Request {
  member?: Member;
}
