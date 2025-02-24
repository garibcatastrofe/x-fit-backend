import { Router } from 'express';
import { DietaController } from './Controller';

const controller = new DietaController();
const router = Router();

router.post('/dieta', controller.create);
router.get('/dietas', controller.getAll);
router.get('/dieta/:id', controller.getById);
router.put('/dieta/:id', controller.update);
router.delete('/dieta/:id', controller.delete);

export { router as DietaRouter };
