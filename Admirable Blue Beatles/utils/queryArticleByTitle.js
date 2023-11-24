import SubjectModel from "../models/schema.js";

//Find Article by Title
const findArticleByTitle = async (client, titleName) => {

    const collections = await listCollections(client)
    for(const collection in collections){
        console.log("collection :", collections[collection].name)
        // getting only one item 
        const cursor = await client.db("abb_db").collection(collections[collection].name).find({name : titleName})
        if (cursor){
            const result = await cursor.toArray()
            console.log("Article found :", result)

        }else{
            console.log("No article found by the name of ", titleName)
        }   
    }
}

export default findArticleByTitle;