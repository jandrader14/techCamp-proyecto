import React from 'react';
import FormField from "../../molecules/FormField/FormField";
import Button from "../../atoms/Button/Button";
import styles from "./LoginForm.module.css";


const LoginForm: React.FC = () => {
  return (
    <form className={styles.loginForm}>
      <div className={styles.loginWelcome}>
        <img src="https://drive.google.com/thumbnail?id=17b6a3S9W0uRJ0np5cE6k6pNISwvBYZ9f&sz=80-hg=80" alt="Logo" className="logo" />
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