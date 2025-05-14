//import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router";

import { Login } from "../components/pages/Login/Login";
import { Register } from "../components/pages/Register/Register";
import { ForgotPasswordForm } from "../components/organisms/ForgotPasswordForm/ForgotPasswordForm";
import { Dashboard } from "../components/pages/Dashboard/Dashboard";
import { DashboardLayout } from "../components/layout/DashboardLayout/DashboardLayout";
import { InventoryLayout } from "../components/layout/InventoryLayout/InventoryLayout";
import { Inventory } from "../components/pages/Inventory/Inventory";
import { ExploreInventory } from "../components/pages/Inventory/ExploreInventory/ExploreInventory";
import { RecipesLayout } from "../components/layout/RecipesLayout/RecipesLayout";
import { Recipes } from "../components/pages/Recipes/Recipes";
import { MyRecipes } from "../components/pages/Recipes/MyRecipes/MyRecipes";
import { RecipesIA } from "../components/pages/Recipes/RecipesIA/RecipesIA";

export const FormRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotPassword" element={<ForgotPasswordForm />} />
      
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/inventario" element={<InventoryLayout />}>
        <Route index element={<Inventory />} />{" "}
        <Route path="productos" element={<ExploreInventory />} />
        {/* <Route path="alertas" element={<Alerts />} /> {/* Página de alertas */}
        {/* <Route path="ajustes" element={<Settings />} />{" "}*/}
        {/* Página de configuración */}
      </Route>
      <Route path="/recetas" element={<RecipesLayout />}>
        <Route index element={<Recipes />} />
        <Route path="mis-recetas" element={<MyRecipes />} />
        <Route path="recomendadas" element={<RecipesIA />} />
       
      </Route>
    </Routes>
  );
};
