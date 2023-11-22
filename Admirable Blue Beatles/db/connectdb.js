import mongoose from "mongoose";
import { listDatabases,addArticle,updateOneArticleByTitleName,loadSampleData,findArticleByCatName ,findArticleByTitle, listCollections} from "../utils/crudOperations.js";


// async method
const connectDB = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      // database will be cerated if not cerated
      dbName: "abb_db",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("Connected Successfully...");
  } catch (error) {
    console.log("Connection unsuccessful due to error: ", error);
  }
};

//connecting directly mongodb atlas database to nodejs without using mongodb compass or local server
// const { MongoClient, ServerApiVersion } = require('mongodb');
import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://20220756:20220756abb@admirablebluebeatles.ha32r6f.mongodb.net/?retryWrites=true&w=majority";

const connectAtlasDB = async ( DATABASE_URI) => {
  try {
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(DATABASE_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    async function run() {
      try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const databaseList = await client.db().admin().listDatabases();
        const abbDbExists = databaseList.databases.some(db => db.name === "abb_db");
  
        // If "abb_db" doesn't exist, create it
        if (!abbDbExists) {
          await client.db().admin().createDatabase("abb_db");
          console.log("Created database: abb_db");
        }
        // Send a ping to confirm a successful connection
        await client.db("abb_db").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        
        // Call the listDatabases function
        await listCollections(client);  

        //find article by category name 
        // await findArticleByCatName(client,"Art")
        // await findArticleByCatName(client,"Test")

        //find article by title name 
        // await findArticleByTitle(client,"Claude Monet")
        // await findArticleByTitle(client,"Test name")


        // create one article 
        // await addArticle(client)


        //Update Article
        await updateOneArticleByTitleName(client,"Test name")



        //update one Listing
        // await updateOnelisting(client)
        // create sample database load once and then stop
        // await loadSampleData(client)

        //create Listing 
      
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    run().catch(console.dir);

  
   
  } catch (error) {
    console.log("Error while connecting mongodb Atlas database :", error);
  }
};

export { connectDB, connectAtlasDB };
