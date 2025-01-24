import z from "zod" ;

const UserSchema = z.object({
    name : z.string() ,
    age : z.number(),
    email : z.string().email().optional(),
}) ;


type inferedSchema = z.infer<typeof UserSchema> ;

const user1: inferedSchema  = {
    name :'yatharth', 
    age : 31, 
    email: "yatharth"
}