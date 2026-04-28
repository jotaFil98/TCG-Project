import React, { useState } from 'react';
import './App.css';
import Carta from './components/Carta.jsx';

function App() {
  const [misCartas, setMisCartas] = useState([]);
  const [cargando, setCargando] = useState(false);

  // URL de tu Backend en Render
  const API_URL = "https://tcg-project.onrender.com/api/cartas/random/";

  const abrirSobre = async () => {
    setCargando(true);
    try {
      // Pedimos las cartas a Django en la nube
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error en el servidor");
      
      const nuevasCartas = await response.json();
      
      // Agregamos las cartas nuevas al principio de la lista
      setMisCartas([...nuevasCartas, ...misCartas]);
    } catch (error) {
      console.error("No se pudieron obtener las cartas:", error);
      alert("El servidor de Render está despertando, intenta de nuevo en 30 segundos.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>TCG COLLECTOR</h1>
        <button 
          onClick={abrirSobre} 
          className="boton-sobre"
          disabled={cargando}
        >
          {cargando ? "ABRIENDO..." : "ABRIR SOBRE (3 CARTAS) 📦"}
        </button>
      </header>

      <div className="cartas-grid">
        {misCartas.map((c, index) => (
          <Carta key={index} {...c} />
        ))}
      </div>
    </div>
  );
}

export default App;