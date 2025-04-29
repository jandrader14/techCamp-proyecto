import { ChangeEvent, useState } from "react";
import axios from "axios";
import FormField from "../../molecules/FormField/FormField";
import { Button } from "../../atoms/Button/Button";

import styles from "./RecipeForm.module.css";

interface RecipeFormProps {
  image: File | null;
  name: string;
  ingredients: string;
  preparation: string;
  duration: string;
}

export const RecipeForm = () => {
  const [formData, setFormData] = useState<RecipeFormProps>({
    image: null,
    name: "",
    ingredients: "",
    preparation: "",
    duration: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    setErrors({
      ...errors,
      [name]: value ? "" : "Este campo es obligatorio",
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({
      ...formData,
      image: file,
    });
    setErrors({
      ...errors,
      image: file ? "" : "La imagen es obligatoria",
    });
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
      const endpoint = "http://localhost:5000/api/recipes";
      console.log("📦 URL:", JSON.stringify(endpoint)); // Para ver si tiene \n
      const response = await axios.post(endpoint, formData);

      console.log("📦 URL enviada:", "http://localhost:5000/api/recipes");

      console.log("Receta registrada con éxito:", response.data);
      setSuccessMessage("✅ Receta guardada correctamente");
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);

      setFormData({
        image: null,
        name: "",
        ingredients: "",
        preparation: "",
        duration: "",
      });
    } catch (error) {
      console.error("Error al registrar la receta:", error);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Registrar receta</h2>
      {successMessage && <p className={styles.success}>{successMessage}</p>}
      <div className={styles.inputGroup}>
        <label htmlFor="image">Imagen:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleFileChange}
        />
        {errors.image && <span className={styles.error}>{errors.image}</span>}
      </div>

      <div className={styles.inputGroup}>
        <FormField
          label="Nombre de la receta"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Ejm: Ajiaco con pollo"
        />
        {errors.name && <span className={styles.error}>{errors.name}</span>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="ingredients">Ingredientes:</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleInputChange}
        />
        {errors.ingredients && (
          <span className={styles.error}>{errors.ingredients}</span>
        )}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="preparation">Preparación:</label>
        <textarea
          id="preparation"
          name="preparation"
          value={formData.preparation}
          onChange={handleInputChange}
        />
        {errors.preparation && (
          <span className={styles.error}>{errors.preparation}</span>
        )}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="duration">Duración:</label>
        <input
          type="text"
          id="duration"
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
        />
        {errors.duration && (
          <span className={styles.error}>{errors.duration}</span>
        )}
      </div>
      <button type="submit" className={styles.submitButton}>
        Registrar receta
      </button>
    </form>
  );
};
