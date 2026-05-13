import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'https://tcg-project.onrender.com';

function Home() {
    // --- ESTADOS ---
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

    // --- COLECCIONES (Restauradas) ---
    const colecciones = [
        { id: 1, nombre: "Boku no hero coleccion", total: 30, actuales: 0, img: "/assets/colecciones/coleccion1.png" },
        { id: 2, nombre: "Isa colecttion", total: 20, actuales: 0, img: "/assets/colecciones/coleccion2.png" },
        { id: 3, nombre: "Ana colecttion", total: 20, actuales: 0, img: "/assets/colecciones/coleccion3.png" },
        { id: 4, nombre: "Jhons Randoms", total: 30, actuales: 0, img: "/assets/colecciones/coleccion4.png" }
    ];

    // --- EFECTO: CARGAR DATOS REALES DE DJANGO ---
    useEffect(() => {
        const cargarDatosUsuario = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setCargando(false);
                return;
            }

            try {
                const response = await axios.get(`${API_URL}/api/users/me/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                const data = response.data;
                setGameData(prev => ({
                    ...prev,
                    credits: data.perfil.creditos,
                    xp: data.perfil.xp,
                    nivel: data.perfil.nivel,
                    // Aquí luego mapearemos el inventario real de la DB
                }));
            } catch (error) {
                console.error("Error cargando perfil:", error);
            } finally {
                setCargando(false);
            }
        };

        cargarDatosUsuario();
    }, []);

    // --- LÓGICA DEL TEMPORIZADOR ---
    useEffect(() => {
        if (tiempoRestante > 0) {
            const timer = setInterval(() => setTiempoRestante(t => t - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [tiempoRestante]);

    // --- LÓGICA DE ABRIR SOBRE (CONEXIÓN BACKEND) ---
    const abrirSobre = async () => {
        const token = localStorage.getItem('token');
        setCargando(true); 
        try {
            const response = await axios.post(`${API_URL}/api/game/abrir-sobre/`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            const stats = response.data.stats_actualizadas;
            setGameData(prev => ({
                ...prev,
                credits: stats.creditos,
                xp: stats.xp,
                nivel: stats.nivel,
                collection: [...prev.collection, ...response.data.cartas] 
            }));

            setCartasRecibidas(response.data.cartas); 
            setTiempoRestante(300); 
            setIsOpening(true); 
        } catch (error) {
            alert(error.response?.data?.error || "Error al abrir sobre.");
        } finally {
            setCargando(false); 
        }
    };

    const formatearTiempo = (seg) => {
        const mins = Math.floor(seg / 60);
        const secs = seg % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleFlip = (index) => {
        const newFlipped = [...flipped];
        newFlipped[index] = true;
        setFlipped(newFlipped);
    };

    if (cargando && gameData.credits === 0) {
        return <div className="loading">Cargando datos del servidor...</div>;
    }

    return (
        <main className="home-dashboard">
            <div className="stats-bar">
                <span>Nivel: {gameData.nivel} 🏆</span>
                <span>Créditos: {gameData.credits} 💰</span>
                <span>XP: {gameData.xp} ⭐</span>
                <span>Cartas: {gameData.collection.length} 🃏</span>
            </div>

            <header className="hero-section">
                <div className="hero-content">
                    <h1>TCG COLLECTOR</h1>
                    <p>Gestiona tu colección y prepárate para el combate.</p>
                </div>

                <button
                    onClick={abrirSobre}
                    className="boton-sobre-epic"
                    disabled={cargando || tiempoRestante > 0 || gameData.credits < 100}
                >
                    {tiempoRestante > 0
                        ? `DISPONIBLE EN ${formatearTiempo(tiempoRestante)}`
                        : (cargando ? "ABRIENDO..." : "ABRIR SOBRE (100 💰)")}
                </button>
            </header>

            {/* --- SECCIÓN DE COLECCIONES RESTAURADA --- */}
            <section className="collections-grid-section">
                <h2>Tus Colecciones</h2>
                
                {colecciones.length > 0 ? (
                    <div className="collections-grid">
                        {colecciones.map(col => (
                            <Link to={`/coleccion/${col.id}`} key={col.id} className="collection-card">
                                <img src={col.img} alt={col.nombre} className="collection-image" />
                                <div className="collection-info">
                                    <h3>{col.nombre}</h3>
                                    <p>{col.actuales}/{col.total} cartas</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">🃏</div>
                        <h3>¡Tu colección está vacía!</h3>
                        <p>Aún no has descubierto ninguna colección. ¡Abre un sobre y empieza tu leyenda!</p>
                        <button className="btn-explore" onClick={() => window.location.href='/tienda'}>
                            Ir a la Tienda
                        </button>
                    </div>
                )}
            </section>

            {/* --- MODAL DE APERTURA --- */}
            {isOpening && (
                <div className="pack-overlay">
                    <div className="pack-modal">
                        <h2>¡Nuevo sobre abierto!</h2>
                        <div className="pack-slots">
                            {cartasRecibidas.map((c, index) => (
                                <div
                                    key={index}
                                    className={`flip-card ${flipped[index] ? 'is-flipped' : ''}`}
                                    onClick={() => handleFlip(index)}
                                >
                                    <div className="flip-card-inner">
                                        <div className="card-front">?</div>
                                        <div className="card-back">ID: {c.id} - {c.nombre}</div> 
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            className="btn-save-collection"
                            onClick={() => { setIsOpening(false); setFlipped([false, false, false, false]); }}
                        >
                            Guardar en colección
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default Home;