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
            const response = await axios.post(`${API_URL}/api/token/`, credentials);
            // Aquí guardamos el token que te dará Django
            localStorage.setItem('token', response.data.access);
            alert("¡Login exitoso!");
            navigate('/'); // Te redirige al Home
        } catch (error) {
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="text" placeholder="Usuario" 
                    onChange={(e) => setCredentials({...credentials, username: e.target.value})} 
                />
                <input 
                    type="password" placeholder="Contraseña" 
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;