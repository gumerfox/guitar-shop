import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import SkeletonProductCard from './SkeletonProductCard';

const Card = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    &:hover {
        transform: translateY(-5px);
    }
`;

const Image = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
`;

const Content = styled.div`
    padding: 16px;
`;

const Title = styled.h3`
    margin: 0;
    font-size: 1.25rem;
`;

const Price = styled.p`
    font-size: 1.1rem;
    color: #0070f3;
    margin: 8px 0;
`;

const Category = styled.p`
    font-size: 0.9rem;
    color: #666;
`;

const Brand = styled.p`
    font-size: 0.9rem;
    color: #888;
    margin: 4px 0;
`;

const Button = styled.button`
    background: #0070f3;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
    width: 100%;
    &:hover {
        background: #005bb5;
    }
`;

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    // Если продукт не загружен, показываем скелетон
    if (!product) {
        return <SkeletonProductCard />;
    }

    // Преобразуем price в число и форматируем его
    const formattedPrice = typeof product.price === 'number' ? product.price.toFixed(2) : '0.00';

    return (
        <Card>
            <Link href={`/products/${product.id}`} passHref legacyBehavior>
                <a>
                    <Image src={product.image} alt={product.name} />
                    <Content>
                        <Title>{product.name}</Title>
                        <Price>₽{formattedPrice}</Price>
                        <Category>{product.category}</Category>
                        <Brand>Бренд: {product.brand}</Brand> {/* Добавлено отображение бренда */}
                    </Content>
                </a>
            </Link>
            <div style={{ padding: '0 16px 16px 16px' }}>
                <Button onClick={() => addToCart(product)}>Добавить в корзину</Button>
            </div>
        </Card>
    );
}