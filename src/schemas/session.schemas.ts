import { z } from "zod"

const requestLoginSchema = z.object({
    password:z.string(),
    email:z.string().email()
})

export { requestLoginSchema }