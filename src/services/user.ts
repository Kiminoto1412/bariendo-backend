import { Organization } from '@/entities/postgres/organization'
import { User } from '@/entities/postgres/user'
import { UserOrganization } from '@/entities/postgres/userOrganization'

interface IUserInput {
  email: string
  password: string
  confirmPassword: string
  specialist?: string
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN'
  organizationName: string
}

export default class UserService {
  public static async getAll(): Promise<any> {
    try {
      return await User.createQueryBuilder('user')
        .leftJoinAndSelect('user.userOrganizations', 'userOrganization')
        .leftJoinAndSelect('userOrganization.organization', 'organization')
        .getMany()
    } catch (error) {
      throw error
    }
  }

  public static async create(userDataList: IUserInput[]): Promise<any[]> {
    try {
      const users: User[] = []
      console.log('userDataList: ', userDataList)
      for (const userData of userDataList) {
        const user = User.create(userData)
        user.hashPassword()
        // Create user
        await user.save()

        // Assign organization based on organizationName provided in userData
        if (userData.organizationName) {
          const organization = await Organization.findOne({
            where: { name: userData.organizationName }
          })
          if (organization) {
            // create relation on userOrganization table
            const userOrganization = await UserOrganization.create({
              user: user,
              organization: organization
            }).save()
          } else {
            throw new Error(
              `Organization '${userData.organizationName}' not found.`
            )
          }
        }

        // await User.save(user)
        users.push(user)
      }

      return users
    } catch (error) {
      throw error
    }
  }

  public static async getAllSpecialist(organizationId: number): Promise<any> {
    try {
      const doctors = await User.createQueryBuilder('user')
        .innerJoin('user.userOrganizations', 'userOrganization')
        .innerJoin('userOrganization.organization', 'organization')
        .where('organization.id = :organizationId', { organizationId })
        .andWhere('user.role = :role', { role: 'DOCTOR' })
        .andWhere('user.specialist IS NOT NULL') // Exclude users with null specialist
        .getMany()

      // Filter unique specialists
      const uniqueSpecialists: User[] = []
      const specialistNames: Set<string> = new Set()
      doctors.forEach((user) => {
        if (!specialistNames.has(user.specialist)) {
          specialistNames.add(user.specialist)
          uniqueSpecialists.push(user)
        }
      })

      return uniqueSpecialists
    } catch (error) {
      throw error
    }
  }

  public static async getAvailableOneDay(
    organizationId: number,
    specialist: string,
    dateObj: Date
  ): Promise<any> {
    try {
      const doctors = await User.createQueryBuilder('user')
        .innerJoin('user.userOrganizations', 'userOrganization')
        .innerJoin('userOrganization.organization', 'organization')
        .where('organization.id = :organizationId', { organizationId })
        .andWhere('user.role = :role', { role: 'DOCTOR' })
        .andWhere('user.specialist IS NOT NULL') // Exclude users with null specialist
        .getMany()

      // Filter unique specialists
      const uniqueSpecialists: User[] = []
      const specialistNames: Set<string> = new Set()
      doctors.forEach((user) => {
        if (!specialistNames.has(user.specialist)) {
          specialistNames.add(user.specialist)
          uniqueSpecialists.push(user)
        }
      })

      return uniqueSpecialists
    } catch (error) {
      throw error
    }
  }
}
