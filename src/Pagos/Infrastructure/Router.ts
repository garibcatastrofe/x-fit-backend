import { Router } from 'express';
import { PagoController } from './Controllers';

const controller = new PagoController();
const router = Router();

router.post('/pago', controller.create);
router.post('/pagos', controller.getAll);
router.get('/pago/:id', controller.getById);
router.put('/pago/:id', controller.update);
router.delete('/pago/:id', controller.delete);

export { router as PagoRouter };
