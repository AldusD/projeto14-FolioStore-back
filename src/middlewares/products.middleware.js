import { ObjectId } from "mongodb";
import db from "../db/db.js";
import COLLECTIONS from "../enums/collections.js";
import STATUS from "../enums/status.js";

const verifyProduct = async (req, res, next) => {
    const id = req.params.PRODUCT_ID;
    
    try {
        const product = await db.collection(COLLECTIONS.PRODUCTS).findOne({ _id: new ObjectId(id) });
        if(!product) res.sendStatus(STATUS.NOT_FOUND);
        res.locals.product = { ...product };
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS.SERVER_ERROR);
    }
    next();
}

export { verifyProduct };