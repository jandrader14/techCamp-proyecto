import React, { useRef } from "react";
import { useCarouselScroll } from "../../../hooks/useCarruselScroll";
import { Recipe } from "../../../../shared/types/Recipe";
import { RecipeCard } from "../../molecules/RecipeCard/RecipeCard";
import { RecipeDetail } from "../../molecules/RecipeDetail/RecipeDetail";
import { FormModal } from "../FormModal/FormModal";
import { useModal } from "../../../hooks/useModal";
import { ChevronLeft, ChevronRight } from "lucide-react";

import styles from "./RecipesCarrusel.module.css";

interface RecipesCarruselProps {
  recipes: Recipe[];
  currentCategory: string;
}

export const RecipesCarrusel: React.FC<RecipesCarruselProps> = ({
  recipes,
  currentCategory,
}) => {
  const {
    isOpen: isModalOpen,
    selectedItem: selectedRecipe,
    openModal: openRecipeModal,
    closeModal: closeRecipeModal,
  } = useModal<Recipe>();

  const sliderRef = useRef<HTMLDivElement | null>(null);

  const { scrollLeft, scrollRight, canScrollLeft, canScrollRight } =
    useCarouselScroll(sliderRef);

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.categoryTitle}>
        <h2>{currentCategory === "Todas" ? "Mis recetas" : currentCategory}</h2>
      </div>

      <div className={styles.controls}>
        {canScrollLeft && (
          <button
            className={styles.arrow}
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div ref={sliderRef} className={styles.slider}>
          {recipes.map((recipe) => (
            <div className={styles.slide} key={recipe._id}>
              <RecipeCard
                title={recipe.name}
                image={recipe.image}
                category={recipe.category}
                portions={recipe.portions}
                onViewDetails={() => openRecipeModal(recipe)}
                className={styles.card}
              />
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            className={styles.arrow}
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {isModalOpen && selectedRecipe && (
        <FormModal onClose={closeRecipeModal}>
          <RecipeDetail recipe={selectedRecipe} />
        </FormModal>
      )}
    </div>
  );
};