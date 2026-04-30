import React from 'react';

function Perfil() {
  // Datos simulados (luego los conectaremos a tu backend)
  const jugador = {
    nombre: "Juan Collector",
    nivel: 12,
    experiencia: 4500,
    experienciaMax: 5000,
    cartasTotales: 42
  };

  const porcentajeExp = (jugador.experiencia / jugador.experienciaMax) * 100;

  return (
    <main className="profile-dashboard">
      <header className="profile-header">
        <div className="avatar-placeholder">
          {jugador.nombre.charAt(0)}
        </div>
        <div className="user-info">
          <h1>{jugador.nombre}</h1>
          <p>Nivel {jugador.nivel} • Entrenador de élite</p>
        </div>
      </header>

      <section className="profile-stats">
        <div className="stat-card">
          <h3>Progreso de Nivel</h3>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${porcentajeExp}%` }}></div>
          </div>
          <p>{jugador.experiencia} / {jugador.experienciaMax} XP</p>
        </div>

        <div className="stat-card">
          <h3>Colección Completa</h3>
          <p className="stat-big">{jugador.cartasTotales} Cartas</p>
        </div>
      </section>
    </main>
  );
}

export default Perfil;