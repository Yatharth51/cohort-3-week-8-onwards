const { Router } = require("express");
require("dotenv").config() ;
JWT_USER_SECRET = process.env.JWT_USER_SECRET 
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { usermodel, purchasedmodel, coursemodel } = require('./../db');
const userRouter = Router();
const {user_middleware} = require("./../middlewares/user");


userRouter.post('/signup', async (req, res) => {

    const requiredBody = zod.object({
        firstname: zod.string().max(60).min(5),
        lastname: zod.string().max(60).min(3),
        email: zod.string().email(),
        password: zod.string()
    });

    const isCorrect = requiredBody.safeParse(req.body);
    if (!isCorrect.success) {
        res.json({
            msg: "incorrect data entered"
        });
        return;
    }

    const { firstname, lastname, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await usermodel.create({
        firstname,
        lastname,
        email,
        password: hashedPassword
    });

    res.json({
        response,
        msg: "signup succesfull"
    })

})

userRouter.post('/login', async (req, res) => {

    const { email, password } = req.body;
    const data = await usermodel.findOne({
        email: email
    });
    console.log(data);
    const isVerified = await bcrypt.compare(password, data.password);
    if (!isVerified) {
        res.json({
            msg: "wrong password or email"
        })
        return ;
    }

    const token = jwt.sign({
        id : data._id
    },JWT_USER_SECRET) ;
    
    res.json({
        token,
        msg : "login success"
    })
})

userRouter.get('/courses',user_middleware,async (req,res)=>{
    const userid = req.userid ;
    let purchasedCourseIds = [] ;
    const purchases = await purchasedmodel.find({
        userid : userid
    }) ;
    for (let i = 0 ; i< purchases.length ; i++){
        purchasedCourseIds.push(purchases[i].courseid) ;
    }
    const coursesData = await coursemodel.find({
        _id : { $in : purchasedCourseIds}
    }) ;
    res.json({
        coursesData ,
        purchases
    })
})


module.exports = {
    userRouter
};