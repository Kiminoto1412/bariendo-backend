import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import { UserOrganization } from './userOrganization'
import { Appointment } from './appointment'

@Entity({ name: 'organization' })
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column('character varying', {
    name: 'name',
    length: 255,
    nullable: false
  })
  name: string

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone', name: 'deleted_at' })
  deletedAt: Date

  @OneToMany(
    () => UserOrganization,
    (userOrganization) => userOrganization.organization
  )
  userOrganizations: UserOrganization[]

  @OneToMany(() => Appointment, (appointment) => appointment.organization)
  appointments: Appointment[]
}
