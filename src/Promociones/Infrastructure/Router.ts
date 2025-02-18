import { Router } from 'express';
import { PromocionController } from './Controllers';

const controller = new PromocionController();
const router = Router();

router.post('/promocion', controller.create);
router.get('/promociones', controller.getAll);
router.get('/promocion/:id', controller.getById);
router.put('/promocion/:id', controller.update);
router.delete('/promocion/:id', controller.delete);

export { router as PromocionRouter };
