import { Link } from 'react-router-dom';
import styles from "./CategorySection.module.css";
import { CategoryCard } from "../../atoms/CategoryCard/CategoryCard";
import { ChevronRight } from "lucide-react";

export function CategorySection() {
  const categories = [
    { label: "Frutas", imageKey: "Frutas" },
    { label: "Verduras", imageKey: "Verduras" },
    { label: "Lácteos y Huevos", imageKey: "Lácteos" },
    { label: "Carne, Pollo y Pescado", imageKey: "Carnes" },
    { label: "Cereales y Granos", imageKey: "Cereales" },
    { label: "Café, Chocolate", imageKey: "Cafe" },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Categorías</h2>
        <Link to="/inventory" className={styles.button}>
          Ver todas <ChevronRight size={18} className={styles.icon} />
        </Link>
      </div>
      <div className={styles.cardContainer}>
        {categories.map((cat, index) => (
          <CategoryCard key={index} imageKey={cat.imageKey} label={cat.label} />
        ))}
      </div>
    </section>
  );
}
