const express = require("express") ;
const z = require("zod") ;
require("dotenv").config() ;
const { AdminModel, CourseModel } = require("../db");
const AdminRouter = express.Router() ;
const saltRounds = 10 ;
const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken") ;
const { admin_middleware } = require("../middleware/admin_middleware");
adminSecret = process.env.json_admin_secret ;

AdminRouter.get("/",(req,res)=>{
    res.json({
        msg : "up and running"
    })
})

AdminRouter.post('/signup',async (req,res)=>{

    const requiredBody = z.object({
        name : z.string(),
        email : z.string(),
        password : z.string()
    });

    const isCorrect = requiredBody.safeParse(req.body) ;

    if (!isCorrect){
        res.json({
            msg : "incrorrect data entered"
        })
        return ;
    }

    const {name,email,password} = req.body ;
    const emailFound = await AdminModel.findOne({
        email : email
    })

    if(emailFound){
        res.json({
            msg : "user already exists"
        })
        return
    }

    const hashedPass = await bcrypt.hash(password,saltRounds) ;

    const response = await AdminModel.create({
        name,email,password:hashedPass
    })

    res.json({
        response,
        msg : "successful signup"
    })

})

AdminRouter.post("/login",async (req,res)=>{
    const {email,password} = req.body ;
    const userData = await AdminModel.findOne({
        email : email
    }) ;

    if (!userData){
        res.json({
            msg : "wrong email or password"
        })
        return ;
    }

    const isCorrect = await bcrypt.compare(password,userData.password) ;

    if (isCorrect){
        const token = jwt.sign({id : userData._id},adminSecret) ;
        res.json({
            msg : "successful login",
            token
        })
    }

}) 


AdminRouter.post('/add-course' ,admin_middleware, async(req,res)=>{
    const {name,price} = req.body ;
    const alreadyPresent = await CourseModel.findOne({
        name : name
    })

    if (alreadyPresent){
        res.json({
           msg :  "course already present" ,
        })
        return
    }

    const response = CourseModel.create({
        adminId : req.userid ,
        name,
        price,
    })

    res.json({
        response,
        msg : "course created" 
    })


})

AdminRouter.get("/courses",admin_middleware,async (req,res)=>{
    const adminId = req.userid ;
    const response = await CourseModel.find({
        adminId :adminId
    }) ;
    res.json({
        response
    })
})

AdminRouter.delete('/delete-course',admin_middleware,async (req,res)=>{
    const {name} = req.body ;
    const adminId = req.userid ;

    const data = await CourseModel.findOne({
        name,
        adminId
    });

    if (!data){
        res.json({
            msg : "course doesn't exist" 
        })
        return ;
    }

    const response = await CourseModel.deleteOne({
        name,
        adminId
    })

    res.json({
        response,
        msg : "course deleted successfully"
    })


})


module.exports = {AdminRouter};

