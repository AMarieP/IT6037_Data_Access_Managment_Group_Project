import express from 'express'

import  {connectDB, connectAtlasDB } from './db/connectdb.js'


import { createSampleData } from './utils/createSampleData.js'
import { getAllData } from './models/schema.js'

const app = express()
import allRoutes from "./routes/route.js"

//connect with env file other wise take the default value 
const port =process.env.PORT||'3000'
const DATABASE_URL =process.env.DATABASE_URL|| 'mongodb+srv://20220756:20220756abb@admirablebluebeatles.ha32r6f.mongodb.net/'
const DATABASE_URI=process.env.DATABASE_URI|| "mongodb+srv://20220756:20220756abb@admirablebluebeatles.ha32r6f.mongodb.net/?retryWrites=true&w=majority";


// connectDB(DATABASE_URL)
connectAtlasDB(DATABASE_URI)


//create data 
//createSampleData()



// routes will be localhost:300/data/{other routes }
app.use("/",allRoutes)

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})