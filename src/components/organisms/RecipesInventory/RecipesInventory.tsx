import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import styles from "./RecipesInventory.module.css";
import { RecipeCard } from "../../molecules/RecipeCard/RecipeCard";
import { ChevronRight } from "lucide-react";

interface Recipe {
  _id: string;
  title: string;
  description: string;
  image: string;
}

const mockRecipes: Recipe[] = [
  {
    _id: "1",
    title: "Ensalada de Quinoa",
    description: "Una receta saludable con vegetales.",
    image: "src/assets/img/categories/salad-quinoa.jpeg",
  },
  {
    _id: "2",
    title: "Arroz con Pollo",
    description: "Clásico arroz con pollo colombiano.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTemRWC9e1j5lCpYPQXZnaNwE9ne6MLKUe4AQ&s",
  },
  {
    _id: "3",
    title: "Avena con Frutas",
    description: "Desayuno nutritivo con avena, almendras.",
    image:
      "https://7diasdesabor.com/wp-content/uploads/2023/03/avena-con-frutas-web.jpg",
  },
];

export function RecipeInventory() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/recipes");
        if (response.data.length === 0) {
          setRecipes(mockRecipes); // Mostrar datos falsos si la base está vacía
        } else {
          setRecipes(response.data);
        }
      } catch (err) {
        setError(" ");
        console.error(err);
        setRecipes(mockRecipes); // Fallback a los datos falsos si hay error
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
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
          />
        ))}
      </div>
    </section>
  );
}
