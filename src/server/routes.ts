
import { Router } from 'express';
import { ServicesController } from './controllers/ServicesController';

const router = Router();
const servicesController = new ServicesController();

// Services routes
router.get('/services', servicesController.list);
router.post('/services', servicesController.create);
router.put('/services/:id', servicesController.update);
router.delete('/services/:id', servicesController.delete);

export { router };
