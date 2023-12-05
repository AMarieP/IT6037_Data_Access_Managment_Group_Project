import express from "express";
import { isPermission } from "../middlewears/permission.js";
import { getAllArticles, getArticleById, getArticlesBySubject, getArticlesByTitle, newArticle, updateArticle, deleteArticle } from "../controllers/article.js";
import { signUp, login } from '../controllers/auth.js'
import { authenticate } from "../middlewears/auth.js";
const router = express.Router();
  

//Permissions
const teacherAdminPermission = async (req, res, next) => {
  const allowedRoles = ['teacher', 'admin'];
  await isPermission(req, res, next, allowedRoles);
};

const adminOnlyPermission = async (req, res, next) => {
  const allowedRoles = ['admin']
  await isPermission(req, res, next, allowedRoles)
};



//GET All Documents in collection
router.get("/article", [isPermission], getAllArticles);

//GET All Documents by Title
router.get("/articles/search/:title", [isPermission], getArticlesByTitle);

//GET All Document in collection by Subject: Art, Technology, Mathematics
router.get("/articles/:subjectName", [isPermission], getArticlesBySubject);

//GET Document by ID
router.get("/article/:id", [isPermission], getArticleById);

//POST Create New Document
router.post("/article", [teacherAdminPermission], newArticle);

//PATCH Update Existing Document by ID
router.patch("/article/update/:id", [teacherAdminPermission], updateArticle)

//DELETE Delete Existing Document by ID
router.delete("/article/delete/:id", [adminOnlyPermission], deleteArticle)

//User profile Route
router.get('/userProfile', (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});


//home page route 
router.get('/', [isPermission], getAllArticles)


//signup route
router.get("/signup", (req, res) => {
    res.render("signup");
});
router.post('/signUp', signUp);

//login route
router.get('/login', (req, res) => {
  res.render('login'); // Assuming you have a login.ejs file in your views directory
});
router.post('/login', login);



export default router;