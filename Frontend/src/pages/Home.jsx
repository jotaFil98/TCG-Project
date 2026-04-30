import React, { useState } from 'react'; 
import Carta from '../components/Carta.jsx'; 
import Sidebar from '../components/Sidebar'; // <-- Esto faltaba

function Home() { // <-- Cambiado de App a Home
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
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">
        <header className="main-header">
          <div className="header-info">
            <h1>TCG COLLECTOR</h1>
            <p>Gestiona tu colección y prepárate para el combate</p>
          </div>
          
          <button 
            onClick={abrirSobre} 
            className="boton-sobre"
            disabled={cargando}
          >
            {cargando ? "ABRIENDO..." : "ABRIR SOBRE (3 CARTAS) 📦"}
          </button>
        </header>

        <section className="cartas-container">
          <div className="cartas-grid">
            {misCartas.map((c, index) => (
              <Carta key={index} {...c} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home; // <-- Cambiado el export