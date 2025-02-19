import { Router } from 'express';
import { ClienteController } from './Controller';

const controller = new ClienteController();
const router = Router();

router.post('/cliente', controller.create);
router.get('/clientes', controller.getAll);
router.get('/cliente/:id', controller.getById);
router.put('/cliente/:id', controller.update);
router.delete('/cliente/:id', controller.delete);

export { router as ClienteRouter };
