import { Router } from 'express';
import { AlimentoController } from './Controller';

const controller = new AlimentoController();
const router = Router();

router.post('/alimento', controller.create);
router.get('/alimentos', controller.getAll);
router.get('/alimento/:id', controller.getById);
router.put('/alimento/:id', controller.update);
router.delete('/alimento/:id', controller.delete);

export { router as AlimentoRouter };
