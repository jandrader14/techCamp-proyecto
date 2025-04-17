import styles from './Header.module.css';
import { ChevronDown, Search, Bell } from 'lucide-react';

export function Header() {
  return (
    <header className={styles.headerContainer}>
      
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
        <Bell size={22} className={styles.bellIcon} />
        <div className={styles.profile}>
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className={styles.profileIcon}
          />
          <ChevronDown size={20} />
        </div>
      </div>
    </header>
  );
}
