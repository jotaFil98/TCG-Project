import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://tcg-project.onrender.com';

function Home() {
    // --- ESTADOS ---
    // Inicializamos en 0 o null para que se note cuando carguen los datos reales
    const [gameData, setGameData] = useState({ 
        credits: 0, 
        xp: 0, 
        nivel: 1,
        collection: [] 
    });

    const [cargando, setCargando] = useState(true);
    const [tiempoRestante, setTiempoRestante] = useState(0);
    const [isOpening, setIsOpening] = useState(false);
    const [cartasRecibidas, setCartasRecibidas] = useState([]);
    const [flipped, setFlipped] = useState([false, false, false, false]);

    // --- EFECTO: CARGAR DATOS DEL PERFIL ---
    useEffect(() => {
        const cargarDatosUsuario = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                // Llamamos a la nueva ruta /me/ que configuramos en el backend
                const response = await axios.get(`${API_URL}/api/users/me/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                const data = response.data;
                setGameData({
                    credits: data.perfil.creditos, // Usamos 'creditos' como en el modelo
                    xp: data.perfil.xp,
                    nivel: data.perfil.nivel,
                    collection: [] // Pronto traeremos esto del modelo Inventario
                });
            } catch (error) {
                console.error("Error cargando perfil:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarDatosUsuario();
    }, []);

    // --- LÓGICA DE ABRIR SOBRE ---
    const abrirSobre = async () => {
        const token = localStorage.getItem('token');
        setCargando(true); 
        try {
            const response = await axios.post(`${API_URL}/api/game/abrir-sobre/`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Actualizamos el estado con lo que devuelve el servidor
            const stats = response.data.stats_actualizadas;
            setGameData(prev => ({
                ...prev,
                credits: stats.creditos,
                xp: stats.xp,
                nivel: stats.nivel
            }));

            setCartasRecibidas(response.data.cartas); 
            setTiempoRestante(300); 
            setIsOpening(true); 
        } catch (error) {
            alert(error.response?.data?.error || "Error al abrir sobre");
        } finally {
            setCargando(false); 
        }
    };

    // (Funciones de tiempo y flip se mantienen igual...)

    if (cargando) return <div className="loading">Cargando tu perfil de duelista...</div>;

    return (
        <main className="home-dashboard">
            <div className="stats-bar">
                {/* Ahora estos datos son los reales de la DB */}
                <span>Nivel: {gameData.nivel} 🏆</span>
                <span>Créditos: {gameData.credits} 💰</span>
                <span>XP: {gameData.xp} ⭐</span>
            </div>

            <header className="hero-section">
                <h1>TCG COLLECTOR</h1>
                <button
                    onClick={abrirSobre}
                    className="boton-sobre-epic"
                    disabled={cargando || tiempoRestante > 0 || gameData.credits < 100}
                >
                    {tiempoRestante > 0
                        ? `DISPONIBLE EN ${formatearTiempo(tiempoRestante)}`
                        : (cargando ? "PROCESANDO..." : "ABRIR SOBRE (100 💰)")}
                </button>
            </header>

            {/* ... Resto del componente (Colecciones y Pack Overlay) se mantiene igual ... */}
        </main>
    );
}

export default Home;