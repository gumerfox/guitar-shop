import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useCart } from '../../context/CartContext';

const Container = styled.div`
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
`;

const CartItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
`;

const ItemDetails = styled.div`
    flex: 1;
`;

const ItemName = styled.h3`
    margin: 0;
`;

const ItemPrice = styled.p`
    margin: 0;
    color: #0070f3;
`;

const QuantityInput = styled.input`
    width: 50px;
    padding: 5px;
    margin-right: 10px;
`;

const RemoveButton = styled.button`
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

const TotalPrice = styled.p`
    font-size: 1.2rem;
    font-weight: bold;
    text-align: right;
    margin-top: 20px;
`;

const PaymentForm = styled.div`
    margin-top: 20px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f9f9f9;
`;

const Input = styled.input`
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    margin-bottom: 10px;
`;

const Button = styled.button`
    background: #0070f3;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
    &:hover {
        background: #005bb5;
    }
`;

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handlePayment = async () => {
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('/api/payment', {
                cardNumber,
                expDate,
                cvv,
                amount: totalPrice,
                currency: 'RUB',
            });

            if (response.data.success) {
                setMessage('Платеж успешно завершен!');
            } else {
                setMessage('Ошибка платежа: ' + response.data.message);
            }
        } catch (error) {
            setMessage('Ошибка платежа: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <h1>Корзина</h1>
            {cart.length === 0 ? (
                <p>Ваша корзина пуста</p>
            ) : (
                <>
                    {cart.map((item) => {
                        const formattedPrice = typeof item.price === 'number' ? item.price.toFixed(2) : '0.00';

                        return (
                            <CartItem key={item.id}>
                                <ItemDetails>
                                    <ItemName>{item.name}</ItemName>
                                    <ItemPrice>₽{formattedPrice}</ItemPrice>
                                </ItemDetails>
                                <div>
                                    <QuantityInput
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) =>
                                            updateQuantity(item, parseInt(e.target.value))
                                        }
                                        min="1"
                                    />
                                    <RemoveButton onClick={() => removeFromCart(item)}>
                                        Удалить
                                    </RemoveButton>
                                </div>
                            </CartItem>
                        );
                    })}
                    <TotalPrice>Итого: ₽{totalPrice.toFixed(2)}</TotalPrice>
                </>
            )}

            <PaymentForm>
                <h2>Оплата заказа</h2>
                <Input
                    type="text"
                    placeholder="Номер карты"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="Срок действия (MM/YY)"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                />
                <Input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                />
                <Button onClick={handlePayment} disabled={loading}>
                    {loading ? 'Обработка...' : 'Оплатить'}
                </Button>
                {message && <p>{message}</p>}
            </PaymentForm>
        </Container>
    );
}