import { NextFunction, Request, Response } from 'express'
import AppointmentService from '@/services/appointment'

export class AppointmentController {
  public static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const appointments = await AppointmentService.getAll()
      res.status(200).send({ payload: appointments })
    } catch (err) {
      next(err)
    }
  }

  public static async getAllByPatientId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { organizationId } = req.query
      const appointments = await AppointmentService.getAllByPatientId(
        +organizationId,
        +res.locals.user.id
      )
      res.status(200).send({ payload: appointments })
    } catch (err) {
      next(err)
    }
  }

  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      await AppointmentService.create(req.body)
      res.status(200).send({
        message: 'create appointment successfully'
      })
    } catch (err) {
      next(err)
    }
  }

  public static async getAvailableTimeOneDay(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { organizationId, doctorId, date } = req.query
      const timeSlots = await AppointmentService.getAvailableTimeOneDay(
        +organizationId,
        +doctorId,
        date as string,
        +res.locals.user.id
      )

      res.status(200).send({ payload: timeSlots })
    } catch (err) {
      next(err)
    }
  }

  public static async getAllDoctorBySpecialist(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { specialist } = req.query

      const doctors = await AppointmentService.getAllDoctorBySpecialist(
        specialist as string
      )

      res.status(200).send({ payload: doctors })
    } catch (err) {
      next(err)
    }
  }
}
