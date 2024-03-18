require('dotenv').config()
import Logger from '@/utils/logger'
import 'reflect-metadata'
import Express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import router from './routes'
import morgan from 'morgan'
import morganBody from 'morgan-body'

import { PostgresDataSource } from '@/data-source/postgres'
import { OverrideDefaultFunctionUtil } from '@/utils/overrideDefaultFunction'

class App {
  public app: Express.Application
  public port: number

  constructor(port: number) {
    this.app = Express()

    this.port = port
  }

  public initialize() {
    Logger.info(`process.env.NODE_ENV => ${process.env.NODE_ENV}`)

    return new Promise(async (resolve, reject) => {
      try {
        process.env.NODE_ENV === 'local' &&
          console.log('env => ', {
            user: process.env.POSTGRES_USER || '',
            host: process.env.POSTGRES_HOST || '',
            database: process.env.POSTGRES_DATABASE || '',
            password: process.env.POSTGRES_PASSWORD || '',
            port: process.env.POSTGRES_PORT || 5432
          })
        await App.connectToDatabase()
        this.initializeMiddleware()
        this.initializeRouter()
        this.initializeExceptionHandler()

        resolve(this)
      } catch (err) {
        reject(err)
      }
    })
  }

  private initializeMiddleware() {
    this.app.use(
      cors({
        origin: true,
        allowedHeaders: [
          '*',
          'Authorization',
          'Access-Control-Allow-Origin',
          'Access-Control-Allow-Methods',
          'content-type'
        ],
        optionsSuccessStatus: 200,
        credentials: true
      })
    )
    morganBody(this.app, {
      stream: {
        write: (message: any) => Logger.http({ message: message })
      },
      prettify: false,
      includeNewLine: false
    })
    this.app.use(morgan('dev'))
    this.app.use(
      bodyParser.urlencoded({
        limit: '50mb',
        extended: true
      })
    )
    this.app.use(bodyParser.json({ limit: '50mb' }))
  }

  private initializeRouter() {
    OverrideDefaultFunctionUtil.consoleLog()
    this.app.use('/', router)
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(`App listening on port ${this.port}`)
    })
  }

  private static async connectToDatabase() {
    try {
      await PostgresDataSource.initialize()
        .then(async () => {
          Logger.info('Connected to postgres database successfully!')
        })
        .catch((error) =>
          Logger.info('Connected to postgres database failed!', error)
        )
    } catch (err) {
      console.log(err)
    }
  }

  private initializeExceptionHandler() {
    this.app.use(
      async (
        err: any,
        req: Express.Request,
        res: Express.Response,
        next: Express.NextFunction
      ) => {
        try {
          // Logger
          Logger.error({
            message: {
              status: err.status || 400,
              success: false,
              message: err.message || err || 'Unknown',
              stack: err.stack || '',
              payload: err.data || 'unknown',
              code: err?.code || 'unknown',
              user: res.locals?.user || 'unknown'
            }
          })
          // response
          res.status(err.status || 400).send({
            status: err.status || 400,
            success: false,
            message: err.message || err || 'Unknown',
            stack: err.stack || '',
            payload: err.data,
            code: err?.code
          } as any)
        } catch (e) {
          console.error('Error on error Handler:', e)
          next(e)
        }
      }
    )
  }
}

export default App
