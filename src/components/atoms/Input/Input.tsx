import React from 'react';
import styles from "./Input.module.css";

interface InputProps {
  type: string;
  id: string;
  label: string;
  name: string;
  required?: boolean;
  pattern?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ type, id, label, name, required, pattern }) => {
  return (
    <div className={styles.inputWrapper}>
      <input type={type} id={id} name={name} className={styles.input__field} required={required} pattern={pattern} />
      <label id={id} className={styles.input__label}>
        {label}        
      </label>
    </div>
  );
};

export default Input;
