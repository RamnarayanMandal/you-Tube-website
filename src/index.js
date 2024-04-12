import mongoose from "mongoose";
import dotenv from 'dotenv';
import connectDB from './db/index.js';
import {app} from './app.js'

dotenv.config({
    path: './.env' 
});

const port=process.env.PORT||8080;


connectDB().then(()=>{
    
    app.on('error',(error)=>{
        console.log("Error in server: "+error);
        throw error;
    })

    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)

    })

})
.then((error)=>{
    console.log("MongoDB Connection failed !!! " + error);
});
