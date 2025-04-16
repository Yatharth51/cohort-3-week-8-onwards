const jwt = require("jsonwebtoken") ;
const adminSecret = process.env.ADMIN_SECRET ;

function admin_middleware(req,res,next){
    const token = req.headers.token ;
    const admin = jwt.verify(token,adminSecret) ;
    if (!admin){
        res.json({
            msg : "not signed in"
        }) ;
        return ; 
    }
    req.adminid = admin.id ;
    next() ;
}

module.exports = {
    admin_middleware
}