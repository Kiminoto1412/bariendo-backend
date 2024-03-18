import { User } from '@/entities/postgres/user'
import Express from 'express'
import jwt from 'jsonwebtoken'

export default class Authorization {
  public static async isAuthorized(
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) {
    try {
      if (req.headers['authorization']) {
        res.locals.user = <any>(
          jwt.verify(req.headers['authorization'], process.env.JWT_SECRET_KEY)
        )
        const userData = await User.findOneByOrFail({
          email: res.locals.user.email,
          role: res.locals.user.role
        })
        if (userData) {
          res.locals.user.userData = userData
        } else {
          res.status(401).send({
            status: 401,
            message: 'Unauthorized'
          })
        }
        next()
      } else {
        res.status(401).send({
          status: 401,
          message: 'Unauthorized'
        })
      }
    } catch (error) {
      res.status(401).json({
        message: 'Unauthorized Catch',
        error: error.message
      })
    }
  }
}
