import React, { useEffect } from 'react';
import { useUnicorns } from '../context/UnicornContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const UnicornSchema = Yup.object().shape({
    name: Yup.string().required('El nombre es requerido'),
    color: Yup.string().required('El color es requerido'),
    age: Yup.number().required('La edad es requerida').min(1, 'La edad debe ser mayor a 0'),
    power: Yup.string().required('El poder es requerido'),
});

const UnicornForm = () => {
    const { unicorns, createUnicorn, editUnicorn } = useUnicorns();
    const navigate = useNavigate();
    const { id } = useParams();

    const isEdit = Boolean(id);
    const unicornToEdit = unicorns.find(u => u._id === id);

    const initialValues = isEdit && unicornToEdit
        ? {
            name: unicornToEdit.name,
            color: unicornToEdit.color,
            age: unicornToEdit.age,
            power: unicornToEdit.power,
        }
        : {
            name: '',
            color: '',
            age: '',
            power: '',
        };

    useEffect(() => {
        // Si está en modo edición y no encuentra el unicornio, vuelve atrás
        if (isEdit && !unicornToEdit) {
            navigate('/unicornios');
        }
    }, [isEdit, unicornToEdit, navigate]);

    const handleSubmit = async (values, { setSubmitting }) => {
        if (isEdit) {
            await editUnicorn(id, values);
        } else {
            await createUnicorn(values);
        }
        setSubmitting(false);
        navigate('/unicornios');
    };

    return (
        <div className="container">
            <h2>{isEdit ? 'Editar Unicornio' : 'Agregar Unicornio'}</h2>
            <Formik
                initialValues={initialValues}
                validationSchema={UnicornSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form className="unicorn-form">
                        <div>
                            <Field name="name" placeholder="Nombre del unicornio" />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>
                        <div>
                            <Field name="color" placeholder="Color" />
                            <ErrorMessage name="color" component="div" className="error" />
                        </div>
                        <div>
                            <Field name="age" type="number" placeholder="Edad" />
                            <ErrorMessage name="age" component="div" className="error" />
                        </div>
                        <div>
                            <Field name="power" placeholder="Poder" />
                            <ErrorMessage name="power" component="div" className="error" />
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            {isEdit ? 'Actualizar Unicornio' : 'Agregar Unicornio'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default UnicornForm;