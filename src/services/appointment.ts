import { Appointment } from '@/entities/postgres/appointment'
import { DateSlot } from '@/entities/postgres/dateSlot'
import { TimeSlot } from '@/entities/postgres/timeSlot'
import { User } from '@/entities/postgres/user'
import { allTimeSlots } from '@/utils/allTimeSlot'

interface IAppointmentInput {
  email: string
  password: string
  confirmPassword: string
  specialist?: string
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN'
  organizationName: string
}

interface ITimeSlot {
  time: string
}

interface IDateSlot {
  date: Date
  timeSlots: ITimeSlot[]
}

interface DermatologistScheduleReq {
  patientId: number
  doctorId: number
  organizationId: number
  specialist: string
  dateSlots: IDateSlot[]
}

export default class AppointmentService {
  public static async getAll(): Promise<any> {
    try {
    } catch (error) {
      throw error
    }
  }

  public static async getAllByPatientId(
    organizationId: number,
    patientId: number
  ): Promise<any> {
    try {
      const appointments = await Appointment.createQueryBuilder('appointment')
        .innerJoinAndSelect('appointment.dateSlots', 'dateSlot')
        .innerJoinAndSelect('dateSlot.timeSlots', 'timeSlot')
        .innerJoinAndSelect('appointment.patient', 'patient')
        .innerJoinAndSelect('appointment.doctor', 'doctor')
        .innerJoinAndSelect('appointment.organization', 'organization')
        .where('DATE(dateSlot.date) >= :today', {
          today: new Date().toISOString().split('T')[0] // Today's date in YYYY-MM-DD format
        })
        .getMany()

      return appointments
    } catch (error) {
      throw error
    }
  }

  public static async create(
    dermatologistSchedule: DermatologistScheduleReq
  ): Promise<any[]> {
    const { doctorId, patientId, organizationId, specialist, dateSlots } =
      dermatologistSchedule

    try {
      const appointment = {} as any
      appointment.patient = { id: patientId }
      appointment.doctor = { id: doctorId }
      appointment.organization = { id: organizationId }
      appointment.dateSlots = dateSlots?.map((dateSlot) => {
        const slot = new DateSlot()
        slot.date = dateSlot.date
        slot.timeSlots = dateSlot.timeSlots.map((timeSlot) => {
          const slot = new TimeSlot()
          slot.time = timeSlot.time
          return slot
        })
        return slot
      })
      await Appointment.save(appointment)
      return
    } catch (error) {
      throw new Error('Error creating appointment: ' + error.message)
    }
  }

  public static async getAvailableTimeOneDay(
    organizationId: number,
    doctorId: number,
    date: string,
    patientId: number
  ): Promise<any> {
    try {
      const appointments = await Appointment.createQueryBuilder('appointment')
        .innerJoinAndSelect('appointment.dateSlots', 'dateSlot')
        .innerJoinAndSelect('dateSlot.timeSlots', 'timeSlot')
        .innerJoinAndSelect('appointment.patient', 'patient')
        .innerJoinAndSelect(
          'appointment.doctor',
          'doctor',
          'doctor.id= :doctorId',
          { doctorId }
        )
        .innerJoin(
          'appointment.organization',
          'organization',
          'organization.id= :organizationId',
          { organizationId }
        )
        .where('DATE(dateSlot.date) = :date', {
          date: date
        })
        .getMany()

      const statusOptions = {
        AVAILABLE: 'AVAILABLE',
        NOT_AVAILABLE: 'NOT_AVAILABLE',
        BOOKED: 'BOOKED'
      }

      const disPlayTimeSlots = [] as any[]
      appointments.map((appointment) => {
        let status: string
        if (appointment.patient.id === patientId) {
          status = statusOptions.BOOKED
        } else {
          status = statusOptions.NOT_AVAILABLE
        }
        appointment.dateSlots.map((dateSlot) => {
          dateSlot.timeSlots.map((timeSlot: any) => {
            timeSlot.status = status
            disPlayTimeSlots.push(timeSlot)
          })
        })
      })

      const allAvailableTimeSlots = allTimeSlots
        .map((allTimeSlot) => {
          if (
            disPlayTimeSlots.every(
              (disPlayTimeSlot) => disPlayTimeSlot.time !== allTimeSlot
            )
          ) {
            return {
              time: allTimeSlot,
              status: statusOptions.AVAILABLE
            }
          }
        })
        .filter((slot) => slot !== undefined)

      const newTimeSlots = [...allAvailableTimeSlots, ...disPlayTimeSlots]

      newTimeSlots.sort((a, b) => {
        if (a.time && b.time) {
          return a.time.localeCompare(b.time)
        }
        return 0
      })

      return newTimeSlots
    } catch (error) {
      throw error
    }
  }

  public static async getAllDoctorBySpecialist(
    specialist: string
  ): Promise<any> {
    try {
      const doctors = await User.createQueryBuilder('user')
        .where('user.specialist = :specialist', { specialist })
        .getMany()
      return doctors
    } catch (error) {
      throw error
    }
  }
}
