import gobus from '../assets/Images/gobus.jpeg';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import React, { useState } from 'react';
import { loginUser } from '../features/authSlice';

export function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  
    const [credentials, setCredentials] = useState({ username: '', password: '' });
  
    const handleChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(loginUser(credentials))
      .then(() => {
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error de login:', error);
      });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-center">
                    <img src={gobus} alt="Logo" className="w-[200px] object-cover rounded-full" />
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Usuario</label>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            placeholder="Ingresa tu usuario"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Ingresa tu contraseña"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 mt-4 text-white bg-[#e8332d] rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                       {loading ? 'Iniciando sesión...' : 'Iniciar sesión'} 
                    </button>
                </form>
            </div>
        </div>
    );
}
