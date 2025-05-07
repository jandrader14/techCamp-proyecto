import  { useState } from 'react';
import axios from 'axios';
import { Product } from '../../../types/product';
import { useNavigate, useOutletContext } from 'react-router-dom'; // Importa useOutletContext
import { FormModal } from '../FormModal/FormModal';
import { ProductForm } from '../../molecules/ProductForm/ProductForm';
import { SectionCard } from '../../molecules/SectionCard/SectionCard';
import styles from './InventoryPage.module.css';
import { EmptyInventoryModal } from '../../molecules/EmptyInventoryModal/EmptyInventoryModal';

interface InventoryContext {
  products: Product[];
  fetchProducts: () => Promise<void>;
  onAddProduct: (newProduct: Omit<Product, "_id" | "__v">) => Promise<void>;
}

export function InventoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEmptyInventoryModal, setEmptyInventoryModal] = useState(false);
  const navigate = useNavigate();
  const { onAddProduct } = useOutletContext<InventoryContext>(); // Accede a la función del context

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleCardClick = async (cardName: string) => {
    if (cardName === 'Registrar producto') {
      openModal();
    }

    if (cardName === 'Ver Inventario') {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // Ajusta la URL a la de tu API
        const products = response.data;
        console.log(response.data);

        if (products.length === 0) {
          setEmptyInventoryModal(true);
        } else {
          navigate('/inventario/productos');
        }
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    }
  };

  return (
    <div className={styles.inventoryPage}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Inventario</h2>
      </div>
      <div className={styles.cardContainer}>
        <SectionCard
          imageSrc="src/assets/cesta-de-la-compra.png"
          title="Agregar nuevos productos"
          description="Registra nuevos productos para incluirlos en tu inventario."
          buttonLabel="Registrar producto"
          onClick={() => handleCardClick('Registrar producto')}
        />
        <SectionCard
          imageSrc="src/assets/mercado-cesta.png"
          title="Explorar Inventario"
          description="Accede a la lista de productos y realiza modificaciones en tiempo real."
          buttonLabel="Ver productos"
          onClick={() => handleCardClick('Ver Inventario')}
        />

        {/* <SectionCard
          imageSrc="src/assets/advertencia.png"
          title="Alertas"
          description="Entérate cuando un producto esté por agotarse o haya cambios en tu inventario."
          buttonLabel="Revisar ahora"
          onClick={() => handleCardClick('Historial de Cambios')}
        /> */}
        {/* <SectionCard
          imageSrc="src/assets/ajuste.png"
          title="Configuración Inventario"
          description="Gestiona las reglas y preferencias de tu inventario."
          buttonLabel="Ver más"
          onClick={() => handleCardClick('Historial de Cambios')}
        /> */}
      </div>

      {isModalOpen && (
        <FormModal onClose={closeModal}>
          <ProductForm onSubmit={onAddProduct} /> {/* Usa la función del context */}
        </FormModal>
      )}
      {showEmptyInventoryModal && <EmptyInventoryModal onClose={() => setEmptyInventoryModal(false)} />}
    </div>
  );
}
