import React from 'react';
import Input from '../../atoms/Input/Input';

interface FormFieldProps {
  type: string;
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormField: React.FC<FormFieldProps> = ({ type, label, name }) => {
  return (    
      <Input type={type} label={label} name={name} required id={''} placeholder=" " />
    );
};

export default FormField;
