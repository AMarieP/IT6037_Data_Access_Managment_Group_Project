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
router.get("/article", [isPermission, authenticate], getAllArticles);

//GET All Documents by Title
router.get("/articles/search/:title", [isPermission, authenticate], getArticlesByTitle);

//GET All Document in collection by Subject: Art, Technology, Mathematics
router.get("/articles/:subjectName", [isPermission, authenticate], getArticlesBySubject);

//GET Document by ID
router.get("/article/:id", [isPermission, authenticate], getArticleById);

//POST Create New Document
router.post("/article", [teacherAdminPermission, authenticate], newArticle);

//PATCH Update Existing Document by ID
router.patch("/article/update/:id", [teacherAdminPermission, authenticate], updateArticle)

//DELETE Delete Existing Document by ID
router.delete("/article/delete/:id", [adminOnlyPermission, authenticate], deleteArticle)

//User profile Route
router.get('/userProfile', [authenticate], (req, res) => {
  res.json({ message: `Welcome ${req.user.username}` });
});


//home page route 
router.get('/', [isPermission, authenticate], getAllArticles)


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