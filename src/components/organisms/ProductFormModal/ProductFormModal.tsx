import { useEffect } from "react";
import styles from "./ProductFormModal.module.css";
import { ProductForm } from "../../molecules/ProductForm/ProductForm";

interface Props {
  onClose: () => void;
}

export function ProductFormModal({ onClose }: Props) {
  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>✕</button>
        <ProductForm />
      </div>
    </div>
  );
}
