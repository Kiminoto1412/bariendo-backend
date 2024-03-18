import { Router } from 'express'
// import api from './api'
import api from './api'
const router: Router = Router()

router.use('/bariendo_api/', api)
router.get('/version', (req, res) => {
  res.json({ version: '1.0.0' })
})
export default router
