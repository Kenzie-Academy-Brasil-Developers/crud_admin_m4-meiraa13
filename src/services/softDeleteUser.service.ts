import { QueryConfig } from "pg"
import { client } from "../database"

const softDeleteUserService = async (userId:number) =>{
    const queryString: string = `
        UPDATE 
            users 
        SET active = FALSE
        WHERE
            id = $1
        RETURNING *;
    `
    const queryConfig: QueryConfig = {
        text:queryString,
        values:[userId]
    }

    return await client.query(queryConfig)
}

export { softDeleteUserService }