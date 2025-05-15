import { Product } from "./product";

export interface Ingredient {
    product: Product | null; 
    quantity: number;
    unit: string;
}
export interface Recipe {
    _id: string;
    name: string;
    portions: string;
    category: string;
    ingredients: Ingredient[];
    preparation: string;
    image: string;
    __v?: number;
}