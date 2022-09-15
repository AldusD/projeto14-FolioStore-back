import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './db/db.js';
import STATUS from './enums/status.js';
import productsRouter from './routes/products.route.js';
import COLLECTIONS from './enums/collections.js';

dotenv.config();

const app = express();
app.use(json(), cors());

app.use(productsRouter);

app.listen(process.env.PORT, () => {
    console.log("Chess happens on", process.env.PORT);
})