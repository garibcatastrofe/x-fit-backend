import { Router } from 'express';
import { RuffierController } from './Controller';

const controller = new RuffierController();
const router = Router();

router.post('/ruffier', controller.create);
router.get('/ruffiers', controller.getAll);
router.get('/ruffier/:id', controller.getById);
router.put('/ruffier/:id', controller.update);
router.delete('/ruffier/:id', controller.delete);

export { router as RuffierRouter };
