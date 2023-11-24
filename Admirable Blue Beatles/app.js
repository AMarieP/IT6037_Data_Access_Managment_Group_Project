import express from 'express'
import  { connectAtlasDB, getDB } from './db/connectdb.js'
import allRoutes from "./routes/route.js"
import articleRoutes from "./routes/article.js"
import  Subject from './models/schema.js'

// const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const port = process.env.PORT||'8000' //connect with env file other wise take the default value 


//Database Connection
let db

connectAtlasDB((err) => {
    if(!err){
        app.listen(port, ()=>{
            console.log(`Server listening at http://localhost:${port}`)
        })
        db = getDB()
    }

})


// routes will be localhost:3000/data/{other routes }
app.use("/", allRoutes)
app.use("/articles", articleRoutes)

app.get("/all", (req, res) => {
    let articles = []

    db.collection('Art')
    .find()
    .forEach(article => articles.push(article))
    .then(() => {
        res.status(200).json(articles)
    })
    .catch(() => {
        res.status(500).json({error: 'Cannot Fetch Articles'})
    })
})

app.get('/test', async (req, res) => {
    try{
        const articles = await db.Subject.find()
        res.json(articles)

    } catch(err){
        res.status(500).json({messge: err.message})

    }
})

export default db
