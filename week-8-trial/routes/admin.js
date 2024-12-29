const {Router} = require("express") ;
const adminRouter  = Router() ;
const bcrypt = require("bcrypt");
require('dotenv').config() ;
const adminSecret = process.env.jwt_admin ;
const zod = require('zod');
const { adminModel,courseModel } = require("./../db");
const jwt = require("jsonwebtoken");
const {admin_middleware} = require("../middlewares/admin");
const mongoose = require("mongoose");
const ObjectId = mongoose.ObjectId;

adminRouter.post('/signup',async (req,res)=>{
    const requiredBody = zod.object({
        email : zod.string().email(),
        password : zod.string()
    })
    const isCorrect = requiredBody.safeParse(req.body);
    if (!isCorrect.success){
        res.json({
            msg : "incorrect data"
        })
        return ;
    }
    const {name,email,password} = req.body ;
    const userFound = await adminModel.findOne({
        email : email
    }) ;
    if (userFound){
        res.json({
            msg : "user already exists"
        });
        return;
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const response = await adminModel.create({
        name,
        email,
        password : hashedPassword
    });
    res.json({
        response,
        msg : "signup successfull"
    })
})

adminRouter.post('/login', async(req,res)=>{
    const {email,password} = req.body ;
    const admin = await adminModel.findOne({
        email : email
    }) ;
    console.log(admin);
    const Verified = await bcrypt.compare(password,admin.password);
    if (Verified){
        const token = jwt.sign({
            id : admin._id
        },adminSecret) ;
        res.json(
            {
                token,
                msg : "login success"
            }
        )
    }
    else{
        res.json({
            msg : "wrong creds"
        })
        return;
    }
})

adminRouter.post('/add-course', admin_middleware, async (req,res)=>{
    const adminid = req.adminid ;
    const {courseTitle, coursePrice} = req.body ;
    const courseFound = await courseModel.findOne({
        title : courseTitle
    })
    if (courseFound){
        res.json({
            msg : "course already exists"
        })
        return ; 
    }
    const response = await courseModel.create({
        adminid : adminid,
        title : courseTitle,
        price : coursePrice
    }) ;
    res.json({
        msg : "course created succesfully",
        response
    })
})

adminRouter.post('/update-course',admin_middleware, async (req,res)=>{
    const adminid = req.adminid ;
    const courseTitle = req.body.courseTitle ;
    const newPrice = req.body.newPrice;
    const data = await courseModel.findOne({
        adminid : adminid,
        title : courseTitle
    }) ;
    if (!data){
        res.json({
            msg : "course doesnt exist or invalid admin"
        })
        return ; 
    }
    else{
        data.price = newPrice ;
        await data.save();
        res.json({
            msg : "price updated succesfully"
        })
    }
})

adminRouter.post('/delete-course',admin_middleware,async(req,res)=>{
    const adminid = req.adminid ;
    const courseTitle = req.body.courseTitle ;
    const data = await courseModel.findOne({
        adminid : adminid,
        title : courseTitle
    }) ;
    if (!data){
        res.json({
            msg : "course doesnt exist"
        });
        return ;
    }
    const result = await courseModel.deleteOne({title : data.title});
    if (result.deletedCount === 1) {
        res.json(
            {msg : "deleted successfully"}
        )
    } else {
        console.log("No document found to delete.");
    }
})


module.exports = {
    adminRouter
}