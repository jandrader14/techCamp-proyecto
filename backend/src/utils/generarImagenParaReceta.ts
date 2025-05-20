
import axios from 'axios';
import cloudinary from '../config/cloudinary';

interface RecetaIA {
  nombre: string;
  ingredientes: string[];
  tipo: 'salada' | 'dulce';
}

export const generarImagenParaReceta = async (
  receta: RecetaIA
): Promise<string | null> => {
  try {
    const esDulce = receta.tipo === 'dulce';

    const prompt = esDulce
      ? `Una fotografía profesional de un postre colombiano llamado "${receta.nombre}", preparado con ingredientes como: ${receta.ingredientes.join(', ')}. El postre debe lucir delicioso, bien presentado y sobre un fondo neutro o una mesa de madera. Estilo editorial de revista gastronómica. Formato realista, no ilustración.`
      : `Una fotografía profesional de un plato colombiano llamado "${receta.nombre}", con ingredientes como ${receta.ingredientes.join(', ')}. El plato debe lucir apetitoso, bien presentado y sobre una mesa rústica. Estilo editorial gastronómico. Formato realista, no ilustración.`;

    const imageResponse = await axios.post(
      'https://api.openai.com/v1/images/generations',
      {
        prompt,
        n: 1,
        size: '512x512',
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_AI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const imageUrl = imageResponse.data.data[0].url;

    const uploadResult = await cloudinary.uploader.upload(imageUrl, {
      folder: 'recetas',
    });

    return uploadResult.secure_url;

  } catch (error) {
  if (axios.isAxiosError(error)) {
    console.error('❌ Error generando o subiendo imagen (Axios):', error.response?.data || error.message);
  } else if (error instanceof Error) {
    console.error('❌ Error generando o subiendo imagen:', error.message);
  } else {
    console.error('❌ Error inesperado generando imagen:', error);
  }
  return null;
}
};
