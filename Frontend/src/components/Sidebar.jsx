import React from 'react';
import { Link } from 'react-router-dom';
import { Home, User, ShoppingCart, Sword, Settings, LogIn, UserPlus } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">⚡</span>
        <span className="logo-text">TCG PROJECT</span>
      </div>
      
      <nav className="sidebar-nav">
        <Link to="/" className="nav-item">
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
        
        {/* Separador visual */}
        <hr style={{ margin: '15px 0', borderColor: '#333' }} />

        <Link to="/login" className="nav-item">
            <LogIn size={20}/> <span>Login</span>
        </Link>
        <Link to="/register" className="nav-item">
            <UserPlus size={20}/> <span>Registro</span>
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