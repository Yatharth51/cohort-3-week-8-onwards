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
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const pgClient = new pg_1.Client(process.env.POSTGRES_URL);
app.use(express_1.default.json());
app.get('/getUserData', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `select * from users;`;
    const response = yield pgClient.query(sqlQuery);
    res.json({
        data: response.rows
    });
}));
app.post('/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlQuery = `insert into users (username,password) values ($1,$2);`;
    const { username, password } = req.body;
    const values = [username, password];
    const response = yield pgClient.query(sqlQuery, values);
    res.json({
        response
    });
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield pgClient.connect();
        app.listen(3000);
    });
}
main();
