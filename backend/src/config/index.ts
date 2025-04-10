import {config} from 'dotenv'

if(process.env.NODE_ENV !== 'production') { // Verifica si no está en producción
    config();
}

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;