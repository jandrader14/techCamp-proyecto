//import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router";

import {LoginForm} from "../components/organisms/LoginForm/LoginForm";
import {RegisterForm} from "../components/organisms/RegisterForm/RegisterForm";
import {ForgotPasswordForm} from "../components/organisms/ForgotPasswordForm/ForgotPasswordForm";
import {Dashboard} from "../components/pages/Dashboard/Dashboard";

export const FormRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};


