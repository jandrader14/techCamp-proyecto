import React, { useState } from "react";
import axios from "axios";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import styles from "./LoginForm.module.css";
import img from "../../../assets/vegetales1.png";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Enviar la solicitud al backend
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      console.log("Login exitoso:", response.data);
    } catch (error) {
      // Si ocurre un error (por ejemplo, usuario no encontrado o contraseña incorrecta)
      setError("Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      <div className={styles.loginWelcome}>
        <img
          src={img}
          alt="Logo"
          className={`${styles.loginWelcome} ${styles.img}`}
        />
        <h1>Market Fresh House</h1>
        <p>Bienvenid@ 👏</p>
      </div>
      <FormField type="email" label="Correo Electrónico" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <FormField type="password" label="Contraseña" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      
      <Button text={loading ? 'Cargando...' : 'Ingresar'} type="submit" disabled={loading} />
      {error && <p className={styles.error}>{error}</p>} {/* Mostrar mensaje de error */}
    </form>
  );
};

export default LoginForm;
