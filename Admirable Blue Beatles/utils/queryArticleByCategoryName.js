import SubjectModel from "../models/schema.js";

//Find all Articles by Category
const findArticleByCategoryName = async (client, categoryName)=>{

    const collections = await listCollections(client)
  
    //Checks if the category exists
    //if it does not exists console.log an error message, else return the search
      if (!doesExist(collections, categoryName)){
  
          console.log(`No Subject by ${categoryName} was found.`)
  
      }else{
          const result = await client.db('abb_db').collection(categoryName)
          console.log(`All Articles under ${categoryName} category: ${result}`)
      }
  };

  export default findArticleByCategoryName;