import { CachedRecipe } from "../models/cachedRecipeIA";
import mongoose from "mongoose";

export const cacheRecipeService = {
  // Buscar receta cacheada por ingredientes y tipo
  buscar: async (ingredientes: string[], tipo: "salada" | "dulce") => {
    if (!ingredientes.length) throw new Error("Lista de ingredientes requerida");
    if (!tipo) throw new Error("Tipo de receta requerido");

    return await CachedRecipe.findOne({
      tipo,
      ingredientes: { $all: ingredientes, $size: ingredientes.length },
    });
  },

  // Guardar receta cacheada
  guardar: async (
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

  getById: async (id: string) => {
    if (!id) throw new Error("ID requerido");
    return await CachedRecipe.findById(new mongoose.Types.ObjectId(id));
  },
};
