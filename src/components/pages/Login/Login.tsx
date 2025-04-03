//Página de inicio de sesión
import React from 'react';
import AuthLayout from "../../layout/AuthLayout/AuthLayout";
import LoginForm from "../../organisms/LoginForm/LoginForm";

const Login: React.FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;