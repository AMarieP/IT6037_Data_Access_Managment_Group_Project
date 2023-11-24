import express from 'express'
import { newArticle } from '../utils/crudOperations.js'
import  SubjectModel  from '../models/schema.js'
const router = express()


router.post('/createArticle', (req, res) => {
    
    let articles = newArticle

    SubjectModel.create(articles).then(function(userdata){
        res.send(userdata)
    })

    
})

router.get('/test', (req, res) => {
    res.send("test")
})

export default router;
