import { z } from "zod";

const userSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    admin: z.boolean().optional(),
    active: z.boolean(),
})

const userRequestSchema = userSchema.omit({ id: true, active: true })

const userResponseSchema = userSchema.omit({ password: true })

const userUpdateSchema = userRequestSchema.partial()


export { userSchema, userRequestSchema, userResponseSchema, userUpdateSchema }