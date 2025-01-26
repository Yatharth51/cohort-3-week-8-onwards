const mongoose = require("mongoose") ;
const Schema = mongoose.Schema ;
const ObjectId = mongoose.ObjectId ;

const UserSchema = new Schema({
    name : String,
    email : String,
    password : String
}) ;

const CourseSchema = new Schema({
    adminId : ObjectId ,
    name : String,
    price : Number,
})

const AdminSchema = new Schema ({
    name : String,
    email : String,
    password : String
})

const purchasedSchema = new Schema ({
    userId : ObjectId,
    courseId : ObjectId,
})


const UserModel = mongoose.model("users",UserSchema) ;
const CourseModel = mongoose.model("courses" , CourseSchema) ;
const AdminModel = mongoose.model("admins" , AdminSchema) ;
const PurchasedModel = mongoose.model("purchased" ,purchasedSchema) ;

module.exports = {
    UserModel ,
    CourseModel,
    AdminModel,
    PurchasedModel
}