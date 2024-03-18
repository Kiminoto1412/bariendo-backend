import { Router } from 'express'
import { validate } from '@/middlewares/validation'
import { UserController } from '@/controllers/user'
import { createUserSchema } from '@/validationSchema/userSchema'

const router: Router = Router()
router.post('/', validate(createUserSchema), UserController.create)
router.get('/all', UserController.getAll)
router.get('/me', UserController.getMe)


export default router
