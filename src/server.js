import dotenv from "dotenv"
import { app } from "./app.js"
import { connectDB } from "./config/mongoDB.js";

dotenv.config({
    path: "./.env"
})



const PORT = process.env.PORT || 5000;
console.log(`Server is Running on PORT : ${PORT}`)


connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is Running on PORT : ${PORT}`)
        })
    })
    .catch((error) => {
        console.log("Failed To Connect to Database: ",error)
    })
