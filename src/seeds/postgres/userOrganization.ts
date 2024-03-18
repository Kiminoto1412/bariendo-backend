import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { UserOrganization } from '@/entities/postgres/userOrganization'
import fs from 'fs'

export default class UserOrganizationSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    // password = 123456789
    const UserOrganizationQuery = fs
      .readFileSync(__dirname + '/sql/userOrganization.sql')
      .toString()
    const repository = dataSource.getRepository(UserOrganization)
    await repository.query(UserOrganizationQuery)
    await repository.query(
      `SELECT setval('user_organization_id_seq', (SELECT MAX(id) FROM "user_organization"), true);`
    )
  }
}
