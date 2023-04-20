import { QueryConfig, QueryResult } from "pg"
import { client } from "../database"
import { TUserResponse } from "../interfaces/users.interfaces"
import { userResponseSchema } from "../schemas/users.schema"

const recoverUserService = async (userId:number):Promise<TUserResponse> =>{
     const queryString: string = `
        UPDATE 
            users 
        SET active = TRUE
        WHERE
            id = $1
        RETURNING *;
    `
    const queryConfig: QueryConfig = {
        text:queryString,
        values:[userId]
    }

    const queryResult:QueryResult<TUserResponse> = await client.query(queryConfig)

    const recoveredUser = userResponseSchema.parse(queryResult.rows[0])

    return recoveredUser
}

export { recoverUserService }