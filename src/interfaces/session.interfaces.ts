import { z } from "zod";
import { requestLoginSchema } from "../schemas/session.schemas";

type TLoginRequest = z.infer<typeof requestLoginSchema>

export { TLoginRequest }