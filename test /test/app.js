import express from 'express'
import mongoose from 'mongoose'
// const mongoose =require('mongoose')
import connectDB from "./db/connectdb.js"
import {createMultiDocStudent, getAllDoc} from "./models/Students.js"


// const student =require("./routes/student.js") old method 

import studentRoutes from "./routes/student.js"



//this code will be use in connectdb.js file 
// mongoose.connect("mongodb://localhost:27017/schooldb").then(()=>{
//     console.log("Connected Successfully...")
// })


const app=express()
const port =process.env.PORT||'3000'
// const DATABASE_URL=process.env.DATABASE_URL || 'mongodb://localhost:27017/schooldb/'
// const DATABASE_URL=process.env.DATABASE_URL || 'mongodb+srv://20220756:20220756abb@admirablebluebeatles.ha32r6f.mongodb.net/'

const DATABASE_URL='mongodb://localhost:27017/schooldb'


connectDB(DATABASE_URL)

//create and save document 
// createMultiDocStudent()

getAllDoc()


//routing 
app.get("/", (req,res)=>{
    res.send("Get Method")
})
app.get("/getAllDoc", async (req, res) => {
    try {
      const result = await getAllDoc();
      console.log("get all result home page", result);
      res.send({ result });
    } catch (error) {
      console.error("Error fetching all documents:", error);
      res.status(500).json({ message: "Internal Server Error while fetching" });
    }
  });

//load router Module

// all path will be localHost:3000/student/all,edit,delete etc 
app.use('/student',studentRoutes)


app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})