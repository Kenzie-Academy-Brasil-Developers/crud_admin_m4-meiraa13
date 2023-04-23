import { QueryConfig, QueryResult } from "pg"
import { client } from "../database"
import { TUserResponse } from "../interfaces/users.interfaces"
import { userResponseSchema } from "../schemas/users.schema"


const listUserByProfileService = async (id:number):Promise<TUserResponse> =>{

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

    const queryResult:QueryResult<TUserResponse> = await client.query(queryConfig)
    const user = userResponseSchema.parse(queryResult.rows[0])
    return user
}

export { listUserByProfileService }