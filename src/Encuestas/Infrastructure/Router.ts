import { Router } from 'express';
import { EncuestaController } from './Controller';

const controller = new EncuestaController();
const router = Router();

router.post('/encuesta', controller.create);
router.get('/encuestas', controller.getAll);
router.get('/encuesta/:id', controller.getById);
router.put('/encuesta/:id', controller.update);
router.delete('/encuesta/:id', controller.delete);

export { router as EncuestaRouter };
