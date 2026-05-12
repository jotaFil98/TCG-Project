import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

// Componentes y Páginas
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute'; // <-- Importamos el guardián
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Tienda from './pages/Tienda';
import BatallaMenu from './pages/BatallaMenu';

function AppContent() {
  const location = useLocation();

  // Rutas donde NO queremos que aparezca el Sidebar
  const noSidebarRoutes = ['/login', '/register'];
  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <div className="app-layout">
      {/* Solo mostramos el Sidebar si el usuario está autenticado y no está en login/register */}
      {showSidebar && <Sidebar />}
      
      <main className={`main-content ${!showSidebar ? 'full-width' : ''}`}>
        <Routes>
          {/* --- RUTAS PÚBLICAS --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* --- RUTAS PROTEGIDAS --- */}
          {/* Envolvemos las rutas privadas con el ProtectedRoute */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/perfil" 
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tienda" 
            element={
              <ProtectedRoute>
                <Tienda />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/batalla" 
            element={
              <ProtectedRoute>
                <BatallaMenu />
              </ProtectedRoute>
            } 
          />
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