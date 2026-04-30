import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Tienda from './pages/Tienda';
import BatallaMenu from './pages/BatallaMenu';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/batalla" element={<BatallaMenu />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;