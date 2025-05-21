import { generarRecetas } from "../apis/openAI.service";
import { generarImagenParaReceta } from "./generarImagenParaReceta";
import { cacheRecipeService } from "../services/cacheRecipe.service";
import { RecetaIA } from "../../../shared/types/Recipe";

export const generateAndCacheRecipe = async (
  nombres: string[],
  tipo: "salada" | "dulce",
  prompt: string,
  ignorarCache = false,
): Promise<RecetaIA> => {
  if (!ignorarCache) {
    const recetaCache = await cacheRecipeService.buscar(nombres, tipo);
    if (recetaCache) {
      console.log(`Receta ${tipo} encontrada en caché.`);
      return recetaCache.receta;
    }
  }

  console.log(`Generando nueva receta ${tipo}...`);
  const nueva = await generarRecetas(nombres, prompt);
  const image = await generarImagenParaReceta({
    nombre: nueva.nombre,
    ingredientes: nueva.ingredientes,
    tipo: tipo,
  });

  const recetaFinal: RecetaIA = {
    ...nueva,
    imageUrl: image ?? "",
    porciones: nueva.porciones,
  };

  await cacheRecipeService.guardar(nombres, tipo, {
    ...recetaFinal,
    imageUrl: recetaFinal.imageUrl ?? "",
  });

  return recetaFinal;
};