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
import { DateSlot } from './dateSlot'

@Entity({ name: 'timeslot' })
export class TimeSlot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'time', name: 'time' })
  time: string

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamp with time zone', name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp with time zone', name: 'deleted_at' })
  deletedAt: Date

  @ManyToOne(() => DateSlot, (dateSlot) => dateSlot.timeSlots)
  @JoinColumn({ name: 'slot_id' })
  dateSlot: DateSlot
}
