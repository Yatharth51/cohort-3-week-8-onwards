const express = require("express") ;
require('dotenv').config() ;
const app = express();
const mongoose = require("mongoose") ;
const {adminRouter} = require('./routes/admin');
const {courseRouter} = require('./routes/courses');
const {userRouter} = require('./routes/user');

app.use(express.json()) ;

app.use('/user',userRouter);
app.use('/admin',adminRouter);
app.use('/course',courseRouter);


async function main(){
    await mongoose.connect(process.env.MONGO_DB_URL);
    app.listen(3000,()=>{
        console.log("listening on port 3000");
    });
}

main();