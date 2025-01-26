const express = require("express") ;
const jwt = require("jsonwebtoken");
require("dotenv").config() ;
const adminSecret = process.env.json_admin_secret ;

const admin_middleware = (req,res,next) => {
    const token = req.headers.token ;
    const user = jwt.verify(token,adminSecret) ;
    if (!user){
        res.json({
            msg : "user not signed in" 
        })
        return ;
    }

    req.userid = user.id ;

    next() ;
}

module.exports = {
    admin_middleware
}