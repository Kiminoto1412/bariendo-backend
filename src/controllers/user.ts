import { NextFunction, Request, Response } from 'express'
import UserService from '@/services/user'
import { User } from '@/entities/postgres/user'

export class UserController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAll()
      res.status(200).send({ payload: users })
    } catch (err) {
      next(err)
    }
  }

  public static async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = res.locals.user.id
      const user = await User.createQueryBuilder('user')
        .leftJoinAndSelect('user.userOrganizations', 'userOrganization')
        .leftJoinAndSelect('userOrganization.organization', 'organization')
        .where({ id: userId })
        .getOne()
      res.status(200).send({ payload: user })
    } catch (err) {
      next(err)
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.create(req.body.data)
      res
        .status(200)
        .send({ message: 'create user successfully', payload: user })
    } catch (err) {
      next(err)
    }
  }

  public static async getAllSpecialist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { organizationId } = req.query
      const specialists = await UserService.getAllSpecialist(+organizationId)

      res.status(200).send({ payload: specialists })
    } catch (err) {
      next(err)
    }
  }

  public static async getAvailableOneDay(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { organizationId, specialist, date } = req.query

      const dateObj = new Date(date as string)

      const timeSlots = await UserService.getAvailableOneDay(
        +organizationId,
        specialist as string,
        dateObj
      )

      res.status(200).send({ payload: timeSlots })
    } catch (err) {
      next(err)
    }
  }
}
