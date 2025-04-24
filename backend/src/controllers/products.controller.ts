import { Request, Response } from "express";
import { productsService } from "../services/products.service";

export const productsController = {
  getAllProducts: async (req: Request, res: Response) => {
    try {
      const data = await productsService.getAll();
      return res.json(data);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });

    }
  },
  create: async (req: Request, res: Response) => {
    try {
      const newProduct = await productsService.create(req.body);
      return res.status(201).json({
        message: 'Producto creado correctamente',
        product: newProduct,
      });
    } catch (error) {
      console.error('Error al crear producto:', error);
      return res.status(500).json({
        message: 'Error del servidor',
        error: (error as Error).message
      });
    }
  },
  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await productsService.delete(id);
      return res.json(data);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });

    }
  },
  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const data = await productsService.update(id, req.body);
      return res.json(data);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });

    }
  },
}

