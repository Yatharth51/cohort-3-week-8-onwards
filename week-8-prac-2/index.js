const express = require("express") ;
require('dotenv').config() ;
const mongoose = require("mongoose") ;
const { AdminRouter } = require("./routes/AdminRouter");
const { CourseRouter } = require("./routes/CourseRouter");
const { UserRouter } = require("./routes/UserRouter");
const Router = express.Router() ;
const mongoose_url = process.env.MONGO_URL ;
const port = process.env.PORT ;
const app = express() ;

app.use(express.json()) ;

app.use('/admin',AdminRouter) ;
app.use('/user',UserRouter);
app.use('/courses',CourseRouter);



async function main(){
    await mongoose.connect(mongoose_url) ;
    app.listen(port,()=>{
        console.log("listening on port ",port) ;
    })
}

main()