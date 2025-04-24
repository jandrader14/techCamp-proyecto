import { Product } from '../models/product.model';

export const productsService = {
  // Obtener todos los productos
  getAll: async () => {
    return await Product.find();
  },

  // Crear un nuevo producto
  create: async (entity: {
    image: string;
    name: string;
    quantity: number;
    category: string;
    unit: string;
    description: string;
    entryDate: Date;
    expiryDate: Date;
    price: number;
    alerts: boolean;
  }) => {
    console.log('📦 Datos recibidos en productsService.create:', entity);

    // Validación básica de campos requeridos
    if (
      !entity.name ||
      entity.quantity === undefined ||
      !entity.category ||
      !entity.unit ||
      !entity.entryDate ||
      !entity.expiryDate ||
      entity.price === undefined
    ) {
      throw new Error('Faltan campos requeridos para crear el producto');
    }

    const newProduct = new Product({
      image: entity.image,
      name: entity.name,
      quantity: entity.quantity,
      category: entity.category,
      unit: entity.unit,
      description: entity.description,
      entryDate: entity.entryDate,
      expiryDate: entity.expiryDate,
      price: entity.price,
      alerts: entity.alerts
    });

    try {
      await newProduct.save();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
      throw new Error('Error al guardar el producto');
    }

    return newProduct;
  },

  // Actualizar un producto
  update: async (id: string, body: object) => {
    return await Product.findByIdAndUpdate(id, body, { new: true });
  },

  // Eliminar un producto
  delete: async (id: string) => {
    return await Product.findByIdAndDelete(id);
  },

  // Obtener un producto por ID
  getById: async (id: string) => {
    return await Product.findById(id);
  }
};
