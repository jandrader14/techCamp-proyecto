import { Recipe } from "../models/recipe.model";
import mongoose from "mongoose";



export const recipeService = {
  getAllRecipes: async () => {
    return await Recipe.find().populate({
      path: 'ingredients.product',
      select: 'name'
    });
  },
  getRecipeById: async (id: string) => {
  return await Recipe.findOne({ _id: new mongoose.Types.ObjectId(id) }).populate({
    path: 'ingredients.product',
    select: 'name'
  });
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
  },
  deleteRecipe: async (id: string) => {
    if (!id) throw new Error("ID requerido");

    return await Recipe.findByIdAndDelete(id);
  }


}

