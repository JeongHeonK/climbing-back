import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import { PORT, URL } from "./constant";
import { loginRoute, signupRoute, gatheringRoute } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/login", loginRoute);
app.use("/signup", signupRoute);
app.use("/gathering", gatheringRoute);

app.listen(PORT, () => console.log("Server started"));
mongoose.connect(URL).then(() => console.log("connect db"));
