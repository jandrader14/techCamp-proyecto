import { Recipe } from "../models/recipe.model";


export const recipeService = {
  getAllRecipes: async () => {
    return await Recipe.find(); // Obtenemos todas las recetas de la base de datos
  },
  createRecipe: async (
    name: string,
    image: string,
    portions: string,
    category: string,
    preparation: string,
    ingredients: { productId: string; quantity: number; unit: string }[]
  ) => {
    if (!name || !image || !portions || !category || !preparation || ingredients.length === 0) {
      throw new Error("Todos los campos son obligatorios");
    }
  
    const formattedIngredients = ingredients.map((ing) => ({
      product: ing.productId,
      quantity: ing.quantity,
      unit: ing.unit,
    }));
  
    const newRecipe = new Recipe({
      name,
      image,
      portions,
      category,
      preparation,
      ingredients: formattedIngredients,
    });
  
    await newRecipe.save();
    return newRecipe;
  }
  

}

