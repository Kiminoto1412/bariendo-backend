import { z } from 'zod'

export const createOrganizationSchema = z.array(
  z.object({
    name: z.string().max(255)
  })
)
