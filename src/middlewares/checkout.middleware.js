import { ObjectId } from "mongodb";
import db from "../db/db.js";
import COLLECTIONS from "../enums/collections.js";
import STATUS from "../enums/status.js";

const verifyUser = async (req, res, next) => {
    const products = req.body.products;
    if(products?.length === 0 || typeof(products) !== 'object' || products === undefined) return res.sendStatus(STATUS.UNPROCESSABLE_ENTITY);
    // user ID and token
    const token = req.headers.authorization?.replace('Bearer ', '');
    const id = req.params.USER_ID;

    try {
        // checking if the token is valid (exist and correspond to the user)
        const session = await db.collection(COLLECTIONS.SESSIONS).findOne({ token });
        if(!session) return res.status(STATUS.UNAUTHORIZED).send("Desconnected.");

        console.log(id, session.userId)
        const validconnection = session.userId.equals(id);
        if(!validconnection) return res.status(STATUS.UNAUTHORIZED).send("Desconnected.");
    } catch (error) {
        console.log(error);
        return res.sendStatus(STATUS.SERVER_ERROR);
    }

    res.locals.id = id;
    next();
}

export { verifyUser };