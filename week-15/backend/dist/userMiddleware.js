"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwt_secret = process.env.token_secret;
const userMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    const verified = jsonwebtoken_1.default.verify(token, jwt_secret);
    if (!verified) {
        res.status(403).json({
            msg: "not signed in "
        });
        return;
    }
    // @ts-ignore
    req.userid = verified.id;
    next();
};
exports.userMiddleware = userMiddleware;
