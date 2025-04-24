import styles from "./ProductCard.module.css";
import { Button } from "../../atoms/Button/Button";
import { Product } from "../../../types/product";

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
        <h3>{name}</h3>
        <span>{quantity}</span>
        <span>{expirationDate}</span>
      </div>

      <div className={styles.buttons}>
        <Button type="submit" text="" className={styles.editBtn} />
        <Button type="submit" text="" className={styles.deleteBtn} />
      </div>
    </div>
  );
}
