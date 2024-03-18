import { z } from 'zod'

export const createUserSchema = z.array(
  z.object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string().min(8).max(20),
    confirmPassword: z.string(),
    specialist: z.string().optional(),
    role: z.enum(['PATIENT', 'DOCTOR', 'ADMIN']),
    organizationName: z.string()
  })
)
