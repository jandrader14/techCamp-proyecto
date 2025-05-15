import React from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { Recipe } from "../../../../shared/types/Recipe";
import { RecipeCard } from "../../molecules/RecipeCard/RecipeCard";
import { RecipeDetail } from "../../molecules/RecipeDetail/RecipeDetail";
import { FormModal } from "../FormModal/FormModal";
import { useModal } from "../../../hooks/useModal";

import styles from "./RecipesCarrusel.module.css";

interface RecipesCarruselProps {
  recipes: Recipe[];
}

export const RecipesCarrusel: React.FC<RecipesCarruselProps> = ({
  recipes,
}) => {
  const {
    isOpen: isModalOpen,
    selectedItem: selectedRecipe,
    openModal: openRecipeModal,
    closeModal: closeRecipeModal,
  } = useModal<Recipe>();
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: "free-snap",
    slides: {
      perView: 3,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: {
          perView: 1,
          spacing: 10,
        },
      },
      "(min-width: 769px) and (max-width: 1024px)": {
        slides: {
          perView: 2,
          spacing: 15,
        },
      },
    },
  });

  return (
    <>
      <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
        {recipes.map((recipe) => (
          <div
            className={`keen-slider__slide ${styles.slide}`}
            key={recipe._id}
          >
            <RecipeCard
              id={recipe._id}
              title={recipe.name}
              description={recipe.preparation}
              image={recipe.image}
              onViewDetails={() => openRecipeModal(recipe)}
              maxTitleLength={30}
            />
          </div>
        ))}
      </div>

      {isModalOpen && selectedRecipe && (
        <FormModal onClose={closeRecipeModal}>
          {selectedRecipe && (
            <RecipeDetail
              recipe={{
                ...selectedRecipe,
                name: selectedRecipe.name,
                preparation: selectedRecipe.preparation,
              }}
            />
          )}
        </FormModal>
      )}
    </>
  );
};
