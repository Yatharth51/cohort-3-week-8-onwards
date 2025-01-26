import express from "express";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";
import z from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User, Content, Tag, Link } from "./db";
const app = express();
import dotenv from "dotenv";
import { userMiddleware } from "./userMiddleware";
dotenv.config();
app.use(express.json());
const mongo_url = process.env.mongo_url

app.post('/api/v1/signup', async (req, res) => {

    const dataRequired = z.object({
        username: z.string().min(3).max(10),
        password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/, { message: "Password must be 8-20 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character." })
    })

    const username: string = req.body.username;
    const password: string = req.body.password;
    const isDataRight = dataRequired.safeParse(req.body);

    if (!isDataRight.success) {
        res.status(411).json({
            msg: "Error in inputs"
        })
        return;
    }

    const userFound = await User.findOne({
        username: username
    });
    if (userFound) {
        res.status(403).json({
            msg: "user already exists"
        })
        return;
    }

    const hashedPassword: string = await bcrypt.hash(password, 10);

    const data = await User.create({
        username,
        password: hashedPassword
    });
    if (data) {
        res.status(200).json({
            data,
            msg: "signed up"
        })
        return
    }
    else {
        res.status(500).json({
            msg: "error with the server"
        })
    }

    return;

})

app.post('/api/v1/signin', async (req, res) => {
    const { username, password } = req.body;
    const userFound = await User.findOne({
        username: username
    });
    if (!userFound) {
        res.status(403).json({
            msg: "wrong email or password"
        })
        return;
    }
    const isPasswordRight = await bcrypt.compare(password, userFound.password);

    if (!isPasswordRight) {
        res.status(403).json({
            msg: "wrong email or password"
        })
        return;
    }

    const token = jwt.sign({ id: userFound._id }, process.env.token_secret);
    if (token) {
        res.status(200).json({
            token,
            msg: "singin success"
        })
        return;
    }

    else {
        res.status(500).json({
            msg: "Server error"
        })
        return;
    }

})

app.post('/api/v1/content', userMiddleware, async (req, res) => {
    const { title, link, type } = req.body;
    try {
        const response = await Content.create({
            title,
            link,
            type,
            tags: [],
            // @ts-ignore
            userid: req.userid
        });

        res.status(200).json({
            msg: "content added",
            response
        });
    }
    catch (e) {
        res.json({
            error: e
        });
        return;
    }
})

app.get('/api/v1/content', userMiddleware, async (req, res, next) => {
    //@ts-ignore
    const userid = req.userid ;
    const content = await Content.find({
        userid : userid
    }).populate("userid","username") ;
    res.json({
        content
    }) ;

})

app.delete('/api/v1/content',userMiddleware,async (req,res)=>{
    //@ts-ignore
    const userid = req.userid ;
    const {contentId} = req.body ;

    const data = await Content.find({
        userid : userid,
        _id: contentId
    })
    console.log(data);
    
    if (!data){
        res.status(403).json({
            msg: "Trying to delete a doc you don't own"
        })
        return ;
    }
    await Content.deleteOne({
        userid : userid,
        _id: contentId
    }) ;
    res.status(200).json({
        msg : "Delete succeeded"
    })
    

})

async function main() {
    await mongoose.connect(mongo_url);
    app.listen(3000, (err) => {
        err ? console.log(err) : console.log("listening on port 3000");
    })
}

main();