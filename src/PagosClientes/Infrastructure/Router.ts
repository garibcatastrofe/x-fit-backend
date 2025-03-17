import { Router } from 'express';
import { PagoClienteController } from './Controllers';

const controller = new PagoClienteController();
const router = Router();

router.post('/pago-cliente', controller.create);
router.get('/pagos-clientes', controller.getAll);
router.get('/pago-cliente/:id', controller.getById);
router.put('/pago-cliente/:id', controller.update);
router.delete('/pago-cliente/:id', controller.delete);

export { router as PagoClienteRouter };
