// backend/src/utils/openAI.helpers.ts

export const extraerNombreReceta = (content: string): string => {
  if (!content) return 'Receta desconocida';

  const regex = /(?:Receta:|Nombre de la receta:)\s*([A-Za-z\s]+)/i;
  const match = content.match(regex);

  return match ? match[1].trim() : 'Receta desconocida';
};

export const extraerIngredientes = (content: string): string[] => {
  const match = content.match(/Ingredientes\s*:\s*([\s\S]*?)\n\s*Pasos de preparación:/i);
  if (!match) return [];

  return match[1]
    .split('\n')
    .map(line => line.replace(/^[-*]\s*/, '').trim())
    .filter(line => line.length > 0);
};


export const extraerPasos = (content: string): string[] => {
  const match = content.match(/Pasos de preparación\s*:\s*([\s\S]*)/i);
  if (!match) return [];

  return match[1]
    .split('\n')
    .map(line => line.replace(/^\d+\.\s*/, '').trim())
    .filter(line => line.length > 0);
};




