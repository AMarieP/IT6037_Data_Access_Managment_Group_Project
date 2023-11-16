import { getAllData } from "../models/schema.js"

const showAllData=async (req,res)=>{
    // res.send("all data ")
    try {
        const result =await getAllData()
        console.log("get all data in hone page :",result)
        res.send({result})
    } catch (error) {
        console.log("Error fetching all data :",error)
        res.status(500).json({message:"internal server error while fetching all data  "})
    }
}
const homePage=(req,res)=>{
    res.send("Home Page")
}
export {showAllData,homePage}