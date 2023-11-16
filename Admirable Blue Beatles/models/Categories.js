import mongoose from 'mongoose'

const categorySchema = mongoose.Schema({
    _id:Number,
    name:{type:String,require:true, trim:true}

})

//Compiling Schema collection will be cerated by the name of 
const categoryModel=mongoose.model('category',categorySchema)


const createMultipleCategory=async()=>{
    try {
        const cat1=new categoryModel({
            _id:1,
            name:"Art",
        })
        const cat2=new categoryModel({
            _id:2,
            name:"Mathematics",
        })
        const cat3=new categoryModel({
            _id:3,
            name:"Technology",
        })
       const result=await categoryModel.insertMany([cat1,cat2,cat3])
       console.log("created new categories :", result)
        
    } catch (error) {
        console.log("error while creating new categories :",error)
    }
}


export {createMultipleCategory}