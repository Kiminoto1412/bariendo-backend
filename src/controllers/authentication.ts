import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '@/entities/postgres/user'
import { Organization } from '@/entities/postgres/organization'

export class AuthenticationController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body

      const user = await User.createQueryBuilder('user')
        .leftJoinAndSelect('user.userOrganizations', 'userOrganization')
        .leftJoinAndSelect('userOrganization.organization', 'organization')
        .where({ email })
        .getOne()

      if (!user) {
        throw { status: 404, message: 'invalid credentials' }
      }
      if (!user.checkPassword(password)) {
        throw { status: 404, message: 'invalid credentials' }
      }
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '1d'
        }
      )
      res.status(200).send({ payload: { accessToken: token, user } })
    } catch (err) {
      next(err)
    }
  }

  public static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log(111)
      const { email, organizationName } = req.body

      const organization = await Organization.findOne({
        where: { name: organizationName }
      })

      req.body.userOrganizations = [{ organization }]
      const user = User.create(req.body)
      user.hashPassword()

      // Create user
      await user.save()

      const userData = await User.createQueryBuilder('user')
        .leftJoinAndSelect('user.userOrganizations', 'userOrganization')
        .leftJoinAndSelect('userOrganization.organization', 'organization')
        .where({ email })
        .getOne()

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: '1d'
        }
      )
      res.status(200).send({ payload: { accessToken: token, user: userData } })
    } catch (err) {
      next(err)
    }
  }
}
