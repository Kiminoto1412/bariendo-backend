require('dotenv').config()
import 'reflect-metadata'
import { DataSource, DataSourceOptions } from 'typeorm'
const dir = __dirname

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || '',
  port: parseInt(process.env.POSTGRES_PORT) || 5432,
  database: process.env.POSTGRES_DATABASE || '',
  username: process.env.POSTGRES_USER || '',
  password: process.env.POSTGRES_PASSWORD || '',
  synchronize: false,
  migrationsRun: true,
  logging: process.env.NODE_ENV === 'local' && ['error', 'query'],
  entities: [dir + '/../entities/postgres/**/*{.ts,.js}'],
  migrations: [dir + '/../migrations/postgres/**/*{.ts,.js}'],
  subscribers: [
    dir + '/../subscriber/**/*{.ts}',
    dir + '/../subscriber/**/*{.js}'
  ]
}
export const PostgresDataSource = new DataSource(options)

// use for seed

// require('dotenv').config()
// import 'reflect-metadata'
// import { DataSource, DataSourceOptions } from 'typeorm'
// import { SeederOptions } from 'typeorm-extension'
// import { MainSeeder } from '@/seeds/postgres/main'
// const dir = __dirname

// const options: DataSourceOptions & SeederOptions = {
//   type: 'postgres',
//   host: process.env.POSTGRES_HOST || '',
//   port: parseInt(process.env.POSTGRES_PORT) || 5432,
//   database: process.env.POSTGRES_DATABASE || '',
//   username: process.env.POSTGRES_USER || '',
//   password: process.env.POSTGRES_PASSWORD || '',
//   synchronize: false,
//   migrationsRun: true,
//   logging: ['error', 'query'],
//   entities: [dir + '/../entities/postgres/**/*{.ts,.js}'],
//   migrations: [dir + '/../migration/postgres/**/*{.ts,.js}'],
//   subscribers: [
//     dir + '/../subscriber/**/*{.ts}',
//     dir + '/../subscriber/**/*{.js}'
//   ],
//   seeds: [MainSeeder]
// }
// export const PostgresDataSource = new DataSource(options)
