import express from 'express';
import { checkValidEmail, createUser } from '../service/user';

const signupRoute = express.Router();

signupRoute.post('/', checkValidEmail, createUser);

export default signupRoute;
