import express from "express";
import { Article } from "../models/schema.js";

// router.get("/article", [isPermission], getAllArticles);
const getAllArticles = async(req, res) => {
    try {
        const document = await Article.find({})
        .then((document) => {
          
        //  res.status(200).render('index', {name: "The Name", article: document})})
         res.status(200).send(document)})
       } catch (error) {
           console.log(error)
         res.status(500).send({ error });
       }
}
// router.get("/articles/search/:title", [isPermission], getArticlesByTitle);
const getArticlesByTitle = async(req, res) => {
  console.log(req.params.title)
    try{
        // const documents = await Article.find({articles: { name: req.params.title }});
        const documents = await Article.find({ 'article.name': req.params.title });
    
        console.log(documents)
        res.status(200).send(documents);
      }catch(error) {
        console.log(error)
        res.status(500).send({error})
      }
}


//Must have req params :subjectname
// router.get("/articles/:subjectName", [isPermission], getArticlesBySubject);
const getArticlesBySubject = async(req, res) => { 
  console.log(req.params.subjectName)
    try {
        const document = await Article.find({name: req.params.subjectName});
         res.status(200).send(document);
       } catch (error) {
           console.log(error)
         res.status(500).send({ error });
       }
}

//Must have req params :id
// router.get("/article/:id", [isPermission], getArticleById);
const getArticleById = async(req, res) => {
  console.log(req.params.id)
    try {
        const document = await Article.findOne({ _id: req.params.id});
        console.log(document)
         res.status(200).send(document);
       } catch (error) {
           console.log(error)
         res.status(500).send({ error });
       }
}

// router.post("/article", [teacherAdminPermission], newArticle);
const newArticle = async(req, res) => {
    const document = new Article(req.body);
    try {
      await document.save();
      res.status(200).send(document);
    } catch (error) {
      res.status(500).send(error);
    }
}

//Must have req params :id
// router.patch("/article/update/:id", [teacherAdminPermission], updateArticle)
const updateArticle = async(req, res) => {
    const updates = req.body
    console.log("update :",updates)
  
    try{
      const document = await Article.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
      )
     
      await document.save(); // Wait for the save operation to complete
      console.log(document)
      res.status(200).send(document)
    
    } catch (error){
      res.status(500).send({error});
    }
}

//Must have req params :id
// router.delete("/article/delete/:id", [adminOnlyPermission], deleteArticle)
const deleteArticle = async(req, res) => {
    try{
        const document = await Article.findByIdAndDelete(req.params.id);
        console.log("Article need to be delete:",document)
        if(!document) {
          return res.status(404).send("Document not found.")
        }
        res.status(204).send(`Article Id ${req.params.id} deleted successfully !!!`); //204 means no content 
      }catch (error) {
        res.status(500).send({error});
      }
}

export { getAllArticles, getArticleById, getArticlesBySubject, getArticlesByTitle, newArticle, updateArticle, deleteArticle }