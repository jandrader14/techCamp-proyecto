import { Outlet } from "react-router-dom";
import { SidebarNav } from "../../organisms/SidebarNav/SidebarNav";
import { Header } from "../../atoms/Header/Header";
import styles from "./DashboardLayout.module.css";

export function DashboardLayout() {
  return (
    <div className={styles.dashboardContainer}>
      <SidebarNav />
      <div className={styles.dashboardContent}>
        <Header />
        <main className={styles.mainSection}>
          <Outlet />
        </main>
      </div>
    </div>
  );






}
