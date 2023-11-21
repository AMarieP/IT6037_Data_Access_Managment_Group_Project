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

//connecting directly mongodb atlas database to nodejs without using mongodb compass or local server 
// const { MongoClient, ServerApiVersion } = require('mongodb');
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://20220756:20220756abb@admirablebluebeatles.ha32r6f.mongodb.net/?retryWrites=true&w=majority";

const connectAtlasDB= async (DATABASE_URI)=>{
    try {
        const client = new MongoClient(DATABASE_URI, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          });
          async function run() {
            try {
              // Connect the client to the server	(optional starting in v4.7)
              await client.connect();
              // Send a ping to confirm a successful connection
              await client.db("abb_db").command({ ping: 1 });
              console.log("Pinged your deployment. You successfully connected to MongoDB!");
            } finally {
              // Ensures that the client will close when you finish/error
              await client.close();
            }
          }
          run().catch(console.dir);
    } catch (error) {
        console.log("Error while connecting mongodb Atlas database :",error)
    }
}

export  {connectDB,connectAtlasDB}




// Create a MongoClient with a MongoClientOptions object to set the Stable API version



