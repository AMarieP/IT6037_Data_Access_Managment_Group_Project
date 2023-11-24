
import express from 'express'
import { showAllData ,homePage} from '../controller/allDataController.js'

const router = express.Router()

router.get("/allData", showAllData)
router.get("/", homePage)

export default router