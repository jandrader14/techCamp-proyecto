import { SidebarNav } from "../SidebarNav/SidebarNav";
import { SearchBar } from "../SearchBar/SearchBar";
import { WelcomeCard } from "../WelcomeCard/WelcomeCard";
import { CategorySection } from "../CategorySection/CategorySection";
import styles from "./DashboardLayout.module.css";

export function DashboardLayout() {
  return (
    <div className={styles.container}>
      <SidebarNav />
      <main className={styles.content}>
        <SearchBar />
        <WelcomeCard />
        <CategorySection />
      </main>
    </div>
  );
}
