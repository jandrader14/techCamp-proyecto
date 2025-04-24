import { Outlet } from "react-router-dom";
import { SidebarNav } from "../../organisms/SidebarNav/SidebarNav";
import { Header } from "../../organisms/Header/Header";

import styles from "./RecipesLayout.module.css";

export function RecipesLayout() {
  return (
    <div className={styles.inventoryContainer}>
      <SidebarNav />
      <div className={styles.inventoryContent}>
        <Header />
        <main className={styles.mainSection}>
          <div className={styles.mainContent}>
            <Outlet /> 
          </div>
        </main>
      </div>
    </div>
  );
}
