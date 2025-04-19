import { Outlet } from "react-router-dom";
import { SidebarNav } from "../../organisms/SidebarNav/SidebarNav";
import { Header } from "../../organisms/Header/Header";
import styles from "./DashboardLayout.module.css";

export function DashboardLayout() {
  return (
    <div className={styles.dashboardContainer}>
      <SidebarNav />
      <div className={styles.dashboardContent}>
        <Header />
        <main className={styles.mainSection}>
          <div className={styles.layoutWrapper}>
            <div className={styles.mainContent}>
              <Outlet />
            </div>
            <aside className={styles.aside}>
              <div className={styles.widget}>
                <h4>Hora actual</h4>
                {/* Componente del reloj va aquí */}
              </div>
              <div className={styles.widget}>
                <h4>Calendario</h4>
                {/* Aquí insertas el calendario */}
              </div>
              <div className={styles.widget}>
                <h4>Sugerencias de recetas</h4>
                {/* Aquí va la sección conectada con la API de DeepSeek */}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
