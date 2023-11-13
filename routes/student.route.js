import express from "express";
import cors from "cors";

import {
  getAllStudents,
  insertStudentData,
  deleteStudent,
  updateStudent,
  getStudentById,
  sendMail
} from "./student.service.js";
import { ObjectId } from "mongodb";
const router = express.Router();

router.get("/", async function (req, res) {
  const result = await getAllStudents();
  res.send(result);
});

router.get("/:id", async function (req, res) {
  const { id } = req.params;
  const objId = new ObjectId(id);
  const result = await getStudentById(objId);
  // const data=req.body
  // console.log(result);
  // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  const email= await sendMail(data,req,res);
  // res.send(email);
});



router.post("/", async function (req, res) {
  const data = req.body;
  const result = await insertStudentData(data);
  res.send(result);
});

router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  const objId = new ObjectId(id);
  const result = await deleteStudent(objId);
  res.send(result);
});

router.put("/:id", async function (req, res) {
  const { id } = req.params;
  const data = req.body;
  const objId = new ObjectId(id);
  const result = await updateStudent(objId, data);
  res.send(result);
});

// router.get()

export default router;
