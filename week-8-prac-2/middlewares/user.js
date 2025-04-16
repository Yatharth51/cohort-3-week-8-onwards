const jwt = require("jsonwebtoken") ;
const userSecret = process.env.USER_SECRET ;

function user_middleware(req,res,next){
    const token = req.headers.token ;
    const user = jwt.verify(token,userSecret) ;
    if (!user){
        res.json({
            msg : "not signed in"
        }) ;
        return ; 
    }
    req.userid = user.id ;
    next() ;
}

module.exports = {
    user_middleware
}