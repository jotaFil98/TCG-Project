import React from 'react';
import './Carta.css';

const Carta = ({ nombre, rareza, imagen, atk, hp, energia }) => {
  // Convertimos la rareza a minúsculas para el CSS
  const rarezaClase = rareza ? rareza.toLowerCase() : 'comun';

  // Como las fotos están en la carpeta 'public/cartas' de tu Frontend,
  // la ruta debe ser relativa a la raíz del sitio.
  const urlImagen = `/cartas/${imagen}`;

  return (
    <div className={`carta-container ${rarezaClase}`}>
      <div className="carta-imagen">
        {/* Ahora el src apunta a tu propia carpeta public de Vercel */}
        <img 
          src={urlImagen} 
          alt={nombre} 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/150?text=No+Foto';
          }} 
        />
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