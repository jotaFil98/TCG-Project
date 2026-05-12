import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token'); // O 'access' según como lo guardes en el Login
    
    if (!token) {
        // Si no hay token, lo mandamos al login
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;