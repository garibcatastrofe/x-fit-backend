import { Router } from 'express';
import { EmpleadoController } from './Controller';

const controller = new EmpleadoController();
const router = Router();

router.post('/empleado', controller.create);
router.get('/empleados', controller.getAll);
router.get('/empleado/:id', controller.getById);
router.put('/empleado/:id', controller.update);
router.delete('/empleado/:id', controller.delete);

export { router as EmpleadoRouter };
