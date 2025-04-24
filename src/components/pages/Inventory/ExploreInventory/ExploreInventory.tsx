import { useEffect, useState } from "react";
import { productApi } from "../../../../services/products.api";
import { Product } from "../../../../types/product";
import { ProductCard } from "../../../molecules/ProductCard/ProductCard";
import { EmptyInventoryModal } from "../../../molecules/EmptyInventoryModal/EmptyInventoryModal";
import styles from "./ExploreInventory.module.css";

function formatCategoryTitle(category: string): string {
  return category
    .split("-")
    .map((word, index, arr) => {
      // Capitaliza la primera letra de cada palabra
      word = word.charAt(0).toUpperCase() + word.slice(1);
      // Si no es la última palabra, agrega la coma
      if (index < arr.length - 1) {
        word += ", ";
      }
      return word;
    })
    .join(""); // No necesitamos más separadores porque ya agregamos la coma
}

export function ExploreInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEmptyModal, setShowEmptyModal] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getAll();
        setProducts(data);
        
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    try {
      await productApi.deleteProduct(productId);
      const updatedProducts = products.filter(product => product._id !== productId);
      setProducts(updatedProducts); // ¡Esto refresca la vista!
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const groupedByCategory = products.reduce((acc: { [key: string]: Product[] }, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  if (loading) return <p>Cargando productos...</p>;
  if (products.length === 0 && showEmptyModal) {
    return <EmptyInventoryModal onClose={() => setShowEmptyModal(false)} />;
  }

  return (
    <div className={styles.container}>
      {Object.entries(groupedByCategory).map(([category, items]) => (
        <section key={category} className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>{formatCategoryTitle(category)}</h2>
          <div className={styles.carousel}>
            {items.map(product => (
              <ProductCard
                key={product._id}
                image={product.image}
                name={product.name}
                quantity={product.quantity}
                expirationDate={product.expirationDate}
                onDelete={() => handleDeleteProduct(product._id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
