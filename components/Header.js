import styled from 'styled-components';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

const HeaderContainer = styled.header`
    background-color: #1f1f1f;
    color: white;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Nav = styled.nav`
    display: flex;
    align-items: center;
    gap: 20px;
`;

const NavLink = styled.a`
    color: white;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const CartButton = styled.button`
    background: #0070f3;
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
    &:hover {
        background: #005bb5;
    }
`;

export default function Header() {
    const { cart } = useCart();

    return (
        <HeaderContainer>
            <h1>Guitar Shop</h1>
            <Nav>
                <Link href="/" passHref legacyBehavior>
                    <NavLink>Главная</NavLink>
                </Link>
                <Link href="/admin" passHref legacyBehavior>
                    <NavLink>Админ</NavLink>
                </Link>
                <Link href="/cart" passHref legacyBehavior>
                    <CartButton>Корзина ({cart.length})</CartButton>
                </Link>
            </Nav>
        </HeaderContainer>
    );
}