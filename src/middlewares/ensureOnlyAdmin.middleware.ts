import { NextFunction, Request, Response } from "express"
import { AppError } from "../error"


const ensureOnlyAdmin = (req:Request, res:Response, next:NextFunction) =>{
    const admin = res.locals.token.admin
   

    if(admin === false){
        throw new AppError('Insufficient Permission', 403)
    }

    next()
}

export { ensureOnlyAdmin }