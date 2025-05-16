import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Recipe } from "../../../../../shared/types/Recipe";
import { RecipesCarrusel } from "../../../organisms/RecipesCarrusel/RecipesCarrusel";
import { RecipeDetail } from "../../../molecules/RecipeDetail/RecipeDetail";
import { CategoryFilter } from "../../../molecules/CategoryFilter/CategoryFilter";
import { FormModal } from "../../../organisms/FormModal/FormModal";
import { useRecipeManagement } from "../../../../hooks/useRecipeManagement";

import styles from "./MyRecipes.module.css";

interface RecipeContext {
  recipes: Recipe[];
  fetchRecipes: () => Promise<void>;
}

export const MyRecipes: React.FC = () => {
  const { recipes: initialRecipes } = useOutletContext<RecipeContext>();
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const {
    selectedRecipe,
    showModal,
    setShowModal,
    handleDeleteRecipe,
    //handleEditRecipe,
    // handleSaveRecipe,
  } = useRecipeManagement();
  const [showToast, setShowToast] = useState(false);

  console.log("Valor de handleDeleteRecipe en MyRecipes:", handleDeleteRecipe);

  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    console.log(`Categoría seleccionada: ${category}`);
  };

  const categoryOptions = [
    { label: "Todas", value: "Todas" },
    { value: "Entradas", label: "Entradas" },
    { value: "Platos Fuertes", label: "Platos Fuertes" },
    { value: "Postres", label: "Postres" },
    { value: "Sopas y Salsas", label: "Sopas y Salsas" },
  ];

  const filteredRecipes =
    selectedCategory === "Todas"
      ? recipes
      : recipes.filter((r) => r.category === selectedCategory);
  return (
    <>
      <section className={styles.bannerTopPage}>
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="https://res.cloudinary.com/dcgcixisy/image/upload/v1746463169/header-all-categories-mobile.jpg"
          />
          <img
            src="https://res.cloudinary.com/dcgcixisy/image/upload/v1746463169/header-all-categories-desktop_0.jpg_tomd96.webp"
            alt="Categorías"
          />
        </picture>
      </section>

      <div className={styles.exploreInventoryContainer}>
        <CategoryFilter
          title="¿Qué vas a cocinar hoy?"
          categories={categoryOptions}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <RecipesCarrusel
        recipes={filteredRecipes}
        currentCategory={selectedCategory}
        onDeleteRecipe={(id) => {
          handleDeleteRecipe(id, setRecipes);
          setShowModal(false);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
        }}
      />
      {showToast && (
        <div className={styles.toastSuccess}>✅ Receta eliminada con éxito</div>
      )}

      {selectedRecipe && showModal && (
        <FormModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={selectedRecipe.name}
        >
          <RecipeDetail
            recipe={selectedRecipe}
            onDeleteRecipe={(recipeId: string) => {
              handleDeleteRecipe(recipeId, setRecipes);
              setShowModal(false); // 👈 aquí cierras el modal correctamente
              setShowToast(true);
              setTimeout(() => setShowToast(false), 3000);
            }}
          />
        </FormModal>
      )}
    </>
  );
};
