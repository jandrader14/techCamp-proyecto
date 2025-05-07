import React, { useState } from "react";


import { Product } from "../../../types/product";
import { Button } from "../../atoms/Button/Button";
import { FormModal } from "../FormModal/FormModal";
import { ProductForm } from "../../molecules/ProductForm/ProductForm";
import { Pencil, Trash, FileDown, CirclePlus } from "lucide-react";
import styles from "./ProductsListTable.module.css";

interface ProductsListTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onAddProduct: (newProduct: Omit<Product, "_id" | "__v">) => Promise<void>;
}

export const ProductsListTable: React.FC<ProductsListTableProps> = ({
  products,
  onEdit,
  onDelete,
  onAddProduct,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleExport = () => {
    alert("Exportar productos aún no implementado");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.controls}>
            <Button className={styles.addButton} onClick={openModal}>
              <CirclePlus size={16} /> Agregar producto
            </Button>
            <Button className={styles.exportButton} onClick={handleExport}>
              <FileDown size={16} /> Exportar
            </Button>
          </div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Unidad</th>
              <th>Fecha de ingreso</th>
              <th>Fecha de vencimiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? ( // Usamos la prop 'products' directamente
              <tr>
                <td colSpan={8}>No hay productos para mostrar</td>
              </tr>
            ) : (
              products.map(
                (
                  product // Iteramos sobre la prop 'products'
                ) => (
                  <tr key={product._id}>
                    <td>
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className={styles.productImage}
                        />
                      ) : (
                        "Sin imagen"
                      )}
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category || "N/A"}</td>
                    <td>{product.quantity ?? "0"}</td>
                    <td>{product.unit || "N/A"}</td>
                    <td>{product.entryDate}</td>
                    <td>{product.expiryDate}</td>
                    <td>
                      <div className={styles.actions}>
                        <Button
                          className={styles.editButton}
                          onClick={() => onEdit(product)}
                        >
                          <Pencil size={16} />
                        </Button>
                        <Button
                          className={styles.deleteButton}
                          onClick={() => onDelete(product._id)} // Llama a la función pasada como prop
                        >
                          <Trash size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <FormModal onClose={closeModal}>
          <ProductForm onSubmit={onAddProduct} />{" "}
          {/* Usa la función pasada como prop */}
        </FormModal>
      )}
    </>
  );
};
