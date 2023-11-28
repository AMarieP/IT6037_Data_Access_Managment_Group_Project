import express, { application } from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index', {name: "The Name", article: "document"})
})

export default router