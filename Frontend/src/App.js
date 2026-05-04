import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Tienda from './pages/Tienda';
import BatallaMenu from './pages/BatallaMenu';


// Este componente contiene la lógica de rutas y sidebar
function AppContent() {
  const location = useLocation();

  // Definimos las rutas donde NO queremos que aparezca el Sidebar
  const noSidebarRoutes = ['/login', '/register'];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div className="app-layout">
      {/* Solo mostramos el Sidebar si no estamos en Login o Register */}
      {showSidebar && <Sidebar />}
      
      <main className={`main-content ${!showSidebar ? 'full-width' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/batalla" element={<BatallaMenu />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div> 
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;