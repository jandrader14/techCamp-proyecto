import React from "react";
import styles from "./Input.module.css";

interface InputProps {
  type: string;
  id: string;
  label: string;
  required?: boolean;
  pattern?: string;
}

export const Input: React.FC<InputProps> = ({ type, id, label, required, pattern }) => {
  return (
    <div className={styles.inputWrapper}>
      <input type={type} id={id} className={styles.inputField} required={required} pattern={pattern} />
      <label htmlFor={id} className={styles.inputLabel}>
        {label}
      </label>
    </div>
  );
};
