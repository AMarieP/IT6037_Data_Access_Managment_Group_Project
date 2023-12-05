import express from "express";
const router = express.Router()
import { getAllArticles } from "../controllers/article.js";

router.get('/', (req, res) => {

    // res.render('home', {name: "The Name"})
    // res.status(200).render('index', getAllArticles)
    res.send('Home Page ')
})


// router.get("/", getAllArticles);
export default router