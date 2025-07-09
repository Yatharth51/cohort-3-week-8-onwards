"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const mongoose_1 = __importDefault(require("mongoose"));
app.use(express_1.default.json());
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
dotenv_1.default.config();
const mongo_url = process.env.mongo_url;
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const userFound = yield db_1.userModel.findOne({
        username
    });
    if (userFound) {
        res.status(403).json({
            msg: "user already exists"
        });
        return;
    }
    const requiredBody = zod_1.default.object({
        username: zod_1.default.string().min(3).max(10),
        password: zod_1.default.string().min(8).max(20).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/)
    });
    const isDataValid = requiredBody.safeParse(req.body);
    if (!isDataValid.success) {
        res.status(411).json({
            msg: "error in inputs"
        });
        return;
    }
    const hashedPass = yield bcrypt_1.default.hash(password, 10);
    const data = yield db_1.userModel.create({
        username,
        password: hashedPass
    });
    if (data) {
        res.status(200).json({
            msg: "signed up"
        });
        return;
    }
    res.status(500).json({
        msg: "server error"
    });
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(mongo_url);
        app.listen(3000, (e) => {
            if (e) {
                console.log(e);
                return;
            }
            else {
                console.log("listening on port 3000");
            }
        });
    });
}
main();
