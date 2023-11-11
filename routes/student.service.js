import {client} from '../index.js';

export async function getAllStudents(){
    return await client.db("Demo").collection("students").find().toArray();
}

export async function insertStudentData(data){
    return await client.db("Demo").collection("students").insertOne(data);
}

export async function deleteStudent(id){
    return await client.db("Demo").collection("students").deleteOne({_id:id});
}

export async function updateStudent(id){
    return await client.db("Demo").collection("students").updateOne({_id:id});
}