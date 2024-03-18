import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { User } from '@/entities/postgres/user'
import fs from 'fs'

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    // password = 123456789
    const UserQuery = fs
      .readFileSync(__dirname + '/sql/user.sql')
      .toString()
    const repository = dataSource.getRepository(User)
    await repository.query(UserQuery)
    await repository.query(
      `SELECT setval('user_id_seq', (SELECT MAX(id) FROM "user"), true);`
    )
  }
}

