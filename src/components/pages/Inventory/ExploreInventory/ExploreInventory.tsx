import { useEffect, useState } from "react";
import { productApi } from "../../../../services/products.api";
import { Product } from "../../../../types/product";
import { EmptyInventoryModal } from "../../../molecules/EmptyInventoryModal/EmptyInventoryModal";
import { ProductsListTable } from "../../../organisms/ProductsListTable/ProductsListTable";
import { EditProductModal } from "../../../molecules/EditProductModal/EditProductModal";
import styles from "./ExploreInventory.module.css";

// function formatCategoryTitle(category: string): string {
//   return category
//     .split("-")
//     .map((word, index, arr) => {
//       // Capitaliza la primera letra de cada palabra
//       word = word.charAt(0).toUpperCase() + word.slice(1);
//       // Si no es la última palabra, agrega la coma
//       if (index < arr.length - 1) {
//         word += ", ";
//       }
//       return word;
//     })
//     .join("");
// }

export function ExploreInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEmptyModal, setShowEmptyModal] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowEmptyModal(true);
  };

  const handleSaveProduct = async (updatedProduct: Product) => {
    console.log("😎handleSaveProduct llamado con:", updatedProduct);
    try {
      console.log("Guardando producto:", updatedProduct); // Verifica los datos antes de enviarlos
      const response = await productApi.updateProduct(
        updatedProduct._id,
        updatedProduct
      );
      console.log("Respuesta del servidor:", response); // Llamamos a la API para actualizar el producto

      // Actualizamos el producto en el estado de productos
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id
            ? { ...product, ...updatedProduct }
            : product
        )
      );
      setShowModal(false); // Cerrar el modal después de guardar los cambios
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await productApi.deleteProduct(productId);
      const updatedProducts = products.filter(
        (product) => product._id !== productId
      );
      setProducts(updatedProducts); // ¡Esto refresca la vista!
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const groupedByCategory = products.reduce(
    (prodGroup: { [key: string]: Product[] }, product) => {
      if (product.category) {
        // Ensure category is defined
        if (!prodGroup[product.category]) prodGroup[product.category] = [];
        prodGroup[product.category].push(product);
      }
      return prodGroup;
    },
    {}
  );

  if (loading) return <p>Cargando productos...</p>;
  if (products.length === 0 && showEmptyModal) {
    return <EmptyInventoryModal onClose={() => setShowEmptyModal(false)} />;
  }

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

      <section>
        <div className={styles.categoryMainContainer}>
          <h1 className={styles.titleSection}>¡Conoce tus productos!</h1>
          <div className={styles.categoryContainer}>
            <div className={styles.categoryContent}>
              <ul className={styles.filter_list}>
                <li className={styles.itemCategory}>
                  <a href="#">Todas</a>
                </li>
                <li className={styles.itemCategory}>
                  <a href="#">Frutas y Verduras</a>
                </li>

                <li className={styles.itemCategory}>
                  <a href="#">Granos y Pastas</a>
                </li>
                <li className={styles.itemCategory}>
                  <a href="#">Carnes, Pollo y Pescado</a>
                </li>
                <li className={styles.itemCategory}>
                  <a href="#">Lácteos y Huevos</a>
                </li>
                <li className={styles.itemCategory}>
                  <a href="#">Aceites, Sal, Endulzantes</a>
                </li>
                <li className={styles.itemCategory}>
                  <a href="#">Pan, Arepas, Galletas</a>
                </li>
                <li className={styles.itemCategory}>
                  <a href="3">Café, Té, Chocolate</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <ProductsListTable
        products={Object.values(groupedByCategory).flat()}
        onEdit={(product) => handleEditProduct(product)}
        onDelete={(id) => handleDeleteProduct(id)}
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
