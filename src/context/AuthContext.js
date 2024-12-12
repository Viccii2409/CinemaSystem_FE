import React, { createContext, useState, useEffect } from 'react';
import { verify } from '../config/UserConfig';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const userData = await verify(token);
                    setUser(userData);
                    setLoading(false);
                } catch (error) {
                    // Token không hợp lệ đã được xử lý trong hàm verify
                }
            } else {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);
    
    

    const handleLogin = async (token) => {
        if (token) {
            const response_user = await verify(token);
            console.log(response_user);
            if(response_user){
                localStorage.setItem('token', token);
                setUser(response_user);
                setLoading(false);
                return response_user.role.name;
            }
        }
        
        setLoading(false);
        return null;
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, handleLogin, handleLogout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;