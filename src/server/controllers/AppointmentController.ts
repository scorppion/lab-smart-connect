
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const appointmentSchema = z.object({
  clientName: z.string(),
  serviceName: z.string(),
  startTime: z.string().transform(str => new Date(str)),
  endTime: z.string().transform(str => new Date(str)),
  serviceId: z.string(),
  professionalId: z.string(),
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED']).optional()
});

export class AppointmentController {
  async create(req: Request, res: Response) {
    try {
      const data = appointmentSchema.parse(req.body);
      const appointment = await prisma.appointment.create({ data });
      return res.status(201).json(appointment);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async list(req: Request, res: Response) {
    const appointments = await prisma.appointment.findMany({
      include: {
        service: true,
        professional: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    return res.json(appointments);
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = appointmentSchema.partial().parse(req.body);
      const appointment = await prisma.appointment.update({
        where: { id },
        data,
        include: {
          service: true,
          professional: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });
      return res.json(appointment);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.appointment.delete({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
