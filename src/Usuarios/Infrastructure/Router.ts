import { Router } from 'express';
import { UsuarioController } from './Controllers';

const controller = new UsuarioController();
const router = Router();

router.post('/usuario', controller.create);
router.get('/usuarios', controller.getAll);
router.get('/usuario/:id', controller.getById);
router.put('/usuario/:id', controller.update);
router.delete('/usuario/:id', controller.delete);

export { router as UsuarioRouter };
