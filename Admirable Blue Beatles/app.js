import express from 'express'

import connectDB from './db/connectdb.js'

import { createSampleData } from './utils/createSampleData.js'
import { getAllData } from './models/schema.js'

const app = express()
import allRoutes from "./routes/route.js"

//connect with env file other wise take the default value 
const port =process.env.PORT||'3000'
const DATABASE_URL =process.env.DATABASE_URL|| 'mongodb+srv://20220756:20220756abb@admirablebluebeatles.ha32r6f.mongodb.net/'

connectDB(DATABASE_URL)


//create data 
// createSampleData()

//this section divide into routes and controller 
// app.get("/", async(req,res)=>{
//     try {
//         const result =await getAllData()
//         console.log("get all data in hone page :",result)
//         res.send({result})
//     } catch (error) {
//         console.log("Error fetching all data :",error)
//         res.status(500).json({message:"internal server error while fetching all data  "})
//     }
// })

// routes will be localhost:300/data/{other routes }
app.use("/",allRoutes)

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})