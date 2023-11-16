import {join} from 'path'
import express from 'express'

import { getAllDoc } from '../models/Students.js';


const app =express()

// app.set('views', path.join(__dirname, process.cwd()));

const allStudent=(req,res)=>{
    // const result =getAllDoc()
    // res.send('<h1>Home </h1>')
    // const students = getAllDoc()
    res.sendFile(join(process.cwd(),'views', '/index.html'));
    // res.render('index', { data: students });

}

const deleteStudent=(req,res)=>{
    console.log(req.params)
    const {id}=req.params
    console.log(id)
    res.send(`Delete ${id}`)
    // if (id==2){
    //     res.send("id is 2")
    // }else{
    //     res.send(`Student delete ${id}`)
    // }
}


  
export {allStudent,deleteStudent}
// module.export ={allStudent,deleteStudent} old method 