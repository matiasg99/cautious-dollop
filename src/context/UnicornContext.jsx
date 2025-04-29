import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const UnicornContext = createContext();

const API_URL = 'https://crudcrud.com/api/80a547eee9814a05837fa31cfa18b8c0/unicorns';

export const UnicornProvider = ({ children }) => {
    const [unicorns, setUnicorns] = useState([]);

    // Obtener todos los unicornios
    const getUnicorns = async () => {
        const response = await axios.get(API_URL);
        setUnicorns(response.data);
    };

    useEffect(() => {
        getUnicorns();
    }, []);

    // Crear unicornio
    const createUnicorn = async (unicorn) => {
        const response = await axios.post(API_URL, unicorn);
        setUnicorns((prev) => [...prev, response.data]);
    };

    // Editar unicornio
    const editUnicorn = async (id, updatedUnicorn) => {
        await axios.put(`${API_URL}/${id}`, updatedUnicorn);
        setUnicorns((prev) =>
            prev.map((u) => (u._id === id ? { ...u, ...updatedUnicorn } : u))
        );
    };

    // Eliminar unicornio
    const deleteUnicorn = async (id) => {
        await axios.delete(`${API_URL}/${id}`);
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