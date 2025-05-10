import { Request, Response } from 'express';
import { generarRecetas } from '../apis/openAI.service';
import { productsService } from '../services/products.service';

export const recipesIAController = {
  generarDesdeInventario: async (req: Request, res: Response) => {
    try {
      const productos = await productsService.getAll();

      if (!productos || productos.length === 0) {
        return res.status(404).json({ error: 'No se encontraron productos en el inventario' });
      }

      const nombres = productos.map(p => p.name).filter((nombre): nombre is string => !!nombre);

      const recetas = await Promise.all(
        Array.from({ length: 5 }).map(() => generarRecetas(nombres)) // Generar 5 recetas
      );

      // Adaptamos la respuesta para que la propiedad del título sea 'title'
      const recetasFormateadas = recetas.map(receta => ({
        _id: `ia-${Date.now()}-${Math.random()}`, // Genera un ID temporal en el backend
        title: receta.nombre, // Usamos 'nombre' de la respuesta de la IA como 'title'
        description: receta.pasos ? receta.pasos.slice(0, 1).join('') + '...' : 'Descripción generada por IA.', // Tomamos el primer paso como descripción breve
        image: receta.imageUrl || "src/assets/img/placeholder.png", // Usa la URL de la imagen
        ingredients: receta.ingredientes,
        steps: receta.pasos,
      }));

      res.status(200).json({ recetas: recetasFormateadas });
    } catch (error) {
      console.error('Error al generar las recetas con IA:', error);
      res.status(500).json({ error: 'No se pudieron generar recetas con IA' });
    }
  }
};