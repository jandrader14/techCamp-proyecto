import axios from 'axios';
import { Recipe } from "../../shared/types/Recipe"

const RecipesEndpoint = "http://localhost:5000/api/recipes";

export const recipeApi = {
  getAll: async () => {
    const response = await axios.get(RecipesEndpoint);
    return response.data;
  },

  createRecipe: async (newRecipe: Omit<Recipe, "_id" | "__v">) => {
    const response = await axios.post(RecipesEndpoint, newRecipe);
    console.log("Receta creada ✈️:", response.data);
    return response.data;
  },

  updateRecipe: async (recipeId: string, updatedRecipe: Recipe) =>{
    const response = await axios.patch(`${RecipesEndpoint}/${recipeId}`, updatedRecipe);
    return response.data;
  },
  

  deleteRecipe: async (recipeId: string) => {
    const response = await axios.delete(`${RecipesEndpoint}/${recipeId}`);
    return response.data;
  }
};


