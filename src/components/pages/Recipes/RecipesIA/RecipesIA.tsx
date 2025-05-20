import { useEffect, useState } from "react";
import axios from "axios";
import { Recipe } from "../../../../../shared/types/Recipe";
import { RecipesCarrusel } from "../../../organisms/RecipesCarrusel/RecipesCarrusel";
import { FormModal } from "../../../organisms/FormModal/FormModal";
import { RecipeDetail } from "../../../molecules/RecipeDetail/RecipeDetail";
import { useModal } from "../../../../hooks/useModal";

import styles from "./RecipesIA.module.css";

type IARecipe = Recipe & {
  tipo: "salada" | "dulce";
};

interface IARecipeResponse {
  _id: string;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  steps: string[];
  category: string;
  tipo: "salada" | "dulce";
}

export const RecipesIA: React.FC = () => {
  const [recipes, setRecipes] = useState<IARecipe[]>([]);
  const {
    isOpen: isModalOpen,
    selectedItem: selectedRecipe,
    closeModal,
  } = useModal<IARecipe>();

  useEffect(() => {
    const fetchIARecipes = async () => {
      try {
        const response = await axios.get<{ recetas: IARecipeResponse[] }>(
          "http://localhost:5000/api/recipes/suggest/historial"
        );

        const formatted: IARecipe[] = response.data.recetas.map(
          (recipe, index) => ({
            _id: recipe._id || `ia-${index}`,
            name: recipe.title,
            description: recipe.description,
            image: recipe.image,
            ingredients: recipe.ingredients.map((name) => ({
              product: { _id: "", name, expiryDate: "" },
              quantity: 1,
              unit: "",
            })),
            steps: recipe.steps,
            preparation: recipe.steps.join("\n"),
            portions: "2",
            category: recipe.category,
            tipo: recipe.tipo,
          })
        );

        setRecipes(formatted);
      } catch (error) {
        console.error("Error cargando recetas IA:", error);
      }
    };

    fetchIARecipes();
  }, []);

  const recetasPorTipo: Record<string, IARecipe[]> = recipes.reduce(
    (acc, recipe) => {
      if (!acc[recipe.tipo]) acc[recipe.tipo] = [];
      acc[recipe.tipo].push(recipe);
      return acc;
    },
    {} as Record<string, IARecipe[]>
  );

  return (
  <>
    {Object.entries(recetasPorTipo).map(([tipo, recetas]) => (
      <div key={tipo} className={styles.section}>
        <RecipesCarrusel
          recipes={recetas}
          currentCategory={
            tipo === "salada" ? "Recetas saladas" : "Postres 🍨"
          }
          onDeleteRecipe={() => {}}
        />
      </div>
    ))}

    {selectedRecipe && isModalOpen && (
      <FormModal isOpen onClose={closeModal} title={selectedRecipe.name}>
        <RecipeDetail recipe={selectedRecipe} onDeleteRecipe={() => {}} />
      </FormModal>
    )}
  </>
);

};
