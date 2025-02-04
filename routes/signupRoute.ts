import express from "express";
import { checkValidEmail, signup } from "../service/user";

const signupRoute = express.Router();

signupRoute.post("/", checkValidEmail, signup);

export default signupRoute;
