import { MongoClient } from "mongodb";
import * as dotenv from "dotenv"
import express from "express";
import StudentsRouter from './routes/student.route.js'
import cors from "cors"
import bodyParser from "body-parser"
dotenv.config();
const app=express();

const PORT=process.env.PORT;
const MONGO_URL=process.env.MONGO_URL;

export const client=new MongoClient(MONGO_URL);
await client.connect();
console.log("Mongo is connected");

app.use(express.json());
app.use(
  cors()
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
   extended:false
}))

app.use((req,res,next)=>{
   res.header("Access-Control-Allow-Origin","*");
   res.header("Access-Control-Headers","Content-Type");
   next();
})

app.use("/students",StudentsRouter);

 app.get('/',function(req,res){
    res.send("Hello world");
 });



 app.listen(PORT,()=>console.log(`The server started in:${PORT} 😁`))