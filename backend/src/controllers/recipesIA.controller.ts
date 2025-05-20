import { Request, Response } from "express";
import { generarRecetas } from "../apis/openAI.service";
import { productsService } from "../services/products.service";
import { generarImagenParaReceta } from "../utils/generarImagenParaReceta";
import { cacheRecipeService } from "../services/cacheRecipe.service";
import { RecetaIADoc, CachedRecipe } from "../models/cachedRecipeIA";
import { RecetaIA } from "../../../shared/types/Recipe";



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

      // === SALADA ===
      const recetaSaladaCache = await cacheRecipeService.buscar(nombres, "salada");
      let recetaSalada: RecetaIA;

      if (recetaSaladaCache) {
        recetaSalada = recetaSaladaCache.receta;
      } else {
        const promptSalada = `Como un chef experimentado y conocedor profundo de la gastronomía colombiana, tengo los siguientes productos: ${nombres.join(", ")}.
Sugiere una receta salada **auténtica y creativa**, que represente los sabores y técnicas culinarias de Colombia.
Devuelve únicamente un objeto JSON válido con las siguientes claves:
- "nombre" (string),
- "porciones" (string, por ejemplo: "4 personas"),
- "ingredientes" (array de strings, cada uno con cantidad y unidad),
- "pasos" (array de strings),
- "categoria" (string, debe ser UNA de: "Entrada", "Plato Fuerte", "Sopa", "Acompañamiento" o "Salsa").
No uses markdown ni bloques de código como \`\`\`. Solo el JSON crudo, sin texto adicional.`;

        const nueva = await generarRecetas(nombres, promptSalada);
        const image = await generarImagenParaReceta({
          nombre: nueva.nombre,
          ingredientes: nueva.ingredientes,
          tipo: "salada",
        });

        recetaSalada = {
          ...nueva,
          imageUrl: image ?? "",
          porciones: nueva.porciones,
        };

        await cacheRecipeService.guardar(nombres, "salada", {
          ...recetaSalada,
          imageUrl: recetaSalada.imageUrl ?? "",
        });
      }

      // === DULCE ===
      const recetaDulceCache = await cacheRecipeService.buscar(nombres, "dulce");
      let recetaDulce: RecetaIA;

      if (recetaDulceCache) {
        recetaDulce = recetaDulceCache.receta;
      } else {
        const promptDulce = `Como un chef experto en la repostería y dulces tradicionales de Colombia, tengo los siguientes productos: ${nombres.join(", ")}.
Sugiere una receta colombiana dulce, **auténtica y creativa**, que evoque los sabores y tradiciones de nuestro país.
Devuelve únicamente un objeto JSON válido con las siguientes claves:
- "nombre" (string),
- "porciones" (string, por ejemplo: "6 porciones"),
- "ingredientes" (array de strings),
- "pasos" (array de strings),
- "categoria" (string, debe ser "Postres" o una categoría específica de dulces colombianos como "Dulces Tradicionales" o "Postres Típicos").
No uses markdown ni bloques de código como \`\`\`. Solo el JSON crudo, sin texto adicional.`;

        const nueva = await generarRecetas(nombres, promptDulce);
        const image = await generarImagenParaReceta({
          nombre: nueva.nombre,
          ingredientes: nueva.ingredientes,
          tipo: "dulce",
        });

        recetaDulce = {
          ...nueva,
          imageUrl: image ?? "",
          porciones: nueva.porciones,
        };

        await cacheRecipeService.guardar(nombres, "dulce", {
          ...recetaDulce,
          imageUrl: recetaDulce.imageUrl ?? "",
        });
      }

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
