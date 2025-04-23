import React from "react";
import styles from "./Input.module.css";

interface InputProps {
  type: string;
  id?: string;
  label: string;
  name: string;
  value?: string | number;
  checked?: boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder?: string;
  accept?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  type,
  label,
  name,
  value,
  checked,
  onChange,
  placeholder,
  accept,
  options,
  rows,
  required,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputLabelWrapper}>
        <label htmlFor={name} className={styles.inputLabel}>
          {label}
        </label>
      </div>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value as string}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className={styles.inputField}
        />
      ) : type === "select" ? (
        <select
          id={name}
          name={name}
          value={value as string}
          onChange={onChange}
          required={required}
          className={styles.selectField}
        >
          <option value="" disabled hidden>
            Selecciona
          </option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={type === "checkbox" ? undefined : (value as string | number)}
          checked={type === "checkbox" ? checked : undefined}
          onChange={onChange}
          placeholder={placeholder || " "}
          accept={accept}
          required={required}
          className={styles.inputField}
        />
      )}
    </div>
  );
};
