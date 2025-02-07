import express from 'express';
import { checkExistingMember } from '../service/migrate/user';
// import { checkExistingMember, login } from '../service/user';

const loginRoute = express.Router();

loginRoute.get('/', checkExistingMember);

export default loginRoute;
