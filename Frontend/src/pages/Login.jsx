import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://tcg-project.onrender.com';

function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/api/users/login/`, credentials);
            
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            
            alert("¡Login exitoso!");
            navigate('/');
        } catch (error) {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleLogin}>
                    <input 
                        className="auth-input"
                        type="text" 
                        placeholder="Usuario" 
                        onChange={(e) => setCredentials({...credentials, username: e.target.value})} 
                    />
                    <input 
                        className="auth-input"
                        type="password" 
                        placeholder="Contraseña" 
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
                    />
                    <button className="auth-button" type="submit">Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Login;