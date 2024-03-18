import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn
} from 'typeorm'
import { DateSlot } from './dateSlot'
import { User } from './user'
import { Organization } from './organization'

@Entity({ name: 'appointment' })
export class Appointment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone', name: 'deleted_at' })
  deletedAt: Date

  @OneToMany(() => DateSlot, (dateSlot) => dateSlot.appointment, {
    cascade: ['insert', 'update']
  })
  dateSlots: DateSlot[]

  @ManyToOne(() => User, (user) => user.doctorAppointments)
  @JoinColumn({ name: 'doctor_id' })
  doctor: User

  @ManyToOne(() => User, (user) => user.patientAppointments)
  @JoinColumn({ name: 'patient_id' })
  patient: User

  @ManyToOne(() => Organization, (organization) => organization.appointments)
  @JoinColumn({ name: 'organization_id' })
  organization: Organization
}
