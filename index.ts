import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import User from "./model/User";
import { PORT, URL } from "./constant";
import { loginRoute, signupRoute } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/login", loginRoute);
app.use("/signup", signupRoute);

app.get("/user/:email", async (req, res) => {
  const { email } = req.params;
  const existingUser = User.find({ email });

  res.send(!!existingUser);
});

app.listen(PORT, () => console.log("Server started"));
mongoose.connect(URL).then(() => console.log("connect db"));
