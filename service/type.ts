import { Request } from 'express';

interface Member {
  email?: string;
  password?: string;
}

export interface CustomUserRequest extends Request {
  member?: Member;
}
