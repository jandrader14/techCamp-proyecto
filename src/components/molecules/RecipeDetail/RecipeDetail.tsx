import React, {useEffect} from "react";
import { Recipe, Ingredient } from "../../../../shared/types/Recipe";
import { Button } from "../../atoms/Button/Button";

import styles from "./RecipeDetail.module.css";

interface RecipeDetailProps {
  recipe: Recipe;
  onDeleteRecipe: (recipeId: string) => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({
  recipe,
  onDeleteRecipe,
}) => {
  console.log("RecipeDetail recibió la siguiente receta:", recipe);

  useEffect(() => {
    console.log("RecipeDetail montado");
    return () => {
      console.log("RecipeDetail desmontado");
    };
  }, [recipe]);

  if (!recipe) {
    return <div>No se ha seleccionado ninguna receta.</div>;
  }

  const preparationSteps = Array.isArray(recipe.preparation)
    ? recipe.preparation
    : recipe.preparation.split("\n").filter((step) => step.trim() !== "");

  return (
    <div className={styles.recipeDetail}>
      <h3 className={styles.title}>{recipe.name}</h3>
      <img src={recipe.image} alt={recipe.name} className={styles.recipeImg} />

      <section className={styles.section}>
        <h4 className={styles.subtitle}>Ingredientes:</h4>
        <ul className={styles.list}>
          {recipe.ingredients?.map((ingredient: Ingredient, index) => (
            <li key={index}>
              {ingredient.product ? (
                `${ingredient.quantity} ${ingredient.unit} de ${ingredient.product.name}`
              ) : (
                <span className={styles.missingIngredient}>
                  Producto no especificado
                </span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h4 className={styles.subtitle}>Preparación:</h4>
        <ol className={styles.list}>
          {preparationSteps?.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <div className={styles.controls}>
        {" "}
        {/* Nuevo contenedor para los botones */}
        {/* <button className={styles.editButton} onClick={() => onEdit(recipe)}>Editar</button> */}
        <Button
          className={styles.deleteButton}
          text="Eliminar receta"
          onClick={() => {
            console.log(
              "Valor de onDeleteRecipe dentro de RecipeDetail:",
              onDeleteRecipe
            );
            onDeleteRecipe(recipe._id);
          }}
        >
          
        </Button>
      </div>
    </div>
  );
};
