import { Router } from 'express'
import { validate } from '@/middlewares/validation'
import { AppointmentController } from '@/controllers/appointment'
import { createAppointmentSchema } from '@/validationSchema/appointmentSchema'

const router: Router = Router()
router.post(
  '/',
  validate(createAppointmentSchema),
  AppointmentController.create
)
router.get('/all', AppointmentController.getAll)
router.get('/all_by_patient_id', AppointmentController.getAllByPatientId)

router.get(
  '/available_time_one_day',
  AppointmentController.getAvailableTimeOneDay
)
router.get(
  '/doctor_by_specialist',
  AppointmentController.getAllDoctorBySpecialist
)

export default router
