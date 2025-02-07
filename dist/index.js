"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const constant_1 = require("./constant");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/login', routes_1.loginRoute);
app.use('/signup', routes_1.signupRoute);
app.use('/gathering', routes_1.gatheringRoute);
app.listen(constant_1.PORT, () => console.log('Server started'));
//# sourceMappingURL=index.js.map