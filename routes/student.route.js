import express from "express"
import {getAllStudents,insertStudentData} from './student.service.js'
const router=express.Router();

router.get("/",async function(req,res){
    const result=await getAllStudents();
    res.send(result);
})

router.post("/",async function(req,res){
    const data=req.body;
    const result=await insertStudentData(data);
    res.send(result);
})

export default router;