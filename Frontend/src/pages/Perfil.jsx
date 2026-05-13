import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://tcg-project.onrender.com';

function Perfil() {
    const [jugador, setJugador] = useState({
        nombre: "",
        nivel: 1,
        xp: 0,
        xpMax: 1000, // Puedes ajustar esto según tu lógica de nivel
        cartasTotales: 0
    });
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const obtenerPerfilReal = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const response = await axios.get(`${API_URL}/api/users/me/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                const { username, perfil } = response.data;
                
                setJugador({
                    nombre: username, // Tu nombre real de usuario
                    nivel: perfil.nivel,
                    xp: perfil.xp,
                    xpMax: perfil.nivel * 1000, // Lógica simple: cada nivel pide 1000 XP más
                    cartasTotales: 0 // Esto lo conectaremos cuando termines el modelo de Inventario
                });
            } catch (error) {
                console.error("Error al cargar perfil:", error);
            } finally {
                setCargando(false);
            }
        };

        obtenerPerfilReal();
    }, []);

    // Cálculo dinámico de la barra de progreso
    const porcentajeExp = Math.min((jugador.xp / jugador.xpMax) * 100, 100);

    if (cargando) return <div className="loading">Cargando perfil del duelista...</div>;

    return (
        <main className="profile-dashboard">
            <header className="profile-header">
                <div className="avatar-placeholder">
                    {jugador.nombre ? jugador.nombre.charAt(0).toUpperCase() : "J"}
                </div>
                <div className="user-info">
                    <h1>{jugador.nombre}</h1>
                    <p>Nivel {jugador.nivel} • {jugador.nivel > 10 ? "Entrenador de Élite" : "Novato Prometedor"}</p>
                </div>
            </header>

            <section className="profile-stats">
                <div className="stat-card">
                    <h3>Progreso de Nivel</h3>
                    <div className="progress-container">
                        <div className="progress-bar" style={{ width: `${porcentajeExp}%` }}></div>
                    </div>
                    <p>{jugador.xp} / {jugador.xpMax} XP</p>
                </div>

                <div className="stat-card">
                    <h3>Colección Completa</h3>
                    <p className="stat-big">{jugador.cartasTotales} Cartas</p>
                    <small>Sigue abriendo sobres para subir esta cifra.</small>
                </div>
            </section>
        </main>
    );
}

export default Perfil;