import { Outlet } from "react-router-dom";
import { SidebarNav } from "../../organisms/SidebarNav/SidebarNav";
import { Header } from "../../organisms/Header/Header";

import styles from "./InventoryLayout.module.css";

export function InventoryLayout() {
  return (
    <div className={styles.inventoryContainer}>
      <SidebarNav />
      <div className={styles.inventoryContent}>
        <Header />
        <main className={styles.mainSection}>
          <div className={styles.mainContent}>
            <Outlet /> {/* Aquí se mostrarán las subpáginas del inventario */}
          </div>
        </main>
      </div>
    </div>
  );
}
