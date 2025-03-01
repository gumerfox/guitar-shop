import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItem = state.find((item) => item.id === action.payload.id);
            if (existingItem) {
                return state.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...state, { ...action.payload, quantity: 1 }];
        case 'REMOVE_FROM_CART':
            return state.filter((item) => item.id !== action.payload.id);
        case 'UPDATE_QUANTITY':
            return state.map((item) =>
                item.id === action.payload.id
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
        case 'CLEAR_CART':
            return [];
        case 'LOAD_CART':
            return action.payload;
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);

    // Загрузка корзины из LocalStorage при монтировании компонента
    useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (Array.isArray(savedCart)) {
        dispatch({ type: 'LOAD_CART', payload: savedCart });
    } else {
        dispatch({ type: 'LOAD_CART', payload: [] }); // Если данные некорректны, используем пустой массив
    }
}, []);

    // Сохранение корзины в LocalStorage при изменении
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (product) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: product });
    };

    const updateQuantity = (product, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { ...product, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const totalPrice = Array.isArray(cart) ? cart.reduce((total, item) => total + item.price * item.quantity, 0) : 0;
    
    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);