import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import styles from "./RecipesInventory.module.css";
import { RecipeCard } from "../../molecules/RecipeCard/RecipeCard";
import { ChevronRight } from "lucide-react";
import { FormModal } from "../FormModal/FormModal";
import { RecipeDetail } from "../../molecules/RecipeDetail/RecipeDetail";

interface Recipe {
  _id: string;
  title: string;
  description: string;
  image: string;
  ingredients?: string[];
  steps?: string[];
}

interface IARecipeResponse {
  nombre?: string;
  ingredientes?: string[];
  pasos?: string[];
  imageUrl?: string | null;
}

interface ApiResponse {
  recetas?: IARecipeResponse[];
}

export function RecipeInventory() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const MAX_TITLE_LENGTH = 40;

  const openRecipeModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const closeRecipeModal = () => {
    setSelectedRecipe(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchIARecipes = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          "http://localhost:5000/api/recipes/suggest/generar"
        );
        console.log("Respuesta del backend:", response.data);
        if (
          response.data &&
          response.data.recetas &&
          Array.isArray(response.data.recetas) &&
          response.data.recetas.length > 0
        ) {
          const mappedRecipes = response.data.recetas.slice(0, 3).map((recipe: IARecipeResponse, index: number) => ({
            _id: `ia-${index + 1}`,
            title: recipe.nombre || `Receta IA ${index + 1}`,
            description: recipe.pasos ? recipe.pasos.slice(0, 1).join('') + '...' : "Descripción generada por IA.",
            image: recipe.imageUrl || "src/assets/img/advertencia.png",
            ingredients: recipe.ingredientes || [],
            steps: recipe.pasos || [],
          }));
          setRecipes(mappedRecipes);
          console.log("Estado recipes después de setRecipes:", mappedRecipes); // <---- AGREGA ESTE LOG
        } else {
          setError("No se encontraron recetas en la respuesta.");
          setRecipes([]);
        }
      } catch (err) {
        setError("Error al obtener recetas de la IA.");
        console.error("Error al obtener recetas de la IA:", err);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchIARecipes();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recetas recomendadas</h2>
        {loading && <p>Cargando recetas...</p>}
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
            title={recipe.title} // Pasamos el título completo
            description={recipe.description}
            image={recipe.image}
            onViewDetails={() => openRecipeModal(recipe)}
            className={styles.recipeCard}
            maxTitleLength={MAX_TITLE_LENGTH} // Pasamos la longitud máxima como prop
          />
        ))}
        {recipes.length === 0 && !loading && !error && <p>No hay recetas recomendadas en este momento.</p>}
      </div>

      {isModalOpen && selectedRecipe && (
        <FormModal onClose={closeRecipeModal}>
          <RecipeDetail recipe={selectedRecipe} /> {/* El título en el detalle será completo */}
        </FormModal>
      )}
    </section>
  );
}