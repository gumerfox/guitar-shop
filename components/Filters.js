import { useState } from 'react';
import styled from 'styled-components';

const FiltersPanel = styled.div`
    background: white;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
    margin-top: 0;
`;

const BrandsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 20px;
`;

const BrandItem = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const CategoriesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin-bottom: 20px;
`;

const CategoryItem = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const ShowMoreButton = styled.button`
    background: #0070f3;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
    width: 100%;
    margin-top: 10px;
    &:hover {
        background: #005bb5;
    }
`;

export default function Filters({ selectedBrands, selectedCategories, onBrandChange, onCategoryChange }) {
    const [showAllBrands, setShowAllBrands] = useState(false);

    const brands = [
        { name: 'AUDIO-TECHNICA', count: 8 },
        { name: 'BEHRINGER', count: 11 },
        { name: 'HOHNER', count: 7 },
        { name: 'IBANEZ', count: 6 },
        { name: 'ROCKDALE', count: 18 },
        { name: 'UPTONE', count: 12 },
        { name: 'YAMAHA', count: 15 },
        { name: 'FENDER', count: 9 },
        { name: 'GIBSON', count: 10 },
        { name: 'EPIPHONE', count: 7 },
    ];

    const categories = [
        { name: 'Акустические гитары', count: 12 },
        { name: 'Электрогитары', count: 15 },
        { name: 'Укулеле', count: 8 },
    ];

    const visibleBrands = showAllBrands ? brands : brands.slice(0, 6);

    const handleBrandFilter = (e, brand) => {
        if (e.target.checked) {
            onBrandChange([...selectedBrands, brand]);
        } else {
            onBrandChange(selectedBrands.filter((b) => b !== brand));
        }
    };

    const handleCategoryFilter = (e, category) => {
        if (e.target.checked) {
            onCategoryChange([...selectedCategories, category]);
        } else {
            onCategoryChange(selectedCategories.filter((c) => c !== category));
        }
    };

    return (
        <FiltersPanel>
            <SectionTitle>Категории</SectionTitle>
            <CategoriesContainer>
                {categories.map((category) => (
                    <CategoryItem key={category.name}>
                        <input
                            type="checkbox"
                            id={`category-${category.name}`}
                            name={category.name}
                            checked={selectedCategories.includes(category.name)}
                            onChange={(e) => handleCategoryFilter(e, category.name)}
                        />
                        <label htmlFor={`category-${category.name}`}>
                            {category.name} ({category.count})
                        </label>
                    </CategoryItem>
                ))}
            </CategoriesContainer>

            <SectionTitle>Бренды</SectionTitle>
            <BrandsContainer>
                {visibleBrands.map((brand) => (
                    <BrandItem key={brand.name}>
                        <input
                            type="checkbox"
                            id={`brand-${brand.name}`}
                            name={brand.name}
                            checked={selectedBrands.includes(brand.name)}
                            onChange={(e) => handleBrandFilter(e, brand.name)}
                        />
                        <label htmlFor={`brand-${brand.name}`}>
                            {brand.name} ({brand.count})
                        </label>
                    </BrandItem>
                ))}
            </BrandsContainer>
            {brands.length > 6 && (
                <ShowMoreButton onClick={() => setShowAllBrands(!showAllBrands)}>
                    {showAllBrands ? 'Скрыть' : 'Показать еще'}
                </ShowMoreButton>
            )}
        </FiltersPanel>
    );
}