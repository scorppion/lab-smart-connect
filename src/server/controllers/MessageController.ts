
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const messageSchema = z.object({
  content: z.string().min(1),
  senderId: z.string()
});

export class MessageController {
  async create(req: Request, res: Response) {
    try {
      const data = messageSchema.parse(req.body);
      const message = await prisma.message.create({ 
        data,
        include: { sender: true }
      });
      return res.status(201).json(message);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async list(req: Request, res: Response) {
    const messages = await prisma.message.findMany({
      include: { 
        sender: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return res.json(messages);
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.message.delete({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
