export interface Product {
  _id: string;
  image?: string;
  name: string;
  quantity: number; //Cantidades
  category?: string;
  unit?: string; // Unidad de medida
  description?: string;
  entryDate?: string | Date;
  expiryDate: string | null | undefined | Date; // Cambiamos expirationDate a expiryDate
  price?: number;
  alerts?: boolean;
  __v?: number;
}