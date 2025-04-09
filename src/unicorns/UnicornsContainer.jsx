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

    // Fetch unicorns
    const fetchUnicorns = async () => {
        setLoading(true);
        try {

            const response = await fetch('https://crudcrud.com/api/8ee40af459dc4006ada5654bacd38ddb/unicorns');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('formData', formData);
        try {
            if (editingUnicorn) {
                console.log('editingUnicorn', editingUnicorn, formData);
                const response = await fetch(`https://crudcrud.com/api/8ee40af459dc4006ada5654bacd38ddb/unicorns/${editingUnicorn._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                setEditingUnicorn(null)
                fetchUnicorns();
            } else {
                console.log('creaaa');
                console.log(formData);
                const response = await fetch('https://crudcrud.com/api/8ee40af459dc4006ada5654bacd38ddb/unicorns', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                console.log('response', response);
                const newUnicorn = await response.json();
                setUnicorns([...unicorns, newUnicorn]);
                setEditingUnicorn(null)
                setFormData({
                    name: '',
                    color: '',
                    age: 0,
                    power: ''
                })
            }

        } catch (err) {
            setError('Error al crear el unicornio');
        }
    };

    const deleteUnicorn = async (id) => {
        try {
            await fetch(`https://crudcrud.com/api/8ee40af459dc4006ada5654bacd38ddb/unicorns/${id}`, {
                method: 'DELETE',
            });
            setUnicorns(unicorns.filter(unicorn => unicorn.id !== id));

            fetchUnicorns();
        } catch (err) {
            setError('Error al eliminar el unicornio');
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