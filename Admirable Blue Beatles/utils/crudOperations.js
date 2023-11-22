import { SubjectModel } from "../models/schema.js";
import { sampleData } from "./createSampleData.js";

//The 'name' for Category name is a poorly named variable - catName is more suitable or category. 


//Variables
const newArticle = {
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

const updatedArticle = {
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

//Check if value exists in Array, returns bool
const doesExist = (myArray, checkValue) => {
  return myArray.some((myArray) => myArray.name === checkValue)
}

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
    const collections = await listCollections(client)
    
    //if collection not exists then create collection 
    if (!doesExist(collections, collectionName)){
        await client.db("abb_db").createCollection(collectionName)
        console.log(`New collection created by the name of ${collectionName}`)
    }
    // then insert article 
    const result = await client.db("abb_db").collection(collectionName).insertMany(subject.articles)
    console.log(`inserted sample data into ${collectionName} collection :`, result)
  }

};

//Add Article to DB 
const addArticle = async (client, newArticle) => {
    
    const collectionName = newArticle.name
    const collections = await listCollections(client)

    //check if collection exists abd if not create the collection
    if (!doesExist(collections, collectionName)){
        await client.db("abb_db").createCollection(collectionName)
        console.log(`New collection created by the name of ${collectionName}`)
    }
    // then insert article 
    const result = await client.db("abb_db").collection(collectionName).insertMany(newListing.articles)

    //Logs showing inserted data
    console.log(`inserted sample data into ${collectionName} collection  :`, result)
    console.log(`New Listing created with following ID :${result.insertedId} `);
};

//Search Queries

//Find all Articles by Category
const findArticleByCategoryName = async (client, categoryName)=>{

  const collections = await listCollections(client)

  //Checks if the category exists
  //if it does not exists console.log an error message, else return the search
    if (!doesExist(collections, categoryName)){

        console.log(`Category not found by the name of ${categoryName}`)

    }else{
        const result = await client.db('abb_db').collection(categoryName)
        console.log(`All Articles under ${categoryName} category: ${result}`)
    }
};

//Find Article by Title
const findArticleByTitle = async (client, titleName) => {
    const listCollections = await client.db("abb_db").listCollections().toArray()

    const collections = await listCollections(client)

    // console.log(listCollections)  
    for(const collection in collections){
        console.log("collection :", collections[collection].name)
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

//Update an Article using Article's title
const updateOneArticleByTitle = async (client, title, updatedArticle) => {
    
    const collectionName = updatedArticle.name
    const collections = await listCollections(client)
    
    //if collection not exits then create collection 
    if (!doesExist(collections, collectionName)){
        await client.db("abb_db").createCollection(collectionName)
        console.log(`New collection created by the name of ${collectionName}`)
    }
    // then insert article 
    // const result = await client.db("abb_db").collection(collectionName).insertMany(newListing.articles)
    console.log(`Update Article into ${collectionName} collection :`)
    // console.log(result)

    // console.log(`upadte Articel with following ID :${result.insertedId} `);
};

export {newArticle, updatedArticle, listDatabases, listCollections, loadSampleData, addArticle, findArticleByCategoryName, findArticleByTitle, updateOneArticleByTitle };
