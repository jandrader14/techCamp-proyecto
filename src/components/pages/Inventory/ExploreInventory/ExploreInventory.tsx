import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Product } from "../../../../../shared/types/product";
//import { EmptyInventoryModal } from "../../../molecules/EmptyInventoryModal/EmptyInventoryModal";
import { ProductsListTable } from "../../../organisms/ProductsListTable/ProductsListTable";
import { EditProductModal } from "../../../molecules/EditProductModal/EditProductModal";
import { CategoryFilter } from "../../../molecules/CategoryFilter/CategoryFilter";

import styles from "./ExploreInventory.module.css";
import { productApi } from "../../../../services/products.api";

interface InventoryContext {
  products: Product[];
  fetchProducts: () => Promise<void>;
  onAddProduct: (newProduct: Omit<Product, "_id" | "__v">) => Promise<void>;
  onUpdateProduct: (updatedProduct: Product) => Promise<void>;
}

export function ExploreInventory() {
  const { products, fetchProducts, onAddProduct, onUpdateProduct } =
    useOutletContext<InventoryContext>(); // Accede a los datos del context
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");

  const handleDeleteProduct = async (productId: string) => {
    try {
      await productApi.deleteProduct(productId);
      await fetchProducts(); // Recarga la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product); // Establece el producto seleccionado
    setShowModal(true); // Muestra el modal
  };

  const handleSaveProduct = async (updatedProduct: Product) => {
    try {
      await onUpdateProduct(updatedProduct); // Llama a la función del context
      setShowModal(false);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    console.log(`Categoría seleccionada en ExploreInventory: ${category}`);
  };

  const categoryOptionsForExplore = [
    { label: "Todas", value: "Todas" },
    { label: "Frutas y Verduras", value: "Frutas y Verduras" },
    { label: "Granos y Pastas", value: "Granos y Pastas" },
    { label: "Carnes, Pollo y Pescado", value: "Carnes, Pollo y Pescado" },
    { label: "Lácteos y Huevos", value: "Lácteos y Huevos" },
    { label: "Aceites, Sal, Endulzantes", value: "Aceites, Sal, Endulzantes" },
    { label: "Pan, Arepas, Galletas", value: "Pan, Arepas, Galletas" },
    { label: "Café, Té, Chocolate", value: "Café, Té, Chocolate" },
  ];

  const filteredProducts =
    selectedCategory === "Todas"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <>
      <section className={styles.bannerTopPage}>
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="https://res.cloudinary.com/dcgcixisy/image/upload/v1746463169/header-all-categories-mobile.jpg"
          />
          <img
            src="https://res.cloudinary.com/dcgcixisy/image/upload/v1746463169/header-all-categories-desktop_0.jpg_tomd96.webp"
            alt="Categorías"
          />
        </picture>
      </section>

      <div className={styles.exploreInventoryContainer}>
        <CategoryFilter
          title="¡Conoce tus productos!"
          categories={categoryOptionsForExplore}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <ProductsListTable
        products={filteredProducts}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        onAddProduct={onAddProduct} // Pasa la función al ProductsListTable
      />

      {/* Mostrar el modal si está habilitado */}
      {showModal && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onSave={handleSaveProduct}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
