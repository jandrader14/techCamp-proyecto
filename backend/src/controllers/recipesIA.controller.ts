import { Request, Response } from "express";
import { productsService } from "../services/products.service";
import { generateAndCacheRecipe } from "../utils/recipeGenerator";
import { CachedRecipe } from "../models/cachedRecipeIA";

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

      const categorias: { tipo: "salada" | "dulce"; categoria: string }[] = [
        { tipo: "salada", categoria: "Entradas" },
        { tipo: "salada", categoria: "Platos Fuertes" },
        { tipo: "dulce", categoria: "Postres" },
        { tipo: "salada", categoria: "Sopas y Salsas" },
      ];

      const recetasFormateadas = [];

      for (const { tipo, categoria } of categorias) {
        const prompt = `Tengo estos ingredientes: ${nombres.join(", ")}.
Sugiéreme una receta colombiana del tipo ${categoria}, distinta a recetas anteriores.
Devuelve únicamente un objeto JSON válido con las claves:
- "nombre": string,
- "porciones": string (ej. "4 personas"),
- "ingredientes": array de strings con cantidad y unidad,
- "pasos": array de strings,
- "categoria": debe ser exactamente "${categoria}"`;

        const receta = await generateAndCacheRecipe(nombres, tipo, prompt, ignorarCache);


        recetasFormateadas.push({
          _id: `${tipo}-${Date.now()}`,
          title: receta.nombre,
          description: receta.pasos[0] + "...",
          image: receta.imageUrl,
          ingredients: receta.ingredientes,
          steps: receta.pasos,
          category: receta.categoria,
          portions: receta.porciones,
        });
      }

      res.status(200).json({ recetas: recetasFormateadas });
    } catch (error) {
      console.error("Error al generar las recetas con IA:", error);
      res.status(500).json({ error: "No se pudieron generar recetas con IA" });
    }
  },

  obtenerHistorial: async (_req: Request, res: Response) => {
    try {
      const recetas = await CachedRecipe.find().sort({ createdAt: -1 });

      const recetasUnicas = new Map();
      for (const r of recetas) {
        if (!recetasUnicas.has(r.receta.nombre)) {
          recetasUnicas.set(r.receta.nombre, {
            _id: r._id,
            title: r.receta.nombre,
            description: r.receta.pasos[0] + "...",
            image: r.receta.imageUrl,
            ingredients: r.receta.ingredientes,
            steps: r.receta.pasos,
            category: r.receta.categoria,
            tipo: r.tipo,
            portions: r.receta.porciones,
          });
        }
      }

      res.status(200).json({ recetas: Array.from(recetasUnicas.values()) });
    } catch (error) {
      console.error("Error al obtener historial IA:", error);
      res.status(500).json({ error: "No se pudo obtener el historial de recetas IA" });
    }
  },
};
