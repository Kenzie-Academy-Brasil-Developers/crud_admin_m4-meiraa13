import { Router } from "express";
import { createUsersController, listUsersController, recoverUserController, softDeleteUserController, updateUserController } from "../controllers/users.controllers";
import { ensureEmailNotExistsMiddleware } from "../middlewares/ensureEmailNotExists.middleware";
import { ensureBodySchema } from "../middlewares/ensureBodySchema.middlewares";
import { userRequestSchema, userUpdateSchema } from "../schemas/users.schema";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";

const userRoutes:Router = Router()

userRoutes.post('',ensureBodySchema(userRequestSchema) , ensureEmailNotExistsMiddleware ,createUsersController)
userRoutes.get('', listUsersController)
userRoutes.patch('/:id' , ensureBodySchema(userUpdateSchema),ensureUserExistsMiddleware ,updateUserController)
userRoutes.delete('/:id',ensureUserExistsMiddleware, softDeleteUserController)
userRoutes.put('/:id/recover',ensureUserExistsMiddleware, recoverUserController)


export { userRoutes }