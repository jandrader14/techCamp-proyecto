import styles from "./RecipeDetail.module.css";

import React from 'react';
import  {Recipe}  from '../../organisms/RecipesInventory/RecipesInventory';

interface RecipeDetailProps {
  recipe: Recipe | null; // Recibe la receta (puede ser null si no hay receta seleccionada)
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  if (!recipe) {
    return <div>No se ha seleccionado ninguna receta.</div>;
  }

  return (
    <div className={styles.recipeDetail}>
      <h3 className={styles.title}>{recipe.title}</h3>
      <img
        src={recipe.image}
        alt={recipe.title}
        className={styles.recipeImg}
      />

      <section className={styles.section}>
        <h4 className={styles.subtitle}>Ingredientes:</h4>
        <ul className={styles.list}>
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h4 className={styles.subtitle}>Preparación:</h4>
        <ol className={styles.list}>
          {recipe.steps?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>
    </div>
  );
};
