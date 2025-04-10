import {connect} from 'mongoose';
import {MONGO_URI} from '../config/index.ts';


export const connectDB =() => {
    connect(MONGO_URI as string);
    console.log('Conectado a MongoDB 😁');

}