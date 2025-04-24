import { Button } from "../../atoms/Button/Button";
import { Product } from "../../../types/product";
import styles from "./ProductCard.module.css";
import { Pencil, Trash2 } from "lucide-react";

interface ProductCardProps extends Pick<Product, "image" | "name" | "quantity" | "expirationDate"> {
  //Con Pick<Product, "..."> se está usando una parte del tipo Product
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ProductCard({
  image,
  name,
  quantity,
  expirationDate,
}: ProductCardProps) {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.image} />
      <div className={styles.info}>
        <div className={styles.description}>
          <h3>{name}</h3>
          <span>Cantidad: {quantity}</span>
          <span>Fecha de vencimiento: {expirationDate}</span>
        </div>
        <div className={styles.buttons}>
          <Button type="button" text="Editar" className={styles.editBtn}><Pencil size={16} /></Button>
          <Button type="button" text="Eliminar" className={styles.deleteBtn}><Trash2 size={16} /></Button>
        </div>
      </div>
    </div>
  );
}
