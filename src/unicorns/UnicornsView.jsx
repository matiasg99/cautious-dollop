import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const UnicornsView = ({
    unicorns,
    loading,
    error,
    onCreateUnicorn,
    onDeleteUnicorn
}) => {
    return (
        <div className="container">
            <h1>Gestión de Unicornios</h1>

            <div className="unicorns-container">
            <form onSubmit={onCreateUnicorn} className="unicorn-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del unicornio"
                    required
                />
                <input
                    type="text"
                    name="color"
                    placeholder="Color"
                    required
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Edad"
                    required
                />
                <input
                    type="text"
                    name="power"
                    placeholder="Poder"
                    required
                />
                <button type="submit">
                    Agregar Unicornio
                </button>
            </form>
            <div className="products-list">
                <h2>Lista de Productos</h2>
                <DataTable value={unicorns} emptyMessage="No hay unicornios en el inventario">
                    <Column field="name" header="Nombre"></Column>
                    <Column field="colour" header="Color"></Column>
                    <Column field="age" header="Edad"></Column>
                    <Column field="power" header="Poder"></Column>
                </DataTable>
            </div>
            </div>
        </div>
    );
};

export default UnicornsView; 