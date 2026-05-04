import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://tcg-project.onrender.com';

function Register() {
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // FIX: Asegúrate de usar la ruta completa: /api/users/register/
            await axios.post(`${API_URL}/api/users/register/`, formData);
            
            alert("¡Usuario registrado con éxito! Ahora puedes iniciar sesión.");
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert("Error al registrar: " + (error.response?.data?.message || "Revisa tus datos"));
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h2>Crear Cuenta</h2>
                <form onSubmit={handleRegister}>
                    <input 
                        className="auth-input"
                        type="text" 
                        placeholder="Usuario" 
                        onChange={(e) => setFormData({...formData, username: e.target.value})} 
                        required 
                    />
                    <input 
                        className="auth-input"
                        type="email" 
                        placeholder="Email" 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        required 
                    />
                    <input 
                        className="auth-input"
                        type="password" 
                        placeholder="Contraseña" 
                        onChange={(e) => setFormData({...formData, password: e.target.value})} 
                        required 
                    />
                    <button className="auth-button" type="submit">Registrarse</button>
                </form>
            </div>
        </div>
    );
}

export default Register;