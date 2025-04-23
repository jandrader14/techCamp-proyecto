import { Outlet } from "react-router-dom";
import { SidebarNav } from "../../organisms/SidebarNav/SidebarNav";
import { Header } from "../../organisms/Header/Header";
import { ClockWidget } from "../../molecules/ClockWidget/ClockWidget";
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
                <ClockWidget />
              </div>

              <div className={styles.widget}>
                <h4>Alertas 🔔</h4>
                {/* Aquí luego insertamos el componente de alertas */}
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
