import e from "express";
import cors from 'cors'
import dotenv from 'dotenv';
import { MongoClient } from "mongodb";
import { connectDB } from "./src/config/db.js";

dotenv.config()

const app = e()


app.use(cors())
const PORT = process.env.PORT



app.get('/',(req,res)=>{
    res.json({message:"backend gateway is rolling"})
})

app.get('/query')

await connectDB()
app.listen(PORT,()=>{
    console.log(`express app is rolling on http://localhost:${PORT}`)
})

