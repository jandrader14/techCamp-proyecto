// Layout para paginas de autenticación
import React from 'react';
import styles from "./AuthLayout.module.css";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={styles.authContainer}>
      {children}
    </div>
  );
};

export default AuthLayout;
