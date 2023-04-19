import { Router } from "express";
import { createUsersController, listUsersController } from "../controllers/users.controllers";
import { ensureEmailNotExistsMiddleware } from "../middlewares/ensureEmailNotExists.middleware";

const userRoutes:Router = Router()

userRoutes.post('', ensureEmailNotExistsMiddleware ,createUsersController)
userRoutes.get('', listUsersController)


export { userRoutes }