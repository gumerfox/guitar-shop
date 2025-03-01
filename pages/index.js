import { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import SkeletonProductCard from '../components/SkeletonProductCard';

const Container = styled.div`
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
`;

const SearchContainer = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const SearchInput = styled.input`
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    max-width: 400px;
    transition: border-color 0.3s ease;

    &:focus {
        border-color: #0070f3;
        outline: none;
    }
`;

const SearchButton = styled.button`
    background: #0070f3;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
    transition: background 0.3s ease;

    &:hover {
        background: #005bb5;
    }
`;

const FiltersButton = styled.button`
    background: #0070f3;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
    margin-bottom: 20px;
    &:hover {
        background: #005bb5;
    }
`;

const SortContainer = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const SortSelect = styled.select`
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    cursor: pointer;
`;

export default function Home() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [sortOption, setSortOption] = useState('price-asc');
    const [isLoading, setIsLoading] = useState(true); // Добавлено

    // Загрузка товаров
    useEffect(() => {
        fetch('/api/products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
                setIsLoading(false); // Данные загружены
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
                setIsLoading(false); // Остановить загрузку в случае ошибки
            });
    }, []);

    // Дебаунс для поиска
    const handleSearch = useCallback(
        debounce((query) => {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        }, 300),
        [products]
    );

    // Фильтрация по брендам, категориям и поиску
    useEffect(() => {
        let filtered = products;

        if (selectedBrands.length > 0) {
            filtered = filtered.filter((product) =>
                selectedBrands.includes(product.brand)
            );
        }

        if (selectedCategories.length > 0) {
            filtered = filtered.filter((product) =>
                selectedCategories.includes(product.category)
            );
        }

        if (searchQuery) {
            filtered = filtered.filter((product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredProducts(filtered);
    }, [selectedBrands, selectedCategories, searchQuery, products]);

    // Сортировка товаров
    const sortedProducts = useMemo(() => {
        let sorted = [...filteredProducts];

        switch (sortOption) {
            case 'price-asc':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                sorted.sort((a, b) => b.price - a.price);
                break;
            case 'popularity':
                sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
                break;
            case 'newest':
                sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            default:
                break;
        }

        return sorted;
    }, [filteredProducts, sortOption]);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    return (
        <div>
            <SearchContainer>
                <SearchInput
                    type="text"
                    placeholder="Поиск товаров..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchButton onClick={() => handleSearch(searchQuery)}>
                    Найти
                </SearchButton>
            </SearchContainer>

            <FiltersButton onClick={() => setIsFiltersOpen(!isFiltersOpen)}>
                {isFiltersOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
            </FiltersButton>

            <SortContainer>
                <label htmlFor="sort">Сортировка:</label>
                <SortSelect id="sort" value={sortOption} onChange={handleSortChange}>
                    <option value="price-asc">Цена (по возрастанию)</option>
                    <option value="price-desc">Цена (по убыванию)</option>
                    <option value="popularity">Популярность</option>
                    <option value="newest">Новинки</option>
                </SortSelect>
            </SortContainer>

            {isFiltersOpen && (
                <Filters
                    selectedBrands={selectedBrands}
                    selectedCategories={selectedCategories}
                    onBrandChange={setSelectedBrands}
                    onCategoryChange={setSelectedCategories}
                />
            )}

            <Container>
                {isLoading
                    ? [...Array(6)].map((_, index) => <SkeletonProductCard key={index} />)
                    : sortedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
            </Container>
        </div>
    );
}