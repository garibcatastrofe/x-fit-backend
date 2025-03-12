import { Router } from 'express';
import { UsuarioController } from './Controllers';

const controller = new UsuarioController();
const router = Router();

router.post('/usuario', controller.create);
router.post('/usuario-login', controller.login);
router.get('/usuario-verify', controller.verify);
router.post('/usuario-logout', controller.logout);
router.get('/usuarios', controller.getAll);
router.get('/usuario/:id', controller.getById);
router.put('/usuario/:id', controller.update);
router.delete('/usuario/:id', controller.delete);

export { router as UsuarioRouter };
