import express from "express";
import { Article } from "../models/schema.js";

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
        const documents = await Article.find({articles: { name: req.params.title }});
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
         res.send(document);
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
         res.send(document);
       } catch (error) {
           console.log(error)
         res.status(500).send({ error });
       }
}

const newArticle = async(req, res) => {
    const document = new Article(req.body);
    try {
      await document.save();
      res.send(document);
    } catch (error) {
      res.status(500).send(error);
    }
}

//Must have req params :id
const updateArticle = async(req, res) => {
    const updates = new Article(req.body)
  
    try{
      const document = await Article.findByIdAndUpdate(
        req.params.id,
        req.body
      ).then(
        document.save(),
        res.send(article)
      );
    } catch (error){
      res.status(500).send({error});
    }
}

//Must have req params :id
const deleteArticle = async(req, res) => {
    try{
        const document = await Article.findByIdAndDelete(req.params.id);
        if(!document) {
          return res.status(404).send("Document not found.")
        }
        res.status(404).send();
      }catch (error) {
        res.status(500).send({error});
      }
}

export { getAllArticles, getArticleById, getArticlesBySubject, getArticlesByTitle, newArticle, updateArticle, deleteArticle }