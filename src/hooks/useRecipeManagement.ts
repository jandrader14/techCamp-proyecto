import { useState } from "react";
import { Recipe } from "../../shared/types/Recipe";
import { recipeApi } from "../services/recipes.api";

interface UseRecipeManagementInterface {
  selectedRecipe: Recipe | null;
  showModal: boolean;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteRecipe: (
    recipeId: string,
    setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
  ) => Promise<void>;
  handleEditRecipe: (recipe: Recipe) => void;
  handleSaveRecipe: (updatedRecipe: Recipe, onUpdateRecipe: (updatedRecipe: Recipe) => Promise<void>) => Promise<void>;
  handleOpenRecipeDetail: (recipe: Recipe) => void;
}

export const useRecipeManagement = (): UseRecipeManagementInterface => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleDeleteRecipe = async (
    recipeId: string,
    setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
  ) => {
    try {
      await recipeApi.deleteRecipe(recipeId);
      setRecipes((prev) => prev.filter((r) => r._id !== recipeId));
      setShowModal(false);
    } catch (error) {
      console.error("Error al eliminar la receta:", error);
    }
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
    // Aquí podrías también manejar la apertura de un formulario de edición diferente
  };

  const handleSaveRecipe = async (updatedRecipe: Recipe, onUpdateRecipe: (updatedRecipe: Recipe) => Promise<void>) => {
    try {
      await onUpdateRecipe(updatedRecipe);
      setShowModal(false);
      setSelectedRecipe(null);
    } catch (error) {
      console.error("Error al actualizar la receta:", error);
    }
  };

  const handleOpenRecipeDetail = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  return {
    selectedRecipe,
    showModal,
    setSelectedRecipe,
    setShowModal,
    handleDeleteRecipe,
    handleEditRecipe,
    handleSaveRecipe,
    handleOpenRecipeDetail,
  };
};