import { Request, Response } from "express";
import { TLoginRequest } from "../interfaces/session.interfaces";
import { createSessionService } from "../services/createSession.service";


const createSessionController = async (req:Request, res:Response):Promise<Response> =>{
    const data:TLoginRequest = req.body

    const token = await createSessionService(data)

    return res.json(token)

}

export { createSessionController }