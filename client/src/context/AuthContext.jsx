import { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, userInfo: action.payload };
        case 'LOGOUT':
            return { ...state, userInfo: null };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        userInfo: JSON.parse(localStorage.getItem('userInfo')) || null,
    });

    useEffect(() => {
        if (state.userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        } else {
            localStorage.removeItem('userInfo');
        }
    }, [state.userInfo]);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('/api/users/login', { email, password });
            dispatch({ type: 'LOGIN', payload: data });
        } catch (error) {
            throw error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post('/api/users', { name, email, password });
            dispatch({ type: 'LOGIN', payload: data });
        } catch (error) {
            throw error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        }
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{ userInfo: state.userInfo, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
