import { useState, useEffect } from 'react';
import UnicornsView from './UnicornsView';

const UnicornsContainer = () => {
    const url = 'https://crudcrud.com/api/0237ade2ebce4b669064b6fda8e400be/unicorns';
    const [unicorns, setUnicorns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        color: '',
        age: 0,
        power: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const fetchUnicorns = async () => {
        setLoading(true);
        try {

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la API');
            }
            const data = await response.json();

            setUnicorns(data);
        } catch (err) {
            setError('Error al cargar los unicornios, error:' + err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUnicorn) {
                await fetch(url + `/${editingUnicorn._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                setEditingUnicorn(null)
                fetchUnicorns();
            } else {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const newUnicorn = await response.json();
                setUnicorns([...unicorns, newUnicorn]);
                setEditingUnicorn(null)
            }

            setFormData({
                name: '',
                color: '',
                age: 0,
                power: ''
            })

        } catch (err) {
            setError('Error al crear el unicornio, error:' + err);
        }
    };

    const deleteUnicorn = async (id) => {
        try {
            await fetch(url + `/${id}`, {
                method: 'DELETE',
            });
            setUnicorns(unicorns.filter(unicorn => unicorn.id !== id));

            fetchUnicorns();
        } catch (err) {
            setError('Error al eliminar el unicornio, error:' + err);
        }
    };

    const [editingUnicorn, setEditingUnicorn] = useState(null)

    const handleEdit = (unicorn) => {
        setEditingUnicorn(unicorn)
        setFormData({
            name: unicorn.name,
            color: unicorn.color,
            age: unicorn.age,
            power: unicorn.power
        })
    }

    useEffect(() => {
        fetchUnicorns();
    }, []);

    return (
        <UnicornsView
            unicorns={unicorns}
            formData={formData}
            editingUnicorn={editingUnicorn}
            loading={loading}
            error={error}
            onSubmit={handleSubmit}
            onEdit={handleEdit}
            onDeleteUnicorn={deleteUnicorn}
            onInputChange={handleInputChange}
        />
    );
};

export default UnicornsContainer;