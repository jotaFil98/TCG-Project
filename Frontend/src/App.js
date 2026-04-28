import React, { useState } from 'react';
import './App.css';
import Carta from './components/Carta.jsx';

function App() {
  const [misCartas, setMisCartas] = useState([]);

  // 1. Lista Maestra de tu Colección 1 (Basado en tus fotos)
  const coleccionMaestra = [
    { nombre: "All Might", rareza: "LEGENDARIA", imagen: "Allmi_legendario.png", atk: 99, hp: 500 },
    { nombre: "Aizawa", rareza: "MITICA", imagen: "Aizawa_mitica.png", atk: 80, hp: 350 },
    { nombre: "Omniman", rareza: "LEGENDARIA", imagen: "omniman_legendaria.png", atk: 95, hp: 480 },
    { nombre: "Todoroki", rareza: "COMUN", imagen: "Todoroki_comun.png", atk: 40, hp: 150 },
    { nombre: "Deku", rareza: "COMUN", imagen: "Deku_comun.png", atk: 45, hp: 160 },
    { nombre: "Steve", rareza: "RARA", imagen: "steve_rara.png", atk: 60, hp: 200 },
    { nombre: "Bingo", rareza: "RARA", imagen: "bingo_rara.png", atk: 30, hp: 120 },
    { nombre: "Bluey", rareza: "RARA", imagen: "bluey_rara.png", atk: 30, hp: 120 },
    { nombre: "Eleven", rareza: "RARA", imagen: "eleven_rara.png", atk: 70, hp: 220 },
    { nombre: "Pingüino", rareza: "EPICA", imagen: "pingui_epica.png", atk: 65, hp: 250 },
    { nombre: "Kirishima", rareza: "COMUN", imagen: "kirishima_comun.png", atk: 50, hp: 300 },
  ];

  // 2. Función para abrir un sobre (Simulamos 3 cartas al azar)
  const abrirSobre = () => {
    let cartasNuevas = [];
    
    for (let i = 0; i < 3; i++) {
      const azar = Math.floor(Math.random() * coleccionMaestra.length);
      cartasNuevas.push(coleccionMaestra[azar]);
    }

    // Sonido o alerta de emoción
    console.log("¡Sobres abiertos!");
    setMisCartas([...cartasNuevas, ...misCartas]);
  };

  return (
    <div className="App" style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', padding: '20px', textAlign: 'center', color: 'white' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}>TCG COLLECTOR</h1>
        <button 
          onClick={abrirSobre}
          className="boton-sobre"
        >
          ABRIR SOBRE (3 CARTAS) 📦
        </button>
      </header>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '25px', justifyContent: 'center' }}>
        {misCartas.map((c, index) => (
          <Carta key={index} {...c} />
        ))}
      </div>
    </div>
  );
}

export default App;