import { SubjectModel } from "../models/schema.js";
import { sampleData } from "./createSampleData.js";

//Reused Funtions

//gives list of collections
// const listCollections = await client.db("abb_db").listCollections().toArray()



//List of all Databases
const listDatabases = async (client) => {
  const databaseList = await client.db().admin().listDatabases();
  console.log("List Database:");
  databaseList.databases.forEach((db) => {
    console.log(`-${db.name}`);
  });
};

//List of all collections
const listCollections = async (client) => {
  const collectionsList = await client.db("abb_db").listCollections().toArray();
  console.log("List Collections:", collectionsList);
  return collectionsList
};

//Loads Sample Data into the DB
const loadSampleData = async (client) => {
  console.log("show sample data :", sampleData);

  for (const subject of sampleData.subjects){
    const collectionName = subject.name
    listCollections()
    console.log("Collections :", listCollections)
    const collectionExists = listCollections.some((collection) => collection.name == collectionName)
    
    //if collection not exists then create collection 
    if (!collectionExists){
        await client.db("abb_db").createCollection(collectionName)
        console.log(`New collection created by the name of ${collectionName}`)
    }
    // then insert article 
    const result = await client.db("abb_db").collection(collectionName).insertMany(subject.articles)
    console.log(`inserted sample data into ${collectionName} collection :`, result)
  }

};

//Adds Article to DB 
const addArticle = async (client) => {
    const newListing = {
        name: "Art",
        articles: [
          {
            type: "Test",
            name: "Test name",
            born: "1840",
            died: "1926",
            nationality: "French",
            knownFor: "Painter",
            notableWork: "Water Lilies",
          },
        ],
      };
    
    const collectionName = newListing.name
    // console.log(collectionName)
    const listCollections = await client.db("abb_db").listCollections().toArray()
    // console.log("Collections :",listCollections)
    const collectionExits = listCollections.some((collection) => collection.name == collectionName)
    //if collection not exits then create collection 
    if (!collectionExits){
        await client.db("abb_db").createCollection(collectionName)
        console.log(`New collection created by the name of ${collectionName}`)
    }
    // then insert article 
    const result = await client.db("abb_db").collection(collectionName).insertMany(newListing.articles)
    console.log(`inserted sample data into ${collectionName} collection  :`, result)

    console.log(`New Listing created with following ID :${result.insertedId} `);
  // console.log(`New Listing created with following ID : ${result.insertedId} `)
};

const findArticleByCatName =async (client, catName)=>{
    const listCollections = await client.db("abb_db").listCollections().toArray()
    const collectionExits = listCollections.some((collection) => collection.name == catName)
    if (!collectionExits){
        console.log(`Category not found by the name of ${catName}`)

    }else{
        const result = await client.db('abb_db').collection(catName)
        console.log(`Search all article by category name ${catName} : ${result}`)
    }
};

//Find Article by Title
const findArticleByTitle = async (client, titleName) => {
    const listCollections = await client.db("abb_db").listCollections().toArray()
    // console.log(listCollections)  
    for(const collection in listCollections){
        console.log("collection :", listCollections[collection].name)
        // getting only one item 
        // const result =await client.db("abb_db").collection(listCollections[collection].name).findOne({name:titleName})
        const cursor = await client.db("abb_db").collection(listCollections[collection].name).find({name:titleName})
        if (cursor){
            const result = await cursor.toArray()
            console.log("Article found :", result)

        }else{
            console.log("No article found by the name of ", titleName)
        }   
    }
}

const updateOneArticleByTitleName = async (client, titleName) => {
    const updateListing = {
        name: "Art",
        articles: [
          {
            type: "Test",
            name: "Test name",
            born: "1840",
            died: "1926",
            nationality: "French",
            knownFor: "Painter",
            notableWork: "Water Lilies",
          },
        ],
      };
    
    const collectionName = updateListing.name
    // console.log(collectionName)

    const collections = await listCollections(client)
    console.log("Collections :", collections)

    const collectionExits = collections.some((collection) => collection.name == collectionName)
    //if collection not exits then create collection 
    if (!collectionExits){
        await client.db("abb_db").createCollection(collectionName)
        console.log(`New collection created by the name of ${collectionName}`)
    }
    // then insert article 
    // const result =await client.db("abb_db").collection(collectionName).insertMany(newListing.articles)
    console.log(`Update Article into ${collectionName} collection :`)
    // console.log(result)

    // console.log(`upadte Articel with following ID :${result.insertedId} `);
};

export { listCollections, listDatabases, addArticle,updateOneArticleByTitleName, loadSampleData,findArticleByCatName,findArticleByTitle };
