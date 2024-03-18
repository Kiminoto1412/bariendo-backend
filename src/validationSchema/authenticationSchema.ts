import { z } from 'zod'

export const loginSchema = z.object({
  body: z.strictObject({
    email: z.string(),
    password: z.string().min(8).max(20),
  })
})

export const registerSchema = z.object({
  body: z.strictObject({
    email: z.string(),
    password: z.string().min(8).max(20),
    confirmPassword: z.string().min(8).max(20),
    specialist: z.string().optional(),
    role: z.string(),
    organizationName: z.string(),
    firstname: z.string(),
    lastname: z.string()
  })
})
