import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Añadimos Link aquí

const API_URL = 'https://tcg-project.onrender.com';

function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Asegúrate de que la URL termine en / para Django
            const response = await axios.post(`${API_URL}/api/users/login/`, credentials);
            
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            
            alert("¡Login exitoso!");
            navigate('/');
        } catch (error) {
            console.error(error);
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
                        required
                    />
                    <input 
                        className="auth-input"
                        type="password" 
                        placeholder="Contraseña" 
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})} 
                        required
                    />
                    <button className="auth-button" type="submit">Entrar</button>
                </form>

                {/* --- ESTA ES LA PARTE NUEVA --- */}
                <div className="auth-footer" style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p style={{ color: 'white', fontSize: '0.9rem' }}>
                        ¿No tienes una cuenta? {' '}
                        <Link to="/register" style={{ color: '#3498db', fontWeight: 'bold', textDecoration: 'none' }}>
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
                {/* ------------------------------ */}
            </div>
        </div>
    );
}

export default Login;