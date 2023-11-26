import express from 'express'
import connectDB from './db/connectdb.js';

const app = express();
const port = process.env.PORT||'8000' //connect with env file other wise take the default value 


//Import Routes
import ArticleRouter from "./routes/art.js"

//Middleware
app.use(express.json())
app.use("/", ArticleRouter);

//Connection to DB 
connectDB((err) => {
    if(!err){
        app.listen(port, ()=>{
            console.log(`Server listening at http://localhost:${port}`)
        })
    }else{
        console.log(err)
    }

})



