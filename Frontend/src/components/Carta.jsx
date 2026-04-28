import React from 'react';
import './Carta.css';

const Carta = ({ nombre, rareza, imagen, atk, hp, energia }) => {
  const rarezaClase = rareza.toLowerCase();

  // Construimos la URL completa que apunta a tu Backend en Render
  // Si la imagen viene como "Allmi_legendario.png", esto buscará la foto en tu servidor
  const urlImagen = `https://tcg-project.onrender.com/static/cartas/${imagen}`;

  return (
    <div className={`carta-container ${rarezaClase}`}>
      <div className="carta-imagen">
        {/* Cambiamos el require por un src normal */}
        <img src={urlImagen} alt={nombre} onError={(e) => e.target.src = 'https://via.placeholder.com/150'} />
      </div>

      <div className="efecto-overlay"></div>

      <div className="carta-info">
        <h3 className="carta-nombre">{nombre}</h3>
        <div className="carta-stats">
          <span className="stat-atk">⚔️ {atk}</span>
          <span className="stat-hp">❤️ {hp}</span>
        </div>
      </div>
    </div>
  );
};

export default Carta;