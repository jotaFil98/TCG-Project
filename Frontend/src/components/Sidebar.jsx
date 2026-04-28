import React from 'react';
import { Home, User, ShoppingCart, Sword, Settings } from 'lucide-react';
import './Sidebar.css'; // Crearemos este CSS ahora

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">⚡</span>
        <span className="logo-text">TCG PROJECT</span>
      </div>
      
      <nav className="sidebar-nav">
        <button className="nav-item active"><Home size={20}/> <span>Inicio</span></button>
        <button className="nav-item"><User size={20}/> <span>Perfil</span></button>
        <button className="nav-item"><ShoppingCart size={20}/> <span>Tienda</span></button>
        <button className="nav-item"><Sword size={20}/> <span>Combate</span></button>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item"><Settings size={20}/> <span>Ajustes</span></button>
      </div>
    </aside>
  );
};

export default Sidebar;