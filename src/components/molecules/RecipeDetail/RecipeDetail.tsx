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
    <div>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title}  className={styles.recipeImg} style={{ maxWidth: '100%', height: 'auto' }} />
      <h4>Ingredientes:</h4>
      <ul>
        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h4>Preparación:</h4>
      <ol>
        {recipe.steps && recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      {/* Puedes agregar más detalles aquí */}
    </div>
  );
};