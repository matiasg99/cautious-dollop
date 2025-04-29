import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useUnicorns } from '../context/UnicornContext';
import { useNavigate } from 'react-router-dom';

const UnicornsView = () => {
    const { unicorns, deleteUnicorn } = useUnicorns();
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Gestión de Unicornios</h1>
            <button onClick={() => navigate('/unicornios/crear')} style={{ marginBottom: 16 }}>
                Agregar Unicornio
            </button>
            <div className="unicorns-container">
                <DataTable value={unicorns} emptyMessage="No hay unicornios en el inventario">
                    <Column field="name" header="Nombre" />
                    <Column field="color" header="Color" />
                    <Column field="age" header="Edad" />
                    <Column field="power" header="Poder" />
                    <Column
                        header="Acciones"
                        body={(rowData) => (
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={() => navigate(`/unicornios/editar/${rowData._id}`)}
                                    className="p-button"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => deleteUnicorn(rowData._id)}
                                    className="p-button-danger"
                                >
                                    Eliminar
                                </button>
                            </div>
                        )}
                    />
                </DataTable>
            </div>
        </div>
    );
};

export default UnicornsView;