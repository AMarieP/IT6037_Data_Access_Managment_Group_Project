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
router.patch("/article/:id/update", [teacherAdminPermission], newArticle)

//DELETE Delete Existing Document by ID
router.delete("/article/:id", [adminOnlyPermission], newArticle)

 
export default router;



// //GET All Documents in collection
// router.get("/article", async (req, res) => {
//   try {
//    const document = await Article.find({})
//    .then((document) => {
//     res.send(document),
//     res.render('index', {name: "The Name", article: document})
//    }
//    )
//   } catch (error) {
//       console.log(error)
//     res.status(500).send({ error });
//   }
// });

// //GET All Documents by Title
// router.get("/articles/search/:title", async (req, res) => {
// try{
//   const documents = await Article.find({articles: { name: req.title }});
//   res.send(documents);
// }catch(error) {
//   console.log(error)
//   res.status(500).send({error})
// }
// })

// //GET All Document in collection by Subject: Art param
// router.get("/articles/Art", async (req, res) => {
// try {
//  const document = await Article.find({name: 'Art'});
//   res.send(document);
// } catch (error) {
//     console.log(error)
//   res.status(500).send({ error });
// }
// });

// //GET All Document in collection by Subject: Technology param
// router.get("/articles/Technology", async (req, res) => {
// try {
//  const document = await Article.find({name: 'Technology'});
//   res.send(document);
// } catch (error) {
//     console.log(error)
//   res.status(500).send({ error });
// }
// });

// //GET All Document in collection by Subject: Mathematics param
// router.get("/articles/Mathematics", async (req, res) => {
// try {
//  const document = await Article.find({name: 'Mathematics'});
//   res.send(document);
// } catch (error) {
//     console.log(error)
//   res.status(500).send({ error });
// }
// });

// //GET Document by ID
// router.get("/article/:id", async (req, res) => {
//   try {
//    const document = await Article.findOne({ _id: req.params.id});
//     response.send(document);
//   } catch (error) {
//       console.log(error)
//     response.status(500).send({ error });
//   }
// });

// //POST Create New Document
// router.post("/article", async (req, res) => {
// const document = new Article(req.body);
// try {
//   await document.save();
//   res.send(document);
// } catch (error) {
//   res.status(500).send(error);
// }
// });

// //PATCH Update Existing Document by ID
// router.patch("/article/:id/update", async (req, res) => {
// const updates = new Article(req.body)

// try{
//   const document = await Article.findByIdAndUpdate(
//     req.params.id,
//     req.body
//   ).then(
//     document.save(),
//     res.send(article)
//   );
// } catch (error){
//   res.status(500).send({error});
// }

// })

// //DELETE Delete Existing Document by ID
// router.delete("/article/:id", async (req, res) => {

// try{
//   const document = await Article.findByIdAndDelete(req.params.id);
//   if(!document) {
//     return res.status(404).send("Document not found.")
//   }
//   res.status(404).send();
// }catch (error) {
//   res.status(500).send({error});
// }

// })
