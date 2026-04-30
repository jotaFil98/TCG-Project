import React, { useState } from 'react'; 
import Carta from '../components/Carta.jsx'; 

function Home() {
  const [misCartas, setMisCartas] = useState([]);
  const [cargando, setCargando] = useState(false);

  const API_URL = "https://tcg-project.onrender.com/api/cartas/random/";

  const abrirSobre = async () => {
    setCargando(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error en el servidor");
      
      const nuevasCartas = await response.json();
      setMisCartas([...nuevasCartas, ...misCartas]);
    } catch (error) {
      console.error("No se pudieron obtener las cartas:", error);
      alert("El servidor está despertando, intenta de nuevo en unos segundos.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="home-dashboard">
      
      {/* 1. Barra de Estadísticas (Nueva) */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-label">Cartas Coleccionadas</span>
          <span className="stat-value">{misCartas.length}</span>
        </div>
      </div>

      {/* 2. Sección Hero (El gancho) */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>TCG COLLECTOR</h1>
          <p>Gestiona tu colección y prepárate para el combate.</p>
        </div>
        
        <button 
          onClick={abrirSobre} 
          className="boton-sobre-epic"
          disabled={cargando}
        >
          {cargando ? "ABRIENDO..." : "ABRIR SOBRE (3 CARTAS) 📦"}
        </button>
      </header>

      {/* 3. Sección de Colección */}
      <section className="collection-section">
        <h2>Últimos hallazgos</h2>
        <div className="cartas-grid">
          {misCartas.map((c, index) => (
            <Carta key={index} {...c} />
          ))}
        </div>
      </section>
      
    </main>
  );
}

export default Home;