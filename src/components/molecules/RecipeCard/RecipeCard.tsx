import styles from "./RecipeCard.module.css";
//import axios from "axios";
import { Button } from "../../atoms/Button/Button";
import { Search } from "lucide-react";

interface RecipeCardProps {
  id?: string;
  title: string;
  description: string;
  image: string;
  onViewDetails: () => void;
  className?: string;
  maxTitleLength?: number;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({id,  title, description, image, onViewDetails, className, maxTitleLength }) => {
  const shortTitle = maxTitleLength && title.length > maxTitleLength
    ? title.substring(0, maxTitleLength) + "..."
    : title;
  return (
    <div className={`${styles.card} ${className || ""}`}>
      <img src={image} alt={title} className={styles.image} />

      <div className={styles.content}>
        <h3 className={styles.title}>{shortTitle}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.buttons}>
          <Button className={styles.iconButton} onClick={onViewDetails}>
            <Search size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
