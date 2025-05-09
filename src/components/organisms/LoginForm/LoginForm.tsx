import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormField from "../../molecules/FormField/FormField";
import { Button } from "../../atoms/Button/Button";
import styles from "./LoginForm.module.css";
import img from "../../../assets/vegetales1.png";

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Enviar la solicitud al backend
      const response = await axios.post("http://localhost:5000/api/users/", {
        email,
        password,
      });

      if (response.status === 200) {
        // alert('Login exitoso');
        navigate("/dashboard"); // Redirige al dashboard
      }

      console.log("Login exitoso:", response.data);
    } catch (error) {
      // Si ocurre un error (por ejemplo, usuario no encontrado o contraseña incorrecta)
      setError("Correo o contraseña incorrectos");
      console.error("Error en el login:", error);
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
      <FormField
        type="email"
        label="Correo Electrónico"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ingresa tu correo"
      />
      <FormField
        type="password"
        label="Contraseña"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Ingresa tu contraseña"
      />
      {/* <div className={styles.forgotPassword}>
        <Link to="/forgotPassword">¿Olvidaste tu contraseña?</Link>
      </div> */}
      <Button
        text={loading ? "Cargando..." : "Ingresar"}
        type="submit"
        disabled={loading}
        className={styles.button}
      />
      {error && <p className={styles.error}>{error}</p>}{" "}
      {/* Mostrar mensaje de error */}
      <div className={styles.register}>
        <p>¿No tienes cuenta? </p>
        <Link to="/register">Regístrate</Link>
      </div>
    </form>
  );
};
