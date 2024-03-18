import { z } from 'zod'

export const createAppointmentSchema = z.object({
  body: z.strictObject({
    doctorId: z.number(),
    patientId: z.number(),
    organizationId: z.number(),
    specialist: z.string(),
    dateSlots: z.array(
      z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
        timeSlots: z.array(
          z.object({
            time: z.string().regex(/^\d{2}:\d{2}:\d{2}$/)
          })
        )
      })
    )
  })
})
