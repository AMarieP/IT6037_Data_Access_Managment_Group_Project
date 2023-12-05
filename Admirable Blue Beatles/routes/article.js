import express from "express";
import { isPermission } from "../middlewears/permission.js";
import { getAllArticles, getArticleById, getArticlesBySubject, getArticlesByTitle, newArticle, updateArticle, deleteArticle } from "../controllers/article.js";
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

 
export default router;