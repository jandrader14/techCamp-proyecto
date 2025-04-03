import React from 'react';
import styles from "./FormField.module.css";
import Input from '../../atoms/Input/Input';

interface FormFieldProps {
  type: string;
  label: string;
  name: string;
}

const FormField: React.FC<FormFieldProps> = ({ type, label,  }) => {
  return (
    <div className={styles.formField}>
      <Input type={type} label={label} required id={''} />
    </div>
  );
};

export default FormField;
