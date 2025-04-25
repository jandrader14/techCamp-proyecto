import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  image: String,
  name: String,
  quantity: Number,
  category: String,
  unit: String,
  description: String,
  entryDate: {
    type: Date, required: true
  },
  expiryDate: {
    type: Date, required: true
  },
  price: Number,
  alerts: Boolean,
});

export const Product = model('Products', productSchema);

