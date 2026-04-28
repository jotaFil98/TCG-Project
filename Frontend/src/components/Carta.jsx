import React from 'react';
import './Carta.css';

const Carta = ({ nombre, rareza, imagen, atk, hp, energia }) => {
  // Convertimos la rareza a minúsculas para que coincida con el CSS
  const rarezaClase = rareza.toLowerCase();

  return (
    <div className={`carta-container ${rarezaClase}`}>
      {/* Capa 1: Tu diseño completo (Marco + Ilustración) */}
      <div className="carta-imagen">
        <img src={require(`../assets/${imagen}`)} alt={nombre} />
      </div>

      {/* Capa 2: Efectos especiales (Brillos/Hologramas) */}
      <div className="efecto-overlay"></div>

      {/* Capa 3: Datos dinámicos (Texto sobre la imagen) */}
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