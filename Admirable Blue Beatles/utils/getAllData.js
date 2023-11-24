import mongoose from "mongoose";
import SubjectModel from "../models/schema.js";

async function getAllData(){
    try {
        const result = await SubjectModel.find()
        return result
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw error
    }
}

export default getAllData