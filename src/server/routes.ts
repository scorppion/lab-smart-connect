
import { Router } from 'express';
import { ServicesController } from './controllers/ServicesController';
import { UserController } from './controllers/UserController';
import { AppointmentController } from './controllers/AppointmentController';
import { MessageController } from './controllers/MessageController';

const router = Router();
import { requireAuth, requireAdmin } from './middlewares/auth';

const servicesController = new ServicesController();
const userController = new UserController();
const appointmentController = new AppointmentController();
const messageController = new MessageController();

// Middleware global para rotas autenticadas
router.use('/api', requireAuth);

// Services routes
router.get('/services', servicesController.list);
router.post('/services', servicesController.create);
router.put('/services/:id', servicesController.update);
router.delete('/services/:id', servicesController.delete);

// User routes
router.get('/users', requireAdmin, userController.list);
router.post('/users', requireAdmin, userController.create);
router.put('/users/:id', requireAdmin, userController.update);
router.delete('/users/:id', requireAdmin, userController.delete);

// Appointment routes
router.get('/appointments', appointmentController.list);
router.post('/appointments', appointmentController.create);
router.put('/appointments/:id', appointmentController.update);
router.delete('/appointments/:id', appointmentController.delete);

// Message routes
router.get('/messages', messageController.list);
router.post('/messages', messageController.create);
router.delete('/messages/:id', messageController.delete);

export { router };
