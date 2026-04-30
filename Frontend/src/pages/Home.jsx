import React, { useState, useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import Carta from '../components/Carta.jsx'; 

function Home() {
  const [misCartas, setMisCartas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(0);

  // Definición única y correcta de colecciones
 const colecciones = [
    { 
      id: 1, 
      nombre: "Boku no hero coleccion", 
      total: 30, 
      actuales: 0, 
      img: "/assets/colecciones/coleccion1.png" 
    },
    { 
      id: 2, 
      nombre: "Isa colecttion", 
      total: 20, 
      actuales: 0, 
      img: "/assets/colecciones/coleccion2.png" 
    },
    { 
      id: 3, 
      nombre: "Ana colecttion", 
      total: 20, 
      actuales: 0, 
      img: "/assets/colecciones/coleccion3.png" 
    },
    { 
      id: 4, 
      nombre: "Jhons Randoms", 
      total: 30, 
      actuales: 0, 
      img: "/assets/colecciones/coleccion4.png" 
    }
  ];

  const abrirSobre = () => {
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
      setTiempoRestante(300);
    }, 2000);
  };

  useEffect(() => {
    if (tiempoRestante > 0) {
      const timer = setInterval(() => setTiempoRestante(t => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [tiempoRestante]);

  const formatearTiempo = (seg) => {
    const mins = Math.floor(seg / 60);
    const secs = seg % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <main className="home-dashboard">
      <div className="stats-bar">
        <span>Cartas: {misCartas.length}</span>
        <span>Colecciones: {colecciones.length}</span>
      </div>

      <header className="hero-section">
        <div className="hero-content">
          <h1>TCG COLLECTOR</h1>
          <p>Gestiona tu colección y prepárate para el combate.</p>
        </div>
        
        <button 
          onClick={abrirSobre} 
          className="boton-sobre-epic"
          disabled={cargando || tiempoRestante > 0}
        >
          {tiempoRestante > 0 
            ? `DISPONIBLE EN ${formatearTiempo(tiempoRestante)}` 
            : (cargando ? "ABRIENDO..." : "ABRIR SOBRE COMÚN 📦")}
        </button>
      </header>

      <section className="collection-section">
        <h2>Mejor valoradas</h2>
        <div className="cartas-grid">
           {/* Aquí se mostrarán las cartas más usadas */}
        </div>
      </section>

      <section className="collections-grid-section">
        <h2>Tus Colecciones</h2>
        <div className="collections-grid">
            {colecciones.map(col => (
                <Link to={`/coleccion/${col.id}`} key={col.id} className="collection-card">
                <img src={col.img} alt={col.nombre} className="collection-image" />
                
                {/* Todo el texto debe estar dentro de este div */}
                <div className="collection-info">
                    <h3>{col.nombre}</h3>
                    <p>{col.actuales}/{col.total} cartas</p>
                </div>
                </Link>
            ))}
            </div>
      </section>
    </main>
  );
}

export default Home;