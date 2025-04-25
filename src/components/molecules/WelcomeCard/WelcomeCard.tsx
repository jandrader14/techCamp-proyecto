import styles from "./WelcomeCard.module.css";
export function WelcomeCard() {
  return (
    <div className={styles.welcomeMainContainer}>
      <div className={styles.welcomeContainer}>
        <div className={styles.welcomeText}>
          <h1>¡Bienvenid@ a tu cocina inteligente! &#128075;</h1>
          <p>
            Organiza tu mercado, crea recetas deliciosas y descubre ideas
            basadas en lo que ya tienes. ¡Haz que cada ingrediente cuente! 🍅✨
          </p>
        </div>
        <div className={styles.welcomeImage}>
          <img src="https://res.cloudinary.com/dcgcixisy/image/upload/vegetales1_c0qmkl.png" alt="welcome image" />
        </div>
      </div>
    </div>
  );
}
