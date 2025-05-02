import OpenAI from "openai";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

// Config DeepSeek Client
const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY, 
});

// Función para generar sugerencias de recetas
export const getRecipeSuggestions = async (inventory: string[]) => {
  try {
    const prompt = `Dime recetas típicas colombianas que pueda preparar con estos ingredientes: ${inventory.join(', ')}. Solo dime el nombre de las recetas y una breve descripción de cada una.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "deepseek-chat",
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error al consultar la API de DeepSeek:", error);
    throw new Error("No se pudieron obtener sugerencias de recetas.");
  }
};
