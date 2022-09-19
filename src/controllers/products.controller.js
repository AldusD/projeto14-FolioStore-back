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

const getProducts = async (req, res) => {
    try {
        const categories = await db.collection(COLLECTIONS.CATEGORIES).find().toArray()
        const products = await db.collection(COLLECTIONS.PRODUCTS).find().toArray()

        const filteredProducts = categories.map(({_id, category}) => ({
                category,
                products: products.filter((product) => product.category === _id.toString())
            })
        )

        res.send(filteredProducts);

    } catch (error) {
        res.status(STATUS.SERVER_ERROR).send(error);
    }
}

// DEV
const setProduct = async (req, res) => {
    try {
        db.collection(COLLECTIONS.PRODUCTS).insertOne(req.body)
        res.send()
        
    } catch (error) {
        res.status(STATUS.SERVER_ERROR).send(error);
    }
}

export { getProducts, setProduct, getProductById };
