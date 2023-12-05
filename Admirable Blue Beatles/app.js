import express from 'express';
import session from 'express-session';
import connectDB from './db/connectdb.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'

//Load in my env file
dotenv.config();

const app = express();
const port = process.env.PORT||'8000' //connect with env file other wise take the default value 

//Register View Engine
app.set('view engine', 'ejs')

// app.get("/", (req, res) => {
//     res.render("index");
// });

// app.get("/signup", (req, res) => {
//     res.render("signup");
// });

// app.get("/login", (req, res) => {
//     res.render("login");
// });

// app.get("/oneArticle", (req, res) => {
//     res.render("oneArticle");
// });

// app.get("/update", (req, res) => {
//     res.render("update");
// });

//Import Routes
import ArticleRouter from "./routes/article.js"
import Router from "./routes/route test.js"
import Auth from './routes/auth.js'
import User from './routes/user.js'
import Route from './routes/route.js'


//Middleware
app.use(express.json())
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));



// Use express-session middleware
app.use(
    session({
      secret: 'your-secret-key', 
      resave: false,
      saveUninitialized: true,
    })
  );
  
//router
// app.use("/", Router);
// app.use("/", ArticleRouter);
// app.use("/", Auth);
// app.use("/", User);
app.use("/", Route);


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



