import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importamos Link
import { Home, User, ShoppingCart, Sword, Settings } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">⚡</span>
        <span className="logo-text">TCG PROJECT</span>
      </div>
      
      <nav className="sidebar-nav">
        {/* 2. Cambiamos 'button' por 'Link' y usamos 'to' en lugar de onClick */}
        <Link to="/" className="nav-item active">
            <Home size={20}/> <span>Inicio</span>
        </Link>
        <Link to="/perfil" className="nav-item">
            <User size={20}/> <span>Perfil</span>
        </Link>
        <Link to="/tienda" className="nav-item">
            <ShoppingCart size={20}/> <span>Tienda</span>
        </Link>
        <Link to="/batalla" className="nav-item">
            <Sword size={20}/> <span>Combate</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <Link to="/ajustes" className="nav-item">
            <Settings size={20}/> <span>Ajustes</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;