const {Router} = require("express") ;
const { purchasedmodel } = require("../db");
const { user_middleware } = require("../middlewares/user");
const courseRouter = Router(); 


courseRouter.post('/purchase',user_middleware,async (req,res)=>{
    const userid = req.userid ;
    const courseid = req.body.id ;
    const foundData = await purchasedmodel.findOne({
        userid : userid,
        courseid : courseid
    }) ;
    if(foundData){
        res.json(
            {msg : "course already purchased"}
        )
        return;
    }
    const response = await purchasedmodel.create({
        userid : userid,
        courseid : courseid
    })
    res.json({
        msg : "course purchased succesfully" ,
        response
    }) ;
})


module.exports = {
    courseRouter 
} ;


