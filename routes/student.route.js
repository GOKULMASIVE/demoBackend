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

router.post("/:id", async function (req, res) {
  const { id } = req.params;
  const objId = new ObjectId(id);
  const result = await getStudentById(objId);
    const email= await sendMail(result,req,res);
  // res.status(email).send();
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
