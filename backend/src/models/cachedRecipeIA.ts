// models/CachedRecipe.ts
import { Schema, Document, model } from 'mongoose';

interface RecetaIACacheada extends Document {
  tipo: 'salada' | 'dulce';
  ingredientes: string[];
  receta: {
    nombre: string;
    ingredientes: string[];
    pasos: string[];
    categoria: string;
    imageUrl: string;
  };
  createdAt: Date;
}

const cachedRecipeSchema = new Schema<RecetaIACacheada>({
  tipo: { type: String, enum: ['salada', 'dulce'], required: true },
  ingredientes: { type: [String], required: true },
  receta: {
    nombre: { type: String, required: true },
    ingredientes: [String],
    pasos: [String],
    categoria: String,
    imageUrl: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24, // expira en 24 horas
  },
});

export const CachedRecipe = model<RecetaIACacheada>('CachedRecipe', cachedRecipeSchema);
