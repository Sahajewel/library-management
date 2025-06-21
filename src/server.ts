import { Server } from 'http';
import dotenv from "dotenv";
dotenv.config();
import app from './app';
import mongoose from 'mongoose';
const port = process.env.PORT || 5000;
let server: Server;
async function main(){
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DATABASEUSER}:${process.env.DATABASEPASSWORD}@cluster0.r7awt.mongodb.net/booksDB?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Connected to mongodb using Mongoose")
        server = app.listen(port, ()=>{
            console.log(`App is running is port: ${port}`)
        })
    }catch(error){
        console.error(error)
    }
};
main();