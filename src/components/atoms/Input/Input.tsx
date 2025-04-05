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

const Input: React.FC<InputProps> = ({ type, id, label, name, required, pattern, placeholder }) => {
  return (
    <div className={styles.inputWrapper}>      
      <input type={type} id={id} name={name} className={styles.inputField} required={required} pattern={pattern} placeholder={placeholder} />
      <label htmlFor={id} className={styles.inputLabel}>
        {label}        
      </label>
    </div>
  );
};

export default Input;
