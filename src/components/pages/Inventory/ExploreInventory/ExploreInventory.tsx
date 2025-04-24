import { useEffect, useState } from 'react';
import { productApi } from "../../../../services/products.api";

import { Product } from "../../../../types/product"; // Asegúrate de tener esta interfaz
import { ProductCard } from '../../../molecules/ProductCard/ProductCard'
import styles from "./ExploreInventory.module.css"; // si usas estilos

export function ExploreInventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [groupedByCategory, setGroupedByCategory] = useState<{
    [key: string]: Product[];
  }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productApi.getAll();
        setProducts(data);
        console.log(data);

        const grouped = data.reduce(
          (productObj: { [key: string]: Product[] }, product: Product) => {
            if (!productObj[product.category]) {
              productObj[product.category] = []; // If category doesn't exist, creates an [] empty
            }
            productObj[product.category].push(product);
            return productObj;
          },
          {}
        );
        setGroupedByCategory(grouped);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className={styles.container}>
      {Object.entries(groupedByCategory).map(([category, items]) => (
        <section key={category} className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>{category}</h2>
          <div className={styles.carousel}>
            {items.map(product => (
              <ProductCard
                key={product._id}
                image={product.image}
                name={product.name}
                quantity={product.quantity}
                expirationDate={product.expirationDate}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
