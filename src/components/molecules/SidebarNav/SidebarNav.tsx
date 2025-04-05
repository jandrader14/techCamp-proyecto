import { Home, Settings, Boxes } from "lucide-react";
import styles from "./SidebarNav.module.css";

export function SidebarNav() {
  return (
    <aside className="bg-white shadow-md w-64 h-screen p-4 fixed top-0 left-0">
      <h1 className="text-2xl font-bold mb-8 text-center">Mi Inventario</h1>
      <nav className="space-y-4">
        <a
          href="#"
        >
          <Home size={20} /> Inicio
        </a>
        <a
          href="#"
          
          <Boxes size={20} /> Inventario
        </a>
        <a
          href="#"
          
        >
          <Settings size={20} /> Configuración
        </a>
      </nav>
    </aside>
  );
}
