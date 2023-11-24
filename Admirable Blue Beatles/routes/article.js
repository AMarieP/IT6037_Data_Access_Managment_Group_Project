import express from 'express'
const router = express.Router()
import  Subject  from '../models/schema.js'
import mongoose from 'mongoose';


import { newArticle } from '../utils/crudOperations.js'
import db from '../app.js'
import { listCollections } from '../utils/crudOperations.js'

//Get All Articles
router.get('/', async (req, res) => {
    try{
        const articles = await db.listCollections().toArray();
        res.json(articles)

    } catch(err){
        res.status(500).json({messge: err.message})

    }
})

//Get One Article
router.get('/:id', (req, res) => {

})

//Create 
router.post('/e', (req, res) => {

})

//Update
router.patch('/:id', (req, res) => {

})

//Delete
router.delete('/:id', (req, res) => {

})

// router.post('/createArticle', (req, res) => {
    
//     let articles = newArticle

//     SubjectModel.create(articles).then(function(articles){
//         res.send(articles)
//     })

    
// })

// router.get('/test', (req, res) => {
//     let articles = []

//     db.collection('Art')
//     .find()
//     .forEach(article => articles.push(article))
//     .then(() => {
//         res.status(200).json(articles)
//     })
//     .catch(() => {
//         res.status(500).json({error: 'Cannot Fetch Articles'})
//     })
// })

export default router;
