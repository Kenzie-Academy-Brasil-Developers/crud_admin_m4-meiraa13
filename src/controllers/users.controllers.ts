import { Request, Response } from "express";
import { createUsersService } from "../services/createUsers.service";
import { TUserRequest, TUserResponse } from "../interfaces/users.interfaces";
import { listUsersService } from "../services/listUsers.service";

const createUsersController = async (req:Request, res:Response):Promise<Response> =>{
    const userData:TUserRequest = req.body

    const newUser:TUserResponse = await createUsersService(userData)

    return res.status(201).json(newUser)
}

const listUsersController =async (req:Request, res:Response):Promise<Response> => {
    
    const users = await listUsersService()

    return res.json(users)

}



export { createUsersController, listUsersController }