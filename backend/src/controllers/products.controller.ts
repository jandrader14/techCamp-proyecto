import { Request, Response } from "express";
import { Product } from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      image,
      name,
      quantity,
      category,
      unit,
      description,
      entryDate,
      expiryDate,
      price,
      alerts,
    } = req.body;

    // Validación rápida (puedes mejorarla si quieres)
    if (!name || !category || !unit) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const newProduct = new Product({
      image,         // <- Este debe ser una cadena base64
      name,
      quantity,
      category,
      unit,
      description,
      entryDate,
      expiryDate,
      price,
      alerts,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Producto creado correctamente",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
