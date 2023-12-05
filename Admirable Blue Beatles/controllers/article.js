import express from "express";
import mongoose from "mongoose";
import { Article } from "../models/schema.js";

// router.get("/article", [isPermission], getAllArticles);
const getAllArticles = async(req, res) => {
      try {
        const document = await Article.find({});
        console.log("document:", document);
        res.status(200).render('index', { name:"Admirable Blue Beatles",articleList: document, user: req.session.user  });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}
// router.get("/articles/search/:title", [isPermission], getArticlesByTitle);
const getArticlesByTitle = async(req, res) => {
    try{
        const documents = await Article.find({ 'article.name': req.params.title });
    
        console.log(documents)
        res.status(200).send(documents);
      }catch(error) {
        console.log(error)
        res.status(500).send({error})
      }
}


//Must have req params :subjectname
const getArticlesBySubject = async(req, res) => { 
    try {
        const document = await Article.find({name: req.params.subjectName});
         res.status(200).send(document);
       } catch (error) {
           console.log(error)
         res.status(500).send({ error });
       }
}

//Must have req params :id
const getArticleById = async(req, res) => {
    try {
        const document = await Article.findOne({ _id: req.params.id});
        console.log(document)
         res.status(200).send(document);
       } catch (error) {
           console.log(error)
         res.status(500).send({ error });
       }
}

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
const updateArticle = async(req, res) => {
    const updates = req.body
  
    try{
      const document = await Article.findByIdAndUpdate(
        req.params.id,
        updates,
        { new: true, runValidators: true }
      )
     
      await document.save(); // Wait for the save operation to complete
      res.status(200).send(document)
    
    } catch (error){
      res.status(500).send({error});
    }
}

//Must have req params :id
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