//Punto de entrada del servidor
import express from "express";
import connectDB from "./config/db";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas (cuando las agregues)
app.get("/", (req, res) => {
  res.send("API funcionando correctamente.");
});

app.listen(PORT, () => {
  console.log(`🚀Servidor corriendo en http://localhost:${PORT}`);
});
