import { config } from 'dotenv';


if (process.env.NODE_ENV !== 'production') {
    config(); // ahora .env se carga desde la raíz del proyecto automáticamente
  }

// Verificar si las variables están cargadas correctamente
//console.log('MONGO_URI:', process.env.MONGO_URI);

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;
