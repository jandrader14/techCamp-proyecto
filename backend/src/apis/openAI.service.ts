import 'dotenv/config';
import { OpenAI } from 'openai';
import axios from 'axios';

import { RecetaIA } from '../../../shared/types/Recipe';


// Configuración de la API de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY as string,
  organization: process.env.ORGANIZATION_ID_OPEN_AI as string,
  project: process.env.OPEN_AI_PROJECT_ID as string,
});

// Configuración de la API de Pixabay
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

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
export const generarRecetas = async (productos: string[], prompt: string): Promise<RecetaIA> => {
  try {
    const respuesta = await openai.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 1.0,
    });

    const content = respuesta.choices[0].message?.content ?? '';

    const cleanContent = content.replace(/```json|```/g, "").trim();
    console.log("✅ JSON limpio recibido:", cleanContent);

    console.log('⚠️ Texto recibido de la IA:', content);


    const recetaAI = JSON.parse(cleanContent) as { nombre: string; ingredientes: string[]; pasos: string[]; categoria: string, porciones: string };
    const imageUrl = await obtenerImagenDeReceta(recetaAI.nombre);

    return {
      nombre: recetaAI.nombre,
      ingredientes: recetaAI.ingredientes,
      pasos: recetaAI.pasos,
      imageUrl: imageUrl,
      categoria: recetaAI.categoria || 'Platos Fuertes',
      porciones: recetaAI.porciones
    };

  } catch (error) {
    console.error('Error al generar o parsear la receta con IA:', error);
    return {
      nombre: 'Error al generar receta',
      ingredientes: [],
      pasos: [],
      imageUrl: "",
      categoria: 'Error',
      porciones: 'Error',
    };
  }
};
