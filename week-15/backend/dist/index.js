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
const mongoose_1 = __importDefault(require("mongoose"));
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
const userMiddleware_1 = require("./userMiddleware");
dotenv_1.default.config();
app.use(express_1.default.json());
const mongo_url = process.env.mongo_url;
app.post('/api/v1/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataRequired = zod_1.default.object({
        username: zod_1.default.string().min(3).max(10),
        password: zod_1.default.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, { message: "Password must be 8-20 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character." })
    });
    const username = req.body.username;
    const password = req.body.password;
    const isDataRight = dataRequired.safeParse(req.body);
    if (!isDataRight.success) {
        res.status(411).json({
            msg: "Error in inputs"
        });
        return;
    }
    const userFound = yield db_1.User.findOne({
        username: username
    });
    if (userFound) {
        res.status(403).json({
            msg: "user already exists"
        });
        return;
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const data = yield db_1.User.create({
        username,
        password: hashedPassword
    });
    if (data) {
        res.status(200).json({
            data,
            msg: "signed up"
        });
        return;
    }
    else {
        res.status(500).json({
            msg: "error with the server"
        });
    }
    return;
}));
app.post('/api/v1/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const userFound = yield db_1.User.findOne({
        username: username
    });
    if (!userFound) {
        res.status(403).json({
            msg: "wrong email or password"
        });
        return;
    }
    const isPasswordRight = yield bcrypt_1.default.compare(password, userFound.password);
    if (!isPasswordRight) {
        res.status(403).json({
            msg: "wrong email or password"
        });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: userFound._id }, process.env.token_secret);
    if (token) {
        res.status(200).json({
            token,
            msg: "singin success"
        });
        return;
    }
    else {
        res.status(500).json({
            msg: "Server error"
        });
        return;
    }
}));
app.post('/api/v1/content', userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, link, type } = req.body;
    try {
        const response = yield db_1.Content.create({
            title,
            link,
            type,
            tags: [],
            // @ts-ignore
            userid: req.userid
        });
        res.status(200).json({
            msg: "content added",
            response
        });
    }
    catch (e) {
        res.json({
            error: e
        });
        return;
    }
}));
app.get('/api/v1/content', userMiddleware_1.userMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userid = req.userid;
    const content = yield db_1.Content.find({
        userid: userid
    }).populate("userid", "username");
    res.json({
        content
    });
}));
app.delete('/api/v1/content', userMiddleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userid = req.userid;
    const { contentId } = req.body;
    const data = yield db_1.Content.find({
        userid: userid,
        _id: contentId
    });
    console.log(data);
    if (!data) {
        res.status(403).json({
            msg: "Trying to delete a doc you don't own"
        });
        return;
    }
    yield db_1.Content.deleteOne({
        userid: userid,
        _id: contentId
    });
    res.status(200).json({
        msg: "Delete succeeded"
    });
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(mongo_url);
        app.listen(3000, (err) => {
            err ? console.log(err) : console.log("listening on port 3000");
        });
    });
}
main();
