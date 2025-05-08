import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SidebarNav } from "../../organisms/SidebarNav/SidebarNav";
import { Header } from "../../organisms/Header/Header";
import { productApi } from "../../../services/products.api"; // Importa tu servicio de API
import { Product } from "../../../types/product"; // Importa tu tipo de Product
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import styles from "./InventoryLayout.module.css";

interface InventoryContext {
  products: Product[];
  fetchProducts: () => Promise<void>;
  onAddProduct: (newProduct: Omit<Product, "_id" | "__v">) => Promise<void>;
  onUpdateProduct: (updatedProduct: Product) => Promise<void>; // Añadimos onUpdateProduct a la interfaz
}

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
      setTimeout(() => setLoading(false), 4000);
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

  const handleUpdateProduct = async (updatedProduct: Product) => {
    try {
      await productApi.updateProduct(updatedProduct._id, updatedProduct);
      await fetchProducts(); // Recarga la lista después de la actualización
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
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
              <div className={styles.loaderContainer}>
                <DotLottieReact
                  src="https://lottie.host/66534f5d-de93-4a82-844b-75619edda472/1LTVmxJQ4e.lottie"
                  loop
                  autoplay
                />
              </div>
            ) : (
              <Outlet
                context={
                  {
                    products: products,
                    fetchProducts: fetchProducts,
                    onAddProduct: handleAddNewProduct,
                    onUpdateProduct: handleUpdateProduct,
                  } as InventoryContext
                }
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
