import express from "express" ;
import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config() ;
const app = express() ;
const pgClient = new Client(process.env.POSTGRES_URL) ;
app.use(express.json())

app.get('/getUserData',async (req,res)=>{
  const sqlQuery = `select * from users;`
  const response = await pgClient.query(sqlQuery) ;
  res.json({
    data : response.rows
  }) ;
})

app.post('/data',async (req,res)=>{
  const sqlQuery = `insert into users (username,password) values ($1,$2);` ;
  const {username,password } = req.body ;
  const values = [username,password] ;
  const response = await pgClient.query(sqlQuery,values) ;
  
  res.json({
    response 
  });

})


async function main(){
  await pgClient.connect() ;
  app.listen(3000) ;
}

main() ;

