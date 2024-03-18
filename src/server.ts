import App from './app'
import Logger from '@/utils/logger'
const app = new App(parseInt(process.env.PORT) || 8000)
app
  .initialize()
  .then(() => {
    app.listen()
  })
  .catch((err) => {
    Logger.error('Failed to start server', err)
  })
