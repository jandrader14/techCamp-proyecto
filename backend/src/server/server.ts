import express from 'express';
import cors from 'cors'; //Middleware
import dotenv from 'dotenv';
import {connectDB} from './config/db'; //config db
import authRoutes from './routes/authRoutes'; //routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
//Allow cors for all routes
app.use(cors());
//To parse all request as JSON files
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);


app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
