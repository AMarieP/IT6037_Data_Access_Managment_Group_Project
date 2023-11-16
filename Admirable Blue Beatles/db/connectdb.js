import  mongoose from 'mongoose'



// async method 
const connectDB= async (DATABASE_URL)=>{

    try {
        const DB_OPTIONS={
            // database will be cerated if not cerated 
            dbName:'abb_db',
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS)
        console.log("Connected Successfully...")
    } catch (error) {
        console.log("Connection unsuccessful due to error: ",error)
    }
   
}

export default connectDB