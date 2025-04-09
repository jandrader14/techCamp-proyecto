import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Conexión exitosa a la base de datos ✅')
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1); //Stop the connection if server fail
  }
};


