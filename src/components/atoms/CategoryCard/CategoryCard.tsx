import styles from './CategoryCard.module.css';
import Frutas from '../../../assets/img/categories/pina.png';
import Verduras from '../../../assets/img/categories/verdura.png';
import Lacteos from '../../../assets/img/categories/lacteos.png';
import Carnes from '../../../assets/img/categories/pollo.png';
import Cereales from '../../../assets/img/categories/alubias-rojas.png';
import Cafe from '../../../assets/img/categories/granos-de-cafe.png';


interface CategoryCardProps {
  imageKey?: string;
  label: string;
}

const categoryImages: Record<string, string> = {
  // Record<string, string> is a TypeScript utility type that represents an object type with string keys and string values.
  Frutas: Frutas,
  Verduras: Verduras,
  Lácteos: Lacteos,
  Carnes: Carnes,
  Cereales: Cereales,
  Cafe: Cafe,
};

export function CategoryCard({ imageKey, label }: CategoryCardProps) {
  const imageSrc = imageKey ? categoryImages[imageKey] : undefined;

  return (
    <div className={styles.card}>
      {imageSrc && (
        <img src={imageSrc} alt={label} className={styles.image} />
      )}
      <span className={styles.label}>{label}</span>
    </div>
  );
}

