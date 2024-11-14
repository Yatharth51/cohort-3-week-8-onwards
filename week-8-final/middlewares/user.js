const jwt = require('jsonwebtoken');
require("dotenv").config();
JWT_USER_SECRET = process.env.JWT_USER_SECRET ;

function user_middleware(req,res,next){
    const token = req.headers.token ;
    const user = jwt.verify(token,JWT_USER_SECRET) ;
    if (!user){
        res.json({
            msg : "not signed in"
        })
    }
    else{
        req.userid = user.id ;
        next();
    }
}

module.exports = {
    user_middleware
}