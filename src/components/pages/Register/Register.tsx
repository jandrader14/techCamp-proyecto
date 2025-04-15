// Página de registro
import React from 'react';
import AuthLayout from "../../layout/AuthLayout/AuthLayout";
import { RegisterForm } from "../../organisms/RegisterForm/RegisterForm";

export const Register: React.FC = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};


