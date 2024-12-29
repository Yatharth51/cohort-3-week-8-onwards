const mongoose = require("mongoose") ;
const ObjectId = mongoose.ObjectId ;
const Schema = mongoose.Schema ;

const adminSchema = new Schema ({
    name : String,
    email : {type : String, unique : true},
    password : String
})

const userSchema = new Schema ({
    name : String,
    email : {type : String, unique : true},
    password : String
})

const courseSchema = new Schema({
    adminid : ObjectId ,
    title : String,
    price : Number
})

const purchasedSchema = new Schema({
    courseid : ObjectId,
    userid : ObjectId
})


const userModel = mongoose.model('users',userSchema) ;
const adminModel = mongoose.model ("admins",adminSchema);
const courseModel = mongoose.model ("courses",courseSchema);
const purchasedModel = mongoose.model ("purchased",purchasedSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchasedModel
} ;
