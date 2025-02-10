import express from 'express';
import { checkUserMail, checkUserPassword } from '../service/user';

const loginRoute = express.Router();

loginRoute.post('/', checkUserMail, checkUserPassword);

export default loginRoute;
