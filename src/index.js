import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db/db.js';
import STATUS from './enums/status.js';
import authRouter from './routes/auth.routes.js'
import productsRouter from './routes/products.routes.js'
dotenv.config();

const app = express();
app.use(json(), cors());
app.use(authRouter, productsRouter)

app.listen(process.env.PORT || 5000, () => {
    console.log("Chess happens on", process.env.PORT);
})