import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importamos Link
import { Home, User, ShoppingCart, Sword, Settings } from 'lucide-react';
import './Sidebar.css';

import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate(); // Mueve el hook aquí

  return (
    <aside className="sidebar">
      {/* ... tu logo y nav existente ... */}
      
      {/* --- AÑADE ESTO PARA TESTEAR --- */}
      <div style={{ marginTop: '20px', padding: '10px' }}>
          <button onClick={() => navigate('/login')}>Ir a Login</button>
          <button onClick={() => navigate('/register')}>Ir a Registro</button>
      </div>
      {/* ------------------------------- */}

      <div className="sidebar-footer">
        <Link to="/ajustes" className="nav-item">
            <Settings size={20}/> <span>Ajustes</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;