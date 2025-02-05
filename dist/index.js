'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
require('dotenv/config');
const mongoose_1 = __importDefault(require('mongoose'));
const User_1 = __importDefault(require('./model/User'));
const app = (0, express_1.default)();
const url = process.env.MONGO_DB_URL;
app.get('/', (req, res) => {
  res.send('docker랑 병행중');
});
app.get('/user/:email', async (req, res) => {
  const { email } = req.params;
  const existingUser = User_1.default.find({ email });
  res.send(!!existingUser);
});
app.listen(8080, () => console.log('Server started'));
mongoose_1.default.connect(url).then(() => console.log('connect db'));
