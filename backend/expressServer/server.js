import cors from 'cors'
import { configDotenv } from 'dotenv';
import app from "./src/app.js";

app.use(cors())
const PORT = process.env.PORT||5000

app.get('/',(req,res)=>{
    res.json({message:"backend gateway is rolling"})
})

app.listen(PORT,()=>{
    console.log(`express app is rolling on http://localhost:${PORT}`)
})