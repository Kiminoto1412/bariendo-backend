import { Request, Response, NextFunction } from 'express'
import { z, AnyZodObject, ZodArray } from 'zod'

const validate =
  (schema: AnyZodObject | ZodArray<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if the schema is an array schema
      const isArrayOfObjects = schema instanceof ZodArray
      // Parse request data accordingly
      const requestData = isArrayOfObjects
        ? req.body.data
        : { body: req.body, query: req.query, params: req.params }

      console.log('requestData', requestData)

      await schema.parseAsync(requestData)
      return next()
    } catch (error) {
      return res.status(400).json({ message: error.issues })
    }
  }

export { z, validate }
