import React, { useState } from 'react';
import './NavigationMenu.css'; // Asegúrate de tener un archivo CSS para los estilos

const NavigationMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li className="nav-item">
          <a href="#">Inicio</a>
        </li>
        <li className="nav-item">
          <a href="#">Repo</a>
        </li>
        <li className="nav-item">
          <a href="#">Seteo</a>
        </li>
      </ul>
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'} {/* Icono de menú y X para cerrar */}
      </div>
    </nav>
  );
};

export default NavigationMenu;
