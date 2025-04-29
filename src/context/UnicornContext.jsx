import React, { createContext, useState, useEffect, useContext } from 'react';

export const UnicornContext = createContext();

const API_URL = 'https://crudcrud.com/api/80a547eee9814a05837fa31cfa18b8c0/unicorns';

export const UnicornProvider = ({ children }) => {
    const [unicorns, setUnicorns] = useState([]);

    // Obtener todos los unicornios
    const getUnicorns = async () => {
        const response = await fetch(API_URL);
        const data = await response.json();
        setUnicorns(data);
    };

    useEffect(() => {
        getUnicorns();
    }, []);

    // Crear unicornio
    const createUnicorn = async (unicorn) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(unicorn),
        });
        const newUnicorn = await response.json();
        setUnicorns((prev) => [...prev, newUnicorn]);
    };

    // Editar unicornio
    const editUnicorn = async (id, updatedUnicorn) => {
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUnicorn),
        });
        setUnicorns((prev) =>
            prev.map((u) => (u._id === id ? { ...u, ...updatedUnicorn } : u))
        );
    };

    // Eliminar unicornio
    const deleteUnicorn = async (id) => {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        setUnicorns((prev) => prev.filter((u) => u._id !== id));
    };

    return (
        <UnicornContext.Provider
            value={{
                unicorns,
                getUnicorns,
                createUnicorn,
                editUnicorn,
                deleteUnicorn,
            }}
        >
            {children}
        </UnicornContext.Provider>
    );
};

// Custom hook para consumir el contexto
export const useUnicorns = () => useContext(UnicornContext);