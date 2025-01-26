"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = exports.Tag = exports.Content = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Types.ObjectId;
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});
const ContentTypes = ['image', 'video', 'article'];
const ContentSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, enum: ContentTypes },
    tags: [{ type: ObjectId, ref: "tag" }],
    userid: { type: ObjectId, required: true, ref: "user" }
});
const TagSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true }
});
const LinkSchema = new mongoose_1.default.Schema({
    hash: { type: String, required: true },
    userid: { type: ObjectId, required: true }
});
exports.User = mongoose_1.default.model("user", UserSchema);
exports.Content = mongoose_1.default.model("content", ContentSchema);
exports.Tag = mongoose_1.default.model("tag", TagSchema);
exports.Link = mongoose_1.default.model("link", LinkSchema);
