import dotenv from "dotenv"

dotenv.config()

import mongoose from "mongoose"
import { DB_NAME } from '../constants.js'


const URI = `${process.env.MONGODB_URI}/${DB_NAME}`

const connectDB = async () => {
    try {
        console.log(URI);
        await mongoose.connect(`${URI}`);
        console.log("\nMongoDB Connected Successfully");
    } catch(error) {
        console.log("MongoDB Connection Error: ", error);
        process.exit(1);
    }
}

export{connectDB}