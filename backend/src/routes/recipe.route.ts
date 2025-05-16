import { Router } from 'express';
import { recipeController } from "../controllers/recipe.controller";

const router = Router();


// Obtener todas los recetas
router.get('/', (req, res, next) => {
    recipeController.getAllRecipes(req, res).catch(next);
});

router.get('/:id', (req, res, next) => {
  recipeController.getById(req, res).catch(next);
});

// Crear una nueva receta
router.post('/', (req, res, next) => {
    recipeController.create(req, res).catch(next);
});

router.delete('/:id', (req, res, next) => {
  recipeController.delete(req, res).catch(next);
});

export default router;
