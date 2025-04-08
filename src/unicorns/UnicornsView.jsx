import { useState } from 'react';

const UnicornsView = ({
    unicorns,
    loading,
    error,
    onCreateUnicorn,
    onDeleteUnicorn
}) => {
    return (
        <div className="container">
            <h1>Gestión de Inventario</h1>

            <div className="unicorns-container">
            <form onSubmit={handleSubmit} className="unicorn-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del unicornio"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="color"
                    placeholder="Color"
                    value={formData.colour}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Edad"
                    value={formData.age}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="power"
                    placeholder="Poder"
                    value={formData.power}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">
                {editingProduct ? 'Actualizar' : 'Agregar'} Producto
                </button>
            </form>

            <div className="products-list">
                <h2>Lista de Productos</h2>
                {unicorns.length > 0 ? (
                <>
                    <table>
                    <thead>
                        <tr>
                        <th>Nombre</th>
                        <th>Color</th>
                        <th>Edad</th>
                        <th>Poder</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unicorns.map(unicorn => (
                        <tr key={unicorn._id}>
                            <td>{unicorn.name}</td>
                            <td>{unicorn.colour}</td>
                            <td>{unicorn.age}</td>
                            <td>{unicorn.power}</td>
                            <td>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </>
                ) : (
                <p>No hay unicornios en el inventario</p>
                )}
            </div>
            </div>
        </div>
    );
};

export default UnicornsView; 