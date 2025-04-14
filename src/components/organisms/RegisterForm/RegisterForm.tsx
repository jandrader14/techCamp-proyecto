import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import styles from "./RegisterForm.module.css";
import img from "../../../assets/vegetales1.png";


export const RegisterForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
      });
      console.log("Registro exitoso:", response.data);
    } catch (error) {
      setError("Hubo un problema al registrarse. Inténtalo nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      <div className={styles.registerWelcome}>
        <img
          src={img}
          alt="Logo"
          className={`${styles.registerWelcome} ${styles.img}`}
        />
        <h1>Market Fresh House</h1>
        <p>¡Crea tu cuenta! 🌽🍓</p>
      </div>

      <FormField
        type="text"
        label="Nombre"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <FormField
        type="email"
        label="Correo Electrónico"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormField
        type="password"
        label="Contraseña"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className={styles.loginRedirect}>
        <Link to="/">¿Ya eres miembro? Ingresa</Link>
      </div>

      <Button
        text={loading ? "Registrando..." : "Registrarse"}
        type="submit"
        disabled={loading}
      />
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};


