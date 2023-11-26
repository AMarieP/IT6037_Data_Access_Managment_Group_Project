import mongoose from "mongoose";

//URI - Should be stored in env file lol 
const uri = "mongodb+srv://20220756:20220756abb@admirablebluebeatles.ha32r6f.mongodb.net/?retryWrites=true&w=majority";

//function opens connection with mongoose 
export default function connectDB(cb) {
 
  try {
    mongoose.connect(uri, {
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${uri}`);
    return cb()
  });
 
  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
    return cb(err)

  });
  return;
}
