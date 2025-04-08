import { Home, Settings, Archive, BookHeart, Bell } from "lucide-react";
import styles from "./SidebarNav.module.css";

export function SidebarNav() {
  return (
    <nav className={styles.navContainer}>
        <div className={styles.navContent}>
            <div className={styles.logo}>
                <img src="src/assets/vegetales1.png" />Logo dashboard</div>
            <div className={styles.icons}>
                <Home size={24} />Inicio</div>
            <div className={styles.icons}>
                <Archive size={24} />Inventario</div>
            <div className={styles.icons}>
                <BookHeart />Recetas</div>
            <div className={styles.icons}>
                <Bell />Notificaciones</div>
            <div className={styles.icons}>
                <Settings size={24}/>Ajustes</div>
        </div>
    </nav>
  );
}
