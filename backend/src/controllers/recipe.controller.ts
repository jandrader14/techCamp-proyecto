import { Request, Response } from "express";
import { recipeService } from "../services/recipe.service";



export const recipeController = {
    getAllRecipes: async (req: Request, res: Response) => {
        try {
            const data = await recipeService.getAllRecipes(); // Llamamos al service para obtener todas las recetas
            return res.json(data); // Enviamos las recetas como respuesta
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    },
    create: async (req: Request, res: Response) => {
        const { name, image, portions, category, preparation, ingredients } = req.body;

        try {
            const newRecipe = await recipeService.createRecipe(name, image, portions, category, preparation, ingredients); // Llamamos al service
            res.status(201).json(newRecipe); // Respondemos con la receta creada
        } catch (error) {
            res.status(500).json({
                message: "Error al crear la receta",
                error: (error as Error).message, // ✅ muestra mensaje más claro
              });
        }
    },
};
