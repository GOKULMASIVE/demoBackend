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

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus:200,
  })
);

app.use((req,res,next)=>{
   res.setHeader("Access-Control-Allow-Origin","*");
   res.setHeader("Access-Control-Request-Method","*");
   res.setHeader("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,PATCH");
   res.setHeader("Access-Control-Allow-Headers","Content-Type");
   res.setHeader("Access-Control-Expose-Headers","Content-Type");

   if(req.method==="OPTIONS"){
      res.writeHead(200);
      return res.end();
   }else{
      return next();
   }
})
app.use("/students",StudentsRouter);

 app.get('/',function(req,res){
    res.send("Hello world");
 });



 app.listen(PORT,()=>console.log(`The server started in:${PORT} 😁`))