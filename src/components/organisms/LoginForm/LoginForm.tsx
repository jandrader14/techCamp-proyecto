import React from 'react';
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import styles from "./LoginForm.module.css";

const LoginForm: React.FC = () => {
  return (
    <form className={styles.loginForm}>
      <div className={styles.logo}>
        <img src="/assets/imagenes/vegetales1.png" alt="Logo" />
      </div>
      <h1 className={styles.title}>Market Fresh House</h1>
      <p className={styles.welcome}>Bienvenid@ 👏</p>

      <FormField type="email" label="Correo Electrónico" name="email" />
      <FormField type="password" label="Contraseña" name="password" />

      <Button text="Ingresar" type="submit" />
    </form>
  );
};

export default LoginForm;