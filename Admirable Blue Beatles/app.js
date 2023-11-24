import express from 'express'
import  {connectDB, connectAtlasDB } from './db/connectdb.js'
import { getAllData } from './models/schema.js'
import allRoutes from "./routes/route.js"
// const { MongoClient, ServerApiVersion } = require('mongodb');




const app = express()
//connect with env file other wise take the default value 
const port =process.env.PORT||'3000'
const DATABASE_URL =process.env.DATABASE_URL|| 'mongodb+srv://20220756:20220756abb@admirablebluebeatles.ha32r6f.mongodb.net/'
const DATABASE_URI=process.env.DATABASE_URI|| "mongodb+srv://20220756:20220756abb@admirablebluebeatles.ha32r6f.mongodb.net/?retryWrites=true&w=majority";
const DATABASE_NAME="abb_db"


// Create a MongoClient with a MongoClientOptions object to set the Stable API version


// connectDB(DATABASE_URL)
connectAtlasDB(DATABASE_URI)


// routes will be localhost:300/data/{other routes }
app.use("/",allRoutes)

app.listen(port,()=>{
    console.log(`Server listening at http://localhost:${port}`)
})