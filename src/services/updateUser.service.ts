import format from "pg-format";
import { TUserResponse, TUserUpdate } from "../interfaces/users.interfaces";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { userResponseSchema } from "../schemas/users.schema";

const updateUserService = async (userId:number, userData:TUserUpdate):Promise<TUserResponse> =>{
    const queryString: string = format(
        `
            UPDATE 
                users
            SET(%I) = ROW(%L)
            WHERE
                id = $1
            RETURNING
                *
        `,
        Object.keys(userData),
        Object.values(userData)
    )

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [userId],
    }

    const queryResult: QueryResult<TUserResponse> = await client.query(queryConfig)

    const updatedUser = userResponseSchema.parse(queryResult.rows[0])

    return updatedUser
}

export { updateUserService }