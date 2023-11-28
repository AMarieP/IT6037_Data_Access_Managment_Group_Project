import express from 'express'
import connectDB from './db/connectdb.js';

const app = express();
const port = process.env.PORT||'8000' //connect with env file other wise take the default value 

//Register View Engine
app.set('view engine', 'ejs')

//Import Routes
import ArticleRouter from "./routes/articleCRUDRouter.js"
import Router from "./routes/route.js"
import Auth from './routes/auth.js'
import User from './routes/user.js'

//Middleware
app.use(express.json())
app.use("/", ArticleRouter);
app.use("/", Router);
app.use("/", Auth);
app.use("/", User);




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



