import { Home, Settings, Archive, BookHeart, Bell } from "lucide-react";

import styles from "./SidebarNav.module.css";
import { NavLink } from "react-router-dom";

export function SidebarNav() {
  return (
    <nav className={styles.navContainer}>
      <div className={styles.navContent}>
        <NavLink to="/dashboard" className={styles.logo}>
          <img src="src/assets/cesta.png" alt="Logo" />
        </NavLink>

        <NavLink to="/dashboard" className={styles.iconItem}>
          <Home size={24} />
          <span className={styles.tooltip}>Inicio</span>
        </NavLink>

        <NavLink
          to="/inventario"
          className={({ isActive }) =>
            `${styles.iconItem} ${isActive ? styles.active : ""}`
          }
        >
          <Archive size={24} />
          <span className={styles.tooltip}>Inventario</span>
        </NavLink>

        <NavLink to="/recetas" className={styles.iconItem}>
          <BookHeart size={24} />
          <span className={styles.tooltip}>Recetas</span>
        </NavLink>

        <div className={styles.iconItem}>
          <Bell size={24} />
          <span className={styles.tooltip}>Notificaciones</span>
        </div>

        <div className={styles.separator}></div>

        <div className={styles.iconItem}>
          <Settings size={24} />
          <span className={styles.tooltip}>Ajustes</span>
        </div>
      </div>
    </nav>
  );
}
