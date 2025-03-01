import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const CartContainer = styled.div`
    position: fixed;
    right: 20px;
    top: 80px;
    background: white;
    border: 1px solid #ddd;
    padding: 20px;
    width: 300px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
`;

const CartItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const Button = styled.button`
    background: #0070f3;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    &:hover {
        background: #005bb5;
    }
`;

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

    return (
        <CartContainer>
            <h3>Корзина</h3>
            {cart.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <CartItem key={item.id}>
                            <span>{item.name}</span>
                            <span>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        updateQuantity(item, parseInt(e.target.value))
                                    }
                                    min="1"
                                    style={{ width: '50px' }}
                                />
                                <Button onClick={() => removeFromCart(item)}>Удалить</Button>
                            </span>
                        </CartItem>
                    ))}
                    <p>Итого: Р{totalPrice.toFixed(2)}</p>
                </>
            )}
        </CartContainer>
    );
}