import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useUnicorns } from '../context/UnicornContext';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

const UnicornsView = () => {
    const { unicorns, deleteUnicorn } = useUnicorns();
    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Gestión de Unicornios</h1>
            <Button
                label="Agregar Unicornio"
                icon="pi pi-plus"
                className="p-button-success"
                style={{ marginBottom: 16 }}
                onClick={() => navigate('/unicornios/crear')}
            />
            <div className="unicorns-container">
                <DataTable
                    value={unicorns}
                    emptyMessage="No hay unicornios en el inventario"
                    stripedRows
                    showGridlines
                    responsiveLayout="scroll"
                    className="p-datatable-gridlines unicorns-table-custom spaced-table"
                    style={{ borderRadius: 12, border: '2px solid #b3c6ff', boxShadow: '0 2px 12px #e3eaff' }}
                >
                    <Column field="name" header="Nombre" />
                    <Column field="color" header="Color" />
                    <Column field="age" header="Edad" />
                    <Column field="power" header="Poder" />
                    <Column
                        header="Acciones"
                        body={(rowData) => (
                            <div className="p-d-flex p-ai-center" style={{ gap: 8 }}>
                                <Button
                                    label="Editar"
                                    icon="pi pi-pencil"
                                    className="p-button-text p-button-sm"
                                    onClick={() => navigate(`/unicornios/editar/${rowData._id}`)}
                                />
                                <Button
                                    label="Eliminar"
                                    icon="pi pi-trash"
                                    className="p-button-text p-button-sm"
                                    onClick={() => deleteUnicorn(rowData._id)}
                                />
                            </div>
                        )}
                    />
                </DataTable>
            </div>
        </div>
    );
};

export default UnicornsView;