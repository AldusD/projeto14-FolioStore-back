import { ObjectId } from 'mongodb';
import db from "../db/db.js";
import COLLECTIONS from '../enums/collections.js';
import STATUS from '../enums/status.js';

const checkout = async (req, res) => {
    const userId = res.locals.id;
    const products = res.body.products;
        try {
            const order = await db.collection(COLLECTIONS.ORDERS).insertOne({ userId, products })
            console.log(order);
            return res.sendStatus(STATUS.CREATED);
        } catch (error) {
            console.log(error);
            return res.sendStatus(STATUS.SERVER_ERROR);
        }
}

export { checkout };