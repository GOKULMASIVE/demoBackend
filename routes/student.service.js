import {client} from '../index.js';

export async function getAllStudents(){
    return await client.db("Demo").collection("students").find().toArray();
}

export async function insertStudentData(data){
    return await client.db("Demo").collection("students").insertOne(data);
}