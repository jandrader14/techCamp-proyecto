export interface Ingredient {
    product: string; 
    quantity: number;
    unit: string;
}
export interface Recipe {
    id?: string;
    name: string;
    portions: string;
    category: string;
    ingredients: Ingredient[];
    preparation: string;
    image: string;
}