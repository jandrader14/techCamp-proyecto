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

      // Generar una receta salada
      const recetaSaladaPrompt = `Tengo los siguientes productos: ${nombres.join(', ')}.
Sugiere una receta colombiana salada y creativa.
Devuelve únicamente un objeto JSON válido con las siguientes claves:
- "nombre" (string),
- "ingredientes" (array de strings, cada uno con cantidad y unidad, por ejemplo: "2 tazas de harina de trigo"),
- "pasos" (array de strings),
- "categoria" (string, debe ser UNA de las siguientes: "Entradas", "Platos Fuertes", "Sopas y Salsas").

No incluyas texto adicional ni explicaciones ni bloques de código. Solo el JSON.`;

      const recetaSalada = await generarRecetas(nombres, recetaSaladaPrompt);

      // Generar una receta dulce
      const recetaDulcePrompt = `Tengo los siguientes productos: ${nombres.join(', ')}.

Sugiere una receta colombiana dulce y creativa.

Devuelve únicamente un objeto JSON válido con las siguientes claves:
- "nombre" (string),
- "ingredientes" (array de strings, cada uno con cantidad y unidad, por ejemplo: "1 taza de azúcar"),
- "pasos" (array de strings),
- "categoria" (string, debe ser "Postres").

No incluyas texto adicional ni explicaciones ni bloques de código. Solo el JSON.`;


      const recetaDulce = await generarRecetas(nombres, recetaDulcePrompt);

      const recetasFormateadas = [
        {
          _id: `salada-${Date.now()}-${Math.random()}`,
          title: recetaSalada.nombre, // Accede a la propiedad 'nombre' del objeto recetaSalada
          description: recetaSalada.pasos ? recetaSalada.pasos.slice(0, 1).join('') + '...' : 'Receta salada.',
          image: recetaSalada.imageUrl || "src/assets/img/placeholder.png",
          ingredients: recetaSalada.ingredientes, // Accede a la propiedad 'ingredientes'
          steps: recetaSalada.pasos,
          category: recetaSalada.categoria || "Platos Fuertes",
        },
        {
          _id: `dulce-${Date.now()}-${Math.random()}`,
          title: recetaDulce.nombre,
          description: recetaDulce.pasos ? recetaDulce.pasos.slice(0, 1).join('') + '...' : 'Receta dulce.',
          image: recetaDulce.imageUrl || "src/assets/img/placeholder.png",
          ingredients: recetaDulce.ingredientes, 
          steps: recetaDulce.pasos, 
          category: recetaDulce.categoria || "Postres",
        },
        
      ];

      res.status(200).json({ recetas: recetasFormateadas });
    } catch (error) {
      console.error('Error al generar las recetas con IA:', error);
      res.status(500).json({ error: 'No se pudieron generar recetas con IA' });
    }
  },
};