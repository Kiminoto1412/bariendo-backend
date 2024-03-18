import { Router } from 'express'
import { validate } from '@/middlewares/validation'
import { createOrganizationSchema } from '@/validationSchema/organization'
import { OrganizationController } from '@/controllers/organization'

const router: Router = Router()
router.post(
  '/',
  validate(createOrganizationSchema),
  OrganizationController.create
)
router.get('/', OrganizationController.getAll)
export default router
