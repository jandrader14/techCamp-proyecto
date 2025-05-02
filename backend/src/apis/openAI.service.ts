import 'dotenv/config';
import { OpenAI } from 'openai';
import axios from 'axios';

// Configuración de la API de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY as string,
  organization: process.env.ORGANIZATION_ID_OPEN_AI as string,
  project: process.env.OPEN_AI_PROJECT_ID as string,
});

// Configuración de la API de Pixabay
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

// Definir los tipos de la respuesta
interface RecipeResponse {
  ingredients: string[];
  steps: string[];
  imageUrl: string; // Agregamos el campo para la URL de la imagen
}

// Función para buscar una imagen en Pixabay
const obtenerImagenDeReceta = async (nombreReceta: string) => {
  const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${nombreReceta}&image_type=photo&pretty=true`;
  try {
    const respuesta = await axios.get(url);
    const imagen = respuesta.data.hits[0]; // Obtiene la primera imagen
    return imagen ? imagen.webformatURL : null; // Devuelve la URL de la imagen
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    return null;
  }
};

// Función para generar la receta y buscar la imagen
export const generarRecetas = async (productos: string[]): Promise<RecipeResponse> => {
  const prompt = `Tengo los siguientes productos: ${productos.join(', ')}. Sugiere una receta colombiana y creativa con ingredientes y pasos.`;

  // Realiza la solicitud a la API de OpenAI para generar la receta
  const respuesta = await openai.chat.completions.create({
    model: 'o4-mini', 
    messages: [{ role: 'user', content: prompt }],
    temperature: 1.0,
  });

  const content = respuesta.choices[0].message?.content;
  console.log('Contenido de la receta:', content);

  // Extraer el nombre de la receta desde el contenido (supuesto que la receta comienza con un nombre claro)
  const nombreReceta = extraerNombreReceta(content ?? '');

  // Parsear la respuesta para obtener ingredientes y pasos
  const parsedReceta: RecipeResponse = {
    ingredients: ['Ingrediente 1', 'Ingrediente 2'], // Aquí deberías parsear los ingredientes reales
    steps: ['Paso 1', 'Paso 2'], // Aquí deberías parsear los pasos reales
    imageUrl: '', // Lo llenaremos después con la URL de la imagen
  };

  // Buscar la imagen de la receta usando el nombre de la receta (extraído dinámicamente)
  parsedReceta.imageUrl = await obtenerImagenDeReceta(nombreReceta);

  return parsedReceta;
};

// Función para extraer el nombre de la receta del contenido de OpenAI
const extraerNombreReceta = (content: string): string => {
  if (!content) return 'Receta desconocida'; // Si content es null o vacío, devuelve un valor predeterminado.

  const regex = /(?:Receta:|Nombre de la receta:)\s*([A-Za-z\s]+)/i;
  const match = content.match(regex);
  
  if (match) {
    return match[1].trim(); // Devuelve el nombre de la receta
  }

  // Si no encontramos una coincidencia, devolvemos un valor predeterminado
  return 'Receta desconocida';
};

//-------------------------

// Función principal para probar la funcionalidad
// const main = async () => {
//   try {
//     const productos = ['pollo', 'tomate', 'papa', 'sal', 'agua']; // Lista de productos de ejemplo
//     const receta = await generarRecetas(productos);
//     console.log('Receta generada:', receta);
//   } catch (error) {
//     console.error('Error al generar la receta:', error);
//   }
// };

// // Ejecutar la función principal
// main();