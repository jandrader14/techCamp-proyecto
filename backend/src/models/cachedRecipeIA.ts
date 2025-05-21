// models/CachedRecipe.ts
import { Schema, model, Document } from 'mongoose';
import { RecetaIA } from '../../../shared/types/Recipe';



export interface RecetaIACacheada {
  tipo: 'salada' | 'dulce';
  ingredientes: string[];
  receta: RecetaIA;
  createdAt: Date;
}

// Documento de mongoose con todos los campos + _id, etc.
export type RecetaIADoc = Document & RecetaIACacheada;

const cachedRecipeSchema = new Schema<RecetaIACacheada>({
  tipo: { type: String, enum: ['salada', 'dulce'], required: true },
  ingredientes: { type: [String], required: true },
  receta: {
    nombre: { type: String, required: true },
    ingredientes: [String],
    pasos: [String],
    categoria: String,
    imageUrl: String,
    porciones: { type: String, required: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 2,
  },
});

export const CachedRecipe = model<RecetaIACacheada>('CachedRecipe', cachedRecipeSchema);
