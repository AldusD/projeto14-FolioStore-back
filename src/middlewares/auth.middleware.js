import bcrypt from "bcrypt"
import db from "../db/db.js"
import COLLECTIONS from "../enums/collections.js"
import STATUS from "../enums/status.js"
import userSchema from "../schemas/user.schema.js"


const signInMiddleware = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await db.collection(COLLECTIONS.USERS).findOne({ email })
        const isPasswordValid = await bcrypt.compare(password, user.hash)

        if (!user || !isPasswordValid){
            res.sendStatus(STATUS.UNAUTHORIZED)
            return
        }

        const isUserActive = await db.collection(COLLECTIONS.SESSIONS).findOne({ email })

        if (isUserActive){
            db.collection(COLLECTIONS.SESSIONS).deleteOne({ email })
        }

        res.locals.user = user
        next()
    
    } catch (error){
        res.status(STATUS.SERVER_ERROR).send(error)
    }
}


const signUpMiddleware = async (req, res, next) => {
    const { name, email, password } = req.body

    const isValidUser = userSchema.validate({ name, email, password }, { abortEarly: false })

    if (isValidUser.error){
        res.status(STATUS.BAD_REQUEST).send(isValidUser.error.details.map(detail => detail.message))
        return
    }
    
    try {
        const user = await db.collection(COLLECTIONS.USERS).findOne({ email })

        if (user){
            res.sendStatus(STATUS.BAD_REQUEST)
            return
        }

        next()

    } catch (error) {
        res.status(STATUS.SERVER_ERROR).send(error)
    }
}

export { signInMiddleware, signUpMiddleware }