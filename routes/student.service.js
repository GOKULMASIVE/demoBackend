import {client} from '../index.js';
import nodemailer from "nodemailer"
import Mailgen from 'mailgen';
import xoauth2 from 'xoauth2';


export async function getAllStudents(){
    return await client.db("Demo").collection("students").find().toArray();
}

export async function getStudentById(id){
    
    return client.db("Demo").collection("students").findOne({_id:id});
}

export async function insertStudentData(data){
    return await client.db("Demo").collection("students").insertOne(data);
}

export async function deleteStudent(id){
    return await client.db("Demo").collection("students").deleteOne({_id:id});
}

export async function updateStudent(id,data){
    return await client.db("Demo").collection("students").updateOne({_id:id},{$set:data});
}

export async function sendMail(data,req,res){
    
      
    var sender = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // xoauth2: xoauth2.createXOAuth2Generator({
          user: process.env.Email,
          pass: process.env.Password,
        // }),
      },
      tls:{
        rejectUnauthorized:false,
      }
    });

    let mailgenarator=new Mailgen({
        theme:"default",
        product:{
            name:"DemoMail",
            link:"https://demomail.js/"
        }
    })

    let response={
        body:{
            name:data.name,
            intro:"Your mark has arrived!",
            table:{
                data:[
                    {
                      
                        StudentName:data.name,
                        Maths:data.maths,
                        Physics:data.physics,
                        Chemistry:data.chemistry,
                        Total:data.total,
                        Cutoff:data.cutoff

                    }
                ]
            },
            outro:"Have a successfull future😄✨🏆"
        }
    }

    let mail=mailgenarator.generate(response)

    var composemail={
        from:process.env.Email,
        to:data.email,
        subject:"Your marks with cutoff",
        html:mail
    }

    sender.sendMail(composemail).then(()=>{
        return res.status(201).json({
            msg:"you should receive an email",
        })
    }).catch(error=>{
        return res.status(500).json({error})
    })

    

}