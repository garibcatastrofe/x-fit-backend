import { Router } from 'express';
import { DietaController } from './Controller';

const controller = new DietaController();
const router = Router();

router.post('/dieta', controller.create);
/* router.get('/alimentos', controller.getAll);
router.get('/alimento/:id', controller.getById);
router.put('/alimento/:id', controller.update);
router.delete('/alimento/:id', controller.delete); */

export { router as DietaRouter };
