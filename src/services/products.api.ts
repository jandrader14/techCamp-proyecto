import axios from 'axios';
import { Product } from "../types/product"

const ProdEndpoint = "http://localhost:5000/api/products";

export const productApi = {
  getAll: async () => {
    const response = await axios.get(ProdEndpoint);
    return response.data;
  },

  createProduct: async (newProduct: Omit<Product, "_id" | "__v">) => {
    const response = await axios.post(ProdEndpoint, newProduct);
    console.log("Producto creado ✈️:", response.data);
    return response.data;
  },

  updateProduct: async (productId: string, updatedProduct: Product) =>{
    const response = await axios.patch(`${ProdEndpoint}/${productId}`, updatedProduct);
    return response.data;
  },
  

  deleteProduct: async (productId: string) => {
    const response = await axios.delete(`${ProdEndpoint}/${productId}`);
    return response.data;
  }
};

