import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FormField from "../../molecules/FormField/FormField";
import {Button} from "../../atoms/Button/Button";
import styles from "./RegisterForm.module.css";
import img from "../../../assets/vegetales1.png";


export const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    
    try {
      console.log({ name, email, password });

      const response = await axios.post('http://localhost:5000/api/users/register', {
        name,
        email,
        password,
      });
  
      if (response.status === 201) {
        console.log('Usuario creado:', response.data);
        setSuccessMessage("¡Usuario creado con éxito! 😁");
        
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      console.error('Error al enviar los datos:', err);
      
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
        className={styles.button}
      />
      {error && <p className={styles.error}>{error}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}
    </form>
  );
};



