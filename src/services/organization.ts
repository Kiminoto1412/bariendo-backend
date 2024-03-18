import { Organization } from '@/entities/postgres/organization'

interface IOrganizationInput {
  name: string
}

export default class OrganizationService {
  public static async getAll(): Promise<any> {
    try {
      return await Organization.createQueryBuilder('Organization').getMany()
    } catch (error) {
      throw error
    }
  }

  public static async create(
    organizationDataList: IOrganizationInput[]
  ): Promise<any[]> {
    try {
      const organizations: Organization[] = []
      for (const organizationData of organizationDataList) {
        const organization = new Organization()
        organization.name = organizationData.name
        await organization.save()
        organizations.push(organization)
      }
      return organizations
    } catch (error) {
      throw error
    }
  }
}
