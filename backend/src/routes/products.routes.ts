import { Router } from 'express';
import { productsController } from '../controllers/products.controller';

const router = Router();

// Obtener todos los productos
router.get('/', (req, res, next) => {
  productsController.getAllProducts(req, res).catch(next);
});

// Crear un nuevo producto
router.post('/', (req, res, next) => {
  productsController.create(req, res).catch(next);
});

// Obtener un producto por ID
//router.get('/:id', (req, res, next) => {
 // productsController.getById(req, res).catch(next);
//});

// Actualizar un producto
router.patch('/:id', (req, res, next) => {
  productsController.update(req, res).catch(next);
});

// Eliminar un producto
router.delete('/:id', (req, res, next) => {
  productsController.delete(req, res).catch(next);
});

export default router;
