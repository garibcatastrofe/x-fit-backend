import { Router } from 'express';
import { RutinaController } from './Controller';

const controller = new RutinaController();
const router = Router();

router.post('/rutina', controller.create);
router.get('/rutinas', controller.getAll);
router.get('/rutina/:id', controller.getById);
router.put('/rutina/:id', controller.update);
router.delete('/rutina/:id', controller.delete);

export { router as RutinaRouter };
