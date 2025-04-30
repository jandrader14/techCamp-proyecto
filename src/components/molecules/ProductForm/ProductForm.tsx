import { useState } from "react";
import axios from "axios";

import FormField from "../../molecules/FormField/FormField";
import {Button} from "../../atoms/Button/Button";
import styles from "./ProductForm.module.css";

export function ProductForm() {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    quantity: 1,
    category: "",
    unit: "",
    description: "",
    entryDate: "",
    expiryDate: "",
    price: "",
    alerts: false,
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value } = e.target;

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      const newValue = e.target.checked;
      setFormData((prev) => ({ ...prev, [name]: newValue }));
    } else if (type === "file" && e.target instanceof HTMLInputElement) {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({
            ...prev,
            [name]: reader.result as string, // esto será la cadena base64
          }));
        };
        reader.readAsDataURL(file); // convierte a base64 automáticamente
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      const value = formData[key as keyof typeof formData];
      if (value !== null) {
        formDataToSend.append(key, value as string | Blob);
      }
    }
    

    try {
      const endpoint = "http://localhost:5000/api/products";
      console.log("📦 URL:", JSON.stringify(endpoint)); // Para ver si tiene \n
      const response = await axios.post(endpoint, formData);

      console.log("📦 URL enviada:", "http://localhost:5000/api/products");

      console.log("Producto registrado con éxito:", response.data);
      setSuccessMessage("✅ Producto guardado correctamente");
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);

      setFormData({
        image: null,
        name: "",
        quantity: 1,
        category: "",
        unit: "",
        description: "",
        entryDate: "",
        expiryDate: "",
        price: "",
        alerts: false,
      });
    } catch (error) {
      console.error("Error al registrar el producto:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Registrar producto</h2>
      <div className={styles.field}>
        <label>🖼️ Imagen del producto</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <FormField
        label="🏷️ Nombre del producto"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Ejm: Manzana"
      />

      <FormField
        label="🔢 Cantidad"
        name="quantity"
        type="number"
        value={formData.quantity}
        onChange={handleChange}
        min={1}
        required
      />

      <FormField
        label="📦 Categoría"
        name="category"
        type="select"
        value={formData.category}
        onChange={handleChange}
        required
        options={[
          { value: "frutas", label: "Frutas" },
          { value: "verduras", label: "Verduras" },
          { value: "granos", label: "Granos" },
          { value: "carnes-pollo-pescado", label: "Carne, Pollo y Pescado" },
          { value: "lácteos-huevos", label: "Lácteos y Huevos" },
        ]}
      />

      <FormField
        label="⚖️ Unidad de medida"
        name="unit"
        type="select"
        value={formData.unit}
        onChange={handleChange}
        required
        options={[
          { value: "kg", label: "Kg" },
          { value: "g", label: "g" },
          { value: "unidad", label: "Unidad" },
        ]}
      />

      <FormField
        label="📝Descripción"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={handleChange}
        rows={4}
      />

      <FormField
        label="🗓️ Fecha de ingreso"
        name="entryDate"
        type="date"
        value={formData.entryDate || ""}
        onChange={handleChange}
        required
      />
      <FormField
        label="📅Fecha de vencimiento"
        name="expiryDate"
        type="date"
        value={formData.expiryDate || ""}
        onChange={handleChange}
        required
      />

      <FormField
        label="💰 Precio"
        name="price"
        type="number"
        placeholder="Ejm: 1000"
        value={formData.price}
        onChange={handleChange}
        min={0}
        step={0.01}
      />

      <div className={styles.checkboxField}>
        <label>🔔 ¿Deseas recibir alertas antes de vencer?</label>
        <input
          type="checkbox"
          name="alerts"
          checked={formData.alerts}
          onChange={handleChange}
        />
      </div>
      {successMessage && (
  <p className={styles.successMessage}>{successMessage}</p>
)}
      <Button type="submit" text="Registrar producto" />
    </form>
    
  );
}
