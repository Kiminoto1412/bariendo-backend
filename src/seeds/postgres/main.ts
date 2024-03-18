import { DataSource } from 'typeorm'
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension'
import UserSeeder from '@/seeds/postgres/user'
import OrganizationSeeder from '@/seeds/postgres/organization'
import UserOrganizationSeeder from '@/seeds/postgres/userOrganization'
import { User } from '@/entities/postgres/user'

export class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    try {
      //check is seed or not by admin_info have data or not
      console.log(11111)
      const seedData = await User.count({
        withDeleted: true
      })
      if (seedData > 0) return
      await runSeeder(dataSource, UserSeeder)
      await runSeeder(dataSource, OrganizationSeeder)

      // have relation
      await runSeeder(dataSource, UserOrganizationSeeder)
    } catch (error) {
      console.log(error)
    }
  }
}
