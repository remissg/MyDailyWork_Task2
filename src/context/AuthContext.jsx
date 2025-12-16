import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Check if user is logged in on mount
    useEffect(() => {
        const checkUser = async () => {
            if (token) {
                try {
                    const res = await fetch('/api/auth/me', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    // Check if response is ok and has content
                    if (!res.ok) {
                        console.error('Auth check failed with status:', res.status);
                        logout();
                        return;
                    }

                    // Check if response has content before parsing
                    const text = await res.text();
                    if (!text) {
                        console.error('Empty response from server');
                        logout();
                        return;
                    }

                    const data = JSON.parse(text);

                    if (data.success) {
                        setUser(data.data);
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error('Auth check failed:', error);
                    logout();
                }
            }
            setLoading(false);
        };

        checkUser();
    }, [token]);

    const register = async (userData) => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const text = await res.text();
            const data = text ? JSON.parse(text) : {};

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Auto login after register
            localStorage.setItem('token', data.token);
            setToken(data.token);
            setUser(data);

            if (data.role === 'employer') {
                navigate('/dashboard');
            } else {
                navigate('/candidate-dashboard');
            }
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const login = async (email, password) => {
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const text = await res.text();
            const data = text ? JSON.parse(text) : {};

            if (!res.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('token', data.token);
            setToken(data.token);
            setUser(data);

            if (data.role === 'employer') {
                navigate('/dashboard');
            } else if (data.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/candidate-dashboard');
            }
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        navigate('/login');
    };

    const value = {
        user,
        token,
        loading,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
