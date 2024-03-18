import { z } from 'zod'

export const getAllSchema = z.object({
  query: z.strictObject({
    skip: z.string().regex(/^\d+$/),
    take: z.string().regex(/^\d+$/)
  })
})

export const createSchema = z.object({
  body: z.strictObject({
    name: z.string().max(255),
    description: z.string().max(255)
  })
})
