import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { RecipeCard } from "../../molecules/RecipeCard/RecipeCard";
import { ChevronRight } from "lucide-react";
import { FormModal } from "../FormModal/FormModal";
import { RecipeDetail } from "../../molecules/RecipeDetail/RecipeDetail";
import { useModal } from "../../../hooks/useModal";
import { Recipe } from "../../../../shared/types/Recipe";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styles from "./RecipesInventory.module.css";

interface IARecipeResponse {
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  steps: string[];
  category: string;
  _id: string;
}

interface ApiResponse {
  recetas?: IARecipeResponse[];
}

export function RecipeInventory() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {
    isOpen: isModalOpen,
    selectedItem: selectedRecipe,
    openModal: openRecipeModal,
    closeModal: closeRecipeModal,
  } = useModal<Recipe>();

  const MAX_TITLE_LENGTH = 40;

  useEffect(() => {
    const fetchIARecipes = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          "http://localhost:5000/api/recipes/suggest/generar"
        );
        console.log("Respuesta cruda del backend:", response.data.recetas);

        if (
          response.data?.recetas &&
          Array.isArray(response.data.recetas) &&
          response.data.recetas.length > 0
        ) {
          const mappedRecipes: Recipe[] = response.data.recetas
            .slice(0, 6)
            .map((recipe, index) => ({
              _id: recipe._id || `ia-${index + 1}`,
              name: recipe.title || `Receta IA ${index + 1}`,
              description: recipe.description || "Descripción generada por IA.",
              image: recipe.image || "/img/advertencia.png",
              ingredients: (recipe.ingredients || []).map((item: string) => ({
                product: { _id: "", name: item, expiryDate: "" },
                quantity: 1,
                unit: "",
              })),
              steps: recipe.steps || [],
              portions: "2",
              category: recipe.category || "General",
              preparation: (recipe.steps || []).join("\n"),
            }));

          setRecipes(mappedRecipes);
        } else {
          setError("No se encontraron recetas en la respuesta.");
          setRecipes([]);
        }
      } catch (error) {
        console.error("Error al obtener recetas de la IA:", error);
        setError("Error al obtener recetas de la IA.");
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIARecipes();
  }, []);

  console.log("Recetas cargadas:", recipes);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recetas recomendadas</h2>
        {loading && (
              <div className={styles.loaderContainer}>
                <DotLottieReact
                  src="https://lottie.host/da3c764a-a93c-4004-8756-49267e405618/TjOyEDjN50.lottie"
                  loop
                  autoplay
                />
              </div>
            )}
        {error && <p className={styles.error}>{error}</p>}

        <Link to="/recetas" className={styles.button}>
          Ver todas <ChevronRight size={18} className={styles.icon} />
        </Link>
      </div>

      <div className={styles.cardContainer}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            id={recipe._id}
            title={recipe.name}
            image={recipe.image}
            category={recipe.category}
            portions={recipe.portions}
            onViewDetails={() => openRecipeModal(recipe)}
            className={styles.recipeCard}
            maxTitleLength={MAX_TITLE_LENGTH}
          />
        ))}
        {recipes.length === 0 && !loading && !error && (
          <p>No hay recetas recomendadas en este momento.</p>
        )}
      </div>

      {isModalOpen && selectedRecipe && (
        <FormModal onClose={closeRecipeModal}>
          <RecipeDetail
            recipe={{
              ...selectedRecipe,
              preparation: Array.isArray(selectedRecipe.preparation)
                ? (selectedRecipe.preparation as string[]).join("\n")
                : selectedRecipe.preparation,
            }}
            onDeleteRecipe={() => {}}
          />
        </FormModal>
      )}
    </section>
  );
}
