import { Router } from "express";
import { createUsersController, listUserByProfile, listUsersController, recoverUserController, softDeleteUserController, updateUserController } from "../controllers/users.controllers";
import { ensureEmailNotExistsMiddleware } from "../middlewares/ensureEmailNotExists.middleware";
import { ensureBodySchema } from "../middlewares/ensureBodySchema.middlewares";
import { userRequestSchema, userUpdateSchema } from "../schemas/users.schema";
import { ensureUserExistsMiddleware } from "../middlewares/ensureUserExists.middleware";
import { ensureTokenValidMiddleware } from "../middlewares/ensureTokenValid.middleware";
import { ensureIsAdmin } from "../middlewares/ensureIsAdmin.middleware";
import { ensureOnlyAdmin } from "../middlewares/ensureOnlyAdmin.middleware";
import { ensureUserIsActiveMiddleware } from "../middlewares/ensureUserIsActive.middleware";

const userRoutes:Router = Router()

userRoutes.post('',ensureBodySchema(userRequestSchema) , ensureEmailNotExistsMiddleware ,createUsersController)
userRoutes.get('', ensureTokenValidMiddleware , ensureIsAdmin ,listUsersController)
userRoutes.get('/profile',ensureTokenValidMiddleware,listUserByProfile)
userRoutes.patch('/:id' ,ensureUserExistsMiddleware ,ensureBodySchema(userUpdateSchema) ,ensureTokenValidMiddleware ,ensureIsAdmin,updateUserController)
userRoutes.delete('/:id',ensureUserExistsMiddleware, ensureTokenValidMiddleware ,ensureIsAdmin ,softDeleteUserController)
userRoutes.put('/:id/recover',ensureUserExistsMiddleware, ensureTokenValidMiddleware ,ensureOnlyAdmin ,ensureUserIsActiveMiddleware,recoverUserController)


export { userRoutes }