import { Routes, Route } from 'react-router-dom';
import ProductsView from './ProductsView';
import ProductForm from './ProductForm';

const ProductsIndex = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductsView />} />
            <Route path="/new" element={<ProductForm />} />
        </Routes>
    );
};

export default ProductsIndex;