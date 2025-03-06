import { Router } from 'express';
import { ReporteController } from './Controller';

const controller = new ReporteController();
const router = Router();

router.post('/reporte', controller.create);
router.get('/reportes', controller.getAll);
router.get('/reporte/:id', controller.getById);
router.put('/reporte/:id', controller.update);
router.delete('/reporte/:id', controller.delete);

export { router as ReporteRouter };
