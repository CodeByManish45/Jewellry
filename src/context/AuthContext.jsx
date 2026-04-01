import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const calculateAuth = () => {
            const savedUser = localStorage.getItem('authUser');
            const savedToken = localStorage.getItem('authToken');
            
            if (savedUser && savedToken) {
                setUser(JSON.parse(savedUser));
                setToken(savedToken);
            }
            setLoading(false);
        };
        
        calculateAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
            if (response.user && response.token) {
                setUser(response.user);
                setToken(response.token);
                localStorage.setItem('authUser', JSON.stringify(response.user));
                localStorage.setItem('authToken', response.token);
                return response.user;
            }
            throw new Error('Invalid response from server');
        } catch (error) {
            throw error;
        }
    };

    const signup = async (userData) => {
        try {
            const response = await authService.signup(userData);
            if (response.user && response.token) {
                setUser(response.user);
                setToken(response.token);
                localStorage.setItem('authUser', JSON.stringify(response.user));
                localStorage.setItem('authToken', response.token);
                return response.user;
            }
            throw new Error('Could not create account');
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            localStorage.removeItem('authUser');
            localStorage.removeItem('authToken');
            setUser(null);
            setToken(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const isAdmin = user?.role === 'admin';
    const isAuthenticated = !!token;

    const value = {
        user,
        token,
        isAuthenticated,
        isAdmin,
        loading,
        login,
        signup,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
