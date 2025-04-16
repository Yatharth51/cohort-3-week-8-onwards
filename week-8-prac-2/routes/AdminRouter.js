const express = require("express") ;
const zod = require("zod") ;
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken") ;
const { AdminModel, CourseModel } = require("../db");
const adminSecret = process.env.ADMIN_SECRET ;
const AdminRouter = express.Router() ;
const {admin_middleware} = require("../middlewares/admin")

AdminRouter.post('/signup', async (req,res)=>{
    const {name,email,password} = req.body ;
    const requiredBody = zod.object({
        name : zod.string().min(3).max(30),
        email : zod.string().email(),
        password : zod.string()
    }) ;
    const isCorrect = requiredBody.safeParse(req.body) ;
    if (!isCorrect.success){
        res.json({
            msg : "invaid data entered"
        }) ;
        return ; 
    }
    const data = await AdminModel.findOne({
        email : email
    }) ;
    
    if (data){
        res.json({
            msg : "account already exists"
        })
        return ; 
    } ;
    const hashedPassword = await bcrypt.hash(password,10) ;
    const response = await AdminModel.create({
        name,
        email,
        password : hashedPassword
    }) ;
    res.json({
        msg : "account created" ,
        response
    })
}) ;

AdminRouter.post('/login',async (req,res)=>{
    const {email,password} = req.body ;
    const requiredBody = zod.object({
        email : zod.string().email(),
        password : zod.string()
    }) ;
    const isCorrect = requiredBody.safeParse(req.body) ;
    if (!isCorrect.success){
        res.json({
            msg : "invalid data entered" 
        })
        return ; 
    } ;
    const data = await AdminModel.findOne({
        email : email
    }) ;
    if(!data){
        res.json({
            msg : "invalid email"
        });
        return ;
    }

    const isPasswordCorrect = bcrypt.compare(password,data.password) ;
    if (!isPasswordCorrect){
        res.json({
            msg : "wrong password"
        }) ;
        return ; 
    } ;
    const token = jwt.sign({
        id : data._id
    },adminSecret) ;
    res.json({
        msg : "successful signup" ,
        token
    }) ;
})


AdminRouter.get('/courses',admin_middleware,async (req,res)=>{
    const adminid = req.adminid ;
    const adminCourses = await CourseModel.find({
        adminId : adminid
    }) ;
    if (adminCourses.length == 0){
        res.json({
            msg : "no courses created by admin"
        }) ;
        return ;
    }
    const courses = adminCourses.map(p => ({
        adminId: p.adminId,
        name: p.name,
        price: p.price
      }));
      
    res.json({
        courses
    }) ;

})

module.exports = {
    AdminRouter
};