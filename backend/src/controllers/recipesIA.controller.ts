import { Request, Response } from 'express';
import { generarRecetas } from '../apis/openAI.service';
import { productsService } from '../services/products.service';

export const recipesIAController = {
  generarDesdeInventario: async (req: Request, res: Response) => {
    try {
      //Get products from the inventory
      const productos = await productsService.getAll(); // ← usamos el service directo aquí
      console.log("Productos del inventario:", productos);

      if (!productos || productos.length === 0) {
        return res.status(404).json({ error: 'No se encontraron productos en el inventario' });
      }

      const nombres = productos.map(p => p.name).filter((nombre): nombre is string => !!nombre);

      const receta = await generarRecetas(nombres);

      res.status(200).json(receta);
    } catch (error) {
      console.error('Error al generar la receta con IA:', error);
      res.status(500).json({ error: 'No se pudo generar la receta con IA' });
    }
  }
};
