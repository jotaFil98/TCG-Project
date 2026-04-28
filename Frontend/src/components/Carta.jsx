import React from 'react';
import './Carta.css';

// Cambié "imagen" por "imagen_url" que es como lo tienes en el Admin de Django
const Carta = ({ nombre, rareza, imagen_url, atk, hp, energia }) => {
  const rarezaClase = rareza ? rareza.toLowerCase() : 'comun';

  // Usamos imagen_url aquí también
  const nombreImagen = imagen_url ? imagen_url.trim() : "";
  const urlImagen = `/cartas/${nombreImagen}`;

  return (
    <div className={`carta-container ${rarezaClase}`}>
      <div className="carta-imagen">
        <img 
          src={urlImagen} 
          alt={nombre} 
          onError={(e) => {
            // Si falla, intentamos sin el .png por si acaso
            console.log("No encontré:", urlImagen);
            e.target.src = 'https://placehold.co/150?text=Error+Foto';
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