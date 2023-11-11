import { MongoClient } from "mongodb";
import * as dotenv from "dotenv"
import express from "express";
import StudentsRouter from './routes/student.route.js'
import cors from "cors"

dotenv.config();
const app=express();

const PORT=process.env.PORT;
const MONGO_URL=process.env.MONGO_URL;

export const client=new MongoClient(MONGO_URL);
await client.connect();
console.log("Mongo is connected");

app.use(express.json({limit:"25mb"}));
app.use(express.urlencoded({limit:"25mb"}))
app.use((req,res,next)=>{
   res.setHeader("Access-Control-Allow-Origin","*");
   next();
})
app.use(cors())
app.use("/students",StudentsRouter);

 app.get('/',function(req,res){
    res.send("Hello world");
 });



 app.listen(PORT,()=>console.log(`The server started in:${PORT} 😁`))