import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  //extends React.ButtonHTMLAttributes<HTMLButtonElement> hereda todas las propiedas estandar de un <button>
  text?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  type = "button",
  onClick,
  className,
  children,
  ...props
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children ? children : text}
    </button>
  );
};
