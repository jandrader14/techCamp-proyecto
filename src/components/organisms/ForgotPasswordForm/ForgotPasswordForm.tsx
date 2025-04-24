import React, { useState } from "react";
import axios from "axios";
import FormField from "../../molecules/FormField/FormField";
import {Button} from "../../atoms/Button/Button";
import styles from "./ForgotPasswordForm.module.css";
import img from "../../../assets/vegetales1.png";

 export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.patch("http://localhost:5000/reset-password", {
        email,
        newPassword,
      });

      if (response.status === 200) {
        setMessage("Contraseña actualizada exitosamente ✅");
      }
    } catch (error) {
      setMessage("No se pudo actualizar la contraseña ❌");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.forgotPasswordForm} onSubmit={handleSubmit}>
      <div className={styles.forgotPasswordWelcome}>
        <img
          src={img}
          alt="Logo"
          className={`${styles.forgotPasswordWelcome} ${styles.img}`}
        />
        <h1>Market Fresh House</h1>
      </div>
      <div className={styles.forgotPasswordTitle}>
        <p>¡Recupera tu cuenta! 🌽🍓</p>
      </div>
      
      <FormField
        type="email"
        label="Correo electrónico"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormField
        type="password"
        label="Nueva contraseña"
        name="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Button text={loading ? "Actualizando..." : "Actualizar contraseña"} type="submit" disabled={loading} />
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};


