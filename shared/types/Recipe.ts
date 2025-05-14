export interface Ingredient {
    product: string; 
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