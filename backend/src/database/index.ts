import { connect } from 'mongoose';
import { MONGO_URI } from '../config';

export const connectDB = () => {
  //console.log('Valor actual de MONGO_URI:', MONGO_URI); 

  if (MONGO_URI) {
    connect(MONGO_URI)
      .then(() => console.log('Conectado a MongoDB 😁'))
      .catch(err => console.error('Error al conectar a MongoDB:', err));
  } else {
    console.error('La variable MONGO_URI no está definida');
  }
};
