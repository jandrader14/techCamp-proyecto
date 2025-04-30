import { useState } from "react";
import axios from "axios";
import FormField from "../../molecules/FormField/FormField";

import styles from "./RecipeForm.module.css";

interface RecipeFormProps {
  image: File | null;
  name: string;
  ingredients: string;
  preparation: string;
  portions: string;
}

export const RecipeForm = () => {
  const [formData, setFormData] = useState<RecipeFormProps>({
    image: null,
    name: "",
    ingredients: "",
    preparation: "",
    portions: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value } = e.target;

    if (type === "file" && e.target instanceof HTMLInputElement) {
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
        formDataToSend.append(key, value as string);
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
        portions: "",
      });
    } catch (error) {
      console.error("Error al registrar la receta:", error);
    }
  };

  return (
    <form className={styles.recipe_form} onSubmit={handleSubmit}>
      <h2 className={styles.recipe_form__title}>Registrar receta</h2>
      <div className={styles.recipe_form__image}>
        <label htmlFor="image">🖼️ Imagen:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <FormField
        label="🥘 Nombre de la receta"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Ejm: Ajiaco con pollo"
        required
      />

      <div className={styles.recipe_form__inputGroup}>
        <label htmlFor="ingredients">🛒 Ingredientes:</label>
        <textarea
          id="ingredients"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.recipe_form__inputGroup}>
        <label htmlFor="preparation">🍴 Preparación:</label>
        <textarea
          id="preparation"
          name="preparation"
          value={formData.preparation}
          onChange={handleChange}
          required
        />
      </div>

      <FormField
        label="🍽️ Porciones:"
        name="name"
        type="text"
        value={formData.portions}
        onChange={handleChange}
        placeholder="Ejm: 4 porciones"
        required
      />
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      <button type="submit" className={styles.submitButton}>
        Registrar receta
      </button>
    </form>
  );
};
