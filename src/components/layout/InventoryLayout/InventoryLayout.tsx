import  { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SidebarNav } from "../../organisms/SidebarNav/SidebarNav";
import { Header } from "../../organisms/Header/Header";
import { productApi } from "../../../services/products.api"; // Importa tu servicio de API
import { Product } from "../../../types/product"; // Importa tu tipo de Product
import styles from "./InventoryLayout.module.css";

export function InventoryLayout() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddNewProduct = async (
    newProduct: Omit<Product, "_id" | "__v">
  ) => {
    try {
      await productApi.createProduct(newProduct);
      await fetchProducts(); // Recarga la lista después de agregar
    } catch (error) {
      console.error("Error al guardar el nuevo producto:", error);
    }
  };

  return (
    <div className={styles.inventoryContainer}>
      <SidebarNav />
      <div className={styles.inventoryContent}>
        <Header />
        <main className={styles.mainSection}>
          <div className={styles.mainContent}>
            {loading ? (
              <p>Cargando productos...</p>
            ) : (
              <Outlet
                context={{
                  products: products,
                  fetchProducts: fetchProducts,
                  onAddProduct: handleAddNewProduct,
                }}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
