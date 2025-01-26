const express = require("express") ;
const mongoose = require("mongoose") ;
const { AdminRouter } = require("./routes/AdminRouter");
require('dotenv').config() ;
const app = express() ;
app.use(express.json()) ;
const port = process.env.PORT;
// app.use('/user',UserRouter) ;
// app.use('/course',CourseRouter) ;
app.use('/admin',AdminRouter) ;
const mongooseUrl = process.env.mongo_db_url ;

async function main(){
    await mongoose.connect (mongooseUrl) ;
    app.listen(port,()=>{
        console.log("listening on port "+port) ;
    })
}

main() ;