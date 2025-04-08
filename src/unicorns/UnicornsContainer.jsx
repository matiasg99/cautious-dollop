import { useState, useEffect } from 'react';
import UnicornsView from './UnicornsView';

// https://crudcrud.com/api/f5a9f4de2b6546b18c5415606bfc79fd

// {
//     name: "nombre unicornio",
//     color: "color unicornio",
//     age: 5,
//     power: "especial"
// }

const UnicornsContainer = () => {
    const [unicorns, setUnicorns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch unicorns
    const fetchUnicorns = async () => {
        setLoading(true);
        try {

            const response = await fetch('https://crudcrud.com/api/f5a9f4de2b6546b18c5415606bfc79fd/unicorns');
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API');
            }
            const data = await response.json();

            setUnicorns(data);
        } catch (err) {
            setError('Error al cargar los unicornios');
        } finally {
            setLoading(false);
        }
    };

    // Create unicorn
    const createUnicorn = async (unicorn) => {
        try {
            // Aquí iría la llamada POST a tu API
            const response = await fetch('/api/unicorns', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(unicorn),
            });
            const newUnicorn = await response.json();
            setUnicorns([...unicorns, newUnicorn]);
        } catch (err) {
            setError('Error al crear el unicornio');
        }
    };

    // Delete unicorn
    const deleteUnicorn = async (id) => {
        try {
            // Aquí iría la llamada DELETE a tu API
            await fetch(`/api/unicorns/${id}`, {
                method: 'DELETE',
            });
            setUnicorns(unicorns.filter(unicorn => unicorn.id !== id));
        } catch (err) {
            setError('Error al eliminar el unicornio');
        }
    };

    useEffect(() => {
        fetchUnicorns();
    }, []);

    return (
        <UnicornsView
            unicorns={unicorns}
            loading={loading}
            error={error}
            onCreateUnicorn={createUnicorn}
            onDeleteUnicorn={deleteUnicorn}
        />
    );
};

export default UnicornsContainer; 