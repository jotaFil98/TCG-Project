import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://tcg-project.onrender.com';

function Tienda() {
    const [creditos, setCreditos] = useState(0);
    const [cargando, setCargando] = useState(false);

    // --- CARGAR CRÉDITOS AL ENTRAR ---
    useEffect(() => {
        const obtenerPerfil = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${API_URL}/api/users/me/`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Sincronizamos con el nombre exacto del modelo: creditos
                setCreditos(response.data.perfil.creditos);
            } catch (error) {
                console.error("Error al obtener saldo:", error);
            }
        };
        obtenerPerfil();
    }, []);

    // --- LÓGICA DE COMPRA ---
    const comprarSobre = async (idSobre) => {
        // Por ahora, usamos el endpoint 'abrir-sobre' que ya configuramos en game/urls.py
        // En el futuro, podrías tener endpoints específicos para cada tipo de sobre
        if (creditos < 100) {
            alert("No tienes suficientes créditos.");
            return;
        }

        setCargando(true);
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post(`${API_URL}/api/game/abrir-sobre/`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Actualizamos el saldo local con lo que diga el servidor
            setCreditos(response.data.stats_actualizadas.creditos);
            alert("¡Sobre comprado con éxito! Revisa tu colección en el Home.");
        } catch (error) {
            alert(error.response?.data?.error || "Error en la compra");
        } finally {
            setCargando(false);
        }
    };

    const productos = [
        { id: 1, nombre: "Sobre Básico", precio: 100, descripcion: "4 cartas al azar para tu colección." },
        { id: 2, nombre: "Sobre de Élite", precio: 300, descripcion: "Próximamente: Cartas raras garantizadas." },
        { id: 3, nombre: "Pack de Iniciación", precio: 500, descripcion: "Próximamente: Un gran impulso para tu mazo." }
    ];

    return (
        <main className="shop-dashboard">
            <header className="shop-header">
                <h1>Tienda de Cartas</h1>
                <div className="wallet">
                    <span>Tu Saldo: <strong>{creditos} 🪙</strong></span>
                </div>
            </header>

            <section className="products-grid">
                {productos.map((prod) => (
                    <div key={prod.id} className="product-card">
                        <h3>{prod.nombre}</h3>
                        <p>{prod.descripcion}</p>
                        <div className="price-tag">{prod.precio} 🪙</div>
                        <button 
                            className="boton-buy"
                            onClick={() => comprarSobre(prod.id)}
                            disabled={cargando || (prod.id !== 1)} // Bloqueamos los que aún no tienen lógica en el backend
                        >
                            {prod.id === 1 ? (cargando ? "Procesando..." : "Comprar") : "Próximamente"}
                        </button>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default Tienda;