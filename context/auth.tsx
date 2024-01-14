'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';

export type AuthProvide = {
    token: string | null;
    login: (token: string) => void;
};
export type AuthProviderProps = {
    children: React.ReactNode;
};

export const AUTH_TOKEN = 'AUTH_TOKEN';

const authContext = createContext<AuthProvide>({
    token: null,
    login: () => { }
});

const AuthProvider = ({ children }: AuthProviderProps) => {

    const [token, setToken] = useState<string | null>(null);

    const login = (token: string) => {
        const formattedToken = `Bearer ${token}`;
        window.localStorage.setItem(AUTH_TOKEN, formattedToken);
        setToken(formattedToken);
    };

    useEffect(() => {
        const token = localStorage.getItem(AUTH_TOKEN);
        if (token) {
          setToken(token);
        } else {
          localStorage.removeItem(AUTH_TOKEN);
        }
      }, []);

    return (
        <authContext.Provider
            value={{
                token,
                login
            }}
        >
            {children}
        </authContext.Provider>
    );
}

export default AuthProvider;

export const useAdmin = () => {
    return useContext(authContext);
};
