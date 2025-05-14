import { useState, useEffect } from "react";
import { format } from "date-fns";


import { Product } from "../../../../shared/types/product.ts";
import FormField from "../../molecules/FormField/FormField.tsx";
import { Button } from "../../atoms/Button/Button.tsx"
import { Save, Ban } from "lucide-react";
import styles from "./EditProductModal.module.css";

interface EditProductModalProps {
  product: Product;
  onSave: (updatedProduct: Product) => void;
  onClose: () => void;
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
      : "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        quantity: product.quantity,
        expiryDate: product.expiryDate
          ? format(new Date(product.expiryDate), "yyyy-MM-dd")
          : "",
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 // const [errorMessage, setErrorMessage] = useState("");
  const handleSave = () => {
    const updatedProduct: Product = {
      ...formData,
      _id: product._id,
    };
    onSave(updatedProduct);
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
          value={formData.expiryDate}
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

