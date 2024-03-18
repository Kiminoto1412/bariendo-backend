import { NextFunction, Request, Response } from 'express'
import OrganizationService from '@/services/organization'

export class OrganizationController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const Organizations = await OrganizationService.getAll()
      res.status(200).send({ payload: Organizations })
    } catch (err) {
      next(err)
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const Organization = await OrganizationService.create(req.body.data)
      res.status(200).send({ payload: Organization })
    } catch (err) {
      next(err)
    }
  }
}
