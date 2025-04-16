const express = require("express") ;
const zod = require("zod") ;
require("dotenv").config() ;
const UserRouter = express.Router() ;
const bcrypt = require("bcrypt") ;
const jwt = require('jsonwebtoken') ;
const { UserModel, PurchasedModel, CourseModel } = require("../db");
const {user_middleware} = require("../middlewares/user")
const userSecret = process.env.USER_SECRET ;

UserRouter.post('/signup',async (req,res)=>{
    const {name,emailId,password} = req.body ;

    const requiredBody = zod.object({
        name : zod.string().min(3).max(32),
        emailId : zod.string().email(),
        password : zod.string().min(3).max(40)
    }) ;
    const isCorrect = requiredBody.safeParse(req.body) ;
    if (!isCorrect.success){
        res.json({msg : "enter valid data"}) ;
        return ; 
    } 
    const data = await UserModel.findOne({
        email : emailId
    }) ;
    if (data){
        res.json({msg : "account with email already exists"});
        return ; 
    }
    
        const hashedPassword = await bcrypt.hash(password,10) ;
        const response = await UserModel.create({
            name ,
            email : emailId,
            password : hashedPassword
        }) ;
        res.json({
            response,
            msg : "signup success"
        }) ;
})

UserRouter.post('/login',async (req,res)=>{
    const {emailId, password} = req.body ;
    const data = await UserModel.findOne({
        email : emailId
    }) ;

    if (!data){
        res.json({
            msg : "email Id does not exist"
        })
        return ; 
    } ;

    const isPasswordCorrect = await bcrypt.compare(password,data.password) ;
    if (!isPasswordCorrect){
        res.json({
            msg : "wrong password entered"
        }) ;
        return ; 
    }

    const token = jwt.sign({
        id : data._id
    },userSecret) ;

    res.json({
        msg : "login success" ,
        token
    })

})

UserRouter.get('/courses',user_middleware,async (req,res)=>{
    const userId = req.userid ;
    let purchasedCourseIds = [] ;
    const purchases = await PurchasedModel.find({
        userId : userId
    }) ;
    if (purchases.length == 0){
        res.json({
            msg : "no courses purchased "
        });
        return ; 
    }

    purchasedCourseIds = purchases.map(p=>p.courseId) ;
    const courseData = await CourseModel.find({
        _id : { $in : purchasedCourseIds}
    })

    res.json({
        courseData 
    }) ;

}) ;


module.exports = {
    UserRouter
};