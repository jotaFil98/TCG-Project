import React from 'react';
import './Carta.css';

const Carta = ({ nombre, rareza, imagen, atk, hp, energia }) => {
  const rarezaClase = rareza ? rareza.toLowerCase() : 'comun';

  // LOG PARA DETECTIVE: Presiona F12 en el navegador para ver esto
  console.log("Datos recibidos de Django -> Nombre:", nombre, "| Imagen:", imagen);

  // Limpiamos el nombre de la imagen por si acaso
  const nombreImagenLimpio = imagen ? imagen.trim() : "";
  const urlImagen = `/cartas/${nombreImagenLimpio}`;

  return (
    <div className={`carta-container ${rarezaClase}`}>
      <div className="carta-imagen">
        <img 
          src={urlImagen} 
          alt={nombre} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Forzamos el tamaño
          onError={(e) => {
            console.error("Error cargando esta URL:", urlImagen);
            e.target.src = 'https://via.placeholder.com/150?text=Error+Ruta';
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