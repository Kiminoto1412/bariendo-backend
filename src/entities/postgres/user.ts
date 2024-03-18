import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm'
import bcrypt from 'bcryptjs'
import { Organization } from './organization'
import { UserOrganization } from './userOrganization'
import { Appointment } from './appointment'

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number

  @Column('character varying', {
    name: 'email',
    length: 255,
    unique: true
  })
  email: string

  @Column('character varying', {
    name: 'password',
    length: 255
  })
  password: string

  @Column('character varying', {
    name: 'firstname',
    length: 100,
    nullable: false
  })
  firstname: string

  @Column('character varying', {
    name: 'lastname',
    length: 100,
    nullable: false
  })
  lastname: string

  @Column('character varying', {
    name: 'specialist',
    length: 255,
    nullable: true
  })
  specialist: string

  @Column('enum', {
    name: 'role',
    enum: ['DOCTOR', 'PATIENT', 'ADMIN'],
    default: 'PATIENT'
  })
  role: string

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone', name: 'deleted_at' })
  deletedAt: Date

  @OneToMany(
    () => UserOrganization,
    (userOrganization) => userOrganization.user,
    // when insert or create of user if we add userOrganization
    // that have organization it will cascade create or update many to may relations
    { cascade: ['insert', 'update'] }
  )
  userOrganizations: UserOrganization[]

  @OneToMany(() => Appointment, (appointment) => appointment.doctor, {
    cascade: ['insert', 'update']
  })
  doctorAppointments: Appointment[]

  @OneToMany(() => Appointment, (appointment) => appointment.patient, {
    cascade: ['insert', 'update']
  })
  patientAppointments: Appointment[]

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8)
  }

  checkPassword(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword.toString(), this.password)
  }
}
