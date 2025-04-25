import React from "react";
import styles from "./SectionCard.module.css";

interface SectionCardProps {
  imageSrc: string;
  title: string;
  description: string;
  buttonLabel: string;
  onClick: () => void;
  className?: string; // Allows for optional className prop
}

export const SectionCard: React.FC<SectionCardProps> = ({
  imageSrc,
  title,
  description,
  buttonLabel,
  onClick,
  className,
}) => {
  return (
    <div className={`${styles.card} ${className || ""}`}>
      <div className={styles.imageWrapper}>
        <img src={imageSrc} alt={title} className={styles.image} />
      </div>
      <div className={styles.textContent}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.buttonBtn} onClick={onClick}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};
