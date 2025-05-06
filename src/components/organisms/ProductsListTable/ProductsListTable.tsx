import React, { useState } from "react";

import { Product } from "../../../types/product";
import { Button } from "../../atoms/Button/Button";
import { Pencil, Trash, FileDown } from "lucide-react";
import styles from "./ProductsListTable.module.css";

interface ProductsListTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export const ProductsListTable: React.FC<ProductsListTableProps> = ({
  products,
  onEdit,
  onDelete,
}) => {
  const [itemsToShow, setItemsToShow] = useState(10);

  const handleExport = () => {
    // Aquí puedes exportar en CSV o como prefieras
    alert("Exportar productos aún no implementado");
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <div className={styles.controls}>
            <label>
              Mostrando
              <select
                value={itemsToShow}
                onChange={(e) => setItemsToShow(Number(e.target.value))}
                className={styles.select}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </label>

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
              products.map((product) => (
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
                      <button
                        className={styles.editButton}
                        onClick={() => onEdit(product)}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => onDelete(product._id)}
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

// function formatDate(dateStr: string) {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString();
// }
