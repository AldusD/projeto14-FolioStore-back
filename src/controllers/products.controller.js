import db from "../db/db.js";
import COLLECTIONS from '../enums/collections.js';
import STATUS from '../enums/status.js';


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

export { getProducts, setProduct };