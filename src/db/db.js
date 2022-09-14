import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const { MONGOURI, MONGO_USER, MONGO_PASSWORD } =  process.env;
const client = new MongoClient(MONGOURI, { auth: { username: MONGO_USER, password: MONGO_PASSWORD } });

try {
    await client.connect();
    console.log("Database on!");
} catch (error) {
    console.log(error);
}

const db = client.db("folio-store-db");
export default db;