// backend/src/utils/openAI.helpers.ts

export const extraerNombreReceta = (content: string): string => {
    if (!content) return 'Receta desconocida';
  
    const regex = /(?:Receta:|Nombre de la receta:)\s*([A-Za-z\s]+)/i;
    const match = content.match(regex);
  
    return match ? match[1].trim() : 'Receta desconocida';
  };
  