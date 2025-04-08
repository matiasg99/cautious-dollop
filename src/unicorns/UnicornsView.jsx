import { useState } from 'react';

const UnicornsView = ({ 
    unicorns, 
    loading, 
    error, 
    onCreateUnicorn, 
    onDeleteUnicorn 
}) => {
    const [newUnicornName, setNewUnicornName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newUnicornName.trim()) {
            onCreateUnicorn({ name: newUnicornName });
            setNewUnicornName('');
        }
    };

    if (loading) return <div>Cargando unicornios...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="unicorns-container">
            <h2>Gestión de Unicornios</h2>
            
            {/* Formulario para crear unicornios */}
            <form onSubmit={handleSubmit} className="unicorn-form">
                <input
                    type="text"
                    value={newUnicornName}
                    onChange={(e) => setNewUnicornName(e.target.value)}
                    placeholder="Nombre del unicornio"
                />
                <button type="submit">Crear Unicornio</button>
            </form>

            {/* Tabla de unicornios */}
            <table className="unicorns-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {unicorns.map(unicorn => (
                        <tr key={unicorn.id}>
                            <td>{unicorn.id}</td>
                            <td>{unicorn.name}</td>
                            <td>
                                <button 
                                    onClick={() => onDeleteUnicorn(unicorn.id)}
                                    className="delete-button"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {unicorns.length === 0 && (
                <p>No hay unicornios disponibles.</p>
            )}
        </div>
    );
};

export default UnicornsView; 