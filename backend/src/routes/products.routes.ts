import { Router } from "express";
import { createProduct } from "../controllers/products.controller";

const router = Router();

router.get('/test', (req, res) => {
    res.send("✅ Ruta de productos funcionando");
  });
  
// Esta es la ruta para crear un producto
router.post("/", (req, res, next) => {
  createProduct(req, res).catch(next); // Manejo de errores async
});

export default router;
