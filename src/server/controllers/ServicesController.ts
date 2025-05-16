
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const serviceSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  duration: z.number().min(1),
  price: z.number().min(0)
});

export class ServicesController {
  async create(req: Request, res: Response) {
    try {
      const data = serviceSchema.parse(req.body);
      const service = await prisma.service.create({ data });
      return res.status(201).json(service);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async list(req: Request, res: Response) {
    const services = await prisma.service.findMany();
    return res.json(services);
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = serviceSchema.parse(req.body);
      const service = await prisma.service.update({
        where: { id },
        data
      });
      return res.json(service);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.service.delete({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
