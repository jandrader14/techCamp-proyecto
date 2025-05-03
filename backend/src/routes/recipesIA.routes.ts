import { Router } from 'express';
import { recipesIAController } from '../controllers/recipesIA.controller';

const router = Router();



router.get('/generar', (req, res, next) => {
    recipesIAController.generarDesdeInventario(req, res).catch(next);
});



export default router;
