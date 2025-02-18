import { Router } from 'express';
import { MembresiaController } from './Controllers';

const controller = new MembresiaController();
const router = Router();

router.post('/membresia', controller.create);
router.get('/membresias', controller.getAll);
router.get('/membresia/:id', controller.getById);
router.put('/membresia/:id', controller.update);
router.delete('/membresia/:id', controller.delete);

export { router as MembresiaRouter };
