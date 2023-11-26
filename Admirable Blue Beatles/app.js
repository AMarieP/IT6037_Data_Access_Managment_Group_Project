import express from 'express'
import ObjectId from 'mongoDB'
import connectDB from './db/connectdb.js';

const app = express();
const port = process.env.PORT||'8000' //connect with env file other wise take the default value 


//Import Routes
import allRoutes from "./routes/route.js"
import ArticleRouter from "./routes/article.js"

app.use(express.json())
app.use("/articles", ArticleRouter);


connectDB((err) => {
    if(!err){
        app.listen(port, ()=>{
            console.log(`Server listening at http://localhost:${port}`)
        })
    }

})


// routes will be localhost:3000/data/{other routes }
app.use(express.json(), allRoutes)



