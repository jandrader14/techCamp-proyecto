import React from 'react';
//import styles from "./Button.module.css";

interface ButtonProps {
  text: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ text, type = "button", onClick, className }) => {
  return (
    <button className={className} type={type} onClick={onClick} >
      {text}
    </button>
  );
};

