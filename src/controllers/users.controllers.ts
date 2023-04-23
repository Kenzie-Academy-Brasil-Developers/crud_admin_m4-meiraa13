import { Request, Response } from "express";
import { createUsersService } from "../services/createUsers.service";
import { TUserRequest, TUserResponse, TUserUpdate } from "../interfaces/users.interfaces";
import { listUsersService } from "../services/listUsers.service";
import { updateUserService } from "../services/updateUser.service";
import { softDeleteUserService } from "../services/softDeleteUser.service";
import { recoverUserService } from "../services/recoverUser.service";
import { listUserByProfileService } from "../services/listUserByProfile.service";

const createUsersController = async (req:Request, res:Response):Promise<Response> =>{
    const userData:TUserRequest = req.body

    const newUser:TUserResponse = await createUsersService(userData)

    return res.status(201).json(newUser)
}

const listUsersController =async (req:Request, res:Response):Promise<Response> => {
    
    const users = await listUsersService()

    return res.json(users)

}

const updateUserController = async (req:Request, res:Response):Promise<Response> =>{
    const userId:number = Number(req.params.id)
    const userData:TUserUpdate = req.body

    const updatedUser = await updateUserService(userId, userData)

    return res.json(updatedUser)
}

const softDeleteUserController =async (req:Request, res:Response) => {
    const userId:number = Number(req.params.id)

    await softDeleteUserService(userId)

    return res.status(204).send()
}

const recoverUserController =async (req:Request, res:Response):Promise<Response> => {
    const userId:number = Number(req.params.id)

    const recoveredUser = await recoverUserService(userId)

    return res.json(recoveredUser)

}

const listUserByProfile = async(req:Request, res:Response) =>{
    const id = res.locals.token.id

    const user = await listUserByProfileService(id)

    return res.json(user)
}



export { createUsersController, listUsersController, updateUserController, softDeleteUserController, recoverUserController, listUserByProfile }