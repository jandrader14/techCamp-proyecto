import { WelcomeCard } from "../../molecules/WelcomeCard/WelcomeCard";
//import { RecipesSuggest } from "src/components/organisms/RecipesSuggest/RecipesSuggest";
import { CategorySection } from "../../organisms/CategorySection/CategorySection";
import { RecipeInventory } from "../../organisms/RecipesInventory/RecipesInventory";

export function Dashboard() {
  return (
    <div style={{ padding: "1rem", width: "100%" }}>
      <WelcomeCard />
      <CategorySection />
      <RecipeInventory />
      
    </div>
  );
}
