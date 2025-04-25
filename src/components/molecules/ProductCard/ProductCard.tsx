import { useState } from "react";
import { Button } from "../../atoms/Button/Button";
import { Product } from "../../../types/product";
import styles from "./ProductCard.module.css";
import { Pencil, Trash2 } from "lucide-react";
import { EditProductModal } from "../../molecules/EditProductModal/EditProductModal";

interface ProductCardProps extends Pick<Product, "image" | "name" | "quantity" | "expiryDate" | "_id"> {
  //Con Pick<Product, "..."> se está usando una parte del tipo Product
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: (updatedProduct: Product) => void; 
}

export function ProductCard({
  _id,
  image,
  name,
  quantity,
  expiryDate,
  onSave,
  onDelete
}: ProductCardProps) {

  const [productData, setProductData] = useState<Product>({
    _id,
    image,
    name,
    quantity,
    expiryDate,
  });
  console.log("Valor de expiryDate recibido:", expiryDate);
  const [isModalOpen, setIsModalOpen] = useState(false);

 
  

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Función para guardar los cambios después de editar
  const handleSaveProduct = (updatedProduct: Product) => {
    setProductData(prev => ({
      ...prev,
      name: updatedProduct.name,
      quantity: updatedProduct.quantity,
      expiryDate: updatedProduct.expiryDate,
    }));
  
    if (onSave) {
      onSave(updatedProduct);
    }
  
    setIsModalOpen(false);
  };

  let formattedDate = "Sin fecha de vencimiento";
  if (productData.expiryDate) {
    try {
      const dateObject = new Date(productData.expiryDate);
      if (!isNaN(dateObject.getTime())) {
        formattedDate = dateObject.toLocaleDateString();
      } else {
        formattedDate = "Fecha inválida";
      }
    } catch (error) {
      console.error("Error al crear objeto Date:", error);
      formattedDate = "Error al mostrar fecha";
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={productData.image} alt={productData.name} className={styles.image} />
      </div>
      <div className={styles.info}>
        <div className={styles.description}>
          <h3>{productData.name}</h3>
          <span>Cantidad: {productData.quantity}</span>
          <span>Fecha de vencimiento: {formattedDate}</span>
        </div>
        <div className={styles.buttons}>
          <Button type="button" text="Editar" className={styles.editBtn} onClick={() => setIsModalOpen(true)}>
            <Pencil size={16} />
          </Button>
          <Button type="button" text="Eliminar" className={styles.deleteBtn} onClick={(onDelete)}>
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {/* Mostrar el modal si isModalOpen es true */}
      {isModalOpen && (
        <EditProductModal
          product={{ _id, name, quantity, expiryDate }}
          onClose={handleCloseModal}
          onSave={handleSaveProduct}
        />
      )}
    </div>
  );
}
