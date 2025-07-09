import mongoose from "mongoose" ;
const ObjectId = mongoose.Types.ObjectId ;

const UserSchema = new mongoose.Schema({
    username : {type: String, unique : true, required: true} ,
    password : {type : String, required : true}
}) ;

const ContentTypes = ['image', 'video', 'article'] ;

const ContentSchema = new mongoose.Schema({
    title : {type : String, required: true} ,
    link : {type : String, required: true} ,
    type : {type : String, enum : ContentTypes},
    tags : [{type : ObjectId, ref: "tag"}] ,
    userid : {type : ObjectId,required: true, ref: "user"}
})

const TagSchema = new mongoose.Schema({
    title : {type : String, required : true}
}) ;

const LinkSchema = new mongoose.Schema({
    hash : {type : String, required: true} ,
    userid : {type : ObjectId, required : true, ref : "user"}
}) ;


export const User = mongoose.model("user",UserSchema) ;
export const Content = mongoose.model("content",ContentSchema) ;
export const Tag = mongoose.model("tag",TagSchema) ;
export const Link = mongoose.model("link",LinkSchema) ;


