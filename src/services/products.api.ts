import axios from 'axios';

const ProdEndpoint = "http://localhost:5000/api/products";

export const productApi = {
  getAll: async () => {
    const response = await axios.get(ProdEndpoint);
    return response.data;
  },

  deleteProduct: async (productId: string) => {
    const response = await axios.delete(`${ProdEndpoint}/${productId}`);
    return response.data;
  }
};
