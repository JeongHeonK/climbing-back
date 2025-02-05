import express from 'express';
import { checkExistingMember, login } from '../service/user';

const loginRoute = express.Router();

loginRoute.get('/', checkExistingMember, login);

export default loginRoute;
