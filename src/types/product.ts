export interface Product {
    _id: string;
    image: string;
    name: string;
    quantity: number;
    category: string;
    unit: string;
    description: string;
    entryDate: string;
    expirationDate: string;
    price: number;
    alerts: boolean;
    __v?: number;
  }
  