import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const UnicornsView = ({
    unicorns,
    formData,
    onSubmit,
    onDeleteUnicorn,
    onInputChange,
    onEdit
}) => {
    return (
        <div className="container">
            <h1>Gestión de Unicornios</h1>

            <div className="unicorns-container">
            <form onSubmit={onSubmit} className="unicorn-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Nombre del unicornio"
                    required
                    value={formData.name}
                    onChange={onInputChange}
                />
                <input
                    type="text"
                    name="color"
                    placeholder="Color"
                    required
                    value={formData.color}
                    onChange={onInputChange}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Edad"
                    required
                    value={formData.age}
                    onChange={onInputChange}
                />
                <input
                    type="text"
                    name="power"
                    placeholder="Poder"
                    required
                    value={formData.power}
                    onChange={onInputChange}
                />
                <button type="submit">
                    Agregar Unicornio
                </button>
            </form>
            <div className="products-list">
                <h2>Lista de Productos</h2>
                <DataTable value={unicorns} emptyMessage="No hay unicornios en el inventario">
                    <Column field="name" header="Nombre"></Column>
                    <Column field="color" header="Color"></Column>
                    <Column field="age" header="Edad"></Column>
                    <Column field="power" header="Poder"></Column>
                    <Column body={(rowData) => (
                        <div>
                            <button onClick={() => onEdit(rowData)} className="p-button-warning">
                                Editar
                            </button>
                            <button onClick={() => onDeleteUnicorn(rowData._id)} className="p-button-danger">
                                Eliminar
                            </button>
                        </div>
                    )} header="Acciones"></Column>
                </DataTable>
            </div>
            </div>
        </div>
    );
};

export default UnicornsView; 