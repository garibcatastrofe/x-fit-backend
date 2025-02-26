import { Router } from 'express';
import { RespuestaController } from './Controller';

const controller = new RespuestaController();
const router = Router();

router.post('/respuesta', controller.create);
router.get('/respuestas', controller.getAll);
router.get('/respuesta/:id', controller.getById);
router.put('/respuesta/:id', controller.update);
router.delete('/respuesta/:id', controller.delete);

export { router as RespuestaRouter };
