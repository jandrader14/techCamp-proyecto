import styles from "./InventoryCard.module.css";

interface InvetoryCardProps {
  imageSrc: string;
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
}

export function InventoryCard({
  imageSrc,
  title,
  description,
  buttonLabel,
  onClick,
}: InvetoryCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={imageSrc} alt={title} />
      </div>
      <div className={styles.textContent}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.buttonBtn} onClick={onClick}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}
