
const mongoose = require("mongoose") ;
const Schema = mongoose.Schema ;
const ObjectId = mongoose.ObjectId ;

const UserSchema = new Schema({
    name : String,
    email : String,
    password : String
}) ;

const AdminSchema = new Schema({
    name : String,
    email : String,
    password : String
}) ;

const CourseSchema = new Schema({
    adminId : ObjectId, 
    name : String,
    price : Number
}) ;

const PurchasedSchema = new Schema({
    userId : ObjectId,
    courseId : ObjectId
}) ;

const UserModel = mongoose.model("users",UserSchema) ;
const AdminModel = mongoose.model("admins",AdminSchema) ;
const CourseModel = mongoose.model("courses",CourseSchema) ;
const PurchasedModel = mongoose.model("purchases",PurchasedSchema) ;

module.exports = {
    UserModel,
    AdminModel,
    CourseModel,
    PurchasedModel
} ;