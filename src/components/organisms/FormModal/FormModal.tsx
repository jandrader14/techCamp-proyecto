import { useEffect } from "react";
import styles from "./FormModal.module.css";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
  children: React.ReactNode; // Para pasar cualquier componente como hijo
}

export function FormModal({ onClose, children }: Props) {
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
        <button className={styles.closeButton} onClick={onClose}>
          <X />
        </button>
        {children} 
      </div>
    </div>
  );
}
