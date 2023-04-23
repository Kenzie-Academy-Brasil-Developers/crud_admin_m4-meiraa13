import { QueryConfig, QueryResult } from "pg";
import { TLoginRequest } from "../interfaces/session.interfaces";
import { client } from "../database";
import "dotenv/config"
import { AppError } from "../error";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { TUser } from "../interfaces/users.interfaces";

const createSessionService =async (data:TLoginRequest) => {
    
    const queryString:string = 'SELECT * FROM users WHERE email = $1'

    const queryConfig:QueryConfig = {
        text:queryString,
        values:[data.email]
    }

    const queryResult:QueryResult = await client.query(queryConfig)
    const user: TUser = queryResult.rows[0]

    if(queryResult.rowCount === 0 ){
        throw new AppError('Wrong email/password', 401)
    }

    if(user.active === false){
        throw new AppError('Wrong email/password', 401)
    }

    const comparePassword: boolean = await compare(data.password, user.password)

    if(!comparePassword){
        throw new AppError('Wrong email/password', 401)
    }

    const token: string = sign(
    {
        admin:user.admin
    },
    String(process.env.SECRET_KEY),
    {
        subject:String(user.id),
        expiresIn:String(process.env.EXPIRES_IN)
    })

    return { token }

}

export { createSessionService }