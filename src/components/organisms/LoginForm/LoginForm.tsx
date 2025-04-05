import React from 'react';
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import styles from "./LoginForm.module.css";
import img from "../../../assets/vegetales1.png";


const LoginForm: React.FC = () => {
  return (
    <form className={styles.loginForm}>
      <div className={styles.loginWelcome}>
        <img src={img} alt="Logo" className={`${styles.loginWelcome} ${styles.img}`} />
        <h1>Market Fresh House</h1>
        <p>Bienvenid@ 👏</p>
      </div>
      <FormField type="email" label="Correo Electrónico" name="email" />
           
      <FormField type="password" label="Contraseña" name="password" />
      
      <Button text="Ingresar" type="submit"/>
    </form>
  );
};

export default LoginForm;
