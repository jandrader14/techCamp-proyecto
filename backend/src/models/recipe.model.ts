
import { Schema, Document, model } from 'mongoose';

interface IIngredient {
  product: string; // ID del producto (referencia a tu inventario)
  quantity: number;
  unit: string;
}

interface IRecipe extends Document {
  name: string;
  portions: string;
  ingredients: IIngredient[];
  preparation: string;
  image: string;
}

const ingredientSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Referencia al producto en el inventario
  quantity: { type: Number, required: true },
  unit: { type: String, required: true }
});

const recipeSchema: Schema = new Schema({
  name: { type: String, required: true },
  portions: { type: String, required: true },
  ingredients: [ingredientSchema], // Array de ingredientes
  preparation: { type: String, required: true },
  image: { type: String, required: true }
});

//export const Product = model('Products', productSchema);
export const Recipe = model<IRecipe>('Recipes', recipeSchema);


