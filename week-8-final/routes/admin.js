const {Router} = require("express") ;
const { adminmodel, coursemodel } = require("../db");
const adminRouter = Router() ;
const {admin_middleware} = require("./../middlewares/admin")
const zod = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET ;

adminRouter.post('/signup', async (req, res) => {

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

    const response = await adminmodel.create({
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

adminRouter.post('/login', async (req, res) => {

    const { email, password } = req.body;
    const data = await adminmodel.findOne({
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
    },JWT_ADMIN_SECRET) ;
    
    res.json({
        token,
        msg : "login success"
    })
})

adminRouter.get('/courses',admin_middleware,async (req,res)=>{
    const userid = req.adminid ;
    let admin_course_ids = [] ;
    const admin_courses = await coursemodel.find({
        adminid : userid
    }) ;
    console.log(admin_courses);
    for (let i = 0 ; i< admin_courses.length ; i++){
        admin_course_ids.push(admin_courses[i]._id) ;
    }
    const coursesData = await coursemodel.find({
        _id : { $in : admin_course_ids}
    }) ;
    res.json({
        admin_course_ids,
        coursesData 
    })
})

adminRouter.post('/add-course',admin_middleware,async (req,res)=>{
    const adminid = req.adminid ;
    const courseTitle = req.body.title ;
    const coursePrice = req.body.price ;
    const courseAlreadyPresent = await coursemodel.findOne({
        title : courseTitle
    })
    if (courseAlreadyPresent){
        res.json({
            msg : "course is already present"
        }) ;
        return ;
    }
    const response = await coursemodel.create({
        adminid : adminid,
        title : courseTitle ,
        price : coursePrice
    });
    res.json({
        msg : "course created succesfully",
        response
    })
})


module.exports = {
    adminRouter
} ;