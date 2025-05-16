
import { Router } from 'express';
import { ServicesController } from './controllers/ServicesController';
import { UserController } from './controllers/UserController';
import { AppointmentController } from './controllers/AppointmentController';
import { MessageController } from './controllers/MessageController';

const router = Router();

const servicesController = new ServicesController();
const userController = new UserController();
const appointmentController = new AppointmentController();
const messageController = new MessageController();

// Services routes
router.get('/services', servicesController.list);
router.post('/services', servicesController.create);
router.put('/services/:id', servicesController.update);
router.delete('/services/:id', servicesController.delete);

// User routes
router.get('/users', userController.list);
router.post('/users', userController.create);
router.put('/users/:id', userController.update);
router.delete('/users/:id', userController.delete);

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
