import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import productsData from './productsData';

const ProductsView = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem('products');
        if (stored) {
            setProducts(JSON.parse(stored));
        } else {
            setProducts(productsData);
            localStorage.setItem('products', JSON.stringify(productsData));
        }
    }, []);

    return (
        <div className="container">
            <h1>Lista de Productos</h1>
            <button onClick={() => navigate('/productos/new')} style={{ marginBottom: 16 }}>
                Agregar Producto
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Color</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.color}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsView;