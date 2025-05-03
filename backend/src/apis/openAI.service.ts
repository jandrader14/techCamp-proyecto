import 'dotenv/config';
import { OpenAI } from 'openai';
import axios from 'axios';
import { extraerNombreReceta, extraerIngredientes, extraerPasos } from '../utils/openAI.helpers';

// Configuración de la API de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY as string,
  organization: process.env.ORGANIZATION_ID_OPEN_AI as string,
  project: process.env.OPEN_AI_PROJECT_ID as string,
});

// Configuración de la API de Pixabay
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

// Tipo para la respuesta de receta
interface RecipeResponse {
  ingredients: string[];
  steps: string[];
  imageUrl: string;
}

// Función para buscar una imagen en Pixabay
const obtenerImagenDeReceta = async (nombreReceta: string) => {
  const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${nombreReceta}&image_type=photo&pretty=true`;
  try {
    const respuesta = await axios.get(url);
    const imagen = respuesta.data.hits[0];
    return imagen ? imagen.webformatURL : null;
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    return null;
  }
};

// Función para generar la receta y buscar imagen
export const generarRecetas = async (productos: string[]): Promise<RecipeResponse> => {
  const prompt = `Tengo los siguientes productos: ${productos.join(', ')}.

Con base en ellos, sugiere una receta colombiana y creativa.

Devuélvela en el siguiente formato ESTRICTO:

Nombre de la receta: [nombre]

Ingredientes:
- [ingrediente 1]
- [ingrediente 2]
- [ingrediente 3]

Pasos de preparación:
1. [Paso 1]
2. [Paso 2]
3. [Paso 3]

Solo devuelve el texto exactamente en ese formato, sin explicaciones.`;


  const respuesta = await openai.chat.completions.create({
    model: 'o4-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 1.0,
  });

  const content = respuesta.choices[0].message?.content ?? '';
  console.log('Contenido de la receta:', content);

  const nombreReceta = extraerNombreReceta(content);
  // Aquí extraemos los ingredientes y pasos de la respuesta de la IA
  const ingredientes = extraerIngredientes(content); // Función que extrae ingredientes
  const pasos = extraerPasos(content); // Función que extrae pasos

  const parsedReceta: RecipeResponse = {
    ingredients: ingredientes,
    steps: pasos,
    imageUrl: '',
  };

  parsedReceta.imageUrl = await obtenerImagenDeReceta(nombreReceta);

  return parsedReceta;
};
