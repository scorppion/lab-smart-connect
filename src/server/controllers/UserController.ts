
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const userSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['USER', 'ADMIN']).optional()
});

export class UserController {
  async create(req: Request, res: Response) {
    try {
      const data = userSchema.parse(req.body);
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await prisma.user.create({ 
        data: { ...data, password: hashedPassword }
      });
      const { password, ...userWithoutPassword } = user;
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async list(req: Request, res: Response) {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return res.json(users);
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = userSchema.partial().parse(req.body);
      
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }
      
      const user = await prisma.user.update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return res.json(user);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.user.delete({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
}
