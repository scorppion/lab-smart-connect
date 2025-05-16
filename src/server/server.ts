
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { router } from './routes';
import { errorHandler } from './middlewares/error';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:8080',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('joinRoom', (userId: string) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });
  
  socket.on('message', async (data) => {
    const { content, senderId, receiverId } = data;
    
    try {
      const message = await prisma.message.create({
        data: { content, senderId, receiverId },
        include: { sender: true }
      });
      
      io.to(senderId).emit('newMessage', message);
      io.to(receiverId).emit('newMessage', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const messageController = new MessageController(io);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
