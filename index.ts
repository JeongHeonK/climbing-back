import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import User from "./model/User";

const app = express();
const url = process.env.MONGO_DB_URL!;

app.get("/", (req, res) => {
  res.send("docker랑 병행중");
});

app.get("/user/:email", async (req, res) => {
  const { email } = req.params;
  const existingUser = User.find({ email });

  res.send(!!existingUser);
});

app.listen(8080, () => console.log("Server started"));
mongoose.connect(url).then(() => console.log("connect db"));
