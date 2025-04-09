import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    //console.log(`MongoDB conectado: ${conn.connection.host}`);
    console.log('Conexión exitosa a la base de datos ✅')
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1); //Stop the connection if server fail
  }
};


