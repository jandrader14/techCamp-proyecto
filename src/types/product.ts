export interface Product {
  _id: string;
  image?: string | null;
  name: string;
  quantity?: number; //Cantidades
  category?: string;
  unit?: string; // Unidad de medida
  description?: string;
  entryDate?: string ;
  expiryDate: string | null | undefined ; // Cambiamos expirationDate a expiryDate
  price?: number;
  alerts?: boolean;
  __v?: number;
}