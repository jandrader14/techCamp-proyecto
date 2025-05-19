import { CachedRecipe } from "../models/cachedRecipeIA";
import mongoose from "mongoose";

export const cacheRecipeService = {
  // Buscar una receta generada con IA basada en los ingredientes exactos y el tipo
  buscarPorIngredientes: async (ingredientes: string[], tipo: "salada" | "dulce") => {
    if (!ingredientes.length) throw new Error("Lista de ingredientes requerida");
    if (!tipo) throw new Error("Tipo de receta requerido");

    return await CachedRecipe.findOne({
      tipo,
      ingredientes: { $all: ingredientes, $size: ingredientes.length },
    });
  },

  // Guardar una nueva receta generada con IA en la base de datos
  guardarReceta: async (
    ingredientes: string[],
    tipo: "salada" | "dulce",
    receta: {
      nombre: string;
      ingredientes: string[];
      pasos: string[];
      categoria: string;
      imageUrl: string;
    }
  ) => {
    if (!ingredientes.length || !tipo || !receta) {
      throw new Error("Datos incompletos para guardar la receta en caché");
    }

    const nueva = new CachedRecipe({
      tipo,
      ingredientes,
      receta,
    });

    await nueva.save();
    return nueva;
  },

  // Obtener por ID (opcional)
  getById: async (id: string) => {
    if (!id) throw new Error("ID requerido");
    return await CachedRecipe.findById(new mongoose.Types.ObjectId(id));
  },
};
