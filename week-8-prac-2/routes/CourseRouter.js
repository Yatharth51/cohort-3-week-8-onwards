const express = require("express") ;
const zod = require("zod") ;
const { CourseModel, PurchasedModel } = require("../db");
const { admin_middleware } = require("../middlewares/admin");
const { user_middleware } = require("../middlewares/user");

const CourseRouter = express.Router() ;

CourseRouter.post('/create-course',admin_middleware,async (req,res)=>{
    const adminid = req.adminid  ;
    const {name,price} = req.body ;
    const requiredBody = zod.object({
        name : zod.string(),
        price: zod.number(),
    })

    const isCorrect = requiredBody.safeParse(req.body) ;
    if (!isCorrect.success){
        res.json({
            msg : "invalid data entered"
        })
        return;
    }

    const data = await CourseModel.findOne({
        adminId : adminid ,
        name : name
    }) ;
    if (data){
        res.json({
            msg : "course with admin already exists"
        })
        return ; 
    }
    const response = await CourseModel.create({
        adminId : adminid,
        name : name,
        price : price
    }) ;
    
    res.json({
        msg : "course created" ,
        response
    }) ;

}) ;

CourseRouter.post('/purchase-course',user_middleware, async (req,res)=>{
    const userid = req.userid ; 
    const courseid = req.body.courseid ;
    const data = await PurchasedModel.findOne({
        userId : userid,
        courseId : courseid
    }) ;

    const courseData = await CourseModel.findOne({
        _id : courseid
    }) ;

    if (!courseData){
        res.json({
            msg : "course doesnt exist"
        }) ;
        return ; 
    }

    if(data){
        res.json({
            msg : "course already purchased" 
        }) ;
        return ; 
    }

    const response = await PurchasedModel.create({
        userId : userid,
        courseId : courseid
    }) ;

    res.json({
        msg : "course purchased succesfully" ,
        response
    })
    
})



module.exports = {
    CourseRouter
};