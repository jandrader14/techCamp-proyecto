import styles from './EmptyInventoryModal.module.css';
import { Button } from '../../atoms/Button/Button'

export function EmptyInventoryModal({ onClose }: { onClose: () => void }) {
  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <h3>¡Ups! &#128546;</h3>
        <p>Aún no tienes productos en tu inventario.</p>
        <div className={styles.btnBox}>          
          <Button type="button" text="Cerrar" onClick={onClose} className={styles.btnClose} />
        </div>
      </div>
    </div>
  );
}