import express from 'express'
const router =express.Router()
import { allStudent,deleteStudent } from '../controller/studentController.js'

router.get('/all',allStudent)

router.get('/delete/:id([0-9]{2})',deleteStudent)


router.get('/delete',(req,res)=>{
    res.send("Delete Student")
})

router.get('/create',(req,res)=>{
    res.send("Create New Student")
})
router.get('/update',(req,res)=>{
    res.send("Update Student")
})

router.get('/all',(req,res)=>{
    res.send("All Student")
})
router.get('/all',(req,res)=>{
    res.send("All Student")
}) 

// module.export =router
export default router