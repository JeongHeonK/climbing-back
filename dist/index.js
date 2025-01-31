"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const app = (0, express_1.default)();
const url = process.env.MONGO_DB_URL;
app.get("/user", async (req, res) => {
    const users = req.query.id;
    console.log(users);
    res.json(users);
});
app.listen(8080, () => console.log("Server started"));
// mongoose.connect(url).then(() => console.log("connect db"));
