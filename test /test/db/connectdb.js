import  mongoose from 'mongoose'

//try and catch method 
// const connectDB=(DATABASE_URL)=>{
//     return mongoose.connect(DATABASE_URL)
//     .then(()=>{
//         console.log("Connected Successfully...")
//     }).catch((error)=>{
//         console.log("Connection unsuccessful due to : ",error)
//     })
// }


// async method 
const connectDB= async (DATABASE_URL)=>{

    try {
        const DB_OPTIONS={
            // database will be cerated if not cerated 
            dbName:'test_abb',
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS)
        console.log("Connected Successfully...")
    } catch (error) {
        console.log("Connection unsuccessful due to : ",error)
    }
   
}

export default connectDB