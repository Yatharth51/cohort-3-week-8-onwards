import mongoose,{Schema,model} from "mongoose";

const userSchema = new Schema({
    username : {type : String, required : true, unique : true},
    password : {type : String, required : true}
}) ;

const contentTypes = ['link','video','tweet','note'] ;

const contentSchema = new Schema({
    title : {type : String},
    link : {type: String, required : true} ,
    type : {type : String, enum:contentTypes, required : true} ,
    tags : [{type : mongoose.Types.ObjectId , ref : "Tag"}] ,
    userId : {type :mongoose.Types.ObjectId ,ref : "User",required: true } 
}) ;

const tagSchema = new Schema({
    title: { type: String, required: true, unique: true }
}) ;

const linkSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
});


export const userModel = model('user',userSchema) ;
export const contentModel = model('content',contentSchema) ;
export const tagModel = model('tag',tagSchema) ;
export const linkModel = model('link',linkSchema) ;
