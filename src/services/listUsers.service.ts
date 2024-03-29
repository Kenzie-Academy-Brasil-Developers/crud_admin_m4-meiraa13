import { QueryResult } from "pg"
import { client } from "../database"
import { TUserResponse } from "../interfaces/users.interfaces"

const listUsersService = async ():Promise<TUserResponse[]> =>{

    const queryString:string = `
        SELECT
            id, name, email, admin, active
        FROM 
            users
    `

    const queryResult:QueryResult<TUserResponse> = await client.query(queryString)

    return queryResult.rows

}

export { listUsersService }