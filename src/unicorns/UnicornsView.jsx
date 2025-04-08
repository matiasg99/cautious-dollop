import { useState } from 'react';

const UnicornsView = ({
    unicorns,
    loading,
    error,
    onCreateUnicorn,
    onDeleteUnicorn
}) => {
    const [newUnicornName, setNewUnicornName] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        color: '',
        age: 0,
        power: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
          ...prev,
          [name]: value
        }))
      }

    const [editingProduct, setEditingProduct] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (editingProduct) {
            console.log('editalo', editingProduct)
            try {
                const response = await fetch(`https://api.restful-api.dev/objects/${editingProduct.id}`, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                    name: formData.name,
                    data: {
                        features: formData.features,
                        price: Number(formData.price),
                        year: Number(formData.year)
                    }
                    })
                })

                const updatedProduct = await response.json()
                console.log('Objeto actualizado:', updatedProduct)
                setProducts(products.map(product => product.id === editingProduct.id ? updatedProduct : product))
                setEditingProduct(null)
                setFormData({ name: '', features: '', price: 0, year: 0 })

            } catch (error) {
            console.error('Error:', error)
            alert('Hubo un error al actualizar el objeto. Por favor, intente nuevamente.')
            }
        } else {
            console.log('crealo')
            try {
            const response = await fetch('https://api.restful-api.dev/objects', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                name: formData.name,
                data: {
                    features: formData.features,
                    price: Number(formData.price),
                    year: Number(formData.year)
                }
                })
            })

            if (!response.ok) {
                throw new Error('Error al crear el objeto')
            }

            const newProduct = await response.json()
            console.log('Objeto creado:', newProduct)

            const updatedProducts = [...products, newProduct]
            setProducts(updatedProducts)
            localStorage.setItem('products', JSON.stringify(updatedProducts))

            setFormData({ name: '', features: '', price: 0, year: 0 })
            } catch (error) {
            console.error('Error:', error)
            alert('Hubo un error al crear el objeto. Por favor, intente nuevamente.')
            }
        }
    }

    if (loading) return <div>Cargando unicornios...</div>;
    if (error) return <div className="error">{error}</div>;

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
                        <tr key={unicorn.id}>
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