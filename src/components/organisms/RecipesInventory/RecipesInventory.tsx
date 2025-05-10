import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./RecipesInventory.module.css";
import { RecipeCard } from "../../molecules/RecipeCard/RecipeCard";
import { ChevronRight } from "lucide-react";
import { FormModal } from "../FormModal/FormModal"; // Asegúrate de tener un componente Modal
import { RecipeDetail } from "../../molecules/RecipeDetail/RecipeDetail"; // Componente para mostrar los detalles


export interface Recipe {
  _id: string;
  title: string;
  description: string;
  image: string;
  ingredients?: string[]; // Añade ingredientes
  steps?: string[]; 
}

interface IARecipeResponse {
  title?: string;
  description?: string;
  image?: string;
  ingredients?: string[];
  steps?: string[];
}

interface ApiResponse {
  recetas?: IARecipeResponse[];
}

// const mockRecipes: Recipe[] = [
//   {
//     _id: "1",
//     title: "Ensalada de Quinoa",
//     description: "Una receta saludable con vegetales.",
//     image: "src/assets/img/categories/salad-quinoa.jpeg",
//   },
//   {
//     _id: "2",
//     title: "Arroz con Pollo",
//     description: "Clásico arroz con pollo colombiano.",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTemRWC9e1j5lCpYPQXZnaNwE9ne6MLKUe4AQ&s",
//   },
//   {
//     _id: "3",
//     title: "Avena con Frutas",
//     description: "Desayuno nutritivo con avena, almendras.",
//     image:
//       "https://7diasdesabor.com/wp-content/uploads/2023/03/avena-con-frutas-web.jpg",
//   },
// ];

export function RecipeInventory() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


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
        if (
          response.data &&
          response.data.recetas &&
          Array.isArray(response.data.recetas) &&
          response.data.recetas.length > 0
        ) {
          setRecipes(
          response.data.recetas
            .slice(0, 3)
            .map((recipe: IARecipeResponse, index: number) => {
              // ¡Aquí está el console.log!
              console.log(`Receta ${index + 1}:`, recipe);
              return {
                _id: `ia-${index + 1}`,
                title: recipe.title  || `Receta IA ${index + 1}`,
                description: recipe.description
                  ? recipe.description.substring(0, 80) + "..."
                  : "Descripción generada por IA.",
                ingredients: recipe.ingredients || [],
                steps: recipe.steps || [],
                image: recipe.image || "src/assets/img/advertencia.png",
              };
            })
        );
      } else {
        console.log("response.data:", response.data);
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
        {error && <p>{error}</p>}
        <Link to="/recetas" className={styles.button}>
          Ver todas <ChevronRight size={18} className={styles.icon} />
        </Link>
      </div>

      <div className={styles.cardContainer}>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            id={recipe._id}
            title={recipe.title}
            description={recipe.description}
            image={recipe.image}
            onViewDetails={() => openRecipeModal(recipe)} // Prop para abrir el modal
            className={styles.recipeCard}
          />
        ))}
        {recipes.length === 0 && !loading && !error && (
          <p>No hay recetas recomendadas en este momento.</p>
        )}
      </div>
      {isModalOpen && selectedRecipe && (
        <FormModal onClose={closeRecipeModal}>
          <RecipeDetail recipe={selectedRecipe} /> {/* Componente para mostrar los detalles */}
        </FormModal>
      )}
    </section>
  );
}
