import { Router } from 'express';
import { CpmpController } from './Controller';

const controller = new CpmpController();
const router = Router();

router.post('/cpmp', controller.create);
router.get('/cpmps', controller.getAll);
router.get('/cpmp/:id', controller.getById);
router.put('/cpmp/:id', controller.update);
router.delete('/cpmp/:id', controller.delete);

export { router as CpmpRouter };
