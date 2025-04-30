// src/components/ImageUploader/ImageUploader.tsx
import React from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import styles from "./ImageUploader.module.css";

interface ImageUploaderProps {
  value: string | null;
  onChange: (image: string | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ value, onChange }) => {
  const handleImageRemove = () => {
    onChange(null); // Remover imagen
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string); // Establece la imagen en base64
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.imageUploader}>
      {!value ? (
        <>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleChange}
            className={styles.hiddenInput}
          />
          <label htmlFor="image" className={styles.uploadButton}>
            <ImagePlus size={24} color="var(--icon-primary)" />
            Subir imagen
          </label>
        </>
      ) : (
        <div className={styles.previewContainer}>
          <img src={value} alt="Vista previa" className={styles.imagePreview} />
          <button
            type="button"
            onClick={handleImageRemove}
            className={styles.removeImageButton}
          >
            <Trash2 size={18} color="white" />
            <span>Quitar imagen</span>
          </button>
        </div>
      )}
    </div>
  );
};


