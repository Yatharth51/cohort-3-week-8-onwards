"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const z = __importStar(require("zod"));
const jwt = __importStar(require("jsonwebtoken"));
const middleware_1 = __importDefault(require("./middleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
const KEY = process.env.JWT_KEY;
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredBody = z.object({
        username: z.string().min(3).max(16),
        email: z.email(),
        password: z.string().min(5).max(25)
    });
    const { username, password, email } = req.body;
    const result = requiredBody.safeParse({ username, email, password });
    if (!result.success) {
        res.json({
            error: result.error
        });
        return;
    }
    else {
        const response = yield prisma.user.create({
            data: {
                username,
                email,
                password
            }
        });
        res.json({
            msg: "signup success",
            response
        });
    }
    return;
}));
app.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const response = yield prisma.user.findFirst({
        where: {
            username,
            password
        }
    });
    const token = jwt.sign({ id: response === null || response === void 0 ? void 0 : response.id }, KEY);
    if (response) {
        res.json({
            msg: "login successful",
            token
        });
    }
    else {
        res.json({
            msg: "login failed either username wrong or password wrong"
        });
    }
    return;
}));
app.post('/add-todo', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userid;
    const { title } = req.body;
    const response = yield prisma.todo.findFirst({
        where: {
            userId: userId,
            title: title
        }
    });
    if (response) {
        res.json({
            msg: "todo already added"
        });
    }
    else {
        const addData = yield prisma.todo.create({
            data: {
                userId,
                title
            }
        });
        res.json({
            msg: addData
        });
    }
    return;
}));
app.get('/todos', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userid;
    try {
        const todos = yield prisma.todo.findMany({
            where: {
                userId
            },
            select: {
                title: true,
                done: true,
                userId: true
            }
        });
        const username = yield prisma.user.findFirst({
            where: {
                id: userId
            },
            select: {
                username: true
            }
        });
        res.json({
            todos,
            username
        });
    }
    catch (e) {
        res.json({
            msg: e
        });
    }
    return;
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.$connect();
        app.listen(PORT, () => {
            console.log(`Listening on Port ${PORT}`);
        });
    });
}
main();
