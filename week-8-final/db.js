const mongoose = require("mongoose") ;
const Schema = mongoose.Schema ;
const ObjectId = mongoose.ObjectId ;

const UserSchema = new Schema ({
    firstname : String,
    lastname : String,
    email : {type : String, unique : true},
    password : String
})

const AdminSchema = new Schema ({
    firstname : String,
    lastname : String,
    email : {type : String, unique : true},
    password : String
})

const CourseSchema = new Schema ({
    adminid : ObjectId,
    title : String,
    price : Number
})

const PurchasedSchema = new Schema ({
    userid : ObjectId,
    courseid : ObjectId
})

const usermodel = mongoose.model('users',UserSchema);
const adminmodel = mongoose.model('admins',AdminSchema);
const coursemodel = mongoose.model('courses',CourseSchema);
const purchasedmodel = mongoose.model('purchases',PurchasedSchema);

module.exports = {
    usermodel,
    adminmodel,
    coursemodel,
    purchasedmodel
} ;
