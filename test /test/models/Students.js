import mongoose from 'mongoose'

const studentSchema=new mongoose.Schema({
    _id:Number,
    name:{type:String,require:true, trim:true},
    age:{type:Number, min:18, max:50},
    fees:{type:mongoose.Decimal128, required:true,validate:(v)=>{v>=5500.50}},
    hobbies:{type:Array},
    isactive:{type:Boolean},
    comments:[{value:{type:String},publish:{type:Date,default:Date.now}}   ],
    join:{type:Date,default:Date.now}
}) 

//compiling Schema collection wil be created by the name of students, 
const studentModel=mongoose.model('student',studentSchema)



//create new document/data 

const createMultiDocStudent =async()=>{
    try {
        const StudentDoc1= new studentModel({
            _id:1,
            name:'vijendra',
            age:40,
            fees:6500.00,
            hobbies:['reding','movie'],
            isactive:true,
            comments:[{value:'comments here'}],
            
        })
        const StudentDoc2= new studentModel({
            _id:2,
            name:'james',
            age:19,
            fees:6000.00,
            hobbies:['reding','movie'],
            isactive:true,
            comments:[{value:'comments here 2'}],
            
        })
        
        //saving doc
        const result =await studentModel.insertMany([StudentDoc1,StudentDoc2])
        console.log("create multiple data:",result)
        
    } catch (error) {
        console.log("error while creating new student data :",error)
        
    }
}

 


//getAllDoc

//this is not the correct method , not fetching data for webpage 
// const getAllDoc= async ()=>{
//     const result =await studentModel.find()
//     console.log("Get All data :",result)
// }

async function getAllDoc() {
    try {
      const result = await studentModel.find(); // Replace YourModel with your actual Mongoose model
      return result;
    } catch (error) {
      console.error("Error fetching documents:", error);
      throw error; // Re-throw the error to propagate it to the calling code
    }
  }

export { getAllDoc,createMultiDocStudent }