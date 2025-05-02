import { useState } from "react";
import axios from "axios";
import FormField from "../../molecules/FormField/FormField";
import { ImageUploader } from "../..//molecules/ImageUploader/ImageUploader";
import { Button } from "../../atoms/Button/Button";
import { Plus, Trash2 } from "lucide-react";

import styles from "./RecipeForm.module.css";

// Define interface for ingredients
interface Ingredient {
  id: string;
  quantity: number;
  unit: string;
  productId: string;
}
interface RecipeFormProps {
  image: string | null;
  name: string;
  ingredients: string;
  preparation: string;
  portions: string;
}

export const RecipeForm = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [formData, setFormData] = useState<RecipeFormProps>({
    image: null,
    name: "",
    ingredients: "",
    preparation: "",
    portions: "",
  });

  const handleAddIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      { id: crypto.randomUUID(), quantity: 0, unit: "", productId: "" },
    ]);
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
  };

  const handleChangeIngredient = (id: string, field: string, value: string) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

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
    // Adicional: Manejo de ingredientes para enviarlos en el reques
    formDataToSend.append("ingredients", JSON.stringify(ingredients));

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
      setIngredients([]); // Limpiar ingredientes después de enviar
    } catch (error) {
      console.error("Error al registrar la receta:", error);
    }
  };

  const handleImageChange = (image: string | null) => {
    setFormData((prev) => ({ ...prev, image }));
  };

  const [successMessage, setSuccessMessage] = useState("");

  return (
    <form className={styles.recipe_form} onSubmit={handleSubmit}>
      <h2 className={styles.recipe_form__title}>Registrar receta</h2>

      <ImageUploader value={formData.image} onChange={handleImageChange} />

      <FormField
        label="🥘 Nombre de la receta"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        placeholder="Ej: Torta de chocolate"
        required
      />

      <FormField
        label="🍽️ Porciones:"
        name="name"
        type="text"
        value={formData.portions}
        onChange={handleChange}
        placeholder="Ejm: 4 porciones"
        required
      />

      <div className={styles.recipe_form__ingredients}>
        <div className={styles.recipe_form__inputGroup}>
          <label htmlFor="ingredients" className={styles.ingredientsLabel}>
            🛒 Ingredientes:
            <Button
              type="button"
              text="Agregar ingrediente"
              className={styles.addIngredientButton}
              onClick={handleAddIngredient}
            >
              <Plus />
            </Button>
          </label>

          {ingredients.map((ingredient) => (
            <div key={ingredient.id} className={styles.ingredientRow}>
              <input
                type="number"
                value={ingredient.quantity}
                onChange={(e) =>
                  handleChangeIngredient(
                    ingredient.id,
                    "quantity",
                    e.target.value
                  )
                }
                placeholder="Cantidad"
              />
              <input
                type="text"
                value={ingredient.unit}
                onChange={(e) =>
                  handleChangeIngredient(ingredient.id, "unit", e.target.value)
                }
                placeholder="Unidad"
              />
              <input
                type="text"
                value={ingredient.productId}
                onChange={(e) =>
                  handleChangeIngredient(
                    ingredient.id,
                    "productId",
                    e.target.value
                  )
                }
                placeholder="Producto"
              />
              <Button
                type="button"
                text="Eliminar"
                onClick={() => handleRemoveIngredient(ingredient.id)}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.recipe_form__inputGroup}>
        <label htmlFor="preparation">🍴 Preparación:</label>
        <textarea
          id="preparation"
          name="preparation"
          value={formData.preparation}
          onChange={handleChange}
          required
          placeholder="Ej: 1. Precalentar el horno a 180°C. 2. Batir los huevos con el azúcar hasta que estén espumosos. 3. ..."
        />
        <small className="form-text text-muted">
          Describe la preparación en orden cronológico. Comienza cada paso con
          un número (1., 2., etc.) para mayor claridad
        </small>
      </div>

      {successMessage && <p className={styles.success}>{successMessage}</p>}

      <Button
        type="submit"
        text="Registrar producto"
        className={styles.recipe_form__button}
      />
    </form>
  );
};
