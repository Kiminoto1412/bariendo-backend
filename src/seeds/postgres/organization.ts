import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { Organization } from '@/entities/postgres/organization'
import fs from 'fs'

export default class OrganizationSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const OrganizationQuery = fs
      .readFileSync(__dirname + '/sql/organization.sql')
      .toString()
    const repository = dataSource.getRepository(Organization)
    await repository.query(OrganizationQuery)
    await repository.query(
      `SELECT setval('organization_id_seq', (SELECT MAX(id) FROM "organization"), true);`
    )
  }
}
