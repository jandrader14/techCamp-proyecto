import { useState } from 'react';
import {ProductFormModal} from '../ProductFormModal/ProductFormModal'; // Asegúrate de importar el modal correctamente
import { InventoryCard} from '../../molecules/InventoryCard/InventoryCard';
import styles from './InventoryPage.module.css';

export function InventoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (cardName: string) => {
    console.log(`Clicked on ${cardName}`);
    if (cardName === 'Registrar producto') {
      openModal();
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.inventoryPage}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Inventario</h2>
      </div>
      <div className={styles.cardContainer}>
        <InventoryCard
          imageSrc="src/assets/cesta-de-la-compra.png"
          title="Agregar productos"
          description="Registra nuevos productos para incluirlos en tu inventario."
          buttonLabel="Registrar producto"
          onClick={() => handleCardClick('Registrar producto')}
        />
        <InventoryCard
          imageSrc="src/assets/mercado-cesta.png"
          title="Explorar Inventario"
          description="Revisa fácilmente los productos disponibles y su estado actual."
          buttonLabel="Ver productos"
          onClick={() => handleCardClick('Ver Inventario')}
        />

        <InventoryCard
          imageSrc="src/assets/advertencia.png"
          title="Alertas"
          description="Entérate cuando un producto esté por agotarse o haya cambios en tu inventario."
          buttonLabel="Revisar ahora"
          onClick={() => handleCardClick('Historial de Cambios')}
        />
        <InventoryCard
          imageSrc="src/assets/ajuste.png"
          title="Configuración Inventario"
          description="Gestiona las reglas y preferencias de tu inventario."
          buttonLabel="Ver más"
          onClick={() => handleCardClick('Historial de Cambios')}
        />
      </div>
      {isModalOpen && <ProductFormModal onClose={closeModal} />}
    </div>
  );
}