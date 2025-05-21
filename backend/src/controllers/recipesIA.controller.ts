import { Request, Response } from "express";
import { productsService } from "../services/products.service";
import { generateAndCacheRecipe } from "../utils/recipeGenerator";
import { cacheRecipeService } from "../services/cacheRecipe.service";
import { RecetaIADoc, CachedRecipe } from "../models/cachedRecipeIA";

export const recipesIAController = {
  generarDesdeInventario: async (req: Request, res: Response) => {
    try {
      const productos = await productsService.getAll();

      if (!productos || productos.length === 0) {
        return res.status(404).json({ error: "No se encontraron productos en el inventario" });
      }

      const nombres = productos
        .map((p) => p.name)
        .filter((nombre): nombre is string => !!nombre);

      const ignorarCache = req.query.forzar === 'true';

      const promptSalada = `Tengo los siguientes productos: ${nombres.join(", ")}.
Sugiere una receta colombiana salada y creativa.
Devuelve únicamente un objeto JSON válido con las siguientes claves:
- "nombre" (string),
- "porciones" (string, por ejemplo: "4 personas"),
- "ingredientes" (array de strings, cada uno con cantidad y unidad),
- "pasos" (array de strings),
- "categoria" (string, debe ser UNA de: "Entradas", "Platos Fuertes", "Sopas y Salsas").
No incluyas texto adicional ni explicaciones. Solo el JSON.`;

      const promptDulce = `Tengo los siguientes productos: ${nombres.join(", ")}.
Sugiere una receta colombiana dulce y creativa.
Devuelve únicamente un objeto JSON válido con las siguientes claves:
- "nombre" (string),
- "porciones" (string, por ejemplo: "6 porciones"),
- "ingredientes" (array de strings),
- "pasos" (array de strings),
- "categoria" (string, debe ser "Postres").
No incluyas texto adicional ni explicaciones. Solo el JSON.`;

      const recetaSalada = ignorarCache
        ? await generateAndCacheRecipe(nombres, "salada", promptSalada)
        : (await cacheRecipeService.buscar(nombres, "salada"))?.receta || await generateAndCacheRecipe(nombres, "salada", promptSalada);

      const recetaDulce = ignorarCache
        ? await generateAndCacheRecipe(nombres, "dulce", promptDulce)
        : (await cacheRecipeService.buscar(nombres, "dulce"))?.receta || await generateAndCacheRecipe(nombres, "dulce", promptDulce);

      const recetasFormateadas = [
        {
          _id: `salada-${Date.now()}`,
          title: recetaSalada.nombre,
          description: recetaSalada.pasos[0] + "...",
          image: recetaSalada.imageUrl,
          ingredients: recetaSalada.ingredientes,
          steps: recetaSalada.pasos,
          category: recetaSalada.categoria,
          portions: recetaSalada.porciones,
        },
        {
          _id: `dulce-${Date.now()}`,
          title: recetaDulce.nombre,
          description: recetaDulce.pasos[0] + "...",
          image: recetaDulce.imageUrl,
          ingredients: recetaDulce.ingredientes,
          steps: recetaDulce.pasos,
          category: recetaDulce.categoria,
          portions: recetaDulce.porciones,
        },
      ];

      res.status(200).json({ recetas: recetasFormateadas });
    } catch (error) {
      console.error("Error al generar las recetas con IA:", error);
      res.status(500).json({ error: "No se pudieron generar recetas con IA" });
    }
  },

  obtenerHistorial: async (_req: Request, res: Response) => {
    try {
      const recetas = await CachedRecipe.find().sort({ createdAt: -1 });

      const recetasFormateadas = recetas.map((r: RecetaIADoc) => ({
        _id: r._id,
        title: r.receta.nombre,
        description: r.receta.pasos[0] + "...",
        image: r.receta.imageUrl,
        ingredients: r.receta.ingredientes,
        steps: r.receta.pasos,
        category: r.receta.categoria,
        tipo: r.tipo,
        portions: r.receta.porciones,
      }));

      res.status(200).json({ recetas: recetasFormateadas });
    } catch (error) {
      console.error("Error al obtener historial IA:", error);
      res.status(500).json({ error: "No se pudo obtener el historial de recetas IA" });
    }
  },
};
