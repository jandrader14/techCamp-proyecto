import axios from 'axios';

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;

const obtenerImagenDeReceta = async (nombreReceta: string) => {
  const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${nombreReceta}&image_type=photo&pretty=true`;

  try {
    const respuesta = await axios.get(url);
    const imagen = respuesta.data.hits[0]; // Obtiene la primera imagen de la búsqueda
    console.log('Imagen encontrada:', imagen.webformatURL); // Muestra la URL de la imagen
    return imagen.webformatURL; // Devuelve la URL de la imagen
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    return null; // Si hay error, devuelve null
  }
};

// Ejemplo de uso:
obtenerImagenDeReceta('arepas').then((imagenUrl) => {
  if (imagenUrl) {
    console.log('URL de la imagen:', imagenUrl);
  }
});
