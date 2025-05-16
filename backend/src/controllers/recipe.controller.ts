import { Request, Response } from "express";
import mongoose from "mongoose";
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
    getById: async (req: Request, res: Response) => {
        console.log("📥 Entrando a getById con ID:", req.params.id);
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const recipe = await recipeService.getRecipeById(id);
        if (!recipe) {
            return res.status(404).json({ message: "Receta no encontrada" });
        }

        return res.status(200).json(recipe);
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
    delete: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const deleted = await recipeService.deleteRecipe(id);
            if (!deleted) {
                return res.status(404).json({ message: "Receta no encontrada" });
            }

            return res.status(200).json({ message: "Receta eliminada correctamente" });
        } catch (error) {
            res.status(500).json({
                message: "Error al eliminar la receta",
                error: (error as Error).message,
            });
        }
    },
};
