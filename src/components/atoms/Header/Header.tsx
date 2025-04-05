import styles from './Header.module.css';
import { ChevronDown } from 'lucide-react';
export function Header() {
  return (
    <header>
        <div>
            <h1>Market Fresh House &#x1F35C;</h1>
        </div>
        <div className={styles.profile}>
            <div className={styles.profileIcon}>
                <img src="https://via.placeholder.com/150" alt="Profile" />
            </div>
            <div className={styles.icon}>
                <ChevronDown size={20} />        
            </div>       
      </div>    
    </header>
  );
}
