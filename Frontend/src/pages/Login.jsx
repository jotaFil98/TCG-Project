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
        // Asegúrate de que la ruta coincida con lo que acabamos de configurar
        const response = await axios.post(`${API_URL}/api/users/login/`, credentials);
        
        localStorage.setItem('token', response.data.access);
        localStorage.setItem('refresh', response.data.refresh); // Guarda también el refresh
        
        alert("¡Login exitoso!");
        navigate('/');
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