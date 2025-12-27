import React from 'react';
import { render, screen } from '@testing-library/react';
import FilterBar from '../components/Filters/FilterBar';
import { StoreContext } from '../context/StoreContext';

describe('FilterBar Component', () => {
    const mockSetFilters = jest.fn();
    const mockFilters = {
        sortBy: 'relevant',
        type: 'all',
        priceRange: 'all'
    };

    test('renders all filter options', () => {
        render(
            <StoreContext.Provider value={{ filters: mockFilters, setFilters: mockSetFilters }}>
                <FilterBar />
            </StoreContext.Provider>
        );

        expect(screen.getByText('Relevance')).toBeInTheDocument();
        const priceElements = screen.getAllByText(/Price/i);
        expect(priceElements.length).toBeGreaterThan(0);
        expect(screen.getByText('Under $10')).toBeInTheDocument();
    });

    // Additional interaction tests could go here
});
