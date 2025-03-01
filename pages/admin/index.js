import { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminForm from '../../components/AdminForm';

const Container = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

const ProductList = styled.div`
    margin-top: 20px;
`;

const ProductItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
`;

const ProductName = styled.h3`
    margin: 0;
`;

const ProductActions = styled.div`
    display: flex;
    gap: 10px;
`;

const Button = styled.button`
    background: #0070f3;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
        background: #005bb5;
    }
`;

const DeleteButton = styled.button`
    background: #ff4d4d;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;
    &:hover {
        background: #cc0000;
    }
`;

export default function Admin() {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);

    useEffect(() => {
        fetch('/api/products')
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    const handleDelete = async (id) => {
        const response = await fetch('/api/products/admin', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        if (response.ok) {
            setProducts(products.filter((product) => product.id !== id));
        }
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
    };

    const handleSubmit = async (product) => {
        const method = editingProduct ? 'PUT' : 'POST';
        const response = await fetch('/api/products/admin', {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        if (response.ok) {
            const updatedProduct = await response.json();
            if (editingProduct) {
                setProducts(
                    products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
                );
            } else {
                setProducts([...products, updatedProduct]);
            }
            setEditingProduct(null);
        }
    };

    return (
        <Container>
            <h1>Админ-панель</h1>
            <AdminForm onSubmit={handleSubmit} product={editingProduct} />
            <ProductList>
                <h2>Список товаров</h2>
                {products.map((product) => (
                    <ProductItem key={product.id}>
                        <ProductName>{product.name}</ProductName>
                        <ProductActions>
                            <Button onClick={() => handleEdit(product)}>Редактировать</Button>
                            <DeleteButton onClick={() => handleDelete(product.id)}>
                                Удалить
                            </DeleteButton>
                        </ProductActions>
                    </ProductItem>
                ))}
            </ProductList>
        </Container>
    );
}