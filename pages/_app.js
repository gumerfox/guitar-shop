import GlobalStyles from '../styles/GlobalStyles';
import { CartProvider } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MyApp({ Component, pageProps }) {
    return (
        <CartProvider>
            <GlobalStyles />
            <Header />
            <Component {...pageProps} />
            <Footer />
        </CartProvider>
    );
}