const express = require("express") ;
const app = express();
require("dotenv").config() ;
const URL = process.env.mongo_url ;
const {adminRouter} = require("./routes/admin")
const {userRouter} = require("./routes/user")
const {courseRouter} = require("./routes/course");
const mongoose = require("mongoose");
app.use(express.json()) ;

app.get('/',(req,res)=>{
    res.json({
        msg : "success"
    })
})

app.use('/admin',adminRouter);
// app.use('/user',userRouter);
// app.use('/course',courseRouter);

async function main(){
    await mongoose.connect(URL) ;
    app.listen(3000,()=>{
        console.log("listening on 3000");
    })
}

main()