import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'https://tcg-project.onrender.com';

function Register() {
    const [formData, setFormData] = useState({ username: '', password: '', email: '' });
    const [loading, setLoading] = useState(false);
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
            // --- MEJORA: Capturamos los errores específicos de Django ---
            let errorMsg = "Error al registrar:";
            const serverErrors = error.response?.data;

            if (serverErrors) {
                // Si el error es un objeto, recorremos los campos (password, username, etc.)
                Object.keys(serverErrors).forEach(field => {
                    errorMsg += `\n- ${field}: ${serverErrors[field].join(", ")}`;
                });
            } else {
                errorMsg = "Revisa tu conexión o los datos ingresados.";
            }
            
            alert(errorMsg);
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
                    
                    {/* --- TEXTO DE AYUDA PARA EL USUARIO --- */}
                    <ul style={{ color: '#ccc', fontSize: '0.75rem', textAlign: 'left', marginBottom: '15px' }}>
                        <li>Mínimo 8 caracteres.</li>
                        <li>No puede ser solo números.</li>
                        <li>No puede ser igual a tu nombre de usuario.</li>
                    </ul>

                    <button 
                        className="auth-button" 
                        type="submit" 
                        disabled={loading}
                    >
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>
                </form>

                <div className="auth-footer" style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p style={{ color: 'white', fontSize: '0.9rem' }}>
                        ¿Ya tienes cuenta? {' '}
                        <Link to="/login" style={{ color: '#3498db', fontWeight: 'bold', textDecoration: 'none' }}>
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;