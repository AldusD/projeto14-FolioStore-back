import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt"
import db from "../db/db.js";
import COLLECTIONS from "../enums/collections.js";
import STATUS from "../enums/status.js";


const signIn = (req, res) => {
    const { email } = req.body
    const { user } = res.locals

    try {
        const token = uuid()
        db.collection(COLLECTIONS.SESSIONS).insertOne({ name: user.name, email, token, timestamp: Date.now() })
        
        res.send({ token })

    } catch (error) {
        res.status(STATUS.SERVER_ERROR).send(error)
    }
}


const signUp = (req, res) => {
    const { name, email, password } = req.body
    
    try {
        const hash = bcrypt.hashSync(password, 10)
        db.collection(COLLECTIONS.USERS).insertOne({ name, email, hash })

        res.sendStatus(STATUS.CREATED)

    } catch (error) {
        res.status(STATUS.SERVER_ERROR).send(error)
    }
}

export { signIn, signUp }