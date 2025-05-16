
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers['x-replit-user-id'];
  
  if (!userId) {
    return res.status(401).json({ error: 'Não autenticado' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: String(userId) }
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao verificar autenticação' });
  }
};

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  next();
};
