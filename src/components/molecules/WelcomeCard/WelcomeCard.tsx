import styles from "./WelcomeCard.module.css";
export function WelcomeCard() {
  return (
    <div className={styles.welcomeMainContainer}>
      <div className={styles.welcomeContainer}>
        <div className={styles.welcomeText}>
          <h1>Hola bienvenido &#128075;</h1>
          <p>
            Aquí podrás visualizar y administrar de forma sencilla el inventario
            de tu mercado. A su vez agregar recetas y tener sugerencias de
            acuerdo al stock de tus productos. &#x1F9C3;
          </p>
        </div>
        <div className={styles.welcomeImage}>
          <img src="src/assets/vegetales1.png" alt="welcome image" />
        </div>
      </div>
    </div>
  );
}
