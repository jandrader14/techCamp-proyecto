import { useState, useEffect } from "react";
import { format } from "date-fns";


import { Product } from "../../../types/product";
import FormField from "../../molecules/FormField/FormField.tsx";
import { Button } from "../../atoms/Button/Button.tsx"
import { Save, Ban } from "lucide-react";
import styles from "./EditProductModal.module.css";

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

export function EditProductModal({
  product,
  onClose,
  onSave,
}: EditProductModalProps) {
  const [formData, setFormData] = useState({
    name: product.name,
    quantity: product.quantity,
    expiryDate: product.expiryDate
      ? format(new Date(product.expiryDate), "yyyy-MM-dd")
      : "", // Ensure expiryDate is a string
  });

  useEffect(() => {
    setFormData({
      name: product.name,
      quantity: product.quantity,
      expiryDate: product.expiryDate
        ? format(new Date(product.expiryDate), "yyyy-MM-dd")
        : "", // Ensure expiryDate is a string
    });
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    try {
      const selectedDateString = formData.expiryDate;

      if (!selectedDateString) {
        const updatedProduct: Product = { ...formData, _id: product._id };
        onSave(updatedProduct);
        return;
      }

      // Interpretamos la fecha seleccionada como si fuera UTC (sin ajuste de zona horaria)
      const expiryDateLocal = new Date(selectedDateString);

      if (isNaN(expiryDateLocal.getTime())) {
        console.error("Fecha de vencimiento inválida:", formData.expiryDate);
        return;
      }

      const updatedProduct: Product = {
        ...formData,
        expiryDate: expiryDateLocal.toISOString(), // Guarda en formato ISO 8601 UTC
        _id: product._id,
      };

      onSave(updatedProduct);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  const formatDateForInput = (
    dateString: string | null | undefined
  ): string => {
    if (!dateString) {
      return "";
    }
    try {
      const utcDate = new Date(dateString); // Convert ISO string to Date
      return format(utcDate, "yyyy-MM-dd"); // Format the date for the input
    } catch (error) {
      console.error("Error al formatear la fecha para el input:", error);
      return "";
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h3>Editar producto</h3>

        <FormField
          label="Nombre del producto"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
        

        <FormField
          label="Cantidad"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        <FormField
          label="Fecha de vencimiento"
          name="expiryDate"
          type="date"
          value={formatDateForInput(formData.expiryDate)}
          onChange={handleChange}
          required
        />
        <div className={styles.buttons}>          
          <Button type="button" text="Guardar" onClick={handleSave} className={styles.btnSave}><Save size={16} /></Button> 
          <Button type="button" text="Cancelar" onClick={onClose} className={styles.btnCancel}><Ban size={16} /></Button>
        </div>
      </div>
    </div>
  );
}

