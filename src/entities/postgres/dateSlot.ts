import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity
} from 'typeorm'
import { Appointment } from './appointment'
import { TimeSlot } from './timeSlot'

@Entity({ name: 'dateslot' })
export class DateSlot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'date' })
  date: Date

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone', name: 'deleted_at' })
  deletedAt: Date

  @ManyToOne(() => Appointment, (appointment) => appointment.dateSlots)
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment

  @OneToMany(() => TimeSlot, (timeSlot) => timeSlot.dateSlot, {
    cascade: ['insert', 'update']
  })
  timeSlots: TimeSlot[]
}
