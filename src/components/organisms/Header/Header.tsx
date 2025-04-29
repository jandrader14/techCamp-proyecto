import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";  // Para la redirección
import styles from "./Header.module.css";

export function Header() {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // Estado para el submenú
  const navigate = useNavigate(); // Hook para la redirección

  // Función para manejar el clic en "Cuentas"
  const toggleSubMenu = () => {
    setIsSubMenuOpen((prev) => !prev); // Cambiar el estado de visibilidad
  };

  // Función para manejar el clic en "Salir" y redirigir a la página principal
  const handleLogout = () => {
    // Aquí podrías manejar la lógica de cierre de sesión si es necesario
    navigate("/"); // Redirige a la página principal
  };

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
              <img
                src="https://res.cloudinary.com/dcgcixisy/image/upload/cesta_wbrudl.png"
                alt="Profile"
              />
              <span className={styles.tooltip}>Tu perfil</span>
            </div>

            {/* Ícono de Chevron con tooltip */}
            <div className={styles.iconItem} onClick={toggleSubMenu}>
              <ChevronDown
                className={styles.profileIcon}
                size={25}
                color="#767676"
              />
              <span className={styles.tooltip}>Cuentas</span>
            </div>

            {/* Submenú */}
            {isSubMenuOpen && (
              <div className={styles.submenu}>
                <button onClick={handleLogout}>Salir</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
