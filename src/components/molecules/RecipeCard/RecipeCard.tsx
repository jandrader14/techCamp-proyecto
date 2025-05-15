import { Button } from "../../atoms/Button/Button";
import { Search } from "lucide-react";
import styles from "./RecipeCard.module.css";

export interface RecipeCardProps {
  id?: string;
  title: string;
  image: string;
  category: string;
  portions: string;
  onViewDetails: () => void;
  className?: string;
  maxTitleLength?: number;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  image,
  category,
  portions,
  onViewDetails,
  className,
  maxTitleLength = 30,
}) => {
  const shortTitle =
    title.length > maxTitleLength ? title.substring(0, maxTitleLength) + "..." : title;

  const categoryIcons: Record<string, string> = {
    Entradas: "🥗",
    "Plato fuerte": "🍽️",
    Postres: "🍰",
    Bebidas: "🍹",
    Ensaladas: "🥬",
    Sopas: "🥣",
    "Comida rápida": "🍔",
    Otro: "🍳",
  };

  const categoryIcon = categoryIcons[category] || "🍴";

  return (
    <div className={`${styles.card} ${className || ""}`}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>

      <div className={styles.content}>
        <span className={styles.badge}>
          {categoryIcon} {category}
        </span>
        <h3 className={styles.title}>{shortTitle}</h3>
        <p className={styles.meta}>Para {portions} personas</p>

        <div className={styles.buttons}>
          <Button className={styles.iconButton} onClick={onViewDetails}>
            <Search size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
