import { Router } from 'express'
import { validate } from '@/middlewares/validation'
import {
  loginSchema,
  registerSchema
} from '@/validationSchema/authenticationSchema'
import { AuthenticationController } from '@/controllers/authentication'

const router: Router = Router()
router.post('/login', validate(loginSchema), AuthenticationController.login)
router.post(
  '/register',
  validate(registerSchema),
  AuthenticationController.register
)
export default router
