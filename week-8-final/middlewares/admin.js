const jwt = require('jsonwebtoken');
require("dotenv").config();
JWT_ADMIN_SECRET = process.env.JWT_ADMIN_SECRET ;
console.log(JWT_ADMIN_SECRET);

function admin_middleware(req,res,next){
    const token = req.headers.token ;
    const user = jwt.verify(token,JWT_ADMIN_SECRET) ;
    if (!user){
        res.json({
            msg : "not signed in"
        })
    }
    else{
        req.adminid = user.id ;
        next();
    }
}

module.exports = {
    admin_middleware
}