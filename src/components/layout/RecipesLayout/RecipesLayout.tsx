import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { SidebarNav } from "../../organisms/SidebarNav/SidebarNav";
import { Header } from "../../organisms/Header/Header";
import { Recipe } from "../../../../shared/types/Recipe";
import { recipeApi } from "../../../services/recipes.api";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styles from "./RecipesLayout.module.css";

interface RecipeContext {
  recipes: Recipe[];
  fetchRecipes: () => Promise<void>;
  onAddRecipe: (newRecipe: Recipe) => Promise<void>;
  onUpdateRecipe: (updatedRecipe: Recipe) => Promise<void>;
}

export function RecipesLayout() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecipes = async () => {
    console.log("RecipesLayout: fetchRecipes ejecutado.");
    try {
      const data = await recipeApi.getAll();
      setRecipes(data);
      console.log(
        "RecipesLayout: Recetas obtenidas de la API y estado actualizado."
      );
    } catch (error) {
      console.error("RecipesLayout: Error al obtener recetas:", error);
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleAddNewRecipe = async (newRecipe: Omit<Recipe, "_id" | "__v">) => {
    try {
      await recipeApi.createRecipe(newRecipe);
      await fetchRecipes(); // Recarga la lista después de agregar
    } catch (error) {
      console.error("Error al guardar la nueva receta:", error);
    }
  };

  const handleUpdateRecipe = async (updatedRecipe: Recipe) => {
    try {
      await recipeApi.updateRecipe(updatedRecipe._id, updatedRecipe);
      await fetchRecipes(); // Recarga la lista después de la actualización
    } catch (error) {
      console.error("Error al actualizar la receta:", error);
    }
  };

  return (
    <div className={styles.inventoryContainer}>
      <SidebarNav />
      <div className={styles.inventoryContent}>
        <Header />
        <main className={styles.mainSection}>
          <div className={styles.mainContent}>
            {loading ? (
              <div className={styles.loaderContainer}>
                <DotLottieReact
                  src="https://lottie.host/66534f5d-de93-4a82-844b-75619edda472/1LTVmxJQ4e.lottie"
                  loop
                  autoplay
                />
              </div>
            ) : (
              <Outlet
                context={
                  {
                    recipes: recipes,
                    fetchRecipes: fetchRecipes,
                    onAddRecipe: handleAddNewRecipe,
                    onUpdateRecipe: handleUpdateRecipe,
                  } as RecipeContext
                }
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
