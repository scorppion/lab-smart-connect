
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { Server } from 'socket.io';

const prisma = new PrismaClient();

const messageSchema = z.object({
  content: z.string().min(1),
  senderId: z.string(),
  receiverId: z.string()
});

export class MessageController {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  async create(req: Request, res: Response) {
    try {
      const data = messageSchema.parse(req.body);
      const message = await prisma.message.create({ 
        data,
        include: { sender: true }
      });
      
      // Emitir mensagem para o remetente e destinatário
      this.io.to(data.senderId).emit('newMessage', message);
      this.io.to(data.receiverId).emit('newMessage', message);
      
      return res.status(201).json(message);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async list(req: Request, res: Response) {
    const { userId, contactId } = req.query;
    
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: String(userId), receiverId: String(contactId) },
          { senderId: String(contactId), receiverId: String(userId) }
        ]
      },
      include: { 
        sender: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      },
      orderBy: { createdAt: 'asc' }
    });
    return res.json(messages);
  }
}
