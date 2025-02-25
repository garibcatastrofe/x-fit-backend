import { Router } from 'express';
import { MedicionController } from './Controller';

const controller = new MedicionController();
const router = Router();

router.post('/medicion', controller.create);
router.get('/mediciones', controller.getAll);
router.get('/medicion/:id', controller.getById);
router.put('/medicion/:id', controller.update);
router.delete('/medicion/:id', controller.delete);

export { router as MedicionRouter };
