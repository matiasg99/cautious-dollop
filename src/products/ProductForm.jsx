import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

const validate = values => {
    const errors = {};
    if (!values.name) errors.name = 'Requerido';
    if (!values.color) errors.color = 'Requerido';
    return errors;
};

const ProductForm = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: '',
            color: '',
        },
        validate,
        onSubmit: (values) => {
            const stored = localStorage.getItem('products');
            const products = stored ? JSON.parse(stored) : [];
            const newProduct = {
                ...values,
                id: Date.now(),
            };
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));
            navigate('/productos');
        },
    });

    return (
        <div className="container">
            <h2>Agregar Producto</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input
                        name="name"
                        placeholder="Nombre"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <div className="error">{formik.errors.name}</div>
                    )}
                </div>
                <div>
                    <input
                        name="color"
                        placeholder="Color"
                        value={formik.values.color}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.color && formik.touched.color && (
                        <div className="error">{formik.errors.color}</div>
                    )}
                </div>
                <button type="submit">Agregar</button>
            </form>
        </div>
    );
};

export default ProductForm;