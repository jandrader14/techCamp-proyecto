import { useState } from "react";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value } = e.target;

    let newValue: string | File | boolean | null = value;

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      newValue = e.target.checked;
    } else if (type === "file" && e.target instanceof HTMLInputElement) {
      newValue = e.target.files?.[0] || null;
    }
    // spread operator - State update
    setFormData((prev) => ({
      ...prev, //spread operator
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Producto registrado:", formData);
    // Aquí podrías llamar a una función de envío al backend
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Registrar producto</h2>
      <div className={styles.field}>
        <label>Imagen del producto</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <FormField
        label="Nombre del producto"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Ejm: Manzana"
      />

      <FormField
        label="Cantidad"
        name="quantity"
        type="number"
        value={formData.quantity}
        onChange={handleChange}
        min={1}
        required
      />

      <FormField
        label="Categoría"
        name="category"
        type="select"
        value={formData.category}
        onChange={handleChange}
        required
        options={[
          { value: "frutas", label: "Frutas" },
          { value: "verduras", label: "Verduras" },
          { value: "granos", label: "Granos" },
        ]}
      />

      <FormField
        label="Unidad de medida"
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
        label="Descripción"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={handleChange}
        rows={4}
      />

      <FormField
        label="Fecha de ingreso"
        name="entryDate"
        type="date"
        value={formData.entryDate}
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

      <FormField
        label="Precio 💰"
        name="price"
        type="number"
        placeholder="Ejm: 1000"
        value={formData.price}
        onChange={handleChange}
        min={0}
        step={0.01}
      />

      <div className={styles.checkboxField}>
        <label>¿Deseas recibir alertas antes de vencer?</label>
        <input
          type="checkbox"
          name="alerts"
          checked={formData.alerts}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" text="Registrar producto" />
    </form>
  );
}
