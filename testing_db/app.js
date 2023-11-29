const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDB } = require('./db')

//init app and midleware
const app = express()
app.use(express.json())

//db connection
let db

connectToDb((err) => {
    if(!err){
        app.listen(3000, () => {
            console.log("Listening on port 3000")
        })
    }
    db = getDB()

})


//routes

//All Documents
app.get('/books', (req, res) => {
    let books = []

    db.collection('books')
    .find()
    .sort({author: 1})
    .forEach(book => books.push(book))
    .then(() => {
        res.status(200).json(books)
    })
    .catch(() => {
        res.status(500).json({error: "Could not fetch the documents."})
    })
})

//Get One Document By ID
app.get("/books/:id", (req, res) => {

    if (ObjectId.isValid(req.params.id)){
        db.collection('books')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({error: "Could not Find Document"})
        })
    }else {
        res.status(500).json({error: "Not a Valid ID"})
    }
    
   
})

//POST Requests 
app.post('/books', (req, res) => {
    const book = req.body

    db.collection('books')
    .insertOne(book)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({err: "Could not create a new Document"})
    })
})

app.delete('/books/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)){
        db.collection('books')
        .deleteOne({_id: new ObjectId(req.params.id)})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({error: "Could Not Delete Document"})
        })
    }else {
        res.status(500).json({error: "Not a Valid ID"})
    }

})

app.patch('/books/:id', (req, res) => {
    const updates = req.body

    if (ObjectId.isValid(req.params.id)){
        db.collection('books')
        .updateOne({_id: new ObjectId(req.params.id)}, {$set: {updates}})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json({error: "Could Update Document"})
        })
    }else {
        res.status(500).json({error: "Not a Valid ID"})
    }


})