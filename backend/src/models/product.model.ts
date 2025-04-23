import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  image: String,
  name: String,
  quantity: Number,
  category: String,
  unit: String,
  description: String,
  entryDate: Date,
  expiryDate: Date,
  price: Number,
  alerts: Boolean,
});

export const Product = model('Products', productSchema);

