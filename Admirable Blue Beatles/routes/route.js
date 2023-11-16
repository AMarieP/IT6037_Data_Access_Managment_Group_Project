
import express from 'express'

const router = express.Router()

import { showAllData ,homePage} from '../controller/allDataController.js'



router.get("/allData",showAllData)
router.get("/",homePage)

export default router