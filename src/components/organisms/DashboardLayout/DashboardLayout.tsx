import { SidebarNav } from "../SidebarNav/SidebarNav";
import { SearchBar } from "../../atoms/SearchBar/SearchBar";
import { WelcomeCard } from "../../molecules/WelcomeCard/WelcomeCard";
import { CategorySection } from "../CategorySection/CategorySection";
import {Header} from "../../atoms/Header/Header";
import styles from "./DashboardLayout.module.css";

export function DashboardLayout() {
  return (
    <div className={styles.container}>
      <SidebarNav />
      <Header />
      <main className={styles.content}>
        <SearchBar />
        <WelcomeCard />
        <CategorySection />
      </main>
    </div>
  );
}
