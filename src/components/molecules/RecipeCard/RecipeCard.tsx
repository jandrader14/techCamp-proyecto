import styles from "./RecipeCard.module.css";
//import axios from "axios";
import { Search } from "lucide-react";

interface RecipeCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  className?: string;
}

export function RecipeCard({ id, title, description, image, className }: RecipeCardProps) {
  return (
    <div className={`${styles.card} ${className || ""}`}>
      <img src={image} alt={title} className={styles.image} />

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.buttons}>
          <button className={styles.iconButton}>
            <Search size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
