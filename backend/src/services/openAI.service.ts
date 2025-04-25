// Servicios/openaiService.ts
import 'dotenv/config';
import  { OpenAI} from 'openai';


// Configuración de la API
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY as string,
  organization: process.env.ORGANIZATION_ID_OPEN_AI as string,
  project: process.env.OPEN_AI_PROJECT_ID as string
});


// Definir los tipos de la respuesta
interface RecipeResponse {
  ingredients: string[];
  steps: string[];
}

export const generarRecetas = async (productos: string[]): Promise<RecipeResponse> => {
    const prompt = `Tengo los siguientes productos: ${productos.join(', ')}. Sugiere una receta colombiana y creativa con ingredientes y pasos.`;
  
    // Realiza la solicitud a la API de OpenAI
    const respuesta = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', 
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });
  
    
    const content = respuesta.choices[0].message?.content;
    console.log(content);
    // Parsear la respuesta (esto es solo un ejemplo; adapta la lógica de parsing a tu formato real)
    const parsedReceta: RecipeResponse = {
      ingredients: ['Ingrediente 1', 'Ingrediente 2'], // Reemplaza con la lógica real de parsing
      steps: ['Paso 1', 'Paso 2'], // Reemplaza con la lógica real de parsing
    };
  
    return parsedReceta;
  };

