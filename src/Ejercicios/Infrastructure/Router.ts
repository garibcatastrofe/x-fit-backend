import { Router } from 'express';
import { EjercicioController } from './Controller';

const controller = new EjercicioController();
const router = Router();

router.post('/ejercicio', controller.create);
router.post('/ejercicios', controller.getAll);
router.get('/ejercicio/:id', controller.getById);
router.put('/ejercicio/:id', controller.update);
router.delete('/ejercicio/:id', controller.delete);

export { router as EjercicioRouter };
