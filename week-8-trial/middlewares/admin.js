const jwt = require("jsonwebtoken") ;
require("dotenv").config();
const adminSecret = process.env.jwt_admin;


function admin_middleware(req,res,next){
    const token = req.headers.token ;
    const user = jwt.verify(token,adminSecret);
    if (!user){
        res.json({
            msg : "not logged in"
        })
        return ; 
    }
    req.adminid = user.id ;
    next() ;
}

module.exports = {
    admin_middleware 
} ;