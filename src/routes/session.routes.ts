import { Router } from "express";
import { createSessionController } from "../controllers/session.controllers";
import { ensureBodySchema } from "../middlewares/ensureBodySchema.middlewares";
import { requestLoginSchema } from "../schemas/session.schemas";
import { ensureTokenValidMiddleware } from "../middlewares/ensureTokenValid.middleware";



const sessionRoutes: Router = Router()

sessionRoutes.post('', ensureBodySchema(requestLoginSchema) ,createSessionController)

export { sessionRoutes }