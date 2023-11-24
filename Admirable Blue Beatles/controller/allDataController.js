import getAllData from "../utils/getAllData.js";

const showAllData = async (req, res)=>{
    try {
        const result = await getAllData()
        console.log("get all data in home page :", result)
        res.send({result})
    } catch (error) {
        console.log("Error fetching all data :", error)
        res.status(500).json({message:"internal server error while fetching all data  "})
    }
}

const homePage = (req,res)=>{
    res.send("Home Page")
}
export { showAllData, homePage }