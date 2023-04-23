import { NextFunction, Request, Response } from "express";
import { TLoginRequest } from "../interfaces/session.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { AppError } from "../error";


const ensureUserIsActiveMiddleware = async(req:Request, res:Response, next:NextFunction):Promise<Response | void> =>{
    const id: number = Number(req.params.id)

    const queryString: string = `
        SELECT
            *
        FROM
            users
        WHERE
            id = $1
    
    `
    const queryConfig:QueryConfig = {
        text:queryString,
        values:[id]
    }

    const queryResult:QueryResult = await client.query(queryConfig)
    const user = queryResult.rows[0]
    if(user.active){
        throw new AppError('User already active')
    }

    next()
}

export { ensureUserIsActiveMiddleware }