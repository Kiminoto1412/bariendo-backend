import { Router } from 'express'
import AuthenticationRouter from '@/routes/api/authentication'
import UserRouter from '@/routes/api/user'
import AppointmentRouter from '@/routes/api/appointment'
import Authorization from '@/middlewares/authentication'

// for mock
import OrganizationRouter from '@/routes/api/organization'
import { createUserSchema } from '@/validationSchema/userSchema'
import { UserController } from '@/controllers/user'
import { validate } from '@/middlewares/validation'

const router: Router = Router()

// for mock data
router.use('/organization', OrganizationRouter)
router.get('/specialist', UserController.getAllSpecialist)
// router.post('/user', validate(createUserSchema), UserController.create)

router.use('/authentication', AuthenticationRouter)
router.use('*', Authorization.isAuthorized)
router.use('/user', UserRouter)
router.use('/appointment', AppointmentRouter)

export default router
