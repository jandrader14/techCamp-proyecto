import styles from "./Header.module.css";
import { ChevronDown, Search } from "lucide-react";

export function Header() {
  return (
    <header className={styles.headerMainContainer}>
      <div className={styles.headerContainer}>
        <div className={styles.leftSection}>
          <h1 className={styles.logo}>Market Fresh House 🥦</h1>
        </div>

        <div className={styles.centerSection}>
          <div className={styles.searchBar}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Buscar productos o recetas..."
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.rightSection}>
          <div className={styles.profile}>
            {/* Ícono de imagen con tooltip */}
            <div className={styles.iconItem}>
              <img src="src/assets/vegetales.png" alt="Profile" />
              <span className={styles.tooltip}>Tu perfil</span>
            </div>

            {/* Ícono de Chevron con tooltip */}
            <div className={styles.iconItem}>
              <ChevronDown
                className={styles.profileIcon}
                size={25}
                color="#767676"
              />
              <span className={styles.tooltip}>Cuentas</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
