//import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router";

import {Login} from "../components/pages/Login/Login";
import { Register } from "../components/pages/Register/Register";
import {ForgotPasswordForm} from "../components/organisms/ForgotPasswordForm/ForgotPasswordForm";
import {Dashboard} from "../components/pages/Dashboard/Dashboard";

export const FormRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};


