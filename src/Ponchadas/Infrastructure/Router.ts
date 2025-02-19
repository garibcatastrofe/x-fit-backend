import { Router } from 'express';
import { PonchadaController } from './Controller';

const controller = new PonchadaController();
const router = Router();

router.post('/ponchada', controller.create);
router.get('/ponchadas', controller.getAll);
router.get('/ponchada/:id', controller.getById);
router.put('/ponchada/:id', controller.update);
router.delete('/ponchada/:id', controller.delete);

export { router as PonchadaRouter };
