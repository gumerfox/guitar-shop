import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 400px;
`;

export default function AdminForm({ onSubmit, product }) {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        brand: '', // Добавлено поле brand
    });

    useEffect(() => {
        if (product) {
            setFormData({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                image: product.image,
                category: product.category,
                brand: product.brand, // Заполняем поле brand
            });
        } else {
            setFormData({
                id: '',
                name: '',
                description: '',
                price: '',
                image: '',
                category: '',
                brand: '', // Сбрасываем поле brand
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Название"
                required
            />
            <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Описание"
                required
            />
            <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Цена"
                type="number"
                step="0.01"
                required
            />
            <input
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="Ссылка на изображение"
                required
            />
            <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Категория"
                required
            />
            <input
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Бренд"
                required
            />
            <button type="submit">{product ? 'Обновить товар' : 'Добавить товар'}</button>
        </Form>
    );
}