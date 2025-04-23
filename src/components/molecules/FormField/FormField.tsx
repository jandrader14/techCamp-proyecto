import React from 'react';
import {Input} from '../../atoms/Input/Input';

type InputType = 'text' | 'number' | 'file' | 'select' | 'checkbox' | 'textarea' | 'date' | 'email' | 'password';

interface FormFieldProps {
  id?: string;
  type: InputType;
  label: string;
  name: string;
  value?: string | number;
  onChange: (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => void;
  placeholder?: string;
  min?: number;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
  step?: string | number;
  accept?: string;
  checked?: boolean;
}


 const FormField: React.FC<FormFieldProps> = (props) => {
  return <Input {...props} />;
};


export default FormField;
