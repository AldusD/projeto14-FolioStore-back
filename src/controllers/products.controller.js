import db from "../db/db.js";
import COLLECTIONS from '../enums/collections.js';
import STATUS from '../enums/status.js';

// PLACEHOLDER
// { title, from, price, description, img, category }
const getProducts = async (req, res) => {
    try {
        const categories = await db.collection(COLLECTIONS.CATEGORIES).find().toArray()
        const products = categories.map(({ category }) => ({
            category,
            products: []
        }))

        res.send(products);

    } catch (error) {
        res.status(STATUS.SERVER_ERROR).send(error);
    }
}

const setProduct = async (req, res) => {
    try {
        db.collection(COLLECTIONS.PRODUCTS).insertOne(req.body)
        res.send()
        
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).send(error);
    }
}

export { getProducts, setProduct };