import { ObjectId } from 'mongodb';
import db from "../db/db.js";
import COLLECTIONS from '../enums/collections.js';
import STATUS from '../enums/status.js';

const getProductById = async (req, res) => {
    const product = res.locals.product;
    
    try {
        console.log(product, res.locals.product)
        const categoryDb = await db.collection(COLLECTIONS.CATEGORIES).findOne({ _id: ObjectId(product.category) });
        const category = (categoryDb) ? categoryDb.title : 'uncategorized';
        return res.status(STATUS.OK).send({ ...product, category });
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS.SERVER_ERROR);
    }
}

export { getProductById };