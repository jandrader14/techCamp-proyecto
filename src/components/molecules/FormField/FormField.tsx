import React from 'react';
import Input from '../../atoms/Input/Input';

interface FormFieldProps {
  type: string;
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ type, label, name, value, onChange }) => {
  return (
    <Input
      type={type}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      required
      id={name}
      placeholder=" "
    />
  );
};


export default FormField;
