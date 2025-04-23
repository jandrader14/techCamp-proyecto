//import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router";

import { Login } from "../components/pages/Login/Login";
import { Register } from "../components/pages/Register/Register";
import { ForgotPasswordForm } from "../components/organisms/ForgotPasswordForm/ForgotPasswordForm";
import { Dashboard } from "../components/pages/Dashboard/Dashboard";
import { DashboardLayout } from "../components/layout/DashboardLayout/DashboardLayout";
import { InventoryLayout } from "../components/layout/InventoryLayout/InventoryLayout";
import { Inventory } from '../components/pages/Inventory/Inventory';

export const FormRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
      {/* Aquí está la clave: anidar la ruta del dashboard */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/inventario" element={<InventoryLayout />}>
        <Route index element={<Inventory />} />
      </Route>
    </Routes>
  );
};
