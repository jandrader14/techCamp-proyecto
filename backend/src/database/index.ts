import {connect} from 'mongoose';

const MONGO_URI = 'mongodb+srv://andraderjohanna:johanna@cluster0.mwkecjr.mongodb.net/marketHomeRecipes?retryWrites=true&w=majority&appName=Cluster0';

export const connectDB =() => {
    connect(MONGO_URI);
    console.log('Conectado a MongoDB 😁');

}