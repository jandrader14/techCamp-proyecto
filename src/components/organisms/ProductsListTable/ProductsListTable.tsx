import React, { useState } from "react";
import { autoTable  } from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
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

  const formatDate = (isoDateString: string | null | undefined) => {
    if (!isoDateString) return 'N/A';
    const date = new Date(isoDateString);
    return date.toLocaleDateString('es-CO', { // 'es-CO' para la configuración regional colombiana
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };


  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Inventario de productos", 14, 20);
  
    const tableColumn = [
      "Nombre",
      "Categoría",
      "Cantidad",
      "Unidad",
      "Fecha de ingreso",
      "Fecha de vencimiento",
    ];
  
    const tableRows = products.map((product) => [
      product.name,
      product.category || "N/A",
      product.quantity ?? "0",
      product.unit || "N/A",
      formatDate(product.entryDate) || "N/A",
      formatDate(product.expiryDate) || "N/A",
    ]);
  
    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRows,
    });
  
    doc.save("Listado_productos.pdf");
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
            {products.length === 0 ? ( 
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
                    <td>{formatDate(product.entryDate)}</td>
                    <td>{formatDate(product.expiryDate)}</td>
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
