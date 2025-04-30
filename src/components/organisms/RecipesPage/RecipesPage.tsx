import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FormModal } from "../FormModal/FormModal";
import { RecipeForm } from "../../molecules/RecipeForm/RecipeForm";
import { SectionCard } from "../../molecules/SectionCard/SectionCard";
import styles from "./RecipesPage.module.css";
import { EmptyInventoryModal } from "../../molecules/EmptyInventoryModal/EmptyInventoryModal"; // Este es el modal amigable

export function RecipesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEmptyInventoryModal, setEmptyInventoryModal] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = async (cardName: string) => {
    if (cardName === "Crear receta") {
      openModal();
    }

    if (cardName === "Ver recetas") {
      try {
        const response = await axios.get("http://localhost:5000/api/recipes"); // Ajusta la URL a la de tu API
        const products = response.data;
        console.log(response.data);

        if (products.length === 0) {
          setEmptyInventoryModal(true);
        } else {
          navigate("/recetas/productos");
        }
      } catch (error) {
        console.error("Error al obtener recetas:", error);
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={styles.inventoryPage}>
      <div className={styles.header}>
        <h2 className={styles.pageTitle}>Recetas</h2>
      </div>
      <div className={styles.cardContainer}>
        <SectionCard
          imageSrc="src/assets/cocinero.png"
          title="Agregar recetas"
          description="Registra nuevas recetas para incluirlas en tu inventario."
          buttonLabel="Crear receta"
          onClick={() => handleCardClick("Crear receta")}
        />
        <SectionCard
          imageSrc="src/assets/libro-de-cocina.png"
          title="Explorar Inventario"
          description="Consulta las recetas que hay en tu inventario ."
          buttonLabel="Ver recetas"
          onClick={() => handleCardClick("Ver recetas")}
        />
      </div>

      {isModalOpen && (
        <FormModal onClose={closeModal}>
          <RecipeForm />
        </FormModal>
      )}
      {showEmptyInventoryModal && (
        <EmptyInventoryModal onClose={() => setEmptyInventoryModal(false)} />
      )}
    </div>
  );
}
