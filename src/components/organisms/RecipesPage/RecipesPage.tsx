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
        const response = await axios.get("http://localhost:5000/api/recipes");
        const products = response.data;
        console.log(response.data);

        if (products.length === 0) {
          setEmptyInventoryModal(true);
        } else {
          navigate("/recetas/mis-recetas");
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
          title="Visualiza tus recetas"
          description="Consulta las recetas creadas en tu inventario."
          buttonLabel="Ver recetas"
          onClick={() => handleCardClick("Ver recetas")}
        />
        <SectionCard
          imageSrc="https://res.cloudinary.com/dcgcixisy/image/upload/v1746453571/ChatGPT_Image_May_5_2025_08_58_21_AM_xt5va2.png"
          title="Recetas recomendadas"
          description="Maximiza tus ingredientes. La IA te presenta recetas recomendadas, creadas a partir de lo que ya tienes en tu inventario."
          buttonLabel="Saber más"
          onClick={() => handleCardClick("Ver recetas IA")}
        />
        <SectionCard
          imageSrc="https://res.cloudinary.com/dcgcixisy/image/upload/balanza_a576kd.png"
          title="Unidades y Equivalencias"
          description="Consulta nuestra guía de unidades de medida y equivalencias para cocinar con precisión."
          buttonLabel="Ver unidades"
          onClick={() => handleCardClick("Unidades")}
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
