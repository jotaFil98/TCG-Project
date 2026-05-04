import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Esta es la URL de tu API en Render
const API_URL = 'https://tcg-project.onrender.com';

function Home() {
    // --- ESTADOS ---
    const [gameData, setGameData] = useState(() => {
        const saved = localStorage.getItem('tcgGameData');
        return saved ? JSON.parse(saved) : { 
            credits: 1000, 
            xp: 0, 
            collection: [] 
        };
    });

    const [cargando, setCargando] = useState(false);
    const [tiempoRestante, setTiempoRestante] = useState(0);
    const [isOpening, setIsOpening] = useState(false);
    const [cartasRecibidas, setCartasRecibidas] = useState([]);
    const [flipped, setFlipped] = useState([false, false, false, false]);

    // --- EFECTOS ---
    // Guardado automático
    useEffect(() => {
        localStorage.setItem('tcgGameData', JSON.stringify(gameData));
    }, [gameData]);

    // Timer para el cooldown
    useEffect(() => {
        if (tiempoRestante > 0) {
            const timer = setInterval(() => setTiempoRestante(t => t - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [tiempoRestante]);

    // --- LÓGICA ---
    const colecciones = [
        { id: 1, nombre: "Boku no hero coleccion", total: 30, actuales: 0, img: "/assets/colecciones/coleccion1.png" },
        { id: 2, nombre: "Isa colecttion", total: 20, actuales: 0, img: "/assets/colecciones/coleccion2.png" },
        { id: 3, nombre: "Ana colecttion", total: 20, actuales: 0, img: "/assets/colecciones/coleccion3.png" },
        { id: 4, nombre: "Jhons Randoms", total: 30, actuales: 0, img: "/assets/colecciones/coleccion4.png" }
    ];

    const abrirSobre = async () => {
        setCargando(true); 

        try {
            const response = await axios.post(`${API_URL}/api/abrir-sobre/`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            // Actualizamos estado con datos reales del backend
            setGameData(prev => ({
                ...prev,
                credits: response.data.nuevo_saldo,
                xp: prev.xp + 10, 
                collection: [...prev.collection, ...response.data.cartas] 
            }));

            setCartasRecibidas(response.data.cartas); 
            setTiempoRestante(300); // 5 minutos de cooldown
            setIsOpening(true); 

        } catch (error) {
            console.error("Error al abrir sobre:", error.response?.data || error.message);
            alert("Error al abrir sobre. Revisa tu conexión o créditos.");
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

    // --- RENDER ---
    return (
        <main className="home-dashboard">
            <div className="stats-bar">
                <span>Créditos: {gameData.credits} 💰</span>
                <span>XP: {gameData.xp} ⭐</span>
                <span>Cartas: {gameData.collection.length} 🃏</span>
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
                    disabled={cargando || tiempoRestante > 0 || gameData.credits < 100}
                >
                    {tiempoRestante > 0
                        ? `DISPONIBLE EN ${formatearTiempo(tiempoRestante)}`
                        : (cargando ? "ABRIENDO..." : "ABRIR SOBRE (100 💰)")}
                </button>
            </header>

            <section className="collections-grid-section">
                <h2>Tus Colecciones</h2>
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
            </section>

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