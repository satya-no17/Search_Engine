import dotenv from 'dotenv';
import { MongoClient } from "mongodb";

dotenv.config()
const MONGO_URI = process.env.MONGO_URI

const client = new MongoClient(MONGO_URI)
let db, collection


export async function connectDB() {
    try {
        await client.connect()
        db = client.db('search_engine')
        collection  = db.collection('documents')
        console.log('db connected')
    } catch (err) {
        console.error('error connecting DB ',err)
        process.exit(1);
    }
}

export function getCollection(){
    if(!collection){
        throw new Error ('unable to get collection the db connection failed')
    }
    return collection
}
