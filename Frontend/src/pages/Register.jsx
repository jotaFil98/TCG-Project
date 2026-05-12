import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://tcg-project.onrender.com';

function Register() {
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });
    const [loading, setLoading] = useState(false); // Para deshabilitar el botón al enviar
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_URL}/api/users/register/`, formData);
            alert("¡Usuario registrado con éxito! Ahora puedes iniciar sesión.");
            navigate('/login');
        } catch (error) {
            console.error(error);
            // Captura errores específicos de Django si el usuario ya existe, etc.
            const errorMsg = error.response?.data?.detail || error.response?.data?.message || "Revisa tus datos";
            alert("Error al registrar: " + errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h2>Crear Cuenta</h2>
                <form onSubmit={handleRegister}>
                    <input 
                        name="username"
                        className="auth-input"
                        type="text" 
                        placeholder="Usuario" 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        name="email"
                        className="auth-input"
                        type="email" 
                        placeholder="Email" 
                        onChange={handleChange} 
                        required 
                    />
                    <input 
                        name="password"
                        className="auth-input"
                        type="password" 
                        placeholder="Contraseña" 
                        onChange={handleChange} 
                        required 
                    />
                    <button 
                        className="auth-button" 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;